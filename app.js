// Estado de la aplicación
const AppState = {
    currentSection: 'landing',
    user: null,
    isLoading: false,
    cart: []
};

// URLs de los endpoints
const API_ENDPOINTS = {
    login: 'http://localhost:5678/webhook-test/inicio-sesion',
    register: 'http://localhost:5678/webhook-test/registro-cm',
    saveCart: 'http://localhost:5678/webhook-test/guardar-carrito',
    addToCart: 'http://localhost:5678/webhook-test/carrito-cm'
};

// Productos disponibles - Unificando todos los productos
const todosLosProductos = [
    // Novedades
    { id: 1001, nombre: 'PinkSquirrell', precio: 680, precioOriginal: 880, imagen: 'img/pinkSquirrell.JPG', categoria: 'novedades', descripcion: 'Descripción detallada de PinkSquirrell.' },
    { id: 1002, nombre: 'SkinSense', precio: 461, precioOriginal: 667, imagen: 'img/SkinSense.jpg', categoria: 'novedades', descripcion: 'Descripción detallada de SkinSense.' },
    { id: 1003, nombre: 'PurpleStick', precio: 506, precioOriginal: 717, imagen: 'img/PurpleStick.jpg', categoria: 'novedades', descripcion: 'Descripción detallada de PurpleStick.' },
    { id: 1004, nombre: 'VibiVarita', precio: 522, precioOriginal: 734, imagen: 'img/VibiVarita.jpg', categoria: 'novedades', descripcion: 'Descripción detallada de VibiVarita.' },
    
    // Productos principales
    { id: 1, nombre: 'DinoRex', precio: 779, precioOriginal: 899, imagen: 'img/DinoRex.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de DinoRex.' },
    { id: 10, nombre: 'LaBolaManda', precio: 592, precioOriginal: 700, imagen: 'img/labolaManda.jpg', categoria: 'anales', descripcion: 'Descripción detallada de LaBolaManda.' },
    { id: 26, nombre: 'BackDoor1', precio: 665, precioOriginal: 800, imagen: 'img/backDoor1.jpg', categoria: 'anales', descripcion: 'Descripción detallada de BackDoor1.' },
    { id: 3, nombre: 'BackDoor2', precio: 665, precioOriginal: 800, imagen: 'img/backDoor2.jpg', categoria: 'anales', descripcion: 'Descripción detallada de BackDoor2 (alternativo).' },
    { id: 4, nombre: 'TentaCool', precio: 593, precioOriginal: 700, imagen: 'img/tentaCool.jpg', categoria: 'consoladores', descripcion: 'Descripción detallada de TentaCool.' },
    { id: 5, nombre: 'BlackStick', precio: 504, precioOriginal: 600, imagen: 'img/BlackStick.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de BlackStick.' },
    { id: 24, nombre: 'Amarre Completo', precio: 560, precioOriginal: 650, imagen: 'img/AmarreCompleto.jpg', categoria: 'restriccion', descripcion: 'Esposas de felpa ajustables, antifaz, mordaza y flogger de flecos suaves para explorar nuevas sensaciones. Todo en una bolsa discreta, perfecto para parejas principiantes en BDSM que buscan jugar con confianza y elegancia.' },
    { id: 58, nombre: 'Amarre Completo2', precio: 320, precioOriginal: 420, imagen: 'img/AmarreCompleto2.JPG', categoria: 'restriccion', descripcion: 'Dilatador anal de acero inoxidable con longitud ajustable gracias a su tornillo de presión. Ofrece un control preciso y un tacto frío que aviva el deseo. Viene en una bolsa discreta, ideal para parejas principiantes en BDSM.' },
    { id: 25, nombre: 'MagicHop', precio: 468, precioOriginal: 550, imagen: 'img/MagicHop.jpg', categoria: 'vibradores', descripcion: 'Descripción detallada de MagicHop.' },
    { id: 18, nombre: 'HoldKit', precio: 416, precioOriginal: 500, imagen: 'img/HoldKit.jpg', categoria: 'restriccion', descripcion: 'Descripción detallada de HoldKit.' },
    { id: 21, nombre: 'HuevitoPink', precio: 495, precioOriginal: 600, imagen: 'img/HuevitoPink.jpg', categoria: 'vibradores', descripcion: 'Descripción detallada de HuevitoPink.' },
    { id: 22, nombre: 'KitDobleSujeción', precio: 399, precioOriginal: 500, imagen: 'img/KitDobleSujecion.JPG', categoria: 'restriccion', descripcion: 'Descripción detallada de KitDobleSujeción.' },
    { id: 27, nombre: 'MoraLiza', precio: 360, precioOriginal: 450, imagen: 'img/MoraLiza.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de MoraLiza.' },
    { id: 23, nombre: 'VibrayPega', precio: 360, precioOriginal: 450, imagen: 'img/VibrayPega.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de VibrayPega.' },
    { id: 20, nombre: 'CabeZone', precio: 546, precioOriginal: 650, imagen: 'img/CabeZone.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de CabeZone.' },
    { id: 6, nombre: 'PalitoClarito', precio: 509, precioOriginal: 600, imagen: 'img/PalitoClarito.jpg', categoria: 'consoladores', descripcion: 'Descripción detallada de PalitoClarito.' },
    { id: 17, nombre: 'PaQuEncaje', precio: 231, precioOriginal: 300, imagen: 'img/PaqEncaje.JPG', categoria: 'anales', descripcion: 'Descripción detallada de PaQuEncaje.' },
    { id: 11, nombre: 'PinzasBDSM', precio: 296, precioOriginal: 400, imagen: 'img/PinzasBDSM.JPG', categoria: 'restriccion', descripcion: 'Descripción detallada de PinzasBDSM.' },
    { id: 9, nombre: 'DaleDoble', precio: 252, precioOriginal: 350, imagen: 'img/DaleDoble.jpg', categoria: 'consoladores', descripcion: 'Descripción detallada de DaleDoble.' },
    { id: 13, nombre: 'BolasDeDiez', precio: 211, precioOriginal: 300, imagen: 'img/BolasDeDiez.JPG', categoria: 'consoladores', descripcion: 'Descripción detallada de BolasDeDiez.' },
    { id: 19, nombre: 'SetSujetaFirme', precio: 220, precioOriginal: 300, imagen: 'img/KitDobleSujecion.JPG', categoria: 'restriccion', descripcion: 'Descripción detallada de SetSujetaFirme.' },
    
    // Productos básicos
    { id: 101, nombre: 'Básico 1', precio: 87, precioOriginal: 150, imagen: 'img/basic001.JPG', categoria: 'básicos', descripcion: 'Un plug anal básico de silicona negra, de tamaño chico, suave y cómodo, con forma ergonómica para iniciarse con delicadeza en el juego trasero.' },
    { id: 102, nombre: 'Básico 2', precio: 87, precioOriginal: 150, imagen: 'img/basic002.JPG', categoria: 'básicos', descripcion: 'Un plug anal básico de silicona negra, de tamaño chico, suave y cómodo, con forma ergonómica para iniciarse con delicadeza en el juego trasero.' },
    { id: 103, nombre: 'Básico 3', precio: 87, precioOriginal: 150, imagen: 'img/basic003.JPG', categoria: 'básicos', descripcion: 'Un plug anal básico de silicona negra, de tamaño mediano, suave y cómodo, con forma ergonómica para iniciarse con delicadeza en el juego trasero.' },
    { id: 104, nombre: 'Básico 4', precio: 87, precioOriginal: 150, imagen: 'img/basic004.JPG', categoria: 'básicos', descripcion: 'Anillo de silicona transparente en tono púrpura, con un cuello de 5–8 cm de longitud para un deslizamiento suave y cómodo.' },
    { id: 105, nombre: 'Básico 5', precio: 87, precioOriginal: 150, imagen: 'img/basic005.JPG', categoria: 'básicos', descripcion: 'Un plug anal básico de silicona negra, de tamaño chico, suave y cómodo, con forma ergonómica para iniciarse con delicadeza en el juego trasero.' },
    { id: 106, nombre: 'Básico 6', precio: 87, precioOriginal: 150, imagen: 'img/basic006.JPG', categoria: 'básicos', descripcion: 'Tira flexible de bolitas de silicona médica suave para estímulos progresivos: introduce y retira cada perla para regular la sensación. Viene en bolsa discreta, perfecta para parejas principiantes en BDSM.' },
    { id: 107, nombre: 'Básico 7', precio: 82, precioOriginal: 150, imagen: 'img/basic007.JPG', categoria: 'básicos', descripcion: 'Un plug anal básico de silicona negra, de tamaño mediano, suave y cómodo, con forma ergonómica para iniciarse con delicadeza en el juego trasero.' },
    { id: 108, nombre: 'Básico 8', precio: 120, precioOriginal: 180, imagen: 'img/basic008.JPG', categoria: 'básicos', descripcion: 'Plug anal de acero inoxidable pulido, con base engastada en forma de diamante facetado que refleja la luz con cada movimiento. Su superficie lisa y curva ergonómica facilita la inserción suave, mientras la gema añade un toque de glamour y seducción.' },
    { id: 109, nombre: 'Básico 9', precio: 120, precioOriginal: 180, imagen: 'img/basic009.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 110, nombre: 'Básico 10', precio: 120, precioOriginal: 180, imagen: 'img/basic010.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 111, nombre: 'Básico 11', precio: 87, precioOriginal: 150, imagen: 'img/basic011.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 112, nombre: 'Básico 12', precio: 112, precioOriginal: 160, imagen: 'img/basic012.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 113, nombre: 'Básico 13', precio: 98, precioOriginal: 150, imagen: 'img/basic013.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 114, nombre: 'Básico 14', precio: 120, precioOriginal: 180, imagen: 'img/basic014.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 115, nombre: 'Básico 15', precio: 92, precioOriginal: 140, imagen: 'img/basic015.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 116, nombre: 'Básico 16', precio: 57, precioOriginal: 130, imagen: 'img/basic016.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 117, nombre: 'Básico 17', precio: 76, precioOriginal: 140, imagen: 'img/basic017.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    { id: 118, nombre: 'Básico 18', precio: 76, precioOriginal: 150, imagen: 'img/basic018.JPG', categoria: 'básicos', descripcion: 'Descripción detallada del producto' },
    
    // Joyería Sexy
    { id: 201, nombre: 'Joyería Sexy 1', precio: 256, precioOriginal: 350, imagen: 'img/j001.JPG', categoria: 'joyeria', descripcion: 'Descripción detallada del producto' },
    { id: 202, nombre: 'Joyería Sexy 2', precio: 132, precioOriginal: 267, imagen: 'img/j002.JPG', categoria: 'joyeria', descripcion: 'Descripción detallada del producto' },
    { id: 203, nombre: 'Joyería Sexy 3', precio: 256, precioOriginal: 378, imagen: 'img/j003.JPG', categoria: 'joyeria', descripcion: 'Descripción detallada del producto' },
    { id: 204, nombre: 'Joyería Sexy 4', precio: 236, precioOriginal: 340, imagen: 'img/j004.JPG', categoria: 'joyeria', descripcion: 'Descripción detallada del producto' },
    { id: 205, nombre: 'Joyería Sexy 5', precio: 256, precioOriginal: 323, imagen: 'img/j005.JPG', categoria: 'joyeria', descripcion: 'Descripción detallada del producto' },
    { id: 206, nombre: 'Joyería Sexy 6', precio: 146, precioOriginal: 186, imagen: 'img/j006.JPG', categoria: 'joyeria', descripcion: 'Descripción detallada del producto' },
    
    // Lencería
    { id: 301, nombre: 'Lencería 1', precio: 420, precioOriginal: 513, imagen: 'img/lnc001.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 302, nombre: 'Lencería 2', precio: 134, precioOriginal: 180, imagen: 'img/lnc002.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 303, nombre: 'Lencería 3', precio: 452, precioOriginal: 580, imagen: 'img/lnc003.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 304, nombre: 'Lencería 4', precio: 113, precioOriginal: 167, imagen: 'img/lnc004.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 305, nombre: 'Lencería 5', precio: 420, precioOriginal: 513, imagen: 'img/lnc005.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 306, nombre: 'Lencería 6', precio: 380, precioOriginal: 420, imagen: 'img/lnc006.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 307, nombre: 'Lencería 7', precio: 380, precioOriginal: 420, imagen: 'img/lnc007.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 308, nombre: 'Lencería 8', precio: 380, precioOriginal: 420, imagen: 'img/lnc008.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 309, nombre: 'Lencería 9', precio: 120, precioOriginal: 170, imagen: 'img/lnc009.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 310, nombre: 'Lencería 10', precio: 380, precioOriginal: 420, imagen: 'img/lnc010.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 311, nombre: 'Lencería 11', precio: 380, precioOriginal: 420, imagen: 'img/lnc011.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 312, nombre: 'Lencería 12', precio: 380, precioOriginal: 420, imagen: 'img/lnc012.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 313, nombre: 'Lencería 13', precio: 240, precioOriginal: 320, imagen: 'img/lnc013.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' },
    { id: 314, nombre: 'Lencería 14', precio: 380, precioOriginal: 420, imagen: 'img/lnc014.JPG', categoria: 'lenceria', descripcion: 'Descripción detallada del producto' }
];

// Elementos del DOM
const elements = {
    sections: {
        landing: document.getElementById('landing'),
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        dashboard: document.getElementById('dashboard')
    },
    buttons: {
        login: document.getElementById('btn-login'),
        register: document.getElementById('btn-register'),
        backFromLogin: document.getElementById('back-from-login'),
        backFromRegister: document.getElementById('back-from-register'),
        logout: document.getElementById('logout-btn'),
        cart: document.getElementById('cart-btn')
    },
    forms: {
        login: document.getElementById('loginForm'),
        register: document.getElementById('registerForm')
    },
    messages: {
        login: document.getElementById('login-message'),
        register: document.getElementById('register-message'),
        dashboard: document.getElementById('dashboard-message')
    },
    loading: document.getElementById('loading'),
    welcomeMessage: document.getElementById('welcome-message')
};

// Funciones de navegación
function showSection(sectionName) {
    // Ocultar todas las secciones
    Object.values(elements.sections).forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección solicitada
    elements.sections[sectionName].classList.add('active');
    AppState.currentSection = sectionName;
    
    // Limpiar mensajes
    clearMessages();
}

function showLanding() {
    showSection('landing');
}

function showLoginForm() {
    showSection('loginForm');
    elements.forms.login.reset();
}

function showRegisterForm() {
    showSection('registerForm');
    elements.forms.register.reset();
}

function showDashboard(nombre, telefono = null) {
    AppState.user = { nombre, telefono };
    elements.welcomeMessage.textContent = `Bienvenida, ${nombre}`;
    showSection('dashboard');
    
    // Cargar productos al mostrar el dashboard
    loadProducts();
    setupProductFilters();
    
    // Actualizar contador del carrito
    updateCartCount();
}

function showPublicDashboard() {
    // Limpiar estado de usuario
    AppState.user = null;
    
    // Mostrar dashboard en modo público
    elements.welcomeMessage.textContent = 'Bienvenida a Cherry Mary';
    showSection('dashboard');
    
    // Cargar productos
    loadProducts();
    setupProductFilters();
    
    // Ocultar elementos que requieren autenticación
    updateDashboardForPublicMode();
    
    console.log('Dashboard público mostrado');
}

function showAuthenticatedDashboard(nombre, telefono = null) {
    AppState.user = { nombre, telefono };
    elements.welcomeMessage.textContent = `Bienvenida, ${nombre}`;
    showSection('dashboard');
    
    // Cargar productos al mostrar el dashboard
    loadProducts();
    setupProductFilters();
    
    // Mostrar elementos que requieren autenticación
    updateDashboardForAuthenticatedMode();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    console.log('Dashboard autenticado mostrado para:', nombre);
}

function updateDashboardForPublicMode() {
    // Ocultar botón de carrito y logout en modo público
    const cartBtn = document.getElementById('cart-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const headerActions = document.querySelector('.header-actions');
    
    if (cartBtn) cartBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
    
    // Agregar botones de login/registro si no existen
    if (headerActions && !document.getElementById('public-login-btn')) {
        const loginBtn = document.createElement('button');
        loginBtn.id = 'public-login-btn';
        loginBtn.className = 'btn btn-primary';
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
        loginBtn.addEventListener('click', showLoginForm);
        
        const registerBtn = document.createElement('button');
        registerBtn.id = 'public-register-btn';
        registerBtn.className = 'btn btn-secondary';
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Registrarse';
        registerBtn.addEventListener('click', showRegisterForm);
        
        headerActions.appendChild(loginBtn);
        headerActions.appendChild(registerBtn);
    }
}

function updateDashboardForAuthenticatedMode() {
    // Mostrar botón de carrito y logout en modo autenticado
    const cartBtn = document.getElementById('cart-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (cartBtn) cartBtn.style.display = 'flex';
    if (logoutBtn) logoutBtn.style.display = 'flex';
    
    // Remover botones de login/registro públicos
    const publicLoginBtn = document.getElementById('public-login-btn');
    const publicRegisterBtn = document.getElementById('public-register-btn');
    
    if (publicLoginBtn) publicLoginBtn.remove();
    if (publicRegisterBtn) publicRegisterBtn.remove();
}

// Funciones de utilidad
function showLoading() {
    AppState.isLoading = true;
    elements.loading.classList.remove('hidden');
}

function hideLoading() {
    AppState.isLoading = false;
    elements.loading.classList.add('hidden');
}

function showMessage(elementId, message, type = 'error') {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 3000);
        }
    }
}

