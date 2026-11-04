import './styles/main.css';

console.log('☕ Coffea Coffee Shop & Bakery — Clean Responsive UI Initialized');

// ─── PRODUCT CATALOG (COFFEE, DESSERTS & BEANS) ─────────────────────────────
const CATALOG = [
  // Coffees
  {
    id: 'c-1',
    name: 'Lungo coffee',
    category: 'hot-coffee',
    price: 200,
    priceDisplay: 'Rs. 200',
    desc: 'Rich double shot espresso pulled with extended water volume for aromatic smoothness.',
    img: '/images/coffee-1.jpg'
  },
  {
    id: 'c-2',
    name: 'Caramel Macchiato',
    category: 'hot-coffee',
    price: 240,
    priceDisplay: 'Rs. 240',
    desc: 'Steamed velvety milk marked with intense espresso and crowned with artisanal buttery caramel drizzle.',
    img: '/images/coffee-2.jpg'
  },
  {
    id: 'c-3',
    name: 'Vanilla Cappuccino',
    category: 'hot-coffee',
    price: 220,
    priceDisplay: 'Rs. 220',
    desc: 'Equal parts bold espresso, hot milk, and thick foam dusted with real Madagascar vanilla pod.',
    img: '/images/coffee-3.jpg'
  },
  {
    id: 'c-4',
    name: 'Hazelnut Flat White',
    category: 'hot-coffee',
    price: 250,
    priceDisplay: 'Rs. 250',
    desc: 'Delicate micro-foam infused with roasted Piedmont hazelnuts poured over a bold double ristretto.',
    img: '/images/coffee-4.jpg'
  },
  {
    id: 'c-5',
    name: 'Nitro Cold Brew',
    category: 'cold-coffee',
    price: 260,
    priceDisplay: 'Rs. 260',
    desc: '18-hour cold steeped single-origin coffee infused with nitrogen for a creamy, naturally sweet head.',
    img: '/images/coffee-5.jpg'
  },
  {
    id: 'c-6',
    name: 'Origin Espresso',
    category: 'cup-coffee',
    price: 180,
    priceDisplay: 'Rs. 180',
    desc: 'Washed Ethiopian Yirgacheffe pulling vibrant citrus sweetness, jasmine florality, and dark chocolate.',
    img: '/images/coffee-6.jpg'
  },

  // Desserts
  {
    id: 'd-1',
    name: 'Butter Croissant',
    category: 'dessert',
    price: 160,
    priceDisplay: 'Rs. 160',
    desc: 'Authentic flaky French pastry laminated with pure cultured Normandy butter, baked fresh every morning.',
    img: '/images/dessert-1.jpg'
  },
  {
    id: 'd-2',
    name: 'Classic Tiramisu',
    category: 'dessert',
    price: 260,
    priceDisplay: 'Rs. 260',
    desc: 'Espresso-drenched Savoiardi biscuits layered with light mascarpone mousse and Valrhona cocoa.',
    img: '/images/dessert-2.jpg'
  },
  {
    id: 'd-3',
    name: 'New York Cheesecake',
    category: 'dessert',
    price: 280,
    priceDisplay: 'Rs. 280',
    desc: 'Velvety dense cream cheese on a cinnamon-graham crust, kissed with real Madagascar vanilla bean.',
    img: '/images/dessert-3.jpg'
  },
  {
    id: 'd-4',
    name: 'Chocolate Tart',
    category: 'dessert',
    price: 240,
    priceDisplay: 'Rs. 240',
    desc: 'Crisp sablé shell brimming with 70% dark Belgian ganache and topped with toasted whole hazelnuts.',
    img: '/images/dessert-4.jpg'
  },
  {
    id: 'd-5',
    name: 'Cinnamon Roll',
    category: 'dessert',
    price: 180,
    priceDisplay: 'Rs. 180',
    desc: 'Pillowy brioche dough twisted with fragrant Ceylon cinnamon butter and frosted with cream glaze.',
    img: '/images/dessert-5.jpg'
  },
  {
    id: 'd-6',
    name: 'Wild Berry Galette',
    category: 'dessert',
    price: 220,
    priceDisplay: 'Rs. 220',
    desc: 'Free-form butter crust stuffed with fresh mountain blackberries, blueberries, and fragrant lemon zest.',
    img: '/images/dessert-6.jpg'
  },

  // Coffee Beans Promo Item
  {
    id: 'b-1',
    name: 'Artisan Whole Beans (250g)',
    category: 'beans',
    price: 450,
    priceDisplay: 'Rs. 450',
    desc: 'Ethically sourced single-origin micro-lot roasted to medium Scandinavian sweetness.',
    img: '/images/beans-banner.jpg'
  }
];

// ─── TOAST NOTIFICATIONS ────────────────────────────────────────────────────
function showToast(message, icon = '☕') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 260);
  }, 2600);
}

