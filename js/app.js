/* ============================================================
   VEGA ENGINEERING SOLUTIONS
   FUEL SYSTEM TECHNICAL LIBRARY
   Application Engine
   ============================================================ */

"use strict";

/* ============================================================
   01. STATE
   ============================================================ */

const state = {
  search: "",
  category: "all",
  brand: "all",
  system: "all",
  favorites: JSON.parse(localStorage.getItem("vega-favorites") || "[]"),
  selectedProduct: null,
  viewMode: "grid"
};


/* ============================================================
   02. HELPERS
   ============================================================ */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));


function safeText(value, fallback = "N/A") {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return String(value);
}


function formatPrice(product) {
  if (!product.price || Number(product.price) <= 0) {
    return "Price on Request";
  }

  return `${Number(product.price).toLocaleString()} ${product.currency || "SAR"}`;
}


function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}


function uniqueValues(key) {
  return [
    ...new Set(
      EQUIPMENT_DATA
        .map(item => item[key])
        .filter(Boolean)
    )
  ].sort();
}


function isFavorite(id) {
  return state.favorites.includes(id);
}


function saveFavorites() {
  localStorage.setItem(
    "vega-favorites",
    JSON.stringify(state.favorites)
  );
}


function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("active");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("active");
  }, 2200);
}


/* ============================================================
   03. PRODUCT SEARCH INDEX
   ============================================================ */

function searchableText(product) {

  const specs = product.specifications
    ? Object.entries(product.specifications)
        .map(([key, value]) => `${key} ${value}`)
        .join(" ")
    : "";

  const features = (product.features || []).join(" ");
  const tags = (product.tags || []).join(" ");

  return normalize(`
    ${product.id}
    ${product.name}
    ${product.shortName}
    ${product.brand}
    ${product.model}
    ${product.category}
    ${product.system}
    ${product.description}
    ${product.origin}
    ${specs}
    ${features}
    ${tags}
  `);
}


/* ============================================================
   04. FILTERING
   ============================================================ */

function getFilteredProducts() {

  const query = normalize(state.search);

  return EQUIPMENT_DATA.filter(product => {

    const matchesSearch =
      !query ||
      searchableText(product).includes(query);

    const matchesCategory =
      state.category === "all" ||
      product.category === state.category;

    const matchesBrand =
      state.brand === "all" ||
      product.brand === state.brand;

    const matchesSystem =
      state.system === "all" ||
      product.system === state.system;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesSystem
    );

  });
}


/* ============================================================
   05. PRODUCT IMAGE
   ============================================================ */

function productImageHTML(product) {

  if (product.image) {
    return `
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.style.display='none';
        this.nextElementSibling.style.display='flex';"
      >

      <div
        class="card-image-placeholder"
        style="display:none"
      >
        <span>VEGA</span>
        <strong>FUEL SYSTEM</strong>
      </div>
    `;
  }

  return `
    <div class="card-image-placeholder">
      <span>VEGA</span>
      <strong>FUEL SYSTEM</strong>
    </div>
  `;
}


/* ============================================================
   06. EQUIPMENT CARD
   ============================================================ */

function createEquipmentCard(product) {

  const favorite = isFavorite(product.id);

  return `
    <article
      class="equipment-card"
      data-product="${product.id}"
      tabindex="0"
      role="button"
      aria-label="Open ${product.name}"
    >

      <div class="equipment-image">

        <span class="equipment-category">
          ${safeText(product.category)}
        </span>

        <button
          class="favorite-card ${favorite ? "active" : ""}"
          data-favorite="${product.id}"
          aria-label="Add to favorites"
          title="Favorite"
        >
          ${favorite ? "♥" : "♡"}
        </button>

        ${productImageHTML(product)}

      </div>


      <div class="equipment-body">

        <div class="equipment-brand">
          ${safeText(product.brand)}
        </div>

        <h3>
          ${safeText(product.name)}
        </h3>

        <p class="equipment-subtitle">
          ${safeText(product.description)}
        </p>


        <div class="equipment-meta">

          <div>
            <span>MODEL</span>
            <strong>
              ${safeText(product.model)}
            </strong>
          </div>

          <div>
            <span>ORIGIN</span>
            <strong>
              ${safeText(product.origin)}
            </strong>
          </div>

        </div>


        <div class="equipment-footer">

          <div class="equipment-price">
            <small>PRICE</small>
            <strong>
              ${formatPrice(product)}
            </strong>
          </div>

          <button
            class="open-equipment"
            data-open-product="${product.id}"
          >
            VIEW DETAILS →
          </button>

        </div>

      </div>

    </article>
  `;
}


