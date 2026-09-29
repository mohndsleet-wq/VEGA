/* =========================================================
   VEGA ENGINEERING SOLUTIONS
   FUEL SYSTEMS TECHNICAL LIBRARY
   APPLICATION CONTROLLER
========================================================= */

"use strict";

/* =========================================================
   STATE
========================================================= */

const state = {
  products: Array.isArray(window.equipmentData)
    ? window.equipmentData
    : typeof equipmentData !== "undefined"
      ? equipmentData
      : [],

  filteredProducts: [],
  currentProduct: null,

  filters: {
    search: "",
    category: "all",
    manufacturer: "all"
  }
};


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .trim();
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function formatPrice(product) {
  if (!product.price) {
    return "Contact Sales";
  }

  if (
    typeof product.price === "number" ||
    /^\d+(\.\d+)?$/.test(String(product.price))
  ) {
    const currency = product.currency || "SAR";

    return `${Number(product.price).toLocaleString()} ${currency}`;
  }

  return product.price;
}

function safeImage(product) {
  return product.image || "";
}

function safeDocuments(product) {
  return Array.isArray(product.documents)
    ? product.documents
    : [];
}

function safeSpecifications(product) {
  return product.specifications &&
    typeof product.specifications === "object"
    ? product.specifications
    : {};
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  state.filteredProducts = [...state.products];

  initializeNavigation();
  initializeHeaderSearch();
  initializeHeroSearch();
  initializeQuickAccess();
  initializeKeyboardShortcuts();
  initializeProductPage();
  initializeProductTabs();
  initializeFilters();

  populateFilters();

  renderFeaturedProducts();
  renderEquipmentLibrary();
  renderDocuments();

  updateProductCount();

  handleHashRoute();

  window.addEventListener("hashchange", handleHashRoute);

});


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function initializeNavigation() {

  $$(".nav-link").forEach(button => {

    button.addEventListener("click", () => {

      const target =
        button.dataset.page ||
        button.getAttribute("data-target");

      if (!target) return;

      showPage(target);

    });

  });


  const brand = $(".brand");

  if (brand) {
    brand.addEventListener("click", () => {
      showPage("home");
    });
  }


  $("[data-open-library]")?.addEventListener("click", () => {
    showPage("equipment");
  });


  $("[data-open-documents]")?.addEventListener("click", () => {
    showPage("documents");
  });

}


