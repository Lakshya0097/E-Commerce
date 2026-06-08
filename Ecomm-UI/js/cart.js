const CART_BASE_URL = "https://shoplane-api.onrender.com";

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let totalAmount = 0;
    
    if (cartItems) {
        cartItems.innerHTML = "";
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        if (cartItems) {
            cartItems.innerHTML += `
                <tr>
                    <td><img src="${item.imageUrl}" width="50" style="object-fit: cover; border-radius: 5px; height: 50px;"></td>
                    <td>${item.name}</td>
                    <td>₹ ${item.price}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary text-white px-2 py-0" onclick="changeQuantity(${index},-1)">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary text-white px-2 py-0" onclick="changeQuantity(${index},1)">+</button>
                    </td>
                    <td>₹ ${itemTotal}</td>
                    <td><button class="btn btn-danger btn-sm px-2 py-1" onclick="changeQuantity(${index}, -999)"><i class="fas fa-trash"></i></button></td>
                </tr>
            `;
        }
    });

    let totalAmountEl = document.getElementById("total-amount");
    if (totalAmountEl) {
        totalAmountEl.innerText = totalAmount;
    }
}

function addToCart(id, name, price, imageUrl) {
    console.log("Adding product to cart:", id, name, price, imageUrl);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    price = parseFloat(price);
    let itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: 1
        });      
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    
    // Custom non-intrusive toast notification
    showToast(`${name} added to cart successfully!`, 'success');
}

function updateCartCounter() {
    let badge = document.querySelector(".cart-badge");
    if (badge) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        badge.innerText = cart.length;
    }
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (change === -999) {
        let name = cart[index].name;
        cart.splice(index, 1);
        showToast(`${name} removed from cart.`, 'success');
    } else {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            let name = cart[index].name;
            cart.splice(index, 1);
            showToast(`${name} removed from cart.`, 'success');
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCounter();
}

// Checkout integration
async function checkout() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        showToast("Please log in to complete your purchase.", 'danger');
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        showToast("Your shopping cart is empty.", 'danger');
        return;
    }

    let productQuantities = {};
    let totalAmount = 0;
    cart.forEach(item => {
        productQuantities[item.id] = item.quantity;
        totalAmount += item.price * item.quantity;
    });

    try {
        const response = await fetch(`${CART_BASE_URL}/orders/place/${currentUser.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productQuantities: productQuantities,
                totalAmount: totalAmount
            })
        });

        if (!response.ok) {
            throw new Error("Failed to place order");
        }

        const orderResult = await response.json();
        showToast(`Order placed successfully! Order ID: #${orderResult.id}`, 'success');
        
        // Clear the cart
        localStorage.removeItem("cart");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } catch (error) {
        console.error("Checkout error:", error);
        showToast("Failed to place order. Please make sure the server is running.", 'danger');
    }
}

// Auth state navbar modifier
function updateNavbarAuth() {
    let navbarNav = document.querySelector(".navbar-nav");
    if (!navbarNav) return;
    
    let authItem = document.getElementById("auth-nav-item");
    if (authItem) {
        authItem.remove();
    }
    
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let li = document.createElement("li");
    li.id = "auth-nav-item";
    
    if (currentUser) {
        li.className = "nav-item dropdown ms-lg-3 mt-2 mt-lg-0";
        li.innerHTML = `
            <a class="nav-link dropdown-toggle text-warning fw-semibold px-2" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user-circle me-1"></i> Hello, ${currentUser.name}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow border-secondary mt-2" aria-labelledby="userDropdown" style="border-radius: 10px;">
                <li><a class="dropdown-item py-2" href="#" onclick="openOrdersModal(event)"><i class="fas fa-list-alt me-2 text-warning"></i>My Orders</a></li>
                <li><hr class="dropdown-divider bg-secondary"></li>
                <li><a class="dropdown-item text-danger py-2" href="#" onclick="logoutUser(event)"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
            </ul>
        `;
    } else {
        li.className = "nav-item d-flex align-items-center ms-lg-3 mt-2 mt-lg-0";
        li.innerHTML = `
            <a class="nav-link btn btn-sm btn-primary text-white px-3 py-1 ms-2" href="login.html" style="border-radius: 8px;">Login</a>
        `;
    }
    navbarNav.appendChild(li);
}

