import products from './products.js';

let slideIndex = 1;
let quantity = 1;

// Slideshow functions
function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Product display functions
function displayProducts(filteredProducts = products) {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;

  productGrid.innerHTML = '';

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300?text=Image+Not+Found';">
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()} VNĐ</p>
      <p class="rating">⭐ ${product.rating.toFixed(1)}</p>
    `;
    productCard.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });
    productGrid.appendChild(productCard);
  });
}

function filterProducts(category) {
  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
  displayProducts(filteredProducts);
}

function searchProducts() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();

  // Check if we're on index.html
  const isOnIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

  if (!isOnIndexPage) {
    // Redirect to index.html with the search query as a URL parameter
    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    return;
  }

  // If on index.html, filter products and display
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
  displayProducts(filteredProducts);
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = cartCount;
}

// Authentication functions
function updateLoginStatus() {
  const loginBtn = document.getElementById('login-btn');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');
  const user = JSON.parse(localStorage.getItem('user'));

  if (loginBtn && userInfo && userName) {
    if (user) {
      loginBtn.style.display = 'none';
      userInfo.style.display = 'flex';
      userName.textContent = user.name;
    } else {
      loginBtn.style.display = 'inline-block';
      userInfo.style.display = 'none';
      userName.textContent = '';
    }
  }
}

function handleLogin(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    updateLoginStatus();
    window.location.href = 'index.html';
    return true;
  } else {
    return false;
  }
}

function handleRegister(name, email, password, confirmPassword) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return 'Email đã tồn tại!';
  }

  if (password !== confirmPassword) {
    return 'Mật khẩu không khớp!';
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(newUser));
  updateLoginStatus();
  return true;
}

function handleLogout() {
  localStorage.removeItem('user');
  updateLoginStatus();
  window.location.href = 'index.html';
}

// Product detail functions
function displayProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.querySelector('.product-detail-card').innerHTML = '<p>Sản phẩm không tồn tại!</p>';
    return;
  }

  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `${product.price.toLocaleString()} VNĐ`;
  document.getElementById('product-rating').textContent = `⭐ ${product.rating.toFixed(1)}`;
  document.getElementById('product-description').textContent = product.description || `Đây là ${product.name}. Sản phẩm chất lượng cao, phù hợp cho học tập và văn phòng.`;
  document.getElementById('product-status').textContent = product.inStock !== false ? 'Còn hàng' : 'Hết hàng';
}

// Quantity selector for product detail
function updateQuantity(change) {
  quantity = Math.max(1, quantity + change);
  const quantityElement = document.getElementById('quantity-value');
  if (quantityElement) {
    quantityElement.textContent = quantity;
  }
}

// Color selection
function setupColorSelection() {
  const colorButtons = document.querySelectorAll('.color-btn');
  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      colorButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Cart functions
function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) return;

  const selectedColor = document.querySelector('.color-btn.active').dataset.color;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: quantity,
    color: selectedColor
  };

  const existingItemIndex = cart.findIndex(item => item.id === product.id && item.color === selectedColor);
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

// Cart display function
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  if (!cartItemsContainer || !cartTotalElement) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống!</p>';
    cartTotalElement.textContent = '0 VNĐ';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80?text=Image+Not+Found';">
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name} (${item.color})</p>
        <p class="cart-item-price">${item.price.toLocaleString()} VNĐ</p>
        <div class="quantity-controls">
          <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">−</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-remove">
        <span class="cart-item-total">${itemTotal.toLocaleString()} VNĐ</span>
        <button class="remove-button" onclick="removeCartItem(${index})">Xóa</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = `${total.toLocaleString()} VNĐ`;
}

// Update cart item quantity
function updateCartQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity = Math.max(1, cart[index].quantity + change);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// Remove cart item
function removeCartItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// Profile functions
function displayProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const profileContent = document.getElementById('profile-content');
  const profileNotLoggedIn = document.getElementById('profile-not-logged-in');
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');

  if (!user) {
    if (profileNotLoggedIn && profileContent) {
      profileNotLoggedIn.style.display = 'block';
      profileContent.style.display = 'none';
    }
    return;
  }

  if (profileNotLoggedIn && profileContent && profileName && profileEmail) {
    profileNotLoggedIn.style.display = 'none';
    profileContent.style.display = 'block';
    profileName.value = user.name;
    profileEmail.value = user.email;
  }
}

function handleProfileUpdate(name, email, password, confirmPassword) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const profileError = document.getElementById('profile-error');

  if (!name || !email) {
    if (profileError) profileError.textContent = 'Vui lòng điền đầy đủ họ tên và email!';
    return false;
  }

  const existingUser = users.find(u => u.email === email && u.email !== currentUser.email);
  if (existingUser) {
    if (profileError) profileError.textContent = 'Email đã được sử dụng!';
    return false;
  }

  if (password && password !== confirmPassword) {
    if (profileError) profileError.textContent = 'Mật khẩu không khớp!';
    return false;
  }

  const updatedUser = {
    name,
    email,
    password: password || currentUser.password
  };

  const userIndex = users.findIndex(u => u.email === currentUser.email);
  if (userIndex >= 0) {
    users[userIndex] = updatedUser;
  } else {
    users.push(updatedUser);
  }

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(updatedUser));
  updateLoginStatus();
  if (profileError) profileError.textContent = '';
  alert('Cập nhật hồ sơ thành công!');
  return true;
}

// Checkout functions
function displayCheckout() {
  const user = JSON.parse(localStorage.getItem('user'));
  const checkoutContent = document.getElementById('checkout-content');
  const checkoutNotLoggedIn = document.getElementById('checkout-not-logged-in');
  const checkoutName = document.getElementById('checkout-name');
  const checkoutEmail = document.getElementById('checkout-email');
  const checkoutItemsContainer = document.getElementById('checkout-items');
  const checkoutTotalElement = document.getElementById('checkout-total');

  if (!user) {
    if (checkoutNotLoggedIn && checkoutContent) {
      checkoutNotLoggedIn.style.display = 'block';
      checkoutContent.style.display = 'none';
    }
    return;
  }

  if (checkoutNotLoggedIn && checkoutContent && checkoutName && checkoutEmail && checkoutItemsContainer && checkoutTotalElement) {
    checkoutNotLoggedIn.style.display = 'none';
    checkoutContent.style.display = 'block';
    checkoutName.value = user.name;
    checkoutEmail.value = user.email;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    checkoutItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      checkoutItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống!</p>';
      checkoutTotalElement.textContent = '0 VNĐ';
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const checkoutItem = document.createElement('div');
      checkoutItem.className = 'checkout-item';
      checkoutItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80?text=Image+Not+Found';">
        <div class="checkout-item-details">
          <p class="checkout-item-name">${item.name} (${item.color})</p>
          <p class="checkout-item-price">${item.price.toLocaleString()} VNĐ x ${item.quantity}</p>
          <p class="checkout-item-total">${itemTotal.toLocaleString()} VNĐ</p>
        </div>
      `;
      checkoutItemsContainer.appendChild(checkoutItem);
    });

    checkoutTotalElement.textContent = `${total.toLocaleString()} VNĐ`;
  }
}