function showPage(pageName) {

  closeProduct();

  $$(".page-view").forEach(page => {
    page.classList.remove("active");
  });


  let target =
    document.querySelector(
      `[data-page-view="${pageName}"]`
    );


  if (!target) {

    const alternatives = {
      home: [
        "#homePage",
        "#home",
        ".home-page"
      ],

      equipment: [
        "#equipmentPage",
        "#libraryPage",
        "#equipment",
        ".library-page"
      ],

      documents: [
        "#documentsPage",
        "#documents",
        ".documents-page"
      ],

      systems: [
        "#systemsPage",
        "#fuelSystemsPage",
        ".systems-page"
      ]
    };


    const selectors =
      alternatives[pageName] || [];


    for (const selector of selectors) {

      target = $(selector);

      if (target) break;

    }

  }


  if (target) {
    target.classList.add("active");
  }


  $$(".nav-link").forEach(link => {

    const value =
      link.dataset.page ||
      link.getAttribute("data-target");

    link.classList.toggle(
      "active",
      value === pageName
    );

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

function renderFeaturedProducts() {

  const container =
    $("#featuredProducts") ||
    $(".featured-products");

  if (!container) return;


  let products =
    state.products.filter(
      product => product.featured
    );


  if (!products.length) {
    products = state.products.slice(0, 4);
  }


  container.innerHTML =
    products
      .slice(0, 4)
      .map((product, index) =>
        productCardHTML(product, index)
      )
      .join("");


  bindProductCards(container);

}


/* =========================================================
   EQUIPMENT LIBRARY
========================================================= */

function renderEquipmentLibrary() {

  const container =
    $("#equipmentGrid") ||
    $(".equipment-grid");

  if (!container) return;


  const products =
    filterProducts();


  state.filteredProducts = products;


  container.innerHTML =
    products
      .map((product, index) =>
        productCardHTML(product, index)
      )
      .join("");


  bindProductCards(container);


  const emptyState =
    $("#emptyState") ||
    $(".empty-state");


  if (emptyState) {
    emptyState.style.display =
      products.length
        ? "none"
        : "block";
  }


  updateProductCount(products.length);

}


/* =========================================================
   PRODUCT CARD TEMPLATE
========================================================= */

function productCardHTML(product, index = 0) {

  const image = safeImage(product);

  return `
    <article
      class="product-card"
      data-product-id="${escapeHTML(product.id)}"
      tabindex="0"
      role="button"
      aria-label="Open ${escapeHTML(product.name)}"
    >

      <div class="product-card-image">

        <span class="product-card-index">
          ${String(index + 1).padStart(2, "0")}
        </span>

        ${
          image
            ? `
              <img
                src="${escapeHTML(image)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
                onerror="this.style.display='none'"
              >
            `
            : `
              <div class="card-image-fallback">
                VEGA
              </div>
            `
        }

      </div>


      <div class="product-card-body">

        <span class="product-card-brand">
          ${escapeHTML(
            product.manufacturer || "VEGA"
          )}
        </span>

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <span class="product-card-model">
          ${escapeHTML(
            product.model || "Project Specific"
          )}
        </span>


        <div class="product-card-footer">

          <strong>
            ${escapeHTML(
              product.category || "Fuel Systems"
            )}
          </strong>

          <span>→</span>

        </div>

      </div>

    </article>
  `;

}


/* =========================================================
   PRODUCT CARD EVENTS
========================================================= */

function bindProductCards(container) {

  $$(".product-card", container)
    .forEach(card => {

      const open = () => {

        const id =
          card.dataset.productId;

        openProduct(id);

      };


      card.addEventListener(
        "click",
        open
      );


      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            open();

          }

        }
      );

    });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts() {

  const search =
    normalize(state.filters.search);

  const category =
    normalize(state.filters.category);

  const manufacturer =
    normalize(state.filters.manufacturer);


  return state.products.filter(product => {

    const searchableText = normalize([
      product.id,
      product.name,
      product.model,
      product.manufacturer,
      product.category,
      product.subcategory,
      product.description,
      ...Object.keys(
        safeSpecifications(product)
      ),
      ...Object.values(
        safeSpecifications(product)
      )
    ].join(" "));


    const searchMatch =
      !search ||
      searchableText.includes(search);


    const categoryMatch =
      category === "all" ||
      normalize(product.category) === category;


    const manufacturerMatch =
      manufacturer === "all" ||
      normalize(product.manufacturer) ===
        manufacturer;


    return (
      searchMatch &&
      categoryMatch &&
      manufacturerMatch
    );

  });

}


/* =========================================================
   FILTER CONTROLS
========================================================= */

function initializeFilters() {

  const searchInput =
    $("#librarySearch") ||
    $(".library-search input");


  const categorySelect =
    $("#categoryFilter");


  const manufacturerSelect =
    $("#manufacturerFilter");


  const resetButton =
    $("#resetFilters") ||
    $(".reset-filter");


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      event => {

        state.filters.search =
          event.target.value;

        renderEquipmentLibrary();

      }
    );

  }


  if (categorySelect) {

    categorySelect.addEventListener(
      "change",
      event => {

        state.filters.category =
          event.target.value;

        renderEquipmentLibrary();

      }
    );

  }


  if (manufacturerSelect) {

    manufacturerSelect.addEventListener(
      "change",
      event => {

        state.filters.manufacturer =
          event.target.value;

        renderEquipmentLibrary();

      }
    );

  }


  if (resetButton) {

    resetButton.addEventListener(
      "click",
      () => {

        state.filters = {
          search: "",
          category: "all",
          manufacturer: "all"
        };


        if (searchInput) {
          searchInput.value = "";
        }


        if (categorySelect) {
          categorySelect.value = "all";
        }


        if (manufacturerSelect) {
          manufacturerSelect.value = "all";
        }


        renderEquipmentLibrary();

      }
    );

  }

}


