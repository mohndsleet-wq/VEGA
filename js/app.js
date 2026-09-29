/* =========================================================
   VEGA ENGINEERING SOLUTIONS
   FUEL SYSTEMS TECHNICAL LIBRARY
   APPLICATION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const products = Array.isArray(window.equipmentData)
        ? window.equipmentData
        : [];

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navLinks = document.querySelectorAll(".nav-link");
    const pageViews = document.querySelectorAll(".page-view");

    const homeButton = document.getElementById("homeButton");
    const exploreLibraryButton = document.getElementById("exploreLibraryButton");
    const viewAllEquipmentButton = document.getElementById("viewAllEquipmentButton");

    const featuredProducts = document.getElementById("featuredProducts");
    const equipmentGrid = document.getElementById("equipmentGrid");

    const heroProductCount = document.getElementById("heroProductCount");
    const libraryProductCount = document.getElementById("libraryProductCount");
    const filteredProductCount = document.getElementById("filteredProductCount");

    const heroSearch = document.getElementById("heroSearch");
    const heroSearchResults = document.getElementById("heroSearchResults");

    const librarySearch = document.getElementById("librarySearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const manufacturerFilter = document.getElementById("manufacturerFilter");
    const resetFilters = document.getElementById("resetFilters");
    const emptyState = document.getElementById("emptyState");

    const documentList = document.getElementById("documentList");

    const productPage = document.getElementById("productPage");
    const productBack = document.getElementById("productBack");

    const productCode = document.getElementById("productCode");
    const productImage = document.getElementById("productImage");
    const productImagePlaceholder = document.getElementById("productImagePlaceholder");
    const productBrand = document.getElementById("productBrand");
    const productCategory = document.getElementById("productCategory");
    const productName = document.getElementById("productName");
    const productModel = document.getElementById("productModel");
    const productDescription = document.getElementById("productDescription");
    const productPrice = document.getElementById("productPrice");

    const productFeatures = document.getElementById("productFeatures");
    const productSpecifications = document.getElementById("productSpecifications");
    const productDocuments = document.getElementById("productDocuments");

    const primaryDocumentButton = document.getElementById("primaryDocumentButton");
    const copyProductButton = document.getElementById("copyProductButton");

    const productTabs = document.querySelectorAll("[data-product-tab]");
    const productPanels = document.querySelectorAll("[data-product-panel]");

    const globalSearchButton = document.getElementById("globalSearchButton");
    const commandOverlay = document.getElementById("commandOverlay");
    const commandSearch = document.getElementById("commandSearch");
    const commandResults = document.getElementById("commandResults");
    const closeCommandButton = document.getElementById("closeCommandButton");

    const toast = document.getElementById("toast");

    let currentProduct = null;


    /* =====================================================
       HELPERS
    ===================================================== */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function normalise(value) {
        return String(value ?? "")
            .toLowerCase()
            .trim();
    }


    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    function formatCount(number) {
        return String(number).padStart(2, "0");
    }


    function openFile(path) {
        if (!path) {
            showToast("Document is not available yet.");
            return;
        }

        window.open(path, "_blank", "noopener,noreferrer");
    }


    function getSearchText(product) {

        const keywords = Array.isArray(product.keywords)
            ? product.keywords.join(" ")
            : "";

        return normalise(`
            ${product.id}
            ${product.name}
            ${product.shortName}
            ${product.category}
            ${product.manufacturer}
            ${product.model}
            ${keywords}
        `);
    }


    function searchProducts(query) {

        const q = normalise(query);

        if (!q) return products;

        return products.filter(product =>
            getSearchText(product).includes(q)
        );
    }


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function showPage(pageName) {

        pageViews.forEach(page => {
            page.classList.toggle(
                "active",
                page.dataset.pageView === pageName
            );
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.page === pageName
            );
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            showPage(link.dataset.page);
        });

    });


    homeButton?.addEventListener("click", () => {
        showPage("home");
    });


    exploreLibraryButton?.addEventListener("click", () => {
        showPage("equipment");
    });


    viewAllEquipmentButton?.addEventListener("click", () => {
        showPage("equipment");
    });


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function createProductCard(product, index) {

        const card = document.createElement("article");

        card.className = "product-card";
        card.tabIndex = 0;

        card.innerHTML = `
            <div class="product-card-image">

                <span class="product-card-index">
                    ${formatCount(index + 1)}
                </span>

                <img
                    src="${escapeHTML(product.image || "")}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                >

                <div class="product-image-fallback">
                    VEGA
                </div>

            </div>

            <div class="product-card-content">

                <span class="product-manufacturer">
                    ${escapeHTML(product.manufacturer || "VEGA")}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <span class="product-model-label">
                    ${escapeHTML(product.model || "Project Specific")}
                </span>

                <div class="product-card-footer">

                    <span>
                        ${escapeHTML(product.category || "Fuel Systems")}
                    </span>

                    <span>
                        ↗
                    </span>

                </div>

            </div>
        `;


        const image = card.querySelector("img");
        const fallback = card.querySelector(".product-image-fallback");

        if (fallback) {
            fallback.style.display = "none";
        }


        if (image) {

            image.addEventListener("error", () => {
                image.style.display = "none";

                if (fallback) {
                    fallback.style.display = "block";
                }
            });

            image.addEventListener("load", () => {
                image.style.display = "block";

                if (fallback) {
                    fallback.style.display = "none";
                }
            });

        }


        card.addEventListener("click", () => {
            openProduct(product.id);
        });


        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProduct(product.id);
            }

        });


        return card;
    }


    /* =====================================================
       FEATURED PRODUCTS
    ===================================================== */

    function renderFeaturedProducts() {

        if (!featuredProducts) return;

        featuredProducts.innerHTML = "";

        products
            .slice(0, 4)
            .forEach((product, index) => {

                featuredProducts.appendChild(
                    createProductCard(product, index)
                );

            });
    }


    /* =====================================================
       EQUIPMENT LIBRARY
    ===================================================== */

    function renderEquipment(list) {

        if (!equipmentGrid) return;

        equipmentGrid.innerHTML = "";

        if (filteredProductCount) {
            filteredProductCount.textContent = list.length;
        }


        if (emptyState) {
            emptyState.style.display =
                list.length ? "none" : "block";
        }


        list.forEach((product, index) => {

            equipmentGrid.appendChild(
                createProductCard(product, index)
            );

        });
    }


    /* =====================================================
       FILTER OPTIONS
    ===================================================== */

    function populateFilters() {

        if (categoryFilter) {

            const categories = [
                ...new Set(
                    products
                        .map(item => item.category)
                        .filter(Boolean)
                )
            ].sort();


            categories.forEach(category => {

                const option = document.createElement("option");

                option.value = category;
                option.textContent = category;

                categoryFilter.appendChild(option);

            });
        }


        if (manufacturerFilter) {

            const manufacturers = [
                ...new Set(
                    products
                        .map(item => item.manufacturer)
                        .filter(Boolean)
                )
            ].sort();


            manufacturers.forEach(manufacturer => {

                const option = document.createElement("option");

                option.value = manufacturer;
                option.textContent = manufacturer;

                manufacturerFilter.appendChild(option);

            });
        }
    }


    function applyFilters() {

        const query =
            normalise(librarySearch?.value);

        const category =
            categoryFilter?.value || "all";

        const manufacturer =
            manufacturerFilter?.value || "all";


        const filtered = products.filter(product => {

            const matchesSearch =
                !query ||
                getSearchText(product).includes(query);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            const matchesManufacturer =
                manufacturer === "all" ||
                product.manufacturer === manufacturer;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesManufacturer
            );
        });


        renderEquipment(filtered);
    }


    librarySearch?.addEventListener(
        "input",
        applyFilters
    );


    categoryFilter?.addEventListener(
        "change",
        applyFilters
    );


    manufacturerFilter?.addEventListener(
        "change",
        applyFilters
    );


    resetFilters?.addEventListener("click", () => {

        if (librarySearch) {
            librarySearch.value = "";
        }

        if (categoryFilter) {
            categoryFilter.value = "all";
        }

        if (manufacturerFilter) {
            manufacturerFilter.value = "all";
        }

        applyFilters();
    });


    /* =====================================================
       QUICK CATEGORY ACCESS
    ===================================================== */

    function openCategory(category) {

        showPage("equipment");

        if (categoryFilter) {
            categoryFilter.value = category;
        }

        if (librarySearch) {
            librarySearch.value = "";
        }

        applyFilters();
    }


    document
        .querySelectorAll("[data-quick-category]")
        .forEach(button => {

            button.addEventListener("click", () => {
                openCategory(
                    button.dataset.quickCategory
                );
            });

        });


    document
        .querySelectorAll("[data-category-card]")
        .forEach(button => {

            button.addEventListener("click", () => {
                openCategory(
                    button.dataset.categoryCard
                );
            });

        });


    /* =====================================================
       HERO SEARCH
    ===================================================== */

    function renderHeroSearchResults(list) {

        if (!heroSearchResults) return;

        heroSearchResults.innerHTML = "";


        if (!heroSearch?.value.trim()) {

            heroSearchResults.style.display = "none";
            return;
        }


        heroSearchResults.style.display = "block";


        if (!list.length) {

            heroSearchResults.innerHTML = `
                <div class="command-result">
                    <div>
                        <strong>No equipment found</strong>
                        <span>Try another search term.</span>
                    </div>
                </div>
            `;

            return;
        }


        list.slice(0, 6).forEach(product => {

            const result = createSearchResult(product);

            heroSearchResults.appendChild(result);

        });
    }


    heroSearch?.addEventListener("input", () => {

        const results =
            searchProducts(heroSearch.value);

        renderHeroSearchResults(results);

    });


    heroSearch?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                const results =
                    searchProducts(heroSearch.value);

                if (results.length === 1) {

                    openProduct(results[0].id);

                } else {

                    showPage("equipment");

                    if (librarySearch) {
                        librarySearch.value =
                            heroSearch.value;
                    }

                    applyFilters();

                    if (heroSearchResults) {
                        heroSearchResults.style.display =
                            "none";
                    }
                }
            }
        }
    );


    document.addEventListener("click", event => {

        if (
            heroSearchResults &&
            !event.target.closest(".hero-search-area")
        ) {
            heroSearchResults.style.display = "none";
        }

    });


    /* =====================================================
       PRODUCT DETAILS
    ===================================================== */

    function openProduct(productId) {

        const product =
            products.find(item =>
                item.id === productId
            );


        if (!product) return;


        currentProduct = product;


        if (productCode) {
            productCode.textContent =
                product.id || "FS-000";
        }


        if (productBrand) {
            productBrand.textContent =
                product.manufacturer || "VEGA";
        }


        if (productCategory) {
            productCategory.textContent =
                product.category || "Fuel Systems";
        }


        if (productName) {
            productName.textContent =
                product.name || "Product";
        }


        if (productModel) {
            productModel.textContent =
                product.model || "Project Specific";
        }


        if (productDescription) {
            productDescription.textContent =
                product.description || "";
        }


        if (productPrice) {
            productPrice.textContent =
                product.price || "Contact Sales";
        }


        /* IMAGE */

        if (productImage) {

            productImage.style.display = "block";

            productImage.src =
                product.image || "";

            productImage.alt =
                product.name || "VEGA Product";


            productImage.onerror = () => {

                productImage.style.display =
                    "none";

                if (productImagePlaceholder) {
                    productImagePlaceholder.style.display =
                        "block";
                }
            };


            productImage.onload = () => {

                productImage.style.display =
                    "block";

                if (productImagePlaceholder) {
                    productImagePlaceholder.style.display =
                        "none";
                }
            };
        }


        /* FEATURES */

        renderProductFeatures(product);


        /* TECHNICAL */

        renderProductSpecifications(product);


        /* DOCUMENTS */

        renderProductDocuments(product);


        /* RESET TAB */

        activateProductTab("overview");


        /* OPEN PAGE */

        productPage?.classList.add("open");

        productPage?.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("no-scroll");

        if (productPage) {
            productPage.scrollTop = 0;
        }
    }


    function closeProduct() {

        productPage?.classList.remove("open");

        productPage?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("no-scroll");

        currentProduct = null;
    }


    productBack?.addEventListener(
        "click",
        closeProduct
    );


    function renderProductFeatures(product) {

        if (!productFeatures) return;

        productFeatures.innerHTML = "";

        const features =
            Array.isArray(product.features)
                ? product.features
                : [];


        features.forEach((feature, index) => {

            const item =
                document.createElement("div");

            item.className =
                "feature-item";

            item.innerHTML = `
                <span>
                    ${formatCount(index + 1)}
                </span>

                <strong>
                    ${escapeHTML(feature.label)}
                </strong>

                <small>
                    ${escapeHTML(feature.value)}
                </small>
            `;

            productFeatures.appendChild(item);
        });
    }


    function renderProductSpecifications(product) {

        if (!productSpecifications) return;

        productSpecifications.innerHTML = "";

        const specs =
            product.specifications || {};


        Object.entries(specs)
            .forEach(([label, value]) => {

                const row =
                    document.createElement("div");

                row.className =
                    "technical-row";

                row.innerHTML = `
                    <span>
                        ${escapeHTML(label)}
                    </span>

                    <strong>
                        ${escapeHTML(value)}
                    </strong>
                `;

                productSpecifications.appendChild(row);
            });
    }


    function renderProductDocuments(product) {

        if (!productDocuments) return;

        productDocuments.innerHTML = "";

        const documents =
            Array.isArray(product.documents)
                ? product.documents
                : [];


        if (!documents.length) {

            productDocuments.innerHTML = `
                <div class="product-document-row">

                    <span class="pdf-mark">
                        —
                    </span>

                    <strong>
                        No documents available
                    </strong>

                    <span></span>

                </div>
            `;

            return;
        }


        documents.forEach(documentItem => {

            const row =
                document.createElement("div");

            row.className =
                "product-document-row";

            row.innerHTML = `
                <span class="pdf-mark">
                    ${escapeHTML(documentItem.type || "PDF")}
                </span>

                <strong>
                    ${escapeHTML(documentItem.name)}
                </strong>

                <button type="button">
                    OPEN ↗
                </button>
            `;


            row
                .querySelector("button")
                .addEventListener(
                    "click",
                    () => openFile(documentItem.file)
                );


            productDocuments.appendChild(row);
        });
    }


    primaryDocumentButton?.addEventListener(
        "click",
        () => {

            if (!currentProduct) return;

            const firstDocument =
                currentProduct.documents?.[0];

            if (!firstDocument) {
                showToast(
                    "Datasheet is not available yet."
                );
                return;
            }

            openFile(firstDocument.file);
        }
    );


    copyProductButton?.addEventListener(
        "click",
        async () => {

            if (!currentProduct) return;

            try {

                await navigator.clipboard.writeText(
                    currentProduct.id
                );

                showToast(
                    `${currentProduct.id} copied`
                );

            } catch {

                showToast(
                    currentProduct.id
                );
            }
        }
    );


    /* =====================================================
       PRODUCT TABS
    ===================================================== */

    function activateProductTab(tabName) {

        productTabs.forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.productTab === tabName
            );

        });


        productPanels.forEach(panel => {

            panel.classList.toggle(
                "active",
                panel.dataset.productPanel === tabName
            );

        });
    }


    productTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            activateProductTab(
                tab.dataset.productTab
            );

        });

    });


    /* =====================================================
       DOCUMENT CENTER
    ===================================================== */

    function renderDocumentCenter() {

        if (!documentList) return;

        documentList.innerHTML = "";


        products.forEach(product => {

            const docs =
                Array.isArray(product.documents)
                    ? product.documents
                    : [];


            docs.forEach(documentItem => {

                const row =
                    document.createElement("div");

                row.className =
                    "document-row";

                row.innerHTML = `
                    <span class="document-type">
                        ${escapeHTML(documentItem.type || "PDF")}
                    </span>

                    <div class="document-name">

                        <strong>
                            ${escapeHTML(documentItem.name)}
                        </strong>

                        <span>
                            ${escapeHTML(product.name)}
                        </span>

                    </div>

                    <span class="document-maker">
                        ${escapeHTML(product.manufacturer)}
                    </span>

                    <button
                        class="document-open"
                        type="button"
                    >
                        OPEN ↗
                    </button>
                `;


                row
                    .querySelector(".document-open")
                    .addEventListener(
                        "click",
                        () => openFile(documentItem.file)
                    );


                documentList.appendChild(row);
            });
        });
    }


    /* =====================================================
       GLOBAL COMMAND SEARCH
    ===================================================== */

    function createSearchResult(product) {

        const result =
            document.createElement("div");

        result.className =
            "command-result";


        result.innerHTML = `
            <img
                src="${escapeHTML(product.image || "")}"
                alt=""
            >

            <div>

                <strong>
                    ${escapeHTML(product.name)}
                </strong>

                <span>
                    ${escapeHTML(product.manufacturer)}
                    ·
                    ${escapeHTML(product.model)}
                </span>

            </div>
        `;


        const image =
            result.querySelector("img");


        image?.addEventListener(
            "error",
            () => {
                image.style.display = "none";
            }
        );


        result.addEventListener(
            "click",
            () => {

                closeCommandSearch();

                openProduct(product.id);
            }
        );


        return result;
    }


    function renderCommandResults(query = "") {

        if (!commandResults) return;

        commandResults.innerHTML = "";

        const results =
            query.trim()
                ? searchProducts(query)
                : products;


        if (!results.length) {

            commandResults.innerHTML = `
                <div class="command-result">
                    <div>
                        <strong>
                            No equipment found
                        </strong>

                        <span>
                            Try another keyword.
                        </span>
                    </div>
                </div>
            `;

            return;
        }


        results
            .slice(0, 8)
            .forEach(product => {

                commandResults.appendChild(
                    createSearchResult(product)
                );

            });
    }


    function openCommandSearch() {

        if (!commandOverlay) return;

        commandOverlay.classList.add("open");

        document.body.classList.add("no-scroll");

        if (commandSearch) {
            commandSearch.value = "";
        }

        renderCommandResults();

        setTimeout(() => {
            commandSearch?.focus();
        }, 50);
    }


    function closeCommandSearch() {

        commandOverlay?.classList.remove("open");

        if (!productPage?.classList.contains("open")) {
            document.body.classList.remove("no-scroll");
        }
    }


    globalSearchButton?.addEventListener(
        "click",
        openCommandSearch
    );


    closeCommandButton?.addEventListener(
        "click",
        closeCommandSearch
    );


    commandSearch?.addEventListener(
        "input",
        () => {

            renderCommandResults(
                commandSearch.value
            );

        }
    );


    commandOverlay?.addEventListener(
        "click",
        event => {

            if (event.target === commandOverlay) {
                closeCommandSearch();
            }

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /* CTRL + K */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openCommandSearch();

                return;
            }


            /* ESC */

            if (event.key === "Escape") {

                if (
                    commandOverlay?.classList.contains("open")
                ) {

                    closeCommandSearch();

                    return;
                }


                if (
                    productPage?.classList.contains("open")
                ) {

                    closeProduct();

                }
            }
        }
    );


    /* =====================================================
       COUNTERS
    ===================================================== */

    function updateCounters() {

        const count =
            formatCount(products.length);


        if (heroProductCount) {
            heroProductCount.textContent =
                `${count} PRODUCTS`;
        }


        if (libraryProductCount) {
            libraryProductCount.textContent =
                count;
        }


        if (filteredProductCount) {
            filteredProductCount.textContent =
                products.length;
        }
    }


    /* =====================================================
       INITIALIZE APPLICATION
    ===================================================== */

    function initialize() {

        updateCounters();

        populateFilters();

        renderFeaturedProducts();

        renderEquipment(products);

        renderDocumentCenter();

        renderCommandResults();

        console.log(
            `VEGA Fuel Systems Library loaded: ${products.length} products`
        );
    }


    initialize();

});