function clearMessages() {
    Object.values(elements.messages).forEach(message => {
        message.style.display = 'none';
        message.textContent = '';
        message.className = 'message';
    });
}

function showAuthRequired(action) {
    // Crear modal de autenticación requerida
    const modal = document.createElement('div');
    modal.className = 'auth-required-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="auth-required-content">
                <div class="auth-required-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h3>Inicia sesión para continuar</h3>
                <p>Para ${action}, necesitas tener una cuenta en Cherry Mary.</p>
                <div class="auth-required-actions">
                    <button class="btn btn-primary" onclick="closeAuthRequiredModal(); showLoginForm();">
                        <i class="fas fa-sign-in-alt"></i>
                        Iniciar Sesión
                    </button>
                    <button class="btn btn-secondary" onclick="closeAuthRequiredModal(); showRegisterForm();">
                        <i class="fas fa-user-plus"></i>
                        Registrarse
                    </button>
                    <button class="btn btn-outline" onclick="closeAuthRequiredModal();">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar evento para cerrar con click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAuthRequiredModal();
        }
    });
    
    // Agregar evento para cerrar con ESC
    document.addEventListener('keydown', handleAuthModalEscape);
}

function closeAuthRequiredModal() {
    const modal = document.querySelector('.auth-required-modal');
    if (modal) {
        modal.remove();
        document.removeEventListener('keydown', handleAuthModalEscape);
    }
}

