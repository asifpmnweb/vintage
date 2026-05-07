// Application State
const state = {
    cart: [],
    theme: 'light',
    currentView: 'home',
    currentCategory: 'all',
    currentProduct: null,
    selectedSize: null,
    heroInterval: null,
    isUserLoggedIn: localStorage.getItem('isUserLoggedIn') === 'true'
};

// Default categories (can be managed from admin)
const defaultCategories = [
    { name: 'Suits', slug: 'suits', image: 'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?w=800&auto=format&fit=crop' },
    { name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop' },
    { name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1614252339460-e1b18c734812?w=800&auto=format&fit=crop' },
    { name: 'Trousers', slug: 'trousers', image: 'https://images.unsplash.com/photo-1624378439575-d1ead6bb176d?w=800&auto=format&fit=crop' },
    { name: 'Outerwear', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop' },
    { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=800&auto=format&fit=crop' },
    { name: 'Knitwear', slug: 'knitwear', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop' }
];

function getCategoryList() {
    return JSON.parse(localStorage.getItem('vintage_categories')) || defaultCategories;
}

// Elements
const appEl = document.getElementById('app');
const navbar = document.getElementById('navbar');
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total-price');
const sizeGuideModal = document.getElementById('size-guide-modal');

// Init
function init() {
    setupEventListeners();
    renderView();
    updateCartUI();
    updateCartUI();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    window.addEventListener('hashchange', handleRoute);
    
    // Navbar Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cart Drawer
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    // User / Admin
    const userBtn = document.getElementById('user-btn');
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            window.location.hash = state.isUserLoggedIn ? 'account' : 'login';
        });
    }

    // Modal Close
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeGuideModal.classList.remove('active');
        });
    });
}

// Routing
function handleRoute() {
    const hash = window.location.hash.substring(1);
    
    if (!hash || hash === 'home') {
        state.currentView = 'home';
        state.currentProduct = null;
    } else if (hash.startsWith('shop')) {
        const parts = hash.split('/');
        state.currentCategory = parts[1] || 'all';
        state.currentView = 'shop';
        state.currentProduct = null;
    } else if (hash === 'contact') {
        state.currentView = 'contact';
        state.currentProduct = null;
    } else if (hash === 'login') {
        if (state.isUserLoggedIn) { window.location.hash = 'account'; return; }
        state.currentView = 'login';
        state.currentProduct = null;
    } else if (hash === 'account') {
        if (!state.isUserLoggedIn) { window.location.hash = 'login'; return; }
        state.currentView = 'account';
        state.currentProduct = null;
    } else if (hash.startsWith('product/')) {
        const id = hash.split('/')[1];
        state.currentView = 'product';
        state.currentProduct = getProductById(id);
        state.selectedSize = null;
    }
    
    renderView();
    window.scrollTo(0, 0);
}

// Views
function renderView() {
    appEl.style.opacity = 0;
    
    if (state.heroInterval) {
        clearInterval(state.heroInterval);
        state.heroInterval = null;
    }
    
    setTimeout(() => {
        if (state.currentView === 'home') {
            appEl.innerHTML = renderHome();
        } else if (state.currentView === 'shop') {
            renderShop();
            setupShopFilters();
        } else if (state.currentView === 'contact') {
            appEl.innerHTML = renderContact();
        } else if (state.currentView === 'login') {
            appEl.innerHTML = renderUserLogin();
            document.getElementById('login-form').addEventListener('submit', handleUserLogin);
        } else if (state.currentView === 'account') {
            appEl.innerHTML = renderAccount();
            document.getElementById('logout-btn').addEventListener('click', handleUserLogout);
        } else if (state.currentView === 'product' && state.currentProduct) {
            appEl.innerHTML = renderProductDetails(state.currentProduct);
            setupProductListeners();
        } else {
            appEl.innerHTML = renderHome(); // Fallback
            setupHeroCarousel();
        }
        
        if (state.currentView === 'home') {
            setupHeroCarousel();
            setupCategorySwiper();
        }
        
        lucide.createIcons();
        setupScrollAnimations();
        appEl.style.transition = 'opacity 0.5s ease';
        appEl.style.opacity = 1;
    }, 300);
}

