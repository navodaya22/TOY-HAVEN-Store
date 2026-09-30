const toyProducts = [
    {
        "id": "p1",
        "name": "Cyberpunk Hero Model",
        "category": "Figurines",
        "price": 49.99,
        "image": "images/1.jpg"
    },
    {
        "id": "p2",
        "name": "1:18 GT Sports Coupe",
        "category": "Diecast Cars",
        "price": 64.50,
        "image": "images/2.jpg"
    },
    {
        "id": "p3",
        "name": "Galactic Settlers",
        "category": "Board Games",
        "price": 39.99,
        "image": "images/3.jpg"
    },
    {
        "id": "p4",
        "name": "Vintage Wooden Train",
        "category": "Toys",
        "price": 24.00,
        "image": "images/4.jpg"
    },
    {
        "id": "p5",
        "name": "Mystery Mansion",
        "category": "Board Games",
        "price": 34.50,
        "image": "images/5.jpg"
    },
    {
        "id": "p6",
        "name": "Anime Warrior Figure",
        "category": "Figurines",
        "price": 55.00,
        "image": "images/6.jpg"
    },
    {
        "id": "p7",
        "name": "Classic Wood Yo-Yo",
        "category": "Toys",
        "price": 8.50,
        "image": "images/7.jpg"
    },
    {
        "id": "p8",
        "name": "1:24 Vintage Racer",
        "category": "Diecast Cars",
        "price": 45.00,
        "image": "images/8.jpg"
    },
    {
        "id": "p9",
        "name": "Fantasy Quest",
        "category": "Board Games",
        "price": 42.00,
        "image": "images/9.jpg"
    },
    {
        "id": "p10",
        "name": "Sci-Fi Mech",
        "category": "Figurines",
        "price": 59.99,
        "image": "images/10.jpg"
    },
    {
        "id": "p11",
        "name": "RC Off-Road Buggy",
        "category": "Toys",
        "price": 89.99,
        "image": "images/11.jpg"
    },
    {
        "id": "p12",
        "name": "1:32 Muscle Car",
        "category": "Diecast Cars",
        "price": 29.99,
        "image": "images/12.jpg"
    }
];

function displayProducts(categoryFilter = 'All') {
    const container = document.getElementById('product-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filtered = categoryFilter === 'All' 
        ? toyProducts 
        : toyProducts.filter(p => p.category === categoryFilter);
        
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cssText = 'background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 15px; width: 240px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: center;';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
            <h3 style="font-size: 16px; margin-bottom: 5px; color: #1E293B;">${product.name}</h3>
            <p style="color: #475569; font-size: 14px; margin-bottom: 5px;">${product.category}</p>
            <p style="font-weight: bold; color: #10B981; margin-bottom: 10px; font-size: 16px;">$${product.price.toFixed(2)}</p>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px;">
                <div style="display: flex; gap: 6px;">
                    <button type="button" class="add-to-cart-btn" style="flex: 1; background: #10B981; color: white; border: none; padding: 8px 6px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;">Add to Cart</button>
                    <button type="button" class="buy-now-btn" style="flex: 1; background: #0F172A; color: white; border: none; padding: 8px 6px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;">Buy Now</button>
                </div>
                <button type="button" class="add-to-wishlist-btn" style="background: #F1F5F9; color: #475569; border: 1px solid #CBD5E1; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 13px;">⭐ Add to Wishlist</button>
            </div>
        `;
        
        card.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            if (typeof addToCart === 'function') {
                addToCart(product);
            }
        });

        card.querySelector('.buy-now-btn').addEventListener('click', function() {
            if (typeof buyNow === 'function') {
                buyNow(product);
            }
        });

        card.querySelector('.add-to-wishlist-btn').addEventListener('click', function() {
            if (typeof addToWishlist === 'function') {
                addToWishlist(product);
            }
        });

        container.appendChild(card);
    });
}

displayProducts('All');