function handleAuthModalEscape(e) {
    if (e.key === 'Escape') {
        closeAuthRequiredModal();
    }
}

function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        showMessage('register-message', 'Las contraseñas no coinciden', 'error');
        return false;
    }
    return true;
}

function validateAge(fechaNacimiento) {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        showMessage('register-message', 'Debes ser mayor de 18 años para registrarte', 'error');
        return false;
    }
    return true;
}

// Funciones de API
async function loginUser(telefono, password) {
    try {
        showLoading();
        console.log('Iniciando solicitud de login a:', API_ENDPOINTS.login);
        
        const requestData = {
            accion: "login",
            telefono: telefono,
            password: password
        };
        
        console.log('Datos de la solicitud:', requestData);
        
        const response = await fetch(API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors', // Explícitamente usar CORS
            credentials: 'omit', // No enviar cookies
            body: JSON.stringify(requestData)
        });

        console.log('Respuesta recibida:', response.status, response.statusText);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos parseados:', data);
        
        if (data.login === true) {
            showMessage('login-message', 'Inicio de sesión exitoso', 'success');
            // Guardar sesión del usuario
            saveUserSession({ nombre: data.nombre, telefono: telefono });
            setTimeout(() => {
                showAuthenticatedDashboard(data.nombre, telefono);
            }, 1000);
        } else {
            showMessage('login-message', data.mensaje || 'Usuario o contraseña incorrecta', 'error');
        }
    } catch (error) {
        const friendlyMessage = createFriendlyErrorMessage(error, 'inicio de sesión');
        showMessage('login-message', friendlyMessage, 'error');
    } finally {
        hideLoading();
    }
}