/* =========================================================
   POPULATE FILTER OPTIONS
========================================================= */

function populateFilters() {

  const categorySelect =
    $("#categoryFilter");


  const manufacturerSelect =
    $("#manufacturerFilter");


  const categories =
    unique(
      state.products.map(
        product => product.category
      )
    ).sort();


  const manufacturers =
    unique(
      state.products.map(
        product => product.manufacturer
      )
    ).sort();


  if (categorySelect) {

    categorySelect.innerHTML = `
      <option value="all">
        All Categories
      </option>

      ${categories.map(category => `
        <option value="${escapeHTML(category)}">
          ${escapeHTML(category)}
        </option>
      `).join("")}
    `;

  }


  if (manufacturerSelect) {

    manufacturerSelect.innerHTML = `
      <option value="all">
        All Manufacturers
      </option>

      ${manufacturers.map(manufacturer => `
        <option value="${escapeHTML(manufacturer)}">
          ${escapeHTML(manufacturer)}
        </option>
      `).join("")}
    `;

  }

}


/* =========================================================
   HERO SEARCH
========================================================= */

function initializeHeroSearch() {

  const input =
    $("#heroSearch") ||
    $(".hero-search input");


  const results =
    $("#searchResults") ||
    $(".search-results");


  if (!input) return;


  input.addEventListener(
    "input",
    event => {

      const query =
        normalize(event.target.value);


      if (!query) {

        if (results) {
          results.style.display = "none";
        }

        return;

      }


      const matches =
        searchProducts(query)
          .slice(0, 6);


      if (!results) return;


      if (!matches.length) {

        results.innerHTML = `
          <div
            style="
              padding:24px;
              font-size:11px;
              color:#777;
            "
          >
            No equipment found.
          </div>
        `;

        results.style.display = "block";

        return;

      }


      results.innerHTML =
        matches
          .map(product =>
            searchResultHTML(product)
          )
          .join("");


      results.style.display = "block";


      bindSearchResults(results);

    }
  );


  input.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Enter") {
        return;
      }


      const query =
        event.target.value.trim();


      if (!query) return;


      state.filters.search = query;

      const librarySearch =
        $("#librarySearch") ||
        $(".library-search input");


      if (librarySearch) {
        librarySearch.value = query;
      }


      showPage("equipment");

      renderEquipmentLibrary();


      if (results) {
        results.style.display = "none";
      }

    }
  );


  document.addEventListener(
    "click",
    event => {

      if (
        results &&
        !event.target.closest(
          ".hero-search-wrapper"
        )
      ) {

        results.style.display = "none";

      }

    }
  );

}


/* =========================================================
   SEARCH ENGINE
========================================================= */

function searchProducts(query) {

  const q = normalize(query);

  if (!q) return [];


  return state.products.filter(product => {

    const specifications =
      safeSpecifications(product);


    const text = normalize([
      product.id,
      product.name,
      product.model,
      product.manufacturer,
      product.category,
      product.subcategory,
      product.description,
      ...Object.keys(specifications),
      ...Object.values(specifications)
    ].join(" "));


    return text.includes(q);

  });

}


/* =========================================================
   SEARCH RESULT TEMPLATE
========================================================= */

function searchResultHTML(product) {

  return `
    <div
      class="command-result"
      data-search-product="${escapeHTML(product.id)}"
    >

      ${
        product.image
          ? `
            <img
              src="${escapeHTML(product.image)}"
              alt=""
              onerror="this.style.display='none'"
            >
          `
          : ""
      }

      <div>

        <strong>
          ${escapeHTML(product.name)}
        </strong>

        <span>
          ${escapeHTML(product.manufacturer || "")}
          ·
          ${escapeHTML(product.model || "")}
        </span>

      </div>

    </div>
  `;

}


