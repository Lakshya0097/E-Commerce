const BASE_URL = "https://shoplane-api.onrender.com";
let allProducts = []; // Global cache for real-time search

async function loadProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        allProducts = await response.json();
        console.log("Fetched products:", allProducts);
        
        renderProducts(allProducts);
    } catch(error) {
        console.error("Error fetching products:", error);
        // Show offline alert inside containers
        let trendingList = document.getElementById("trending-products");
        if (trendingList) {
            trendingList.innerHTML = `
                <div class="col-12 text-center py-4 text-muted">
                    <i class="fas fa-wifi-slash fa-2x mb-2 text-danger"></i>
                    <p>Failed to load products. Please make sure the backend server is running on port 8080.</p>
                </div>
            `;
        }
    }
}

function renderProducts(productList) {
    let trendingList = document.getElementById("trending-products");
    let clothingList = document.getElementById("clothing-products");
    let electronicsList = document.getElementById("electronics-products");

    if (!trendingList || !clothingList || !electronicsList) return;

    trendingList.innerHTML = "";
    clothingList.innerHTML = "";
    electronicsList.innerHTML = "";

    let hasTrending = false, hasClothing = false, hasElectronics = false;

    productList.forEach((product) => {
        let productCard = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 shadow-sm" style="cursor: pointer;" onclick="openProductDetailModal(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.imageUrl}', '${product.description.replace(/'/g, "\\'")}', '${product.category}')">
                    <div style="overflow: hidden; border-top-left-radius: 15px; border-top-right-radius: 15px;">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body d-flex flex-column p-4">
                        <h5 class="card-title fw-bold text-white mb-2" style="font-size: 16px;">${product.name}</h5>
                        <p class="card-text text-muted mb-3 flex-grow-1" style="font-size: 13px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-secondary border-opacity-25">
                            <span class="price text-warning fs-5 fw-bold">₹${product.price}</span>
                            <button class="btn btn-sm btn-primary px-3 py-1 fw-semibold" style="border-radius: 8px;"
                            onclick="event.stopPropagation(); addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.imageUrl}')">
                            <i class="fas fa-shopping-cart me-1"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (product.category === "Clothing") {
            clothingList.innerHTML += productCard;
            hasClothing = true;
        } else if (product.category === "Electronics") {
            electronicsList.innerHTML += productCard;
            hasElectronics = true;
        } else {
            trendingList.innerHTML += productCard;
            hasTrending = true;
        }
    });

    // Handle empty views for search results
    if (!hasTrending && productList.length > 0) trendingList.innerHTML = '<div class="col-12 text-center py-4 text-muted">No trending products match.</div>';
    if (!hasClothing && productList.length > 0) clothingList.innerHTML = '<div class="col-12 text-center py-4 text-muted">No clothing products match.</div>';
    if (!hasElectronics && productList.length > 0) electronicsList.innerHTML = '<div class="col-12 text-center py-4 text-muted">No electronic gadgets match.</div>';
    
    if (productList.length === 0) {
        trendingList.innerHTML = '<div class="col-12 text-center py-5 text-muted"><i class="fas fa-search fa-2x mb-2"></i><p>No products match your search query.</p></div>';
    }
}

function handleSearch(query) {
    let filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filtered);
}

function openProductDetailModal(id, name, price, imageUrl, description, category) {
    let modalEl = document.getElementById("productDetailModal");
    if (!modalEl) {
        modalEl = document.createElement("div");
        modalEl.id = "productDetailModal";
        modalEl.className = "modal fade";
        modalEl.setAttribute("tabindex", "-1");
        modalEl.setAttribute("aria-hidden", "true");
        document.body.appendChild(modalEl);
    }
    
    // Deterministic rating based on product ID
    let ratingVal = ((id % 3) === 0) ? "4.8" : (((id % 2) === 0) ? "4.5" : "4.2");
    let starsHtml = "";
    let fullStars = Math.floor(parseFloat(ratingVal));
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star text-warning me-1"></i>';
        } else if (i === fullStars && parseFloat(ratingVal) % 1 !== 0) {
            starsHtml += '<i class="fas fa-star-half-alt text-warning me-1"></i>';
        } else {
            starsHtml += '<i class="far fa-star text-secondary me-1"></i>';
        }
    }
    
    // Size/Choice selections
    let optionsHtml = "";
    if (category === "Clothing") {
        optionsHtml = `
            <div class="mb-3">
                <label class="form-label text-muted" style="font-size: 13px;">Select Size</label>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1 active-option" onclick="selectOption(this)">S</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">M</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">L</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">XL</button>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label text-muted" style="font-size: 13px;">Select Color</label>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1 active-option" onclick="selectOption(this)">Midnight Black</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">Navy Blue</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">Heather Grey</button>
                </div>
            </div>
        `;
    } else if (category === "Electronics") {
        optionsHtml = `
            <div class="mb-4">
                <label class="form-label text-muted" style="font-size: 13px;">Storage / Options</label>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1 active-option" onclick="selectOption(this)">Standard</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">Pro Bundle (+₹1499)</button>
                </div>
            </div>
        `;
    } else {
        optionsHtml = `
            <div class="mb-4">
                <label class="form-label text-muted" style="font-size: 13px;">Color Choice</label>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1 active-option" onclick="selectOption(this)">Default Style</button>
                    <button class="btn btn-outline-secondary text-white btn-sm px-3 py-1" onclick="selectOption(this)">Premium Matte</button>
                </div>
            </div>
        `;
    }

    modalEl.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content text-white border-secondary shadow-lg" style="background-color: #1e1e1e; border-radius: 20px; overflow: hidden;">
                <div class="modal-header border-0 pb-0 position-absolute end-0 top-0" style="z-index: 10;">
                    <button type="button" class="btn-close btn-close-white bg-dark p-2 rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0">
                    <div class="row g-0">
                        <div class="col-md-6" style="background-color: #151515; display: flex; align-items: center; justify-content: center; min-height: 350px;">
                            <img src="${imageUrl}" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover; max-height: 450px;" alt="${name}">
                        </div>
                        <div class="col-md-6 p-4 d-flex flex-column justify-content-between">
                            <div>
                                <span class="badge bg-warning text-dark mb-2 fw-bold" style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">${category}</span>
                                <h3 class="fw-bold text-white mb-2" style="font-size: 22px;">${name}</h3>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex me-2">${starsHtml}</div>
                                    <span class="text-warning fw-semibold" style="font-size: 14px;">${ratingVal}</span>
                                    <span class="text-muted ms-2" style="font-size: 13px;">(120 reviews)</span>
                                </div>
                                <p class="text-muted mb-4" style="font-size: 13.5px; line-height: 1.6;">${description}</p>
                                <hr class="border-secondary my-3">
                                ${optionsHtml}
                            </div>
                            <div>
                                <div class="d-flex align-items-center justify-content-between mb-3 pt-2">
                                    <span class="text-muted" style="font-size: 13px;">Price:</span>
                                    <span class="fs-3 text-warning fw-bold">₹${price}</span>
                                </div>
                                <button class="btn btn-primary w-100 py-2.5 fw-semibold" style="font-size: 15px; border-radius: 10px;"
                                onclick="addToCart(${id}, '${name.replace(/'/g, "\\'")}', ${price}, '${imageUrl}'); bootstrap.Modal.getInstance(document.getElementById('productDetailModal')).hide();">
                                    <i class="fas fa-shopping-cart me-2"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    let bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
}

function selectOption(btn) {
    let siblings = btn.parentElement.children;
    for (let sib of siblings) {
        sib.classList.remove("active-option", "btn-warning", "text-dark");
        sib.classList.add("btn-outline-secondary", "text-white");
    }
    btn.classList.add("active-option", "btn-warning", "text-dark");
    btn.classList.remove("btn-outline-secondary", "text-white");
}
