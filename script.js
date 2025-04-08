document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  // Shopping cart state management module
  const ShoppingCart = (() => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    return {
      getCart: () => [...cart],
      addItem: (product) => {
        const existing = cart.find(item => item.id === product.id);
        existing ? existing.quantity++ : cart.push({ ...product, quantity: 1 });
        saveCart();
      },
      updateItem: (index, newQty) => {
        if (newQty > 0) cart[index].quantity = newQty;
        else cart.splice(index, 1);
        saveCart();
      },
      removeItem: (index) => {
        cart.splice(index, 1);
        saveCart();
      },
      clearCart: () => {
        cart = [];
        saveCart();
      },
      getTotalCount: () => cart.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
  })();

  // Page navigation control
  const NavigationController = {
    init: () => {
      document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = e.target.getAttribute('href').substring(1);
          document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
          });
          document.getElementById(target).classList.remove('hidden');
        });
      });
    }
  };

  // Shopping cart UI control
  const CartUI = {
    init: () => {
      document.querySelector('.cart-icon').addEventListener('click', () => this.toggleCart());
      document.querySelector('.close-cart').addEventListener('click', () => this.toggleCart());
      document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
      this.updateCartIcon();
    },

    toggleCart: () => {
      const cart = document.querySelector('.cart-container');
      cart.classList.toggle('active');
      cart.style.zIndex = cart.classList.contains('active') ? '1001' : '999';
    },

    updateCartIcon: () => {
      document.getElementById('cartCount').textContent = ShoppingCart.getTotalCount();
    },

    renderCart: () => {
      const container = document.getElementById('cartItems');
      container.innerHTML = '';
      
      ShoppingCart.getCart().forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
            <div class="quantity-control">
              <button class="decrement" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="increment" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>
        `;
        container.appendChild(div);
      });

      document.getElementById('cartTotalCount').textContent = ShoppingCart.getTotalCount();
      document.getElementById('cartTotalPrice').textContent = ShoppingCart.getTotalPrice();
    },

    handleCartAction: (e) => {
      if (!e.target.dataset.index) return;
      
      const index = parseInt(e.target.dataset.index);
      const item = ShoppingCart.getCart()[index];

      if (e.target.classList.contains('increment')) {
        ShoppingCart.updateItem(index, item.quantity + 1);
      } else if (e.target.classList.contains('decrement')) {
        ShoppingCart.updateItem(index, item.quantity - 1);
      } else if (e.target.classList.contains('remove-item')) {
        ShoppingCart.removeItem(index);
      }

      this.renderCart();
      this.updateCartIcon();
    },

    checkout: () => {
      if (ShoppingCart.getTotalCount() === 0) {
        alert('Your cart is empty!');
        return;
      }

      localStorage.setItem('checkoutData', JSON.stringify({
        cart: ShoppingCart.getCart(),
        total: ShoppingCart.getTotalPrice()
      }));
      window.location.href = 'checkout.html';
    }
  };

  // Product management
  const ProductManager = {
    //currentPage: 1,
    //itemsPerPage: 6, 
    //filteredProducts: [],
    //products: [],

    render: () => {
      const container = document.getElementById('productContainer');
      container.innerHTML = this.products.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `).join('');
    },

    handleAddToCart: (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const product = this.products.find(p => p.id === productId);
        ShoppingCart.addItem(product);
        CartUI.renderCart();
        CartUI.updateCartIcon();
      }
    }
  };

  // Authentication system
  const AuthManager = {
    init: () => {
      document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.querySelector('input[type="text"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        
        if (username && password) {
          document.getElementById('loginLink').textContent = 'Member Center';
          NavigationController.showSection('home');
          alert('Login successful!');
        } else {
          alert('Please enter username and password!');
        }
        localStorage.setItem('currentUser', JSON.stringify(userData));
        updateAuthUI();

        const userData = {
          username: username,
          contact: 'Preset contact information',
          address: 'Default address'
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        updateAuthUI();
        alert('Login successful!');
      });
    }
  };

  // Main application
  const App = {
    init: () => {
      updateAuthUI();
      if (localStorage.checkoutData) localStorage.removeItem('checkoutData');
      
      NavigationController.init();
      ProductManager.render();
      CartUI.init();
      AuthManager.init();

      document.addEventListener('click', (e) => {
        ProductManager.handleAddToCart(e);
        CartUI.handleCartAction(e);
      });

      CartUI.renderCart();
    }
  };

  App.init();

  document.getElementById('deleteOrders').addEventListener('click', (e) => {
    if (confirm('Are you sure you want to delete ALL order records?')) {
      localStorage.removeItem('orders');
      alert('All order records have been deleted!');
      if (window.location.pathname.includes('order-history.html')) {
        window.location.reload();
      }
    }
  });

  document.getElementById('logoutLink').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    alert('Logged out');
    updateAuthUI();
    window.location.reload();
  });

  function updateAuthUI() {
    console.log('Updating auth UI...');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginLi = document.getElementById('loginLi');
    const logoutLi = document.getElementById('logoutLi');
    const profileLink = document.getElementById('profileLink');

    if (currentUser) {
      loginLi.style.display = 'none';
      logoutLi.style.display = 'block';
      profileLink.style.pointerEvents = 'auto';
    } else {
      loginLi.style.display = 'block';
      logoutLi.style.display = 'none';
      profileLink.style.pointerEvents = 'none';
    }
  }
});