const adminState = {
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    currentTab: 'dashboard',
    modalOpen: false,
    editingProduct: null
};

const adminEl = document.getElementById('admin-app');

function initAdmin() {
    renderAdminView();
}

function renderAdminView() {
    if (!adminState.isAdmin) {
        adminEl.innerHTML = renderLogin();
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.addEventListener('submit', handleLogin);
    } else {
        adminEl.innerHTML = renderAdminLayout();
        attachAdminListeners();
    }
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

function renderLogin() {
    return `
        <section class="section" style="padding-top: 8rem; min-height: 80vh;">
            <div class="auth-container">
                <h1>Admin Login</h1>
                <p style="color: var(--text-light); margin-bottom: 2rem;">Sign in to access the dashboard</p>
                <div id="login-error" class="auth-error">Invalid username or password.</div>
                <form id="login-form">
                    <div class="form-group" style="text-align: left;">
                        <label for="admin-username">Username</label>
                        <input type="text" id="admin-username" required value="admin">
                    </div>
                    <div class="form-group" style="text-align: left;">
                        <label for="admin-password">Password</label>
                        <input type="password" id="admin-password" required value="admin123">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Sign In</button>
                </form>
            </div>
        </section>
    `;
}

function renderAdminLayout() {
    return `
        <section class="section" style="padding-top: 6rem; max-width: 1600px;">
            <div class="admin-layout">
                <div class="admin-sidebar">
                    <h3>Admin Panel</h3>
                    <div class="admin-nav">
                        <div class="admin-nav-item ${adminState.currentTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard"><i data-lucide="layout-dashboard"></i> Dashboard</div>
                        <div class="admin-nav-item ${adminState.currentTab === 'products' ? 'active' : ''}" data-tab="products"><i data-lucide="package"></i> Products</div>
                        <div class="admin-nav-item ${adminState.currentTab === 'hero' ? 'active' : ''}" data-tab="hero"><i data-lucide="image"></i> Hero Section</div>
                        <div class="admin-nav-item logout" id="logout-btn"><i data-lucide="log-out"></i> Logout</div>
                    </div>
                </div>
                <div class="admin-content">
                    ${renderTabContent()}
                </div>
            </div>
        </section>
        
        ${adminState.modalOpen ? renderProductModal() : ''}
    `;
}

function renderTabContent() {
    if (adminState.currentTab === 'dashboard') return renderDashboard();
    if (adminState.currentTab === 'products') return renderProductsTab();
    if (adminState.currentTab === 'hero') return renderHeroTab();
}

function renderDashboard() {
    const totalProducts = products.length;
    const totalStock = products.reduce((acc, p) => acc + p.variants.reduce((a, v) => a + v.stock, 0), 0);
    const lowStockItems = products.filter(p => p.variants.some(v => v.stock < 3)).length;

    return `
        <h2 style="font-size: 2rem; margin-bottom: 2rem;">Dashboard Overview</h2>
        <div class="admin-stats">
            <div class="stat-card">
                <h4>Total Products</h4>
                <div class="stat-value">${totalProducts}</div>
            </div>
            <div class="stat-card">
                <h4>Total Inventory Units</h4>
                <div class="stat-value">${totalStock}</div>
            </div>
            <div class="stat-card">
                <h4>Low Stock Alerts</h4>
                <div class="stat-value" style="color: var(--error-color)">${lowStockItems}</div>
            </div>
        </div>
    `;
}

function renderProductsTab() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2 style="font-size: 2rem; margin: 0;">Manage Products</h2>
            <div>
                <button class="btn" id="reset-stock-btn" style="border: 1px solid var(--border-color); color: var(--text-color); margin-right: 1rem;">Reset All Stock</button>
                <button class="btn btn-primary" id="add-product-btn">Add New Product</button>
            </div>
        </div>
        <div style="overflow-x: auto; background: var(--bg-secondary); border: 1px solid var(--border-color);">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(p => {
                        const stock = p.variants.reduce((a, v) => a + v.stock, 0);
                        const status = stock === 0 ? '<span style="color: var(--error-color)">Out of Stock</span>' 
                                     : (stock < 10 ? '<span style="color: var(--accent-color)">Low Stock</span>' : '<span style="color: #4CAF50">In Stock</span>');
                        return `
                            <tr>
                                <td style="color: var(--text-light)">#${p.id}</td>
                                <td style="font-weight: 500;">${p.title}</td>
                                <td style="text-transform: capitalize;">${p.category}</td>
                                <td>₹${p.price.toFixed(2)}</td>
                                <td>${status}</td>
                                <td>
                                    <button class="edit-btn" data-id="${p.id}" style="color: var(--accent-color); margin-right: 0.5rem; text-decoration: underline;">Edit</button>
                                    <button class="delete-btn" data-id="${p.id}" style="color: var(--error-color); text-decoration: underline;">Delete</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderHeroTab() {
    return `
        <h2 style="font-size: 2rem; margin-bottom: 2rem;">Manage Hero Images</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem;">
            ${heroImages.map((img, index) => `
                <div style="position: relative; border: 1px solid var(--border-color);">
                    <img src="${img}" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
                    <button class="delete-hero-btn" data-index="${index}" style="position: absolute; top: 10px; right: 10px; background: red; color: white; padding: 0.5rem; border-radius: 50%;">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        
        <div style="background: var(--bg-secondary); padding: 2rem; border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 1rem;">Add New Hero Image</h3>
            <form id="add-hero-form" style="display: flex; gap: 1rem;">
                <input type="url" id="new-hero-url" required placeholder="https://images.unsplash.com/photo-..." style="flex: 1; padding: 0.75rem; border: 1px solid var(--border-color);">
                <button type="submit" class="btn btn-primary">Add Image</button>
            </form>
        </div>
    `;
}

function renderProductModal() {
    const isEditing = !!adminState.editingProduct;
    const p = adminState.editingProduct || {
        title: '', price: '', category: 'suits', image: '', hoverImage: '', description: '',
        variants: [{ size: 'S', stock: 10 }, { size: 'M', stock: 10 }, { size: 'L', stock: 10 }]
    };

    const getStock = (size) => {
        const v = p.variants.find(v => v.size === size);
        return v ? v.stock : 0;
    };

    return `
        <div class="modal active" style="align-items: flex-start; padding-top: 4rem; overflow-y: auto;">
            <div class="modal-content" style="max-width: 800px; margin-bottom: 4rem;">
                <button class="close-modal" id="close-modal-btn"><i data-lucide="x"></i></button>
                <h2 style="font-size: 2rem; margin-bottom: 2rem;">${isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                
                <form id="product-form">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" id="p-title" required value="${p.title}">
                            </div>
                            <div class="form-group">
                                <label>Price (₹)</label>
                                <input type="number" id="p-price" step="0.01" required value="${p.price}">
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select id="p-category" style="width: 100%; padding: 1rem; border: 1px solid var(--border-color); background: var(--bg-color);">
                                    <option value="suits" ${p.category === 'suits' ? 'selected' : ''}>Suits</option>
                                    <option value="shirts" ${p.category === 'shirts' ? 'selected' : ''}>Shirts</option>
                                    <option value="trousers" ${p.category === 'trousers' ? 'selected' : ''}>Trousers</option>
                                    <option value="outerwear" ${p.category === 'outerwear' ? 'selected' : ''}>Outerwear</option>
                                    <option value="shoes" ${p.category === 'shoes' ? 'selected' : ''}>Shoes</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>Main Image URL</label>
                                <input type="url" id="p-image" required value="${p.image}">
                            </div>
                            <div class="form-group">
                                <label>Hover Image URL</label>
                                <input type="url" id="p-hover" required value="${p.hoverImage}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="p-desc" rows="4" required>${p.description}</textarea>
                    </div>

                    <h3 style="margin-top: 1rem; margin-bottom: 1rem; font-size: 1.2rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">Inventory Levels</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem;">
                        <div class="form-group">
                            <label>Size S Stock</label>
                            <input type="number" id="p-stock-s" min="0" required value="${getStock('S')}">
                        </div>
                        <div class="form-group">
                            <label>Size M Stock</label>
                            <input type="number" id="p-stock-m" min="0" required value="${getStock('M')}">
                        </div>
                        <div class="form-group">
                            <label>Size L Stock</label>
                            <input type="number" id="p-stock-l" min="0" required value="${getStock('L')}">
                        </div>
                    </div>

                    <div style="margin-top: 2rem; text-align: right;">
                        <button type="button" class="btn" id="cancel-modal-btn" style="border: 1px solid var(--border-color); color: var(--text-color); margin-right: 1rem;">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function attachAdminListeners() {
    // Tab Navigation
    document.querySelectorAll('.admin-nav-item[data-tab]').forEach(tab => {
        tab.addEventListener('click', (e) => {
            adminState.currentTab = e.currentTarget.dataset.tab;
            renderAdminView();
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // Products Tab Listeners
    if (adminState.currentTab === 'products') {
        document.getElementById('add-product-btn').addEventListener('click', () => {
            adminState.editingProduct = null;
            adminState.modalOpen = true;
            renderAdminView();
        });
        
        document.getElementById('reset-stock-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the stock of ALL products to 10 units for all sizes?')) {
                products.forEach(p => {
                    p.variants = [
                        { size: 'S', stock: 10 },
                        { size: 'M', stock: 10 },
                        { size: 'L', stock: 10 }
                    ];
                });
                saveData();
                renderAdminView();
            }
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                adminState.editingProduct = products.find(p => p.id === id);
                adminState.modalOpen = true;
                renderAdminView();
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('Are you sure you want to delete this product?')) {
                    const id = e.target.dataset.id;
                    const index = products.findIndex(p => p.id === id);
                    if (index > -1) {
                        products.splice(index, 1);
                        saveData();
                        renderAdminView();
                    }
                }
            });
        });
    }

    // Hero Tab Listeners
    if (adminState.currentTab === 'hero') {
        const addForm = document.getElementById('add-hero-form');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const url = document.getElementById('new-hero-url').value;
                heroImages.push(url);
                saveData();
                renderAdminView();
            });
        }

        document.querySelectorAll('.delete-hero-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                if (confirm('Remove this image from the hero carousel?')) {
                    heroImages.splice(index, 1);
                    saveData();
                    renderAdminView();
                }
            });
        });
    }

    // Modal Listeners
    if (adminState.modalOpen) {
        document.getElementById('close-modal-btn').addEventListener('click', closeModal);
        document.getElementById('cancel-modal-btn').addEventListener('click', closeModal);
        
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newProduct = {
                id: adminState.editingProduct ? adminState.editingProduct.id : 'p' + Date.now(),
                title: document.getElementById('p-title').value,
                price: parseFloat(document.getElementById('p-price').value),
                category: document.getElementById('p-category').value,
                image: document.getElementById('p-image').value,
                hoverImage: document.getElementById('p-hover').value,
                description: document.getElementById('p-desc').value,
                trendingScore: adminState.editingProduct ? adminState.editingProduct.trendingScore : 50,
                variants: [
                    { size: 'S', stock: parseInt(document.getElementById('p-stock-s').value) || 0 },
                    { size: 'M', stock: parseInt(document.getElementById('p-stock-m').value) || 0 },
                    { size: 'L', stock: parseInt(document.getElementById('p-stock-l').value) || 0 }
                ]
            };

            if (adminState.editingProduct) {
                const idx = products.findIndex(p => p.id === newProduct.id);
                products[idx] = newProduct;
            } else {
                products.push(newProduct);
            }

            saveData();
            closeModal();
        });
    }
}

function closeModal() {
    adminState.modalOpen = false;
    adminState.editingProduct = null;
    renderAdminView();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    if (username === 'admin' && password === 'admin123') {
        adminState.isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        renderAdminView();
    } else {
        const err = document.getElementById('login-error');
        err.style.display = 'block';
    }
}

function handleLogout() {
    adminState.isAdmin = false;
    localStorage.removeItem('isAdmin');
    renderAdminView();
}

window.addEventListener('DOMContentLoaded', initAdmin);