function bindSearchResults(container) {

  $$("[data-search-product]", container)
    .forEach(item => {

      item.addEventListener(
        "click",
        () => {

          openProduct(
            item.dataset.searchProduct
          );

        }
      );

    });

}


/* =========================================================
   QUICK ACCESS
========================================================= */

function initializeQuickAccess() {

  $$(".hero-quick-search button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const category =
            button.dataset.category ||
            button.textContent.trim();


          state.filters.category =
            category;


          const categorySelect =
            $("#categoryFilter");


          if (categorySelect) {

            const option =
              [...categorySelect.options]
                .find(option =>
                  normalize(option.value) ===
                  normalize(category)
                );


            if (option) {
              categorySelect.value =
                option.value;

              state.filters.category =
                option.value;
            }

          }


          showPage("equipment");

          renderEquipmentLibrary();

        }
      );

    });

}


/* =========================================================
   OPEN PRODUCT DETAIL
========================================================= */

function initializeProductPage() {

  const backButton =
    $(".product-back") ||
    $("#productBack");


  if (backButton) {

    backButton.addEventListener(
      "click",
      closeProduct
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        $(".product-page.open")
      ) {

        closeProduct();

      }

    }
  );

}


function openProduct(productId) {

  const product =
    state.products.find(
      item =>
        String(item.id) ===
        String(productId)
    );


  if (!product) {

    showToast(
      "Product information not found."
    );

    return;

  }


  state.currentProduct = product;


  renderProductDetail(product);


  const page =
    $(".product-page") ||
    $("#productPage");


  if (!page) {

    console.warn(
      "Product page container was not found."
    );

    return;

  }


  page.classList.add("open");

  document.body.classList.add(
    "no-scroll"
  );


  window.location.hash =
    `product=${encodeURIComponent(product.id)}`;

}


/* =========================================================
   PRODUCT DETAIL RENDER
========================================================= */

function renderProductDetail(product) {

  setText(
    "#productCode",
    product.id
  );

  setText(
    "#productBrand",
    product.manufacturer || "VEGA"
  );

  setText(
    "#productName",
    product.name
  );

  setText(
    "#productModel",
    product.model || "Project Specific"
  );

  setText(
    "#productCategory",
    product.category || "Fuel Systems"
  );

  setText(
    "#productDescription",
    product.description ||
      "Technical information available through VEGA Engineering Solutions."
  );

  setText(
    "#productPrice",
    formatPrice(product)
  );


  const image =
    $("#productImage");


  if (image) {

    if (product.image) {

      image.src = product.image;

      image.alt = product.name;

      image.style.display = "block";

    } else {

      image.removeAttribute("src");

      image.style.display = "none";

    }

  }


  renderProductSpecifications(product);

  renderProductFeatures(product);

  renderProductDocuments(product);

  initializePrimaryDocumentButton(product);

}


/* =========================================================
   PRODUCT SPECIFICATIONS
========================================================= */

function renderProductSpecifications(product) {

  const container =
    $("#productSpecifications") ||
    $(".product-specifications");


  if (!container) return;


  const specifications =
    safeSpecifications(product);


  const entries =
    Object.entries(specifications);


  if (!entries.length) {

    container.innerHTML = `
      <div class="technical-row">
        <span>Technical Data</span>
        <strong>
          Contact VEGA Engineering
        </strong>
      </div>
    `;

    return;

  }


  container.innerHTML =
    entries
      .map(([label, value]) => `
        <div class="technical-row">

          <span>
            ${escapeHTML(label)}
          </span>

          <strong>
            ${escapeHTML(value)}
          </strong>

        </div>
      `)
      .join("");

}


/* =========================================================
   PRODUCT FEATURES
========================================================= */