async function registerUser(userData) {
    try {
        showLoading();
        console.log('Iniciando solicitud de registro a:', API_ENDPOINTS.register);
        console.log('Datos del usuario:', userData);
        
        const response = await fetch(API_ENDPOINTS.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors', // Explícitamente usar CORS
            credentials: 'omit', // No enviar cookies
            body: JSON.stringify(userData)
        });

        console.log('Respuesta recibida:', response.status, response.statusText);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos parseados:', data);
        
        if (data.success === true || data.registro === true) {
            showMessage('register-message', 'Registro exitoso. Bienvenida a Cherry Mary!', 'success');
            // Guardar sesión del usuario
            saveUserSession({ nombre: userData.nombre, telefono: userData.telefono });
            setTimeout(() => {
                // Redirigir directamente al dashboard con los datos del usuario registrado
                showAuthenticatedDashboard(userData.nombre, userData.telefono);
            }, 1500);
        } else if (data.mensaje && data.mensaje.includes('ya está registrado')) {
            showMessage('register-message', 'Ya tienes una cuenta. Te llevamos al Dashboard!', 'success');
            // Guardar sesión del usuario
            saveUserSession({ nombre: userData.nombre, telefono: userData.telefono });
            setTimeout(() => {
                // Si ya está registrado, también redirigir al dashboard
                showAuthenticatedDashboard(userData.nombre, userData.telefono);
            }, 1500);
        } else {
            showMessage('register-message', data.mensaje || 'Error en el registro. Intenta nuevamente.', 'error');
        }
    } catch (error) {
        const friendlyMessage = createFriendlyErrorMessage(error, 'registro');
        showMessage('register-message', friendlyMessage, 'error');
    } finally {
        hideLoading();
    }
}