/* ============================================================
   07. RENDER EQUIPMENT
   ============================================================ */

function renderEquipment() {

  const grid = $("#equipmentGrid");

  if (!grid) return;

  const products = getFilteredProducts();

  grid.innerHTML = products
    .map(createEquipmentCard)
    .join("");

  const count = $("#resultCount");

  if (count) {
    count.textContent = products.length;
  }

  const empty = $("#emptyState");

  if (empty) {
    empty.classList.toggle(
      "active",
      products.length === 0
    );
  }

  grid.style.display =
    products.length === 0
      ? "none"
      : "grid";

  bindProductCards();
}


/* ============================================================
   08. HOME PRODUCT PREVIEW
   ============================================================ */

function renderHomePreview() {

  const container = $("#homeEquipmentPreview");

  if (!container) return;

  const products = EQUIPMENT_DATA.slice(0, 4);

  container.innerHTML = products
    .map(createEquipmentCard)
    .join("");

  bindProductCards();
}


/* ============================================================
   09. FILTER OPTIONS
   ============================================================ */

function fillSelect(
  selector,
  values,
  defaultLabel
) {

  const select = $(selector);

  if (!select) return;

  select.innerHTML = `
    <option value="all">
      ${defaultLabel}
    </option>

    ${values.map(value => `
      <option value="${value}">
        ${value}
      </option>
    `).join("")}
  `;
}


function initializeFilters() {

  fillSelect(
    "#categoryFilter",
    uniqueValues("category"),
    "All Categories"
  );

  fillSelect(
    "#brandFilter",
    uniqueValues("brand"),
    "All Brands"
  );

  fillSelect(
    "#systemFilter",
    uniqueValues("system"),
    "All Systems"
  );
}


/* ============================================================
   10. GLOBAL SEARCH
   ============================================================ */