function renderProductFeatures(product) {

  const container =
    $("#productFeatures") ||
    $(".product-features");


  if (!container) return;


  const specifications =
    Object.entries(
      safeSpecifications(product)
    );


  if (!specifications.length) {

    container.innerHTML = `
      <div class="feature-item">

        <span>01</span>

        <strong>
          Project Specific Configuration
        </strong>

      </div>
    `;

    return;

  }


  container.innerHTML =
    specifications
      .slice(0, 6)
      .map(([label, value], index) => `
        <div class="feature-item">

          <span>
            ${String(index + 1).padStart(2, "0")}
          </span>

          <strong>
            ${escapeHTML(label)}
          </strong>

          <small>
            ${escapeHTML(value)}
          </small>

        </div>
      `)
      .join("");

}


/* =========================================================
   PRODUCT DOCUMENTS
========================================================= */

function renderProductDocuments(product) {

  const container =
    $("#productDocuments") ||
    $(".product-documents");


  if (!container) return;


  const documents =
    safeDocuments(product);


  if (!documents.length) {

    container.innerHTML = `
      <div class="product-document-row">

        <span class="pdf-mark">
          DOC
        </span>

        <strong>
          No documents currently attached
        </strong>

      </div>
    `;

    return;

  }


  container.innerHTML =
    documents
      .map(document => `
        <div class="product-document-row">

          <span class="pdf-mark">
            ${escapeHTML(
              document.type || "PDF"
            )}
          </span>

          <strong>
            ${escapeHTML(document.name)}
          </strong>

          <button
            type="button"
            data-document-url="${escapeHTML(document.url || "")}"
          >
            OPEN ↗
          </button>

        </div>
      `)
      .join("");


  $$(
    "[data-document-url]",
    container
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const url =
          button.dataset.documentUrl;


        if (!url) {

          showToast(
            "Document is not available."
          );

          return;

        }


        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  });

}


/* =========================================================
   PRIMARY DATASHEET BUTTON
========================================================= */

function initializePrimaryDocumentButton(product) {

  const button =
    $("#primaryDocumentButton") ||
    $(".primary-document-button");


  if (!button) return;


  const documents =
    safeDocuments(product);


  const datasheet =
    documents.find(document =>
      normalize(document.name)
        .includes("datasheet")
    ) || documents[0];


  button.onclick = () => {

    if (
      !datasheet ||
      !datasheet.url
    ) {

      showToast(
        "Datasheet is not available."
      );

      return;

    }


    window.open(
      datasheet.url,
      "_blank",
      "noopener,noreferrer"
    );

  };

}


/* =========================================================
   CLOSE PRODUCT
========================================================= */

function closeProduct() {

  const page =
    $(".product-page") ||
    $("#productPage");


  if (page) {
    page.classList.remove("open");
  }


  document.body.classList.remove(
    "no-scroll"
  );


  state.currentProduct = null;


  if (
    window.location.hash
      .startsWith("#product=")
  ) {

    history.replaceState(
      null,
      "",
      window.location.pathname +
      window.location.search
    );

  }

}


/* =========================================================
   PRODUCT TABS
========================================================= */

function initializeProductTabs() {

  $$(".product-tabs button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const target =
            button.dataset.tab;


          $$(".product-tabs button")
            .forEach(tab =>
              tab.classList.remove("active")
            );


          button.classList.add("active");


          $$(".product-tab-content")
            .forEach(content =>
              content.classList.remove("active")
            );


          if (target) {

            const content =
              document.querySelector(
                `[data-tab-content="${target}"]`
              );


            if (content) {
              content.classList.add("active");
            }

          }

        }
      );

    });

}


/* =========================================================
   DOCUMENT CENTER
========================================================= */