// Event listeners
function setupEventListeners() {
    // Navegación principal
    elements.buttons.login.addEventListener('click', showLoginForm);
    elements.buttons.register.addEventListener('click', showRegisterForm);
    elements.buttons.backFromLogin.addEventListener('click', showPublicDashboard);
    elements.buttons.backFromRegister.addEventListener('click', showPublicDashboard);
    elements.buttons.logout.addEventListener('click', () => {
        // Limpiar sesión del usuario
        clearUserSession();
        AppState.user = null;
        AppState.cart = [];
        localStorage.removeItem('cherryMaryCart');
        
        // Mostrar dashboard público
        showPublicDashboard();
        
        showMessage('dashboard-message', 'Sesión cerrada exitosamente', 'success');
    });
    
    // Carrito
    elements.buttons.cart.addEventListener('click', showCartModal);

    // Formulario de login
    elements.forms.login.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const telefono = formData.get('telefono').trim();
        const password = formData.get('password').trim();
        
        if (!telefono || !password) {
            showMessage('login-message', 'Por favor completa todos los campos', 'error');
            return;
        }
        
        await loginUser(telefono, password);
    });

    // Formulario de registro
    elements.forms.register.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            nombre: formData.get('nombre').trim(),
            apellido: formData.get('apellido').trim(),
            telefono: formData.get('telefono').trim(),
            whatsapp: formData.get('whatsapp') ? 'si' : 'no',
            fechaNacimiento: formData.get('fechaNacimiento'),
            password: formData.get('password').trim(),
            confirmPassword: formData.get('confirmPassword').trim()
        };
        
        // Validaciones
        if (!userData.nombre || !userData.apellido || !userData.telefono || 
            !userData.fechaNacimiento || !userData.password || !userData.confirmPassword) {
            showMessage('register-message', 'Por favor completa todos los campos', 'error');
            return;
        }
        
        if (!validatePasswords(userData.password, userData.confirmPassword)) {
            return;
        }
        
        if (!validateAge(userData.fechaNacimiento)) {
            return;
        }
        
        // Remover confirmPassword antes de enviar
        delete userData.confirmPassword;
        
        // Agregar accion al userData
        userData.accion = "signup";
        
        await registerUser(userData);
    });

    // Toggle de contraseñas
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.closest('.toggle-password').dataset.target;
            const passwordInput = document.getElementById(targetId);
            const icon = e.target.closest('.toggle-password').querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Hover effects para las tarjetas de categorías y cerrar modal
    document.addEventListener('click', (e) => {
        const productModal = document.getElementById('product-modal');
        const cartModal = document.getElementById('cart-modal');
        
        if (e.target === productModal) {
            closeProductModal();
        }
        
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCartModal();
        }
    });
}