function renderContact() {
    return `
        <section class="section" style="padding-top: 8rem;">
            <h1 class="section-title animate-on-scroll">Contact Us</h1>
            <div class="contact-container animate-on-scroll delay-100">
                <div class="contact-info">
                    <h2>Get in Touch</h2>
                    <p>We'd love to hear from you. Our team is always here to help you with your styling needs, order inquiries, or just to say hello.</p>
                    <div class="info-block">
                        <i data-lucide="map-pin"></i>
                        <span>123 Fashion Avenue, New York, NY 10001</span>
                    </div>
                    <div class="info-block">
                        <i data-lucide="phone"></i>
                        <span>+1 (800) 123-4567</span>
                    </div>
                    <div class="info-block">
                        <i data-lucide="mail"></i>
                        <span>support@vintage.com</span>
                    </div>
                </div>
                <form class="contact-form" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required placeholder="Jane Doe">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" required placeholder="jane@example.com">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" rows="5" required placeholder="How can we help you?"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                </form>
            </div>
        </section>
    `;
}

function renderUserLogin() {
    return `
        <section class="section" style="padding-top: 8rem; min-height: 80vh;">
            <div class="auth-container animate-on-scroll delay-100">
                <h1>Welcome Back</h1>
                <p style="color: var(--text-light); margin-bottom: 2rem;">Sign in to your Vintage account</p>
                <div id="login-error" class="auth-error">Invalid email or password.</div>
                <form id="login-form">
                    <div class="form-group" style="text-align: left;">
                        <label for="user-email">Email Address</label>
                        <input type="email" id="user-email" required placeholder="user@vintage.com">
                    </div>
                    <div class="form-group" style="text-align: left;">
                        <label for="user-password">Password</label>
                        <input type="password" id="user-password" required placeholder="password123">
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">
                        <label style="cursor:pointer;"><input type="checkbox"> Remember me</label>
                        <a href="#" style="text-decoration: underline;">Forgot Password?</a>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
                    <p style="margin-top: 2rem; font-size: 0.9rem; color: var(--text-light);">
                        Don't have an account? <a href="#" style="color: var(--primary-color); font-weight: 600;">Create one</a>
                    </p>
                </form>
            </div>
        </section>
    `;
}

function renderAccount() {
    return `
        <section class="section" style="padding-top: 8rem; min-height: 80vh; text-align: center;">
            <div class="animate-on-scroll delay-100">
                <h1>My Account</h1>
                <p style="color: var(--text-light); margin-bottom: 3rem;">Welcome to your secure Vintage portal.</p>
                
                <div style="max-width: 600px; margin: 0 auto; background: var(--bg-secondary); padding: 3rem; border: 1px solid var(--border-color);">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
                        <div style="width: 60px; height: 60px; background: var(--primary-color); color: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
                            U
                        </div>
                        <div style="text-align: left;">
                            <h3 style="margin-bottom: 0;">Vintage Customer</h3>
                            <p style="color: var(--text-light); margin-bottom: 0;">user@vintage.com</p>
                        </div>
                    </div>
                    
                    <button id="logout-btn" class="btn btn-primary" style="width: 100%;">Sign Out</button>
                </div>
            </div>
        </section>
    `;
}

