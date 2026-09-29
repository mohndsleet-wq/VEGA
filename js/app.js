/* =========================================================
   VEGA FUEL SYSTEMS
   APPLICATION ENGINE
========================================================= */

"use strict";

const equipment = VEGA_EQUIPMENT;

const state = {
  search: "",
  category: "all",
  brand: "all",
  system: "all",
  viewMode: "grid"
};

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================================
   HELPERS
========================================================= */

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

function unique(key) {
  return [...new Set(
    equipment
      .map(item => item[key])
      .filter(Boolean)
  )].sort();
}

function productSearchText(product) {
  return normalize([
    product.id,
    product.name,
    product.brand,
    product.model,
    product.category,
    product.system,
    product.description,
    product.origin,
    ...(product.features || []),
    ...Object.entries(product.specifications || {})
      .flat()
  ].join(" "));
}

function getProduct(id) {
  return equipment.find(item => item.id === id);
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


/* =========================================================
   NAVIGATION
========================================================= */

function showView(name) {

  $$(".page-view").forEach(view => {
    view.classList.toggle(
      "active",
      view.dataset.view === name
    );
  });

  $$(".nav-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.nav === name
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   PRODUCT PLACEHOLDER
========================================================= */

function productVisual(product) {

  if (product.image) {
    return `
      <img
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >
    `;
  }

  return `
    <div style="
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:15px;
      color:#a2a4a7;
    ">
      <img
        src="assets/branding/vega-logo.png"
        alt=""
        style="
          width:105px;
          height:auto;
          opacity:.13;
        "
      >

      <span style="
        font-size:8px;
        letter-spacing:2px;
      ">
        PRODUCT IMAGE
      </span>
    </div>
  `;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  return `
    <article
      class="product-card"
      data-product-id="${escapeHTML(product.id)}"
      tabindex="0"
    >

      <div class="product-card-image">

        <span class="product-card-index">
          ${escapeHTML(product.id)}
        </span>

        ${productVisual(product)}

      </div>

      <div class="product-card-body">

        <span class="product-card-brand">
          ${escapeHTML(product.brand)}
        </span>

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <div class="product-card-model">
          ${escapeHTML(product.model)}
        </div>

        <div class="product-card-footer">

          <strong>
            ${escapeHTML(product.category)}
          </strong>

          <span>↗</span>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   FEATURED EQUIPMENT
========================================================= */

function renderFeatured() {

  const container = $("#featuredProducts");

  if (!container) return;

  let products =
    equipment.filter(item => item.featured);

  if (!products.length) {
    products = equipment.slice(0, 4);
  }

  container.innerHTML =
    products
      .slice(0, 4)
      .map(productCard)
      .join("");

  bindProductCards(container);
}


/* =========================================================
   FILTERS
========================================================= */

function fillSelect(selector, values, label) {

  const select = $(selector);

  if (!select) return;

  select.innerHTML = `
    <option value="all">
      ${label}
    </option>

    ${values.map(value => `
      <option value="${escapeHTML(value)}">
        ${escapeHTML(value)}
      </option>
    `).join("")}
  `;
}

function initializeFilters() {

  fillSelect(
    "#categoryFilter",
    unique("category"),
    "All Categories"
  );

  fillSelect(
    "#brandFilter",
    unique("brand"),
    "All Manufacturers"
  );

  fillSelect(
    "#systemFilter",
    unique("system"),
    "All Systems"
  );
}


/* =========================================================
   EQUIPMENT FILTERING
========================================================= */

function filteredEquipment() {

  const query = normalize(state.search);

  return equipment.filter(product => {

    const searchMatch =
      !query ||
      productSearchText(product).includes(query);

    const categoryMatch =
      state.category === "all" ||
      product.category === state.category;

    const brandMatch =
      state.brand === "all" ||
      product.brand === state.brand;

    const systemMatch =
      state.system === "all" ||
      product.system === state.system;

    return (
      searchMatch &&
      categoryMatch &&
      brandMatch &&
      systemMatch
    );
  });
}


/* =========================================================
   EQUIPMENT LIBRARY
========================================================= */

function renderLibrary() {

  const container = $("#equipmentGrid");

  if (!container) return;

  const products = filteredEquipment();

  $("#resultCount").textContent =
    products.length;

  const empty = $("#emptyState");

  if (!products.length) {

    container.innerHTML = "";
    empty.style.display = "block";

    return;
  }

  empty.style.display = "none";

  container.innerHTML =
    products.map(productCard).join("");

  bindProductCards(container);
}


/* =========================================================
   PRODUCT CARD EVENTS
========================================================= */

function bindProductCards(parent = document) {

  $$("[data-product-id]", parent)
    .forEach(card => {

      card.addEventListener("click", () => {
        openProduct(card.dataset.productId);
      });

      card.addEventListener("keydown", event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openProduct(card.dataset.productId);
        }

      });

    });
}


/* =========================================================
   OPEN PRODUCT
========================================================= */

function openProduct(id) {

  const product = getProduct(id);

  if (!product) return;

  $("#productCode").textContent =
    product.id;

  $("#productCategory").textContent =
    product.category;

  $("#productBrand").textContent =
    product.brand;

  $("#productName").textContent =
    product.name;

  $("#productDescription").textContent =
    product.description || "";

  $("#productModel").textContent =
    product.model || "—";

  $("#productOrigin").textContent =
    product.origin || "—";

  $("#productSystem").textContent =
    product.system || "—";

  $("#productPrice").textContent =
    product.price || "Price on Request";


  renderProductImages(product);
  renderProductFeatures(product);
  renderTechnicalData(product);
  renderProductDocuments(product);


  const datasheetButton =
    $("#productDatasheet");

  datasheetButton.onclick = () => {

    if (!product.datasheet) {
      showToast(
        "Datasheet has not been uploaded yet."
      );
      return;
    }

    window.open(
      product.datasheet,
      "_blank",
      "noopener,noreferrer"
    );
  };


  const page = $("#productPage");

  page.classList.add("open");
  page.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");

  activateProductTab("overview");

  page.scrollTop = 0;
}


/* =========================================================
   PRODUCT IMAGES
========================================================= */

function renderProductImages(product) {

  const mainImage =
    $("#productMainImage");

  const placeholder =
    $("#productImagePlaceholder");

  const thumbnails =
    $("#productThumbnails");

  const images = [
    product.image,
    ...(product.images || [])
  ].filter(Boolean);


  if (!images.length) {

    mainImage.style.display = "none";
    placeholder.style.display = "grid";
    thumbnails.innerHTML = "";

    return;
  }


  mainImage.style.display = "block";
  placeholder.style.display = "none";

  mainImage.src = images[0];
  mainImage.alt = product.name;


  thumbnails.innerHTML =
    images.map((image, index) => `

      <button
        class="product-thumb"
        data-product-image="${escapeHTML(image)}"
        style="
          width:76px;
          height:76px;
          background:white;
          border:${index === 0
            ? "1px solid #e30613"
            : "1px solid #ddd"};
          padding:6px;
        "
      >
        <img
          src="${escapeHTML(image)}"
          alt=""
          style="
            width:100%;
            height:100%;
            object-fit:contain;
          "
        >
      </button>

    `).join("");


  $$("[data-product-image]", thumbnails)
    .forEach(button => {

      button.addEventListener("click", () => {

        mainImage.src =
          button.dataset.productImage;

        $$("[data-product-image]", thumbnails)
          .forEach(item => {
            item.style.border =
              "1px solid #ddd";
          });

        button.style.border =
          "1px solid #e30613";
      });

    });
}


/* =========================================================
   FEATURES
========================================================= */

function renderProductFeatures(product) {

  const container =
    $("#productFeatures");

  const features =
    product.features || [];

  if (!features.length) {

    container.innerHTML = `
      <div class="feature-item">
        <strong>
          Technical information will be added.
        </strong>
      </div>
    `;

    return;
  }

  container.innerHTML =
    features.map((feature, index) => `

      <div class="feature-item">

        <span>
          ${String(index + 1).padStart(2, "0")}
        </span>

        <strong>
          ${escapeHTML(feature)}
        </strong>

      </div>

    `).join("");
}


/* =========================================================
   TECHNICAL DATA
========================================================= */

function renderTechnicalData(product) {

  const container =
    $("#technicalTable");

  const specs =
    product.specifications || {};

  const rows =
    Object.entries(specs);

  if (!rows.length) {

    container.innerHTML = `
      <p>
        Technical specifications
        have not been added yet.
      </p>
    `;

    return;
  }

  container.innerHTML =
    rows.map(([label, value]) => `

      <div class="technical-row">

        <span>
          ${escapeHTML(label)}
        </span>

        <strong>
          ${escapeHTML(value)}
        </strong>

      </div>

    `).join("");
}


/* =========================================================
   PRODUCT DOCUMENTS
========================================================= */

function renderProductDocuments(product) {

  const container =
    $("#productDocuments");

  let documents =
    product.documents || [];

  if (
    product.datasheet &&
    !documents.some(
      document =>
        document.url === product.datasheet
    )
  ) {
    documents = [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: product.datasheet
      },
      ...documents
    ];
  }


  if (!documents.length) {

    container.innerHTML = `
      <div class="product-document-row">

        <span class="pdf-mark">
          PDF
        </span>

        <strong>
          No documents uploaded yet
        </strong>

      </div>
    `;

    return;
  }


  container.innerHTML =
    documents.map(document => `

      <div class="product-document-row">

        <span class="pdf-mark">
          ${escapeHTML(document.type || "PDF")}
        </span>

        <strong>
          ${escapeHTML(document.name)}
        </strong>

        ${
          document.url
            ? `
              <button
                data-document-url="${escapeHTML(document.url)}"
              >
                OPEN ↗
              </button>
            `
            : `
              <button disabled>
                NOT UPLOADED
              </button>
            `
        }

      </div>

    `).join("");


  $$("[data-document-url]", container)
    .forEach(button => {

      button.addEventListener("click", () => {

        window.open(
          button.dataset.documentUrl,
          "_blank",
          "noopener,noreferrer"
        );

      });

    });
}


/* =========================================================
   CLOSE PRODUCT
========================================================= */

function closeProduct() {

  const page = $("#productPage");

  page.classList.remove("open");
  page.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");
}


/* =========================================================
   PRODUCT TABS
========================================================= */

function activateProductTab(name) {

  $$("[data-product-tab]")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.productTab === name
      );

    });


  $$("[data-product-panel]")
    .forEach(panel => {

      panel.classList.toggle(
        "active",
        panel.dataset.productPanel === name
      );

    });
}


/* =========================================================
   DOCUMENT CENTER
========================================================= */

function getDocuments() {

  const result = [];

  equipment.forEach(product => {

    const seen = new Set();

    if (product.datasheet) {

      result.push({
        product,
        name: "Technical Datasheet",
        type: "PDF",
        url: product.datasheet
      });

      seen.add(product.datasheet);
    }


    (product.documents || [])
      .forEach(document => {

        if (
          document.url &&
          !seen.has(document.url)
        ) {

          result.push({
            product,
            ...document
          });

          seen.add(document.url);
        }

      });

  });

  return result;
}


function renderDocuments(query = "") {

  const container =
    $("#documentList");

  if (!container) return;

  const search =
    normalize(query);

  const documents =
    getDocuments().filter(item => {

      if (!search) return true;

      return normalize(`
        ${item.product.name}
        ${item.product.brand}
        ${item.product.model}
        ${item.name}
        ${item.type}
      `).includes(search);

    });


  if (!documents.length) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:100px 20px;
        color:#888;
      ">
        No technical documents found.
      </div>
    `;

    return;
  }


  container.innerHTML =
    documents.map(item => `

      <div class="document-row">

        <div class="document-type">
          ${escapeHTML(item.type || "PDF")}
        </div>

        <div>
          <h4>
            ${escapeHTML(item.product.name)}
          </h4>

          <small>
            ${escapeHTML(item.name)}
          </small>
        </div>

        <div>
          ${escapeHTML(item.product.brand)}
        </div>

        <button
          class="document-open"
          data-document-url="${escapeHTML(item.url)}"
        >
          OPEN ↗
        </button>

      </div>

    `).join("");


  $$("[data-document-url]", container)
    .forEach(button => {

      button.addEventListener("click", () => {

        window.open(
          button.dataset.documentUrl,
          "_blank",
          "noopener,noreferrer"
        );

      });

    });
}


/* =========================================================
   SEARCH RESULTS
========================================================= */

function searchEquipment(query, limit = 8) {

  const search =
    normalize(query);

  if (!search) return [];

  return equipment
    .filter(product =>
      productSearchText(product)
        .includes(search)
    )
    .slice(0, limit);
}


function searchResultHTML(product) {

  return `
    <div
      class="command-result"
      data-search-result="${escapeHTML(product.id)}"
    >

      ${
        product.image
          ? `
            <img
              src="${escapeHTML(product.image)}"
              alt=""
            >
          `
          : `
            <img
              src="assets/branding/vega-logo.png"
              alt=""
              style="opacity:.18;"
            >
          `
      }

      <div>

        <strong>
          ${escapeHTML(product.name)}
        </strong>

        <span>
          ${escapeHTML(product.brand)}
          ·
          ${escapeHTML(product.model)}
        </span>

      </div>

    </div>
  `;
}


/* =========================================================
   HERO SEARCH
========================================================= */

function renderHeroSearch(query) {

  const container =
    $("#heroSearchResults");

  if (!query.trim()) {
    container.style.display = "none";
    container.innerHTML = "";
    return;
  }

  const results =
    searchEquipment(query, 6);

  container.style.display = "block";

  if (!results.length) {

    container.innerHTML = `
      <div style="
        padding:25px;
        color:#777;
        font-size:12px;
      ">
        No equipment found.
      </div>
    `;

    return;
  }

  container.innerHTML =
    results.map(searchResultHTML).join("");

  bindSearchResults(container);
}


/* =========================================================
   COMMAND SEARCH
========================================================= */

function openCommandSearch() {

  const overlay =
    $("#commandOverlay");

  overlay.classList.add("open");

  document.body.classList.add("no-scroll");

  setTimeout(() => {
    $("#commandSearch").focus();
  }, 100);
}


function closeCommandSearch() {

  $("#commandOverlay")
    .classList.remove("open");

  document.body.classList.remove("no-scroll");

  $("#commandSearch").value = "";

  $("#commandResults").innerHTML = "";
}


function renderCommandResults(query) {

  const container =
    $("#commandResults");

  if (!query.trim()) {

    const initial =
      equipment.slice(0, 6);

    container.innerHTML =
      initial.map(searchResultHTML).join("");

    bindSearchResults(container);

    return;
  }

  const results =
    searchEquipment(query);

  if (!results.length) {

    container.innerHTML = `
      <div style="
        padding:40px 24px;
        color:#888;
      ">
        No matching equipment found.
      </div>
    `;

    return;
  }

  container.innerHTML =
    results.map(searchResultHTML).join("");

  bindSearchResults(container);
}


function bindSearchResults(parent) {

  $$("[data-search-result]", parent)
    .forEach(result => {

      result.addEventListener("click", () => {

        const id =
          result.dataset.searchResult;

        closeCommandSearch();

        $("#heroSearchResults").style.display =
          "none";

        openProduct(id);

      });

    });
}


/* =========================================================
   SYSTEM NAVIGATION
========================================================= */

function openSystem(system) {

  state.search = "";
  state.category = "all";
  state.brand = "all";
  state.system = system;

  $("#librarySearch").value = "";
  $("#categoryFilter").value = "all";
  $("#brandFilter").value = "all";
  $("#systemFilter").value = system;

  showView("library");
  renderLibrary();
}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

  const documents =
    getDocuments();

  const brands =
    unique("brand");

  $("#heroEquipmentCount").textContent =
    String(equipment.length)
      .padStart(2, "0");

  $("#heroDocumentCount").textContent =
    String(documents.length)
      .padStart(2, "0");

  $("#heroBrandCount").textContent =
    String(brands.length)
      .padStart(2, "0");
}


/* =========================================================
   EVENTS
========================================================= */

function initializeEvents() {

  /* Main navigation */

  $$("[data-nav]").forEach(button => {

    button.addEventListener("click", () => {
      showView(button.dataset.nav);
    });

  });


  /* Home logo */

  $("#homeButton").addEventListener(
    "click",
    () => showView("home")
  );


  /* Data-go navigation */

  $$("[data-go]").forEach(button => {

    button.addEventListener("click", () => {
      showView(button.dataset.go);
    });

  });


  /* System cards */

  $$("[data-system-search]")
    .forEach(button => {

      button.addEventListener("click", () => {
        openSystem(
          button.dataset.systemSearch
        );
      });

    });


  /* Hero quick search */

  $$("[data-search]").forEach(button => {

    button.addEventListener("click", () => {

      state.search =
        button.dataset.search;

      $("#librarySearch").value =
        state.search;

      showView("library");

      renderLibrary();
    });

  });


  /* Hero search */

  $("#heroSearch").addEventListener(
    "input",
    event => {
      renderHeroSearch(event.target.value);
    }
  );


  $("#heroSearch").addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        event.target.value.trim()
      ) {

        state.search =
          event.target.value.trim();

        $("#librarySearch").value =
          state.search;

        $("#heroSearchResults").style.display =
          "none";

        showView("library");

        renderLibrary();
      }

    }
  );


  /* Library search */

  $("#librarySearch").addEventListener(
    "input",
    event => {

      state.search =
        event.target.value;

      renderLibrary();
    }
  );


  /* Filters */

  $("#categoryFilter").addEventListener(
    "change",
    event => {

      state.category =
        event.target.value;

      renderLibrary();
    }
  );


  $("#brandFilter").addEventListener(
    "change",
    event => {

      state.brand =
        event.target.value;

      renderLibrary();
    }
  );


  $("#systemFilter").addEventListener(
    "change",
    event => {

      state.system =
        event.target.value;

      renderLibrary();
    }
  );


  /* Reset */

  $("#resetFilters").addEventListener(
    "click",
    () => {

      state.search = "";
      state.category = "all";
      state.brand = "all";
      state.system = "all";

      $("#librarySearch").value = "";
      $("#categoryFilter").value = "all";
      $("#brandFilter").value = "all";
      $("#systemFilter").value = "all";

      renderLibrary();
    }
  );


  /* Product back */

  $("#productBack").addEventListener(
    "click",
    closeProduct
  );


  /* Product tabs */

  $$("[data-product-tab]")
    .forEach(button => {

      button.addEventListener("click", () => {

        activateProductTab(
          button.dataset.productTab
        );

      });

    });


  /* Document search */

  $("#documentSearch").addEventListener(
    "input",
    event => {
      renderDocuments(event.target.value);
    }
  );


  /* Command search */

  $("#openSearch").addEventListener(
    "click",
    () => {

      openCommandSearch();

      renderCommandResults("");
    }
  );


  $("#closeSearch").addEventListener(
    "click",
    closeCommandSearch
  );


  $("#commandSearch").addEventListener(
    "input",
    event => {
      renderCommandResults(
        event.target.value
      );
    }
  );


  $("#commandOverlay").addEventListener(
    "click",
    event => {

      if (
        event.target ===
        $("#commandOverlay")
      ) {
        closeCommandSearch();
      }

    }
  );


  /* Keyboard shortcuts */

  document.addEventListener(
    "keydown",
    event => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        openCommandSearch();

        renderCommandResults("");
      }


      if (event.key === "Escape") {

        if (
          $("#commandOverlay")
            .classList.contains("open")
        ) {

          closeCommandSearch();

        } else if (
          $("#productPage")
            .classList.contains("open")
        ) {

          closeProduct();
        }

      }

    }
  );
}


/* =========================================================
   START
========================================================= */

function initializeApplication() {

  initializeFilters();

  renderFeatured();

  renderLibrary();

  renderDocuments();

  updateStatistics();

  initializeEvents();

  console.log(
    `VEGA Fuel Systems Library loaded — ${equipment.length} equipment items`
  );
}


document.addEventListener(
  "DOMContentLoaded",
  initializeApplication
);