// Función de inicialización
function initApp() {
    setupEventListeners();
    // Mostrar dashboard directamente como vista pública
    showPublicDashboard();
    
    // Probar conectividad con el servidor al iniciar
    testServerConnection().then(isConnected => {
        if (!isConnected) {
            console.warn('⚠️ No se puede conectar con n8n en localhost:5678');
            console.log('💡 Asegúrate de que n8n esté ejecutándose antes de usar la aplicación');
        } else {
            console.log('✅ Conectividad con n8n confirmada');
        }
    });
    
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('cherryMaryUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            showAuthenticatedDashboard(user.nombre, user.telefono);
        } catch (error) {
            localStorage.removeItem('cherryMaryUser');
        }
    }
    
    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('cherryMaryCart');
    if (savedCart) {
        try {
            AppState.cart = JSON.parse(savedCart);
            updateCartCount();
        } catch (error) {
            localStorage.removeItem('cherryMaryCart');
            AppState.cart = [];
        }
    }
}

// Funciones para manejo de productos
function loadProducts(categoria = 'todos') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // Filtrar productos según la categoría
    let productosFiltrados = todosLosProductos;
    if (categoria !== 'todos') {
        productosFiltrados = todosLosProductos.filter(producto => producto.categoria === categoria);
    }
    
    // Limpiar el grid
    productsGrid.innerHTML = '';
    
    // Crear las tarjetas de productos
    productosFiltrados.forEach(producto => {
        const productCard = createProductCard(producto);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(producto) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='img/placeholder.jpg'">
        </div>
        <div class="product-info">
            <h3 class="product-name">${producto.nombre}</h3>
            <div class="product-price">
                ${producto.precioOriginal ? `<span class="original-price">$${producto.precioOriginal} MXN</span>` : ''}
                <span class="current-price">$${producto.precio} MXN</span>
            </div>
            <p class="product-description">${producto.descripcion || 'Descripción no disponible'}</p>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${producto.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Agregar
                </button>
                <button class="view-details-btn" onclick="showProductModal(${producto.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            button.classList.add('active');
            
            // Obtener la categoría y cargar productos
            const categoria = button.getAttribute('data-category');
            loadProducts(categoria);
        });
    });
}

function showProductModal(productId) {
    const producto = todosLosProductos.find(p => p.id === productId);
    if (!producto) return;
    
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-product-img');
    const modalName = document.getElementById('modal-product-name');
    const modalOriginal = document.getElementById('modal-product-original');
    const modalCurrent = document.getElementById('modal-product-current');
    const modalDescription = document.getElementById('modal-product-description');
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    
    // Llenar el modal con los datos del producto
    modalImg.src = producto.imagen;
    modalImg.alt = producto.nombre;
    modalName.textContent = producto.nombre;
    modalOriginal.textContent = producto.precioOriginal ? `$${producto.precioOriginal} MXN` : '';
    modalCurrent.textContent = `$${producto.precio} MXN`;
    modalDescription.textContent = producto.descripcion || 'Descripción no disponible';
    
    // Configurar el botón de agregar al carrito
    modalAddToCart.onclick = () => {
        // Verificar autenticación antes de agregar al carrito
        if (!AppState.user) {
            closeProductModal();
            showAuthRequired('agregar productos al carrito');
            return;
        }
        
        addToCart(productId);
        closeProductModal();
    };
    
    // Mostrar el modal
    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

function addToCart(productId) {
    // Verificar si el usuario está autenticado
    if (!AppState.user) {
        showAuthRequired('agregar productos al carrito');
        return;
    }
    
    const producto = todosLosProductos.find(p => p.id === productId);
    if (!producto) return;
    
    // Buscar si el producto ya está en el carrito
    let existingItem = AppState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        AppState.cart.push({ ...producto, cantidad: 1 });
    }
    
    // Actualizar localStorage
    localStorage.setItem('cherryMaryCart', JSON.stringify(AppState.cart));
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Mostrar mensaje de confirmación
    showMessage('dashboard-message', `${producto.nombre} agregado al carrito`, 'success');
    
    // Enviar producto al endpoint específico de carrito
    sendProductToCart(producto, existingItem ? existingItem.cantidad : 1);
    
    // Enviar a la base de datos (función existente)
    saveCartToDatabase();
    
    console.log('Producto agregado al carrito:', producto);
}