// ─── CART / ORDER DRAWER STATE & ACTIONS ────────────────────────────────────
const cart = {
  items: [],

  init() {
    try {
      const saved = localStorage.getItem('coffea_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (_e) {
      this.items = [];
    }
    this.render();
  },

  save() {
    try {
      localStorage.setItem('coffea_cart', JSON.stringify(this.items));
    } catch (_e) {
      // storage unavailable
    }
  },

  addItem(productId) {
    const product = CATALOG.find((p) => p.id === productId);
    if (!product) return;

    const existing = this.items.find((item) => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        qty: 1
      });
    }

    this.save();
    this.render();
    showToast(`Added ${product.name} to order!`, '✓');
  },

  updateQty(productId, delta) {
    const item = this.items.find((i) => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.items = this.items.filter((i) => i.id !== productId);
    }

    this.save();
    this.render();
  },

  removeItem(productId) {
    this.items = this.items.filter((i) => i.id !== productId);
    this.save();
    this.render();
  },

  clear() {
    this.items = [];
    this.save();
    this.render();
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  render() {
    const counter = document.getElementById('cart-counter');
    const list = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');

    const totalCount = this.getCount();
    if (counter) counter.textContent = totalCount;

    if (subtotalEl) {
      subtotalEl.textContent = `Rs. ${this.getSubtotal().toLocaleString()}`;
    }

    if (!list) return;

    if (this.items.length === 0) {
      list.innerHTML = `
        <div class="cart-empty-msg">
          <p>Your order is currently empty.</p>
          <p style="margin-top: 8px; font-size: 0.8rem; opacity: 0.7;">Select a coffee or fresh pastry to get started.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = this.items.map((item) => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">Rs. ${item.price} each</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `).join('');
  }
};

// ─── WISHLIST / FAVORITES ───────────────────────────────────────────────────
const wishlist = {
  saved: new Set(),

  init() {
    try {
      const data = JSON.parse(localStorage.getItem('coffea_wishlist') || '[]');
      this.saved = new Set(data);
    } catch (_e) {
      this.saved = new Set();
    }
    this.updateIcons();
  },

  toggle(id, btn) {
    if (this.saved.has(id)) {
      this.saved.delete(id);
      btn.classList.remove('wishlist-btn--active');
      showToast('Removed from favorites', '♡');
    } else {
      this.saved.add(id);
      btn.classList.add('wishlist-btn--active');
      showToast('Saved to your favorites!', '❤️');
    }
    try {
      localStorage.setItem('coffea_wishlist', JSON.stringify([...this.saved]));
    } catch (_e) {
      // storage unavailable
    }
  },

  updateIcons() {
    document.querySelectorAll('.wishlist-btn').forEach((btn) => {
      const id = btn.dataset.id;
      if (this.saved.has(id)) {
        btn.classList.add('wishlist-btn--active');
      } else {
        btn.classList.remove('wishlist-btn--active');
      }
    });
  }
};

// ─── CAROUSEL SCROLL NAVIGATION ─────────────────────────────────────────────
function setupCarousels() {
  document.querySelectorAll('.carousel-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const trackId = arrow.dataset.track;
      const track = document.getElementById(trackId);
      if (!track) return;

      const firstCard = track.querySelector('.product-card');
      const cardWidth = firstCard ? firstCard.offsetWidth + 20 : 300;
      const isNext = arrow.classList.contains('next');

      track.scrollBy({
        left: isNext ? cardWidth : -cardWidth,
        behavior: 'smooth'
      });
    });
  });
}

// ─── CATEGORY STRIP FILTERING ───────────────────────────────────────────────
function setupCategories() {
  const cards = document.querySelectorAll('.category-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('category-card--active'));
      card.classList.add('category-card--active');

      const category = card.dataset.category;

      if (category === 'dessert') {
        const dessertSec = document.getElementById('special-dessert');
        if (dessertSec) {
          dessertSec.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        const coffeeSec = document.getElementById('special-coffee');
        if (coffeeSec) {
          coffeeSec.scrollIntoView({ behavior: 'smooth' });
        }
        // Filter or highlight matching items in track
        const track = document.getElementById('coffee-track');
        if (track) {
          const items = track.querySelectorAll('.product-card');
          items.forEach((item) => {
            if (category === 'all' || item.dataset.category === category) {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            } else {
              item.style.opacity = '0.45';
              item.style.transform = 'scale(0.97)';
            }
          });
        }
      }
    });
  });
}