function logoutUser(event) {
    if (event) event.preventDefault();
    localStorage.removeItem("currentUser");
    updateNavbarAuth();
    showToast("Logged out successfully.", 'success');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Dynamic Custom Toast Notification
function showToast(message, type = 'success') {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "position-fixed bottom-0 end-0 p-3";
        container.style.zIndex = "1100";
        document.body.appendChild(container);
    }
    
    let toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0 show mb-2 shadow-lg`;
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    toast.style.borderRadius = "10px";
    toast.innerHTML = `
        <div class="d-flex p-2">
            <div class="toast-body fw-semibold d-flex align-items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Dynamic Order History Modal
async function openOrdersModal(event) {
    if (event) event.preventDefault();
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;
    
    let modalEl = document.getElementById("ordersModal");
    if (!modalEl) {
        modalEl = document.createElement("div");
        modalEl.id = "ordersModal";
        modalEl.className = "modal fade";
        modalEl.setAttribute("tabindex", "-1");
        modalEl.setAttribute("aria-hidden", "true");
        modalEl.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content text-white border-secondary" style="background-color: #1e1e1e; border-radius: 15px;">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-warning fw-bold"><i class="fas fa-shopping-bag me-2"></i>My Order History</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="orders-modal-body" style="max-height: 450px; overflow-y: auto;">
                        <div class="text-center py-4">
                            <div class="spinner-border text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);
    }
    
    let bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
    
    let modalBody = document.getElementById("orders-modal-body");
    
    try {
        const response = await fetch(`${CART_BASE_URL}/orders/user/${currentUser.id}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        
        const orders = await response.json();
        
        if (orders.length === 0) {
            modalBody.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-folder-open fa-3x text-secondary mb-3"></i>
                    <p class="text-secondary fw-semibold">You have not placed any orders yet.</p>
                </div>
            `;
            return;
        }
        
        let ordersHtml = "";
        orders.forEach(order => {
            let itemsHtml = "";
            order.orderItems.forEach(item => {
                itemsHtml += `
                    <div class="d-flex justify-content-between align-items-center py-1 border-bottom border-secondary border-opacity-25" style="font-size: 14px;">
                        <span class="text-white-50">${item.productName} <strong class="text-warning">x${item.quantity}</strong></span>
                        <span class="fw-semibold">₹${item.price * item.quantity}</span>
                    </div>
                `;
            });
            
            let statusBadgeClass = "bg-warning text-dark";
            if (order.status.toLowerCase() === "completed" || order.status.toLowerCase() === "delivered") {
                statusBadgeClass = "bg-success text-white";
            } else if (order.status.toLowerCase() === "cancelled") {
                statusBadgeClass = "bg-danger text-white";
            }
            
            let formattedDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            ordersHtml += `
                <div class="card bg-dark bg-opacity-50 border-secondary mb-3 shadow-sm" style="border-radius: 10px;">
                    <div class="card-header border-secondary d-flex justify-content-between align-items-center py-2" style="background-color: rgba(255,255,255,0.03);">
                        <div>
                            <span class="text-muted" style="font-size: 12px;">Order ID:</span>
                            <span class="text-warning fw-bold" style="font-size: 13px;">#${order.id}</span>
                        </div>
                        <span class="badge ${statusBadgeClass} px-2 py-1" style="font-size: 11px;">${order.status}</span>
                    </div>
                    <div class="card-body py-2">
                        <div class="mb-2 text-muted" style="font-size: 12px;">Placed on: ${formattedDate}</div>
                        <div class="order-items-container">
                            ${itemsHtml}
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary fw-bold">
                            <span class="text-warning">Total Amount:</span>
                            <span class="fs-5 text-white">₹${order.totalAmount}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        modalBody.innerHTML = ordersHtml;
    } catch (error) {
        console.error("Fetch orders error:", error);
        modalBody.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Failed to load orders. Please make sure the server is running.
            </div>
        `;
    }
}

// Init execution
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartCounter();
    updateNavbarAuth();
});