async function sendProductToCart(producto, cantidad) {
    if (!AppState.user) {
        console.warn('No hay usuario logueado para enviar producto al carrito');
        return;
    }
    
    try {
        const cartItemData = {
            accion: 'agregar',
            usuario: AppState.user.nombre,
            telefono: AppState.user.telefono || 'N/A',
            producto: {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                precioOriginal: producto.precioOriginal,
                imagen: producto.imagen,
                categoria: producto.categoria,
                descripcion: producto.descripcion
            },
            cantidad: cantidad,
            subtotal: producto.precio * cantidad,
            fecha: new Date().toISOString()
        };
        
        console.log('Enviando producto al endpoint de carrito:', cartItemData);
        
        const response = await fetch(API_ENDPOINTS.addToCart, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'omit',
            body: JSON.stringify(cartItemData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Producto enviado exitosamente al carrito:', result);
        
    } catch (error) {
        console.error('Error al enviar producto al carrito:', error);
        // No mostramos error al usuario para no interrumpir la experiencia
    }
}

async function saveCartToDatabase() {
    if (!AppState.user || AppState.cart.length === 0) return;
    
    try {
        const cartData = {
            accion: "guardar_carrito",
            usuario: AppState.user.nombre,
            telefono: AppState.user.telefono || 'N/A',
            productos: AppState.cart.map(item => ({
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.cantidad,
                imagen: item.imagen
            })),
            total: calculateCartTotal(),
            fecha: new Date().toISOString()
        };
        
        console.log('Enviando carrito a la base de datos:', cartData);
        
        const response = await fetch(API_ENDPOINTS.saveCart, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'omit',
            body: JSON.stringify(cartData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Carrito guardado exitosamente:', result);
        
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
        // No mostramos error al usuario para no interrumpir la experiencia
    }
}

function shareProduct() {
    // Implementar función para compartir producto
    if (navigator.share) {
        navigator.share({
            title: 'Cherry Mary - Producto',
            text: 'Mira este producto increíble',
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Enlace copiado al portapapeles');
        });
    }
}

// Funciones del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = AppState.cart.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
}

function showCartModal() {
    // Verificar si el usuario está autenticado
    if (!AppState.user) {
        showAuthRequired('ver tu carrito');
        return;
    }
    
    const modal = document.getElementById('cart-modal');
    loadCartItems();
    modal.style.display = 'flex';
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotal = document.getElementById('cart-total');
    
    if (AppState.cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartEmpty.style.display = 'block';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItemsContainer.style.display = 'flex';
    cartEmpty.style.display = 'none';
    
    cartItemsContainer.innerHTML = '';
    
    AppState.cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = calculateCartTotal();
}

function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='img/placeholder.jpg'">
        </div>
        <div class="cart-item-info">
            <div class="cart-item-name">${item.nombre}</div>
            <div class="cart-item-price">$${item.precio} MXN</div>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="quantity-display">${item.cantidad}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return cartItem;
}

function changeQuantity(productId, change) {
    const item = AppState.cart.find(item => item.id === productId);
    if (!item) return;
    
    item.cantidad += change;
    
    if (item.cantidad <= 0) {
        removeFromCart(productId);
        return;
    }
    
    // Actualizar localStorage
    localStorage.setItem('cherryMaryCart', JSON.stringify(AppState.cart));
    
    // Actualizar vista
    loadCartItems();
    updateCartCount();
    
    // Guardar en base de datos
    saveCartToDatabase();
}

function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    
    // Actualizar localStorage
    localStorage.setItem('cherryMaryCart', JSON.stringify(AppState.cart));
    
    // Actualizar vista
    loadCartItems();
    updateCartCount();
    
    // Guardar en base de datos
    saveCartToDatabase();
}

function clearCart() {
    if (confirm('¿Estás segura de que quieres vaciar el carrito?')) {
        // Enviar acción de limpiar carrito al endpoint
        sendClearCartAction();
        
        AppState.cart = [];
        localStorage.removeItem('cherryMaryCart');
        loadCartItems();
        updateCartCount();
        saveCartToDatabase();
    }
}

async function sendClearCartAction() {
    if (!AppState.user) {
        console.warn('No hay usuario logueado para enviar acción de limpiar carrito');
        return;
    }
    
    try {
        const clearCartData = {
            accion: 'limpiar',
            usuario: AppState.user.nombre,
            telefono: AppState.user.telefono || 'N/A',
            fecha: new Date().toISOString()
        };
        
        console.log('Enviando acción de limpiar carrito:', clearCartData);
        
        const response = await fetch(API_ENDPOINTS.addToCart, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'omit',
            body: JSON.stringify(clearCartData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Acción de limpiar carrito enviada exitosamente:', result);
        
    } catch (error) {
        console.error('Error al enviar acción de limpiar carrito:', error);
        // No mostramos error al usuario para no interrumpir la experiencia
    }
}

function calculateCartTotal() {
    return AppState.cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

async function processOrder() {
    if (AppState.cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = calculateCartTotal();
    const itemCount = AppState.cart.reduce((sum, item) => sum + item.cantidad, 0);
    
    if (confirm(`¿Procesar pedido por $${total} MXN (${itemCount} productos)?`)) {
        try {
            showLoading();
            
            // Aquí puedes agregar la lógica para procesar el pedido
            // Por ejemplo, enviar a otro endpoint de n8n
            
            // Simular procesamiento
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            alert('¡Pedido procesado exitosamente! Te contactaremos pronto.');
            
            // Limpiar carrito después del pedido
            AppState.cart = [];
            localStorage.removeItem('cherryMaryCart');
            loadCartItems();
            updateCartCount();
            closeCartModal();
            
        } catch (error) {
            alert('Error al procesar el pedido. Intenta nuevamente.');
            console.error('Error:', error);
        } finally {
            hideLoading();
        }
    }
}
function saveUserSession(userData) {
    localStorage.setItem('cherryMaryUser', JSON.stringify(userData));
}

function clearUserSession() {
    localStorage.removeItem('cherryMaryUser');
}

// Función para probar la conectividad con el servidor
async function testServerConnection() {
    try {
        // Intentar hacer un request simple al servidor n8n
        const response = await fetch('http://localhost:5678/', {
            method: 'GET',
            mode: 'no-cors' // Para evitar errores CORS en la prueba
        });
        
        console.log('Servidor n8n parece estar disponible');
        return true;
    } catch (error) {
        console.warn('No se puede conectar con el servidor n8n:', error);
        return false;
    }
}

// Función para mostrar instrucciones de configuración CORS
function showCorsInstructions() {
    console.group('🔧 Instrucciones para configurar CORS en n8n');
    console.log('1. En n8n, ve a Settings > Security');
    console.log('2. Agrega estos headers en "Additional CORS Headers":');
    console.log('   Access-Control-Allow-Origin: *');
    console.log('   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    console.log('   Access-Control-Allow-Headers: Content-Type, Authorization');
    console.log('3. O alternativamente, usa un proxy local para desarrollo');
    console.groupEnd();
}

// Función para crear un mensaje de error amigable
function createFriendlyErrorMessage(error, context = 'operación') {
    let userMessage = '';
    let technicalDetails = '';
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userMessage = '🚫 No se puede conectar con el servidor';
        technicalDetails = 'Error de red o CORS. Verifica que n8n esté ejecutándose y configurado correctamente.';
    } else if (error.message.includes('CORS')) {
        userMessage = '🔒 Problema de permisos del navegador';
        technicalDetails = 'Error CORS. El servidor debe permitir solicitudes desde este origen.';
        showCorsInstructions();
    } else if (error.message.includes('HTTP error')) {
        userMessage = '⚠️ Error del servidor';
        technicalDetails = `El servidor respondió con error: ${error.message}`;
    } else {
        userMessage = '❌ Error inesperado';
        technicalDetails = 'Error no identificado. Revisa la consola para más detalles.';
    }
    
    console.error(`Error en ${context}:`, {
        userMessage,
        technicalDetails,
        originalError: error
    });
    
    return `${userMessage}\n\n💡 Solución: ${technicalDetails}`;
}

// Función para formatear el número de teléfono
function formatPhoneNumber(input) {
    // Remover caracteres no numéricos
    let value = input.value.replace(/\D/g, '');
    
    // Formatear según el patrón mexicano
    if (value.length >= 10) {
        value = value.substring(0, 10);
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    
    input.value = value;
}

// Aplicar formato a los campos de teléfono
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada:', event.reason);
});

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);

// Exportar funciones para uso externo si es necesario
window.CherryMaryApp = {
    showLanding,
    showLoginForm,
    showRegisterForm,
    showDashboard,
    showPublicDashboard,
    showAuthenticatedDashboard,
    closeAuthRequiredModal,
    AppState
};