// Render Components
function renderHome() {
    const trending = getTrendingProducts();
    const newArrivals = getNewArrivals();
    
    return `
        <section class="hero">
            ${heroImages.map((imgUrl, index) => `
                <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${imgUrl}');"></div>
            `).join('')}
            <div class="hero-content">
                <h1 class="hero-title animate-on-scroll delay-100">New Elegance</h1>
                <p class="hero-subtitle animate-on-scroll delay-200">Discover the Fall/Winter 2026 Collection.</p>
                <div class="animate-on-scroll delay-300">
                    <a href="#shop" class="btn btn-primary">Shop Collection</a>
                </div>
            </div>
        </section>

        <section style="background-color: var(--bg-secondary); padding: 4rem 2rem;">
            <h2 class="section-title animate-on-scroll" style="margin-bottom: 3rem;">Shop by Category</h2>
            <div class="category-swiper animate-on-scroll delay-100" id="category-swiper">
                <div class="category-marquee-track">
                    ${[...getCategoryList(), ...getCategoryList()].map(cat => `
                        <div class="category-card" onclick="window.location.hash='shop/${cat.slug}'">
                            <div class="category-circle">
                                <img src="${cat.image}" alt="${cat.name}">
                            </div>
                            <span class="category-name">${cat.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>


        <section class="section">
            <h2 class="section-title animate-on-scroll">Trending Now</h2>
            <div class="product-grid">
                ${trending.map((product, index) => renderProductCard(product, index)).join('')}
            </div>
        </section>

        <section class="section" style="border-top: 1px solid var(--border-color);">
            <h2 class="section-title animate-on-scroll">New Arrivals</h2>
            <div class="product-grid">
                ${newArrivals.map((product, index) => renderProductCard(product, index)).join('')}
            </div>
            <div style="text-align: center; margin-top: 4rem;" class="animate-on-scroll delay-200">
                <a href="#shop" class="btn btn-primary" style="color: var(--secondary-color)">View Entire Collection</a>
            </div>
        </section>
    `;
}

function renderShop() {
    let filteredProducts = products;
    if (state.currentCategory !== 'all') {
        filteredProducts = products.filter(p => p.category === state.currentCategory);
    }
    
    appEl.innerHTML = `
        <section class="section" style="padding-top: 8rem;">
            <h1 class="section-title animate-on-scroll">The Collection</h1>
            
            <div class="filters animate-on-scroll delay-100">
                <div class="filter-group">
                    <select id="category-filter">
                        <option value="all" ${state.currentCategory === 'all' ? 'selected' : ''}>All Categories</option>
                        <option value="suits" ${state.currentCategory === 'suits' ? 'selected' : ''}>Suits</option>
                        <option value="shirts" ${state.currentCategory === 'shirts' ? 'selected' : ''}>Shirts</option>
                        <option value="trousers" ${state.currentCategory === 'trousers' ? 'selected' : ''}>Trousers</option>
                        <option value="outerwear" ${state.currentCategory === 'outerwear' ? 'selected' : ''}>Outerwear</option>
                        <option value="shoes" ${state.currentCategory === 'shoes' ? 'selected' : ''}>Shoes</option>
                    </select>
                </div>
                <div class="filter-group">
                    <select id="sort-filter">
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div class="product-grid" id="shop-grid">
                ${filteredProducts.map((product, index) => renderProductCard(product, index)).join('')}
            </div>
        </section>
    `;
}

function renderProductCard(product, index = 0) {
    const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
    const stockBadge = totalStock === 0 
        ? '<span class="stock-badge out-of-stock-badge">Sold Out</span>'
        : (totalStock <= 5 ? '<span class="stock-badge">Low Stock</span>' : '');

    const delayClass = `delay-${((index % 5) + 1) * 100}`;

    return `
        <div class="product-card animate-on-scroll ${delayClass}" onclick="window.location.hash='product/${product.id}'">
            <div class="product-image-container">
                ${stockBadge}
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <img src="${product.hoverImage}" alt="${product.title}" class="product-image hover-img">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
            </div>
        </div>
    `;
}

function renderProductDetails(product) {
    return `
        <div class="section product-detail-view">
            <div class="pd-images animate-on-scroll">
                <img src="${product.image}" alt="${product.title}" class="pd-main-img">
                <img src="${product.hoverImage}" alt="${product.title}" class="pd-main-img">
            </div>
            <div class="pd-info">
                <h1 class="pd-title animate-on-scroll delay-100">${product.title}</h1>
                <p class="pd-price animate-on-scroll delay-200">₹${product.price.toFixed(2)}</p>
                
                <p class="pd-desc animate-on-scroll delay-300">${product.description}</p>
                
                <div class="pd-stock-status animate-on-scroll delay-400" id="stock-message">Select a size to see availability.</div>
                
                <div class="size-selector animate-on-scroll delay-500">
                    <div class="size-selector-header">
                        <span>Size</span>
                        <span class="size-guide-link" id="open-size-guide">Size Guide</span>
                    </div>
                    <div class="size-chips" id="size-container">
                        ${product.variants.map(v => {
                            const isOOS = v.stock === 0;
                            return `
                                <div class="size-chip ${isOOS ? 'disabled' : ''}" 
                                     data-size="${v.size}" 
                                     data-stock="${v.stock}">
                                    ${v.size}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="animate-on-scroll delay-500" style="margin-top: 2rem;">
                    <button class="add-to-cart-btn" id="add-to-cart" disabled>Select a Size</button>
                </div>
            </div>
        </div>
    `;
}

// Logic & Handlers
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function setupHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    state.heroInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
}

function setupCategorySwiper() {
    // Handled by CSS Marquee
}

function setupShopFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const grid = document.getElementById('shop-grid');

    const applyFilters = () => {
        let filtered = [...products];
        const cat = categoryFilter.value;
        const sort = sortFilter.value;

        if (cat !== 'all') {
            filtered = filtered.filter(p => p.category === cat);
        }

        if (sort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else {
            filtered.sort((a, b) => b.trendingScore - a.trendingScore);
        }

        grid.style.opacity = 0;
        setTimeout(() => {
            grid.innerHTML = filtered.map((p, i) => renderProductCard(p, i)).join('');
            grid.style.opacity = 1;
            setupScrollAnimations();
        }, 300);
    };

    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
}

function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    
    // Mock authentication
    if (email === 'user@vintage.com' && password === 'password123') {
        state.isUserLoggedIn = true;
        localStorage.setItem('isUserLoggedIn', 'true');
        window.location.hash = 'home';
    } else {
        const err = document.getElementById('login-error');
        err.style.display = 'block';
    }
}

function handleUserLogout() {
    state.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
    window.location.hash = 'home';
}

function setupProductListeners() {
    const chips = document.querySelectorAll('.size-chip:not(.disabled)');
    const addToCartBtn = document.getElementById('add-to-cart');
    const stockMessage = document.getElementById('stock-message');
    const sizeGuideBtn = document.getElementById('open-size-guide');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove selected class from all
            chips.forEach(c => c.classList.remove('selected'));
            
            // Add to clicked
            chip.classList.add('selected');
            state.selectedSize = chip.dataset.size;
            
            const stock = parseInt(chip.dataset.stock);
            
            if (stock <= 3) {
                stockMessage.textContent = `Hurry! Only ${stock} left in stock.`;
                stockMessage.style.color = 'var(--error-color)';
            } else {
                stockMessage.textContent = 'In Stock and ready to ship.';
                stockMessage.style.color = 'var(--text-color)';
            }

            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
        });
    });

    addToCartBtn.addEventListener('click', () => {
        if (!state.selectedSize) return;
        
        addToCart(state.currentProduct, state.selectedSize);
        
        // Button Feedback
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added!';
        addToCartBtn.style.background = 'var(--accent-color)';
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.background = '';
            toggleCart(); // Open cart
        }, 1000);
    });

    sizeGuideBtn.addEventListener('click', () => {
        sizeGuideModal.classList.add('active');
    });
}

// Cart Functionality
function toggleCart() {
    cartOverlay.classList.toggle('active');
    cartDrawer.classList.toggle('active');
}

function addToCart(product, size) {
    const existingIndex = state.cart.findIndex(item => item.id === product.id && item.size === size);
    
    if (existingIndex >= 0) {
        state.cart[existingIndex].qty += 1;
    } else {
        state.cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: size,
            qty: 1
        });
    }
    
    updateCartUI();
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // Update count
    const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountEl.textContent = totalItems;
    
    if (totalItems === 0) {
        cartCountEl.style.display = 'none';
        cartItemsEl.innerHTML = '<p style="text-align:center; margin-top: 2rem; color: var(--text-light)">Your cart is empty.</p>';
        cartTotalEl.textContent = '₹0.00';
        return;
    }
    
    cartCountEl.style.display = 'flex';
    
    // Render items
    cartItemsEl.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-size">Size: ${item.size}</div>
                <div class="cart-item-bottom">
                    <span>₹${item.price.toFixed(2)} x ${item.qty}</span>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Total
    const total = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotalEl.textContent = `₹${total.toFixed(2)}`;
}

// Start
document.addEventListener('DOMContentLoaded', init);
handleRoute(); // Initial route