// ─── LIVE SEARCH MODAL ──────────────────────────────────────────────────────
function setupSearchModal() {
  const searchModal = document.getElementById('search-modal');
  const openBtn = document.getElementById('open-search-btn');
  const closeBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('live-search-input');
  const resultsList = document.getElementById('search-results-list');

  if (!searchModal) return;

  const openSearch = () => {
    searchModal.showModal();
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    renderSearchResults('');
  };

  const closeSearch = () => {
    searchModal.close();
  };

  if (openBtn) openBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  const renderSearchResults = (query) => {
    if (!resultsList) return;
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
      resultsList.innerHTML = '<p class="search-hint">Type above to quickly find your favorite roast or bakery item.</p>';
      return;
    }

    const matches = CATALOG.filter((item) =>
      item.name.toLowerCase().includes(cleanQuery) ||
      item.desc.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery)
    );

    if (matches.length === 0) {
      resultsList.innerHTML = `<p class="search-hint">No matches found for "${query}". Try searching "latte" or "croissant".</p>`;
      return;
    }

    resultsList.innerHTML = matches.map((item) => `
      <div class="search-result-row" data-id="${item.id}">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${item.img}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;">
          <div>
            <div style="font-weight: 600; font-size: 0.9rem; color: #18130e;">${item.name}</div>
            <div style="font-size: 0.75rem; color: #746a62;">${item.priceDisplay}</div>
          </div>
        </div>
        <button class="btn btn-order btn-search-add" data-id="${item.id}" type="button">Add</button>
      </div>
    `).join('');

    resultsList.querySelectorAll('.btn-search-add').forEach((addBtn) => {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = addBtn.dataset.id;
        cart.addItem(id);
        closeSearch();
      });
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }
}

// ─── LOGIN MODAL ────────────────────────────────────────────────────────────
function setupLoginModal() {
  const modal = document.getElementById('login-modal');
  const openBtn = document.getElementById('open-login-btn');
  const closeBtn = document.getElementById('close-login-btn');
  const form = document.getElementById('login-form');

  if (!modal) return;

  const open = () => modal.showModal();
  const close = () => modal.close();

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const name = email.split('@')[0];
      close();
      showToast(`Welcome back, ${name}!`, '☕');
      if (openBtn) openBtn.textContent = name.toUpperCase();
    });
  }
}

// ─── NEWSLETTER SUBSCRIPTION ────────────────────────────────────────────────
function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');

  if (!form || !input || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email || !email.includes('@')) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'newsletter-feedback error';
      return;
    }

    feedback.textContent = '🎉 You are in! Use promo code COFFEA15 for 15% off your next order.';
    feedback.className = 'newsletter-feedback success';
    input.value = '';
    showToast('Promo code COFFEA15 unlocked!', '🎁');
  });
}

// ─── ORDER DRAWER CONTROLS ──────────────────────────────────────────────────
function setupCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const overlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');
  const list = document.getElementById('cart-items-list');

  const openDrawer = () => {
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
  };

  const closeDrawer = () => {
    if (drawer) drawer.setAttribute('aria-hidden', 'true');
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.items.length === 0) {
        showToast('Your order is empty!', '⚠️');
        return;
      }
      showToast('Thank you! Your order is being prepared.', '☕');
      cart.clear();
      closeDrawer();
    });
  }

  // Handle quantity changes inside drawer
  if (list) {
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.cart-qty-btn');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'increase') cart.updateQty(id, 1);
      if (action === 'decrease') cart.updateQty(id, -1);
    });
  }

  // Handle all "Order Now" buttons on page
  document.addEventListener('click', (e) => {
    const orderBtn = e.target.closest('.btn-order');
    if (!orderBtn || orderBtn.classList.contains('btn-search-add')) return;
    const id = orderBtn.dataset.id;
    if (id) {
      cart.addItem(id);
    }
  });
}

// ─── WISHLIST EVENTS ────────────────────────────────────────────────────────
function setupWishlistEvents() {
  document.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.wishlist-btn');
    if (!wishBtn) return;
    const id = wishBtn.dataset.id;
    wishlist.toggle(id, wishBtn);
  });
}

// ─── BEANS BANNER CTA ───────────────────────────────────────────────────────
function setupBeansBanner() {
  const exploreBtn = document.getElementById('explore-beans-btn');
  if (!exploreBtn) return;
  exploreBtn.addEventListener('click', () => {
    cart.addItem('b-1');
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
  });
}

// ─── HEADER SCROLL SHADOW & MOBILE MENU ─────────────────────────────────────
function setupHeader() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  }, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-links--open');
      toggle.classList.toggle('mobile-toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav-item').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-links--open');
        toggle.classList.remove('mobile-toggle--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ─── SECTION ACTIVE OBSERVER ────────────────────────────────────────────────
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item[href]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-item--active');
          } else {
            link.classList.remove('nav-item--active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach((sec) => observer.observe(sec));
}

// ─── INITIALIZE APPLICATION ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  cart.init();
  wishlist.init();
  setupCarousels();
  setupCategories();
  setupSearchModal();
  setupLoginModal();
  setupNewsletter();
  setupCartDrawer();
  setupWishlistEvents();
  setupBeansBanner();
  setupHeader();
  setupScrollSpy();
});
