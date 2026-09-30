function getCart() {
    let cart = localStorage.getItem("toyCart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("toyCart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = getCart();
    let totalCount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCount += cart[i].quantity;
    }
    let countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.innerText = totalCount;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// --- ASSIGNMENT-COMPLIANT WISHLIST LOGIC ---
function getWishlist() {
    let wishlist = localStorage.getItem("toyWishlist");
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("toyWishlist", JSON.stringify(wishlist));
}

function addToWishlist(product) {
    let wishlist = getWishlist();
    let exists = wishlist.some(item => item.id === product.id);
    
    if (!exists) {
        wishlist.push({ ...product, status: "Interested" });
        saveWishlist(wishlist);
        alert(product.name + " added to your wishlist!");
    } else {
        alert(product.name + " is already in your wishlist!");
    }
}

function updateWishlistStatus(id, newStatus) {
    let wishlist = getWishlist();
    wishlist = wishlist.map(item => {
        if (item.id === id) {
            item.status = newStatus;
        }
        return item;
    });
    saveWishlist(wishlist);
    renderWishlistPage();
}

function removeFromWishlist(id) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist(wishlist);
    renderWishlistPage();
}

function renderWishlistPage() {
    let container = document.getElementById("wishlist-items-container") || document.getElementById("wishlist-container");
    if (!container) return;

    let wishlist = getWishlist();
    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your wishlist is currently empty.</p>";
        return;
    }

    container.innerHTML = "";
    wishlist.forEach(item => {
        let itemRow = document.createElement("div");
        itemRow.className = "wishlist-item-row";
        itemRow.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 15px; margin-bottom: 10px;";
        
        itemRow.innerHTML = `
            <div>
                <h3 style="margin-bottom: 4px;">${item.name}</h3>
                <p style="color: #475569; font-size: 14px; margin-bottom: 4px;">Category: ${item.category}</p>
                <p style="font-weight: bold; color: #10B981; margin-bottom: 8px;">$${item.price.toFixed(2)}</p>
                <label style="font-size: 13px; font-weight: bold; color: #334155;">Status: </label>
                <select class="status-select" data-id="${item.id}" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #CBD5E1; font-size: 13px;">
                    <option value="Interested" ${item.status === "Interested" ? "selected" : ""}>Interested</option>
                    <option value="Owned" ${item.status === "Owned" ? "selected" : ""}>Owned</option>
                    <option value="Not Interested" ${item.status === "Not Interested" ? "selected" : ""}>Not Interested</option>
                </select>
            </div>
            <div style="display: flex; gap: 10px;">
                <button type="button" class="move-to-cart-btn" style="background: #10B981; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 13px;">Move to Cart</button>
                <button type="button" class="remove-wishlist-btn" style="background: #EF4444; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 13px;">Remove</button>
            </div>
        `;

        itemRow.querySelector(".status-select").addEventListener("change", function(e) {
            updateWishlistStatus(item.id, e.target.value);
        });

        itemRow.querySelector(".move-to-cart-btn").addEventListener("click", function() {
            addToCart(item);
            removeFromWishlist(item.id);
        });

        itemRow.querySelector(".remove-wishlist-btn").addEventListener("click", function() {
            removeFromWishlist(item.id);
        });

        container.appendChild(itemRow);
    });
}

if (document.getElementById("wishlist-items-container") || document.getElementById("wishlist-container")) {
    renderWishlistPage();
}
// ----------------------------------------------------

const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function() {
        let email = document.getElementById("newsletterEmail").value;
        if (email !== "") {
            localStorage.setItem("subscriberEmail", email);
            document.getElementById("newsletterMessage").innerHTML = "Thank you! <b>" + email + "</b> has been subscribed.";
            document.getElementById("newsletterEmail").value = "";
        } else {
            document.getElementById("newsletterMessage").innerHTML = "<span style='color: red;'>Please enter a valid email address.</span>";
        }
    });
}

const shopNowBtn = document.getElementById("shopNowBtn");
if (shopNowBtn) {
    shopNowBtn.addEventListener("click", function() {
        window.location.href = "products.html";
    });
}

function addToCart(product) {
    let cart = getCart();
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            cart[i].quantity += 1;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    saveCart(cart);
    alert(product.name + " added to cart!");
}

function buyNow(product) {
    let cart = getCart();
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            cart[i].quantity += 1;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    saveCart(cart);
    window.location.href = "checkout.html";
}

function renderCartPage() {
    let cartContainer = document.getElementById("cart-items-container");
    let summarySection = document.getElementById("cart-summary-section");
    if (!cartContainer) return;

    let cart = getCart();
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is currently empty.</p>";
        if (summarySection) summarySection.style.display = "none";
        return;
    }

    cartContainer.innerHTML = "";
    let totalAmount = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let subtotal = item.price * item.quantity;
        totalAmount += subtotal;

        let itemRow = document.createElement("div");
        itemRow.className = "cart-item-row";
        itemRow.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p style="color: #475569; font-size: 14px;">Unit Price: $${item.price.toFixed(2)}</p>
                <p style="font-weight: bold; margin-top: 4px;">Subtotal: $${subtotal.toFixed(2)}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <button type="button" class="decrease-btn" style="padding: 4px 10px; background: #E2E8F0; color: #1E293B;">-</button>
                <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                <button type="button" class="increase-btn" style="padding: 4px 10px; background: #E2E8F0; color: #1E293B;">+</button>
                <button type="button" class="remove-btn" style="background-color: #EF4444; padding: 6px 12px; font-size: 14px;">Remove</button>
            </div>
        `;

        itemRow.querySelector(".decrease-btn").addEventListener("click", function() {
            updateQuantity(item.id, -1);
        });
        itemRow.querySelector(".increase-btn").addEventListener("click", function() {
            updateQuantity(item.id, 1);
        });
        itemRow.querySelector(".remove-btn").addEventListener("click", function() {
            removeFromCart(item.id);
        });

        cartContainer.appendChild(itemRow);
    }

    if (summarySection) {
        summarySection.style.display = "block";
        document.getElementById("cart-total").innerText = totalAmount.toFixed(2);
    }
}

function updateQuantity(id, change) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += change;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart(cart);
    renderCartPage();
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartPage();
}

const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function() {
        localStorage.removeItem("toyCart");
        updateCartCount();
        renderCartPage();
    });
}

if (document.getElementById("cart-items-container")) {
    renderCartPage();
}

const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("fullName").value;
        document.getElementById("checkoutMessage").innerHTML = "Thank you, " + name + "! Order Placed Successfully.";
        document.getElementById("checkoutMessage").style.color = "#10B981";
        localStorage.removeItem("toyCart");
        updateCartCount();
        checkoutForm.reset();
    });
}

const supportForm = document.getElementById("supportForm");
if (supportForm) {
    supportForm.addEventListener("submit", function(event) {
        event.preventDefault();
        document.getElementById("supportConfirmation").innerHTML = "Thank you! Feedback saved successfully.";
        document.getElementById("supportConfirmation").style.color = "#10B981";
        supportForm.reset();
    });
}