function renderDocuments() {

  const container =
    $("#documentList") ||
    $(".document-list");


  if (!container) return;


  const documents = [];


  state.products.forEach(product => {

    safeDocuments(product)
      .forEach(document => {

        documents.push({
          ...document,
          productName: product.name,
          productModel: product.model,
          manufacturer: product.manufacturer
        });

      });

  });


  if (!documents.length) {

    container.innerHTML = `
      <div class="document-row">

        <div class="document-type">
          DOC
        </div>

        <div>
          <h4>
            No documents available
          </h4>

          <small>
            Upload technical documents to
            assets/documents
          </small>
        </div>

      </div>
    `;

    return;

  }


  container.innerHTML =
    documents
      .map(document => `
        <div class="document-row">

          <div class="document-type">
            ${escapeHTML(
              document.type || "PDF"
            )}
          </div>

          <div>

            <h4>
              ${escapeHTML(document.name)}
            </h4>

            <small>
              ${escapeHTML(document.productName)}
              ·
              ${escapeHTML(document.productModel || "")}
            </small>

          </div>

          <div>
            <small>
              ${escapeHTML(
                document.manufacturer || "VEGA"
              )}
            </small>
          </div>

          <button
            class="document-open"
            data-doc-open="${escapeHTML(document.url || "")}"
          >
            OPEN ↗
          </button>

        </div>
      `)
      .join("");


  $$("[data-doc-open]", container)
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const url =
            button.dataset.docOpen;


          if (!url) {

            showToast(
              "Document is not available."
            );

            return;

          }


          window.open(
            url,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

    });

}


/* =========================================================
   HEADER COMMAND SEARCH
========================================================= */

function initializeHeaderSearch() {

  const trigger =
    $(".header-search-button");


  const overlay =
    $(".command-overlay");


  const input =
    $(".command-search input");


  const results =
    $(".command-results");


  if (!overlay) return;


  if (trigger) {

    trigger.addEventListener(
      "click",
      openCommandSearch
    );

  }


  $(".command-search button")
    ?.addEventListener(
      "click",
      closeCommandSearch
    );


  overlay.addEventListener(
    "click",
    event => {

      if (event.target === overlay) {
        closeCommandSearch();
      }

    }
  );


  if (input) {

    input.addEventListener(
      "input",
      () => {

        const query =
          input.value;


        const matches =
          query.trim()
            ? searchProducts(query)
            : state.products.slice(0, 6);


        if (!results) return;


        results.innerHTML =
          matches
            .slice(0, 8)
            .map(product =>
              searchResultHTML(product)
            )
            .join("");


        bindSearchResults(results);

      }
    );

  }

}


function openCommandSearch() {

  const overlay =
    $(".command-overlay");


  if (!overlay) return;


  overlay.classList.add("open");


  const input =
    $(".command-search input");


  const results =
    $(".command-results");


  if (results) {

    results.innerHTML =
      state.products
        .slice(0, 6)
        .map(product =>
          searchResultHTML(product)
        )
        .join("");


    bindSearchResults(results);

  }


  setTimeout(() => {
    input?.focus();
  }, 50);

}


function closeCommandSearch() {

  $(".command-overlay")
    ?.classList.remove("open");

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts() {

  document.addEventListener(
    "keydown",
    event => {

      const isSearchShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k";


      if (isSearchShortcut) {

        event.preventDefault();

        openCommandSearch();

      }


      if (
        event.key === "Escape"
      ) {

        closeCommandSearch();

      }

    }
  );

}


/* =========================================================
   HASH ROUTING
========================================================= */

function handleHashRoute() {

  const hash =
    window.location.hash;


  if (
    hash.startsWith("#product=")
  ) {

    const id =
      decodeURIComponent(
        hash.replace("#product=", "")
      );


    if (id) {
      openProduct(id);
    }

  }

}


/* =========================================================
   PRODUCT COUNT
========================================================= */

function updateProductCount(
  count = state.products.length
) {

  const elements = [
    $("#productCount"),
    $("#libraryCount"),
    $("[data-product-count]")
  ].filter(Boolean);


  elements.forEach(element => {
    element.textContent = count;
  });

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(selector, value) {

  const element =
    $(selector);


  if (element) {
    element.textContent =
      value ?? "";
  }

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

  let toast =
    $(".toast");


  if (!toast) {

    toast =
      document.createElement("div");

    toast.className = "toast";

    document.body.appendChild(toast);

  }


  toast.textContent = message;

  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);

}


/* =========================================================
   GLOBAL ACCESS
   Useful for HTML buttons if required
========================================================= */

window.VegaFuelLibrary = {

  openProduct,

  closeProduct,

  showPage,

  searchProducts,

  renderEquipmentLibrary

};