function renderGlobalSearchResults(query) {

  const container = $("#globalSearchResults");

  if (!container) return;

  const cleanQuery = normalize(query);

  if (!cleanQuery) {
    container.innerHTML = "";
    container.classList.remove("active");
    return;
  }

  const results = EQUIPMENT_DATA
    .filter(product =>
      searchableText(product).includes(cleanQuery)
    )
    .slice(0, 6);

  if (!results.length) {

    container.innerHTML = `
      <div
        style="
          padding:22px;
          text-align:center;
          color:#999;
          font-size:10px;
        "
      >
        No equipment found
      </div>
    `;

    container.classList.add("active");

    return;
  }

  container.innerHTML = results.map(product => `

    <button
      class="search-result-item"
      data-search-product="${product.id}"
    >

      <div class="search-result-image">
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<span style="font-size:8px;font-weight:800;color:#ed1c24;">VEGA</span>`
        }
      </div>


      <div class="search-result-info">

        <strong>
          ${product.name}
        </strong>

        <span>
          ${product.brand}
          •
          ${product.model}
          •
          ${product.category}
        </span>

      </div>

      <div class="search-result-arrow">
        →
      </div>

    </button>

  `).join("");

  container.classList.add("active");


  $$("[data-search-product]", container)
    .forEach(button => {

      button.addEventListener("click", () => {

        const product = EQUIPMENT_DATA.find(
          item =>
            item.id === button.dataset.searchProduct
        );

        if (product) {
          openProduct(product);
        }

        container.classList.remove("active");

      });

    });

}


/* ============================================================
   11. OPEN PRODUCT
   ============================================================ */

function openProduct(product) {

  state.selectedProduct = product;

  const overlay = $("#productOverlay");

  if (!overlay) return;


  /* Basic Information */

  setText("#productCategory", product.category);
  setText("#productBrand", product.brand);
  setText("#productName", product.name);
  setText("#productTitle", product.description);

  setText("#productPrice", formatPrice(product));
  setText("#productModel", product.model);
  setText("#productOrigin", product.origin);
  setText("#productSystem", product.system);

  setText(
    "#productAvailability",
    product.status || "Available"
  );


  /* Main Image */

  renderProductGallery(product);


  /* Description */

  const description = $("#productDescription");

  if (description) {
    description.textContent =
      product.description || "No description available.";
  }


  /* Features */

  const featureList = $("#productFeatures");

  if (featureList) {

    featureList.innerHTML =
      (product.features || [])
        .map(feature => `
          <div class="feature-item">
            ${feature}
          </div>
        `)
        .join("");

  }


  /* Technical Data */

  renderTechnicalData(product);


  /* Documents */

  renderProductDocuments(product);


  /* Product Images */

  renderProductImages(product);


  /* Favorite */

  const favoriteButton = $("#favoriteProduct");

  if (favoriteButton) {

    favoriteButton.classList.toggle(
      "active",
      isFavorite(product.id)
    );

    favoriteButton.textContent =
      isFavorite(product.id)
        ? "♥"
        : "♡";

  }


  /* Datasheet */

  const datasheetButton = $("#productDatasheet");

  if (datasheetButton) {

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

  }


  overlay.classList.add("active");

  document.body.style.overflow = "hidden";

  activateProductTab("overview");

}


/* ============================================================
   12. SET TEXT SAFELY
   ============================================================ */

function setText(selector, value) {

  const element = $(selector);

  if (element) {
    element.textContent = safeText(value);
  }

}


/* ============================================================
   13. PRODUCT GALLERY
   ============================================================ */

function getProductImages(product) {

  const images = [];

  if (product.image) {
    images.push(product.image);
  }

  if (Array.isArray(product.images)) {

    product.images.forEach(image => {

      if (
        image &&
        !images.includes(image)
      ) {
        images.push(image);
      }

    });

  }

  return images;
}


function renderProductGallery(product) {

  const stageImage = $("#productMainImage");
  const placeholder = $("#productImagePlaceholder");
  const thumbnails = $("#productThumbnails");

  const images = getProductImages(product);

  if (!stageImage || !placeholder) return;


  if (!images.length) {

    stageImage.style.display = "none";
    placeholder.style.display = "flex";

    if (thumbnails) {
      thumbnails.innerHTML = "";
    }

    return;
  }


  placeholder.style.display = "none";

  stageImage.src = images[0];
  stageImage.alt = product.name;
  stageImage.style.display = "block";


  if (thumbnails) {

    thumbnails.innerHTML =
      images.map((image, index) => `

        <button
          class="product-thumbnail ${index === 0 ? "active" : ""}"
          data-image="${image}"
        >
          <img
            src="${image}"
            alt="${product.name}"
          >
        </button>

      `).join("");


    $$(".product-thumbnail", thumbnails)
      .forEach(button => {

        button.addEventListener("click", () => {

          stageImage.src =
            button.dataset.image;

          $$(".product-thumbnail", thumbnails)
            .forEach(item =>
              item.classList.remove("active")
            );

          button.classList.add("active");

        });

      });

  }

}


/* ============================================================
   14. TECHNICAL DATA
   ============================================================ */

function renderTechnicalData(product) {

  const container = $("#technicalTable");

  if (!container) return;

  const specs = product.specifications || {};

  container.innerHTML =
    Object.entries(specs)
      .map(([key, value]) => `

        <div class="technical-row">

          <span>
            ${key}
          </span>

          <strong>
            ${safeText(value)}
          </strong>

        </div>

      `)
      .join("");

}


/* ============================================================
   15. PRODUCT DOCUMENTS
   ============================================================ */

function renderProductDocuments(product) {

  const container = $("#productDocuments");

  if (!container) return;

  if (!product.datasheet) {

    container.innerHTML = `

      <div class="product-document">

        <div class="product-document-icon">
          PDF
        </div>

        <div>
          <strong>
            Product Datasheet
          </strong>

          <span>
            Datasheet not uploaded yet
          </span>
        </div>

        <button disabled>
          NOT AVAILABLE
        </button>

      </div>

    `;

    return;
  }


  container.innerHTML = `

    <div class="product-document">

      <div class="product-document-icon">
        PDF
      </div>

      <div>
        <strong>
          ${product.name} — Technical Datasheet
        </strong>

        <span>
          Manufacturer technical document
        </span>
      </div>

      <button
        data-document="${product.datasheet}"
      >
        OPEN PDF
      </button>

    </div>

  `;


  $$("[data-document]", container)
    .forEach(button => {

      button.addEventListener("click", () => {

        window.open(
          button.dataset.document,
          "_blank",
          "noopener,noreferrer"
        );

      });

    });

}


/* ============================================================
   16. PRODUCT IMAGES TAB
   ============================================================ */

function renderProductImages(product) {

  const container = $("#productImageGrid");

  if (!container) return;

  const images = getProductImages(product);

  if (!images.length) {

    container.innerHTML = `

      <div
        style="
          grid-column:1/-1;
          padding:60px;
          text-align:center;
          color:#999;
          font-size:10px;
        "
      >
        Product images have not been uploaded yet.
      </div>

    `;

    return;
  }


  container.innerHTML =
    images.map(image => `

      <div class="product-image-grid-item">

        <img
          src="${image}"
          alt="${product.name}"
        >

      </div>

    `).join("");

}


/* ============================================================
   17. CLOSE PRODUCT
   ============================================================ */

function closeProduct() {

  const overlay = $("#productOverlay");

  if (!overlay) return;

  overlay.classList.remove("active");

  document.body.style.overflow = "";

  state.selectedProduct = null;

}


/* ============================================================
   18. FAVORITES
   ============================================================ */

function toggleFavorite(id) {

  if (isFavorite(id)) {

    state.favorites =
      state.favorites.filter(
        favoriteId => favoriteId !== id
      );

    showToast("Removed from favorites");

  } else {

    state.favorites.push(id);

    showToast("Added to favorites");

  }

  saveFavorites();

  updateFavoriteCount();

  renderEquipment();

  renderHomePreview();


  if (
    state.selectedProduct &&
    state.selectedProduct.id === id
  ) {

    const button = $("#favoriteProduct");

    if (button) {

      button.classList.toggle(
        "active",
        isFavorite(id)
      );

      button.textContent =
        isFavorite(id)
          ? "♥"
          : "♡";

    }

  }

}


function updateFavoriteCount() {

  const counter = $("#favoriteCount");

  if (counter) {
    counter.textContent =
      state.favorites.length;
  }

}


/* ============================================================
   19. BIND PRODUCT CARDS
   ============================================================ */

function bindProductCards() {

  $$("[data-product]").forEach(card => {

    card.addEventListener("click", event => {

      if (
        event.target.closest("[data-favorite]") ||
        event.target.closest("[data-open-product]")
      ) {
        return;
      }

      const product = EQUIPMENT_DATA.find(
        item =>
          item.id === card.dataset.product
      );

      if (product) {
        openProduct(product);
      }

    });


    card.addEventListener("keydown", event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        const product = EQUIPMENT_DATA.find(
          item =>
            item.id === card.dataset.product
        );

        if (product) {
          openProduct(product);
        }

      }

    });

  });


  $$("[data-open-product]").forEach(button => {

    button.addEventListener("click", event => {

      event.stopPropagation();

      const product = EQUIPMENT_DATA.find(
        item =>
          item.id === button.dataset.openProduct
      );

      if (product) {
        openProduct(product);
      }

    });

  });


  $$("[data-favorite]").forEach(button => {

    button.addEventListener("click", event => {

      event.stopPropagation();

      toggleFavorite(
        button.dataset.favorite
      );

    });

  });

}


/* ============================================================
   20. VIEWS / NAVIGATION
   ============================================================ */

function showView(viewName) {

  $$(".view").forEach(view => {
    view.classList.remove("active");
  });

  const target =
    $(`[data-view="${viewName}"]`);

  if (target) {
    target.classList.add("active");
  }


  $$("[data-nav]").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.nav === viewName
    );

  });


  const pageName = $("#currentPage");

  if (pageName) {

    const names = {
      home: "Fuel System Hub",
      library: "Equipment Library",
      documents: "Document Center"
    };

    pageName.textContent =
      names[viewName] || "Fuel System Hub";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  const sidebar = $("#sidebar");

  if (sidebar) {
    sidebar.classList.remove("mobile-open");
  }

}


/* ============================================================
   21. PRODUCT TABS
   ============================================================ */

function activateProductTab(tabName) {

  $$(".product-tab")
    .forEach(tab => {

      tab.classList.toggle(
        "active",
        tab.dataset.tab === tabName
      );

    });


  $$(".product-tab-panel")
    .forEach(panel => {

      panel.classList.toggle(
        "active",
        panel.dataset.panel === tabName
      );

    });

}


/* ============================================================
   22. DOCUMENT CENTER
   ============================================================ */

function renderDocumentCenter(
  query = ""
) {

  const container = $("#documentList");

  if (!container) return;

  const search = normalize(query);

  const documents =
    EQUIPMENT_DATA
      .filter(product => product.datasheet)
      .filter(product => {

        if (!search) return true;

        return searchableText(product)
          .includes(search);

      });


  if (!documents.length) {

    container.innerHTML = `

      <div
        style="
          padding:60px;
          text-align:center;
          color:#999;
          font-size:10px;
        "
      >
        No documents found.
      </div>

    `;

    return;
  }


  container.innerHTML =
    documents.map(product => `

      <div class="document-row">

        <div class="document-type">
          PDF
        </div>

        <div class="document-name">

          <strong>
            ${product.name}
          </strong>

          <span>
            Technical Datasheet
          </span>

        </div>

        <span>
          ${product.brand}
        </span>

        <span>
          ${product.category}
        </span>

        <button
          class="document-open"
          data-document="${product.datasheet}"
        >
          OPEN
        </button>

      </div>

    `).join("");


  $$("[data-document]", container)
    .forEach(button => {

      button.addEventListener("click", () => {

        window.open(
          button.dataset.document,
          "_blank",
          "noopener,noreferrer"
        );

      });

    });

}


/* ============================================================
   23. DATABASE STATISTICS
   ============================================================ */

function updateStatistics() {

  const totalEquipment =
    EQUIPMENT_DATA.length;

  const totalBrands =
    uniqueValues("brand").length;

  const totalCategories =
    uniqueValues("category").length;

  const totalDatasheets =
    EQUIPMENT_DATA.filter(
      item => item.datasheet
    ).length;


  setText(
    "#totalEquipment",
    totalEquipment
  );

  setText(
    "#totalBrands",
    totalBrands
  );

  setText(
    "#totalCategories",
    totalCategories
  );

  setText(
    "#totalDatasheets",
    totalDatasheets
  );

  setText(
    "#databaseTotal",
    totalEquipment
  );

}


/* ============================================================
   24. COPY TECHNICAL DATA
   ============================================================ */

function copyTechnicalData() {

  const product =
    state.selectedProduct;

  if (!product) return;

  const specs =
    product.specifications || {};

  const text = [
    `Equipment: ${product.name}`,
    `Brand: ${product.brand}`,
    `Model: ${product.model}`,
    `Category: ${product.category}`,
    "",
    ...Object.entries(specs)
      .map(
        ([key, value]) =>
          `${key}: ${value}`
      )
  ].join("\n");


  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(
        "Technical data copied"
      );
    })
    .catch(() => {
      showToast(
        "Unable to copy data"
      );
    });

}


/* ============================================================
   25. EVENTS
   ============================================================ */

function initializeEvents() {

  /* Navigation */

  $$("[data-nav]").forEach(button => {

    button.addEventListener("click", () => {

      showView(
        button.dataset.nav
      );

    });

  });


  /* Quick Cards */

  $$("[data-go]").forEach(button => {

    button.addEventListener("click", () => {

      const destination =
        button.dataset.go;

      if (
        destination === "library" ||
        destination === "documents" ||
        destination === "home"
      ) {

        showView(destination);

        return;
      }


      showView("library");

      state.system = destination;

      const systemFilter =
        $("#systemFilter");

      if (systemFilter) {
        systemFilter.value =
          destination;
      }

      renderEquipment();

    });

  });


  /* Global Search */

  const globalSearch =
    $("#globalSearch");

  if (globalSearch) {

    globalSearch.addEventListener(
      "input",
      event => {

        renderGlobalSearchResults(
          event.target.value
        );

      }
    );


    globalSearch.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" &&
          globalSearch.value.trim()
        ) {

          state.search =
            globalSearch.value.trim();

          const librarySearch =
            $("#librarySearch");

          if (librarySearch) {
            librarySearch.value =
              state.search;
          }

          showView("library");

          renderEquipment();

          const results =
            $("#globalSearchResults");

          if (results) {
            results.classList.remove(
              "active"
            );
          }

        }

      }
    );

  }


  /* Library Search */

  const librarySearch =
    $("#librarySearch");

  if (librarySearch) {

    librarySearch.addEventListener(
      "input",
      event => {

        state.search =
          event.target.value;

        renderEquipment();

      }
    );

  }


  /* Filters */

  const categoryFilter =
    $("#categoryFilter");

  if (categoryFilter) {

    categoryFilter.addEventListener(
      "change",
      event => {

        state.category =
          event.target.value;

        renderEquipment();

      }
    );

  }


  const brandFilter =
    $("#brandFilter");

  if (brandFilter) {

    brandFilter.addEventListener(
      "change",
      event => {

        state.brand =
          event.target.value;

        renderEquipment();

      }
    );

  }


  const systemFilter =
    $("#systemFilter");

  if (systemFilter) {

    systemFilter.addEventListener(
      "change",
      event => {

        state.system =
          event.target.value;

        renderEquipment();

      }
    );

  }


  /* Reset Filters */

  const reset =
    $("#resetFilters");

  if (reset) {

    reset.addEventListener(
      "click",
      () => {

        state.search = "";
        state.category = "all";
        state.brand = "all";
        state.system = "all";

        if ($("#librarySearch")) {
          $("#librarySearch").value = "";
        }

        if ($("#categoryFilter")) {
          $("#categoryFilter").value = "all";
        }

        if ($("#brandFilter")) {
          $("#brandFilter").value = "all";
        }

        if ($("#systemFilter")) {
          $("#systemFilter").value = "all";
        }

        renderEquipment();

      }
    );

  }


  /* View Modes */

  $$("[data-view-mode]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const mode =
            button.dataset.viewMode;

          state.viewMode = mode;

          $$("[data-view-mode]")
            .forEach(item =>
              item.classList.remove(
                "active"
              )
            );

          button.classList.add(
            "active"
          );

          const grid =
            $("#equipmentGrid");

          if (grid) {

            grid.classList.toggle(
              "list-mode",
              mode === "list"
            );

          }

        }
      );

    });


  /* Product Close */

  const closeProductButton =
    $("#closeProduct");

  if (closeProductButton) {
    closeProductButton.addEventListener(
      "click",
      closeProduct
    );
  }


  const closeProductX =
    $("#closeProductX");

  if (closeProductX) {
    closeProductX.addEventListener(
      "click",
      closeProduct
    );
  }


  const overlay =
    $("#productOverlay");

  if (overlay) {

    overlay.addEventListener(
      "click",
      event => {

        if (
          event.target === overlay
        ) {
          closeProduct();
        }

      }
    );

  }


  /* ESC */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeProduct();

        const results =
          $("#globalSearchResults");

        if (results) {
          results.classList.remove(
            "active"
          );
        }

      }

    }
  );


  /* Product Favorite */

  const favoriteProduct =
    $("#favoriteProduct");

  if (favoriteProduct) {

    favoriteProduct.addEventListener(
      "click",
      () => {

        if (
          state.selectedProduct
        ) {

          toggleFavorite(
            state.selectedProduct.id
          );

        }

      }
    );

  }


  /* Product Tabs */

  $$(".product-tab")
    .forEach(tab => {

      tab.addEventListener(
        "click",
        () => {

          activateProductTab(
            tab.dataset.tab
          );

        }
      );

    });


  /* Copy Technical Data */

  const copyButton =
    $("#copyTechnicalData");

  if (copyButton) {

    copyButton.addEventListener(
      "click",
      copyTechnicalData
    );

  }


  /* Document Search */

  const documentSearch =
    $("#documentSearch");

  if (documentSearch) {

    documentSearch.addEventListener(
      "input",
      event => {

        renderDocumentCenter(
          event.target.value
        );

      }
    );

  }


  /* Mobile Menu */

  const mobileMenu =
    $("#mobileMenu");

  if (mobileMenu) {

    mobileMenu.addEventListener(
      "click",
      () => {

        const sidebar =
          $("#sidebar");

        if (sidebar) {

          sidebar.classList.toggle(
            "mobile-open"
          );

        }

      }
    );

  }


  /* Click outside global search */

  document.addEventListener(
    "click",
    event => {

      if (
        !event.target.closest(
          ".global-search"
        )
      ) {

        const results =
          $("#globalSearchResults");

        if (results) {
          results.classList.remove(
            "active"
          );
        }

      }

    }
  );

}


/* ============================================================
   26. START APPLICATION
   ============================================================ */

function initializeApplication() {

  console.log(
    "%cVEGA Fuel System Technical Library",
    "color:#ed1c24;font-size:16px;font-weight:bold;"
  );

  console.log(
    `Database loaded: ${EQUIPMENT_DATA.length} equipment items`
  );


  initializeFilters();

  updateStatistics();

  updateFavoriteCount();

  renderHomePreview();

  renderEquipment();

  renderDocumentCenter();

  initializeEvents();

}


/* ============================================================
   27. INITIALIZE
   ============================================================ */

document.addEventListener(
  "DOMContentLoaded",
  initializeApplication
);