function handleCheckout(name, email, address, phone, paymentMethod) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutError = document.getElementById('checkout-error');

  if (cart.length === 0) {
    if (checkoutError) checkoutError.textContent = 'Giỏ hàng của bạn đang trống!';
    return false;
  }

  if (!name || !email || !address || !phone) {
    if (checkoutError) checkoutError.textContent = 'Vui lòng điền đầy đủ thông tin!';
    return false;
  }

  const order = {
    id: Date.now(),
    userEmail: email,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    shipping: { name, address, phone },
    paymentMethod,
    date: new Date().toISOString(),
    status: 'pending'
  };

  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('cart', JSON.stringify([]));
  updateCartCount();
  alert('Đặt hàng thành công! Bạn sẽ được chuyển về trang chủ.');
  window.location.href = 'index.html';
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  updateLoginStatus();
  updateCartCount();

  // Slideshow for index.html
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    showSlides(slideIndex);
    // Check for search query in URL and apply it
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    const searchInput = document.getElementById('search-input');
    if (searchQuery && searchInput) {
      searchInput.value = decodeURIComponent(searchQuery);
      searchProducts();
    } else {
      displayProducts();
    }
  }

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchClear = document.querySelector('.search-clear');
  if (searchInput) {
    searchInput.addEventListener('input', searchProducts);
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      searchProducts();
    });
  }

  // Category filtering
  const categoryLinks = document.querySelectorAll('.dropdown-content a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-category');
      filterProducts(category);
    });
  });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Authentication event listeners
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginSubmit = document.getElementById('login-submit');
  const registerSubmit = document.getElementById('register-submit');
  const logoutBtn = document.getElementById('logout-btn');
  const tabs = document.querySelectorAll('.auth-tab');
  const switchToRegister = document.querySelector('.switch-to-register');
  const switchToLogin = document.querySelector('.switch-to-login');

  if (loginSubmit) {
    loginSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const loginError = document.getElementById('login-error');

      if (!email || !password) {
        if (loginError) loginError.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
      }

      const success = handleLogin(email, password);
      if (!success) {
        if (loginError) loginError.textContent = 'Email hoặc mật khẩu không đúng!';
      }
    });
  }

  if (registerSubmit) {
    registerSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      const registerError = document.getElementById('register-error');

      if (!name || !email || !password || !confirmPassword) {
        if (registerError) registerError.textContent = 'Vui lòng điền đầy đủ thông tin!';
        return;
      }

      const result = handleRegister(name, email, password, confirmPassword);
      if (result === true) {
        window.location.href = 'index.html';
      } else {
        if (registerError) registerError.textContent = result;
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
    });
  }

  if (tabs) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => form.classList.remove('active'));
        document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
      });
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector('[data-tab="register"]').classList.add('active');
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector('[data-tab="login"]').classList.add('active');
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }

  // Product detail event listeners
  if (window.location.pathname.includes('product-detail.html')) {
    displayProductDetail();
    setupColorSelection();

    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', addToCart);
    }

    const buyNowBtn = document.getElementById('buy-now');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        addToCart();
        window.location.href = 'cart.html';
      });
    }
  }

  // Cart event listeners
  if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
  }

  // Profile event listeners
  if (window.location.pathname.includes('profile.html')) {
    displayProfile();

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('profile-name').value;
        const email = document.getElementById('profile-email').value;
        const password = document.getElementById('profile-password').value;
        const confirmPassword = document.getElementById('profile-confirm-password').value;

        handleProfileUpdate(name, email, password, confirmPassword);
      });
    }
  }

  // Checkout event listeners
  if (window.location.pathname.includes('checkout.html')) {
    displayCheckout();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('checkout-name').value;
        const email = document.getElementById('checkout-email').value;
        const address = document.getElementById('checkout-address').value;
        const phone = document.getElementById('checkout-phone').value;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        handleCheckout(name, email, address, phone, paymentMethod);
      });
    }
  }

  // Contact form (placeholder for future functionality)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Tin nhắn đã được gửi! (Chức năng demo)');
      contactForm.reset();
    });
  }
});

// Expose functions to global scope for HTML onclick events
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;
window.updateQuantity = updateQuantity;
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;