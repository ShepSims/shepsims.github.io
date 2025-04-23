// Auth UI Controller
// Handles user authentication UI and logic

// Utility function to check if a form control is focused
// This function is used by keyboard event listeners across the app
window.isFormControlFocused = function() {
    const activeElement = document.activeElement;
    
    // First, check if activeElement is valid
    if (!activeElement) return false;
    
    // Check form control tags
    const formTags = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'OPTION'];
    if (formTags.includes(activeElement.tagName)) {
        return true;
    }
    
    // Check for contenteditable elements
    if (activeElement.hasAttribute('contenteditable') && 
        activeElement.getAttribute('contenteditable') !== 'false') {
        return true;
    }
    
    // Check if element is within a form or an element with role="form"
    let parent = activeElement;
    while (parent !== null) {
        if (parent.tagName === 'FORM' || parent.getAttribute('role') === 'form') {
            return true;
        }
        parent = parent.parentElement;
    }
    
    // Check for auth modal specifically
    const authModal = document.getElementById('authModal');
    if (authModal && authModal.style.display !== 'none') {
        // If auth modal is visible, consider it as a form control context
        if (authModal.contains(activeElement)) {
            return true;
        }
        
        // If auth modal is visible, also check if we're inside it
        const modalRect = authModal.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();
        
        // If auth modal is shown, check if cursor is inside it
        if (window.event) {
            const x = window.event.clientX;
            const y = window.event.clientY;
            
            if (x >= modalRect.left && x <= modalRect.right && 
                y >= modalRect.top && y <= modalRect.bottom) {
                return true;
            }
        }
    }
    
    // Check for login/signup forms specifically
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if ((loginForm && loginForm.contains(activeElement)) || 
        (signupForm && signupForm.contains(activeElement))) {
        return true;
    }
    
    return false;
};

// Global handler to prevent keyboard events from bubbling when in form controls
// This ensures that app keyboard shortcuts don't interfere with typing
document.addEventListener('keydown', function(e) {
    const activeElement = document.activeElement;
    
    // If a form element is focused, stop propagation for specific keys
    // that are used in the app's keyboard shortcuts
    if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.tagName === 'SELECT' ||
        activeElement.hasAttribute('contenteditable')
    )) {
        // These are the problematic keys used as shortcuts in the app
        const appShortcutKeys = ['e', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v', 'b', 'q', 'w', 'r'];
        
        if (appShortcutKeys.includes(e.key.toLowerCase())) {
            // This prevents the event from reaching the app's keyboard handlers
            e.stopPropagation();
        }
    }
    
    // Check specifically for auth modal inputs
    const authModal = document.getElementById('authModal');
    if (authModal && authModal.style.display !== 'none') {
        const inputs = authModal.querySelectorAll('input');
        for (let input of inputs) {
            if (input === activeElement) {
                // Stop all keyboard events in auth inputs
                e.stopPropagation();
                return;
            }
        }
    }
}, true); // true = capture phase, ensures this runs before other handlers

class AuthController {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.authModal = null;
        
        this.init();
    }
    
    init() {
        // Create auth UI elements
        this.createAuthUI();
        
        // Check if user is already authenticated
        this.checkCurrentAuth();
        
        // Set up auth button listeners
        document.getElementById('authButton').addEventListener('click', () => {
            if (this.isAuthenticated) {
                this.showUserMenu();
            } else {
                this.showAuthModal();
            }
        });
    }
    
    createAuthUI() {
        // Add auth button to header
        const header = document.querySelector('.app-header');
        
        const authButton = document.createElement('button');
        authButton.id = 'authButton';
        authButton.className = 'auth-button';
        authButton.innerHTML = 'Sign In';
        
        // Add to the header
        header.appendChild(authButton);
        
        // Create auth modal (hidden initially)
        this.createAuthModal();
    }
    
    createAuthModal() {
        // Create the modal container
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.id = 'authModal';
        modal.setAttribute('role', 'form'); // Add role attribute to help with detection
        
        // Create modal content
        modal.innerHTML = `
            <div class="auth-modal-content">
                <span class="close-button">&times;</span>
                <div class="auth-tabs">
                    <button class="auth-tab-button active" data-tab="login">Login</button>
                    <button class="auth-tab-button" data-tab="signup">Sign Up</button>
                </div>
                
                <div class="auth-tab-content active" id="login-tab">
                    <h3>Login to Your Account</h3>
                    <form id="loginForm" role="form">
                        <div class="form-group">
                            <label for="loginEmail">Email</label>
                            <input type="email" id="loginEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" required>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="auth-submit-btn">Login</button>
                        </div>
                        <div class="auth-error" id="loginError"></div>
                    </form>
                </div>
                
                <div class="auth-tab-content" id="signup-tab">
                    <h3>Create New Account</h3>
                    <form id="signupForm" role="form">
                        <div class="form-group">
                            <label for="signupEmail">Email</label>
                            <input type="email" id="signupEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="signupPassword">Password</label>
                            <input type="password" id="signupPassword" required minlength="6">
                            <small>Password must be at least 6 characters</small>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="auth-submit-btn">Sign Up</button>
                        </div>
                        <div class="auth-error" id="signupError"></div>
                    </form>
                </div>
            </div>
        `;
        
        // Add modal to the body
        document.body.appendChild(modal);
        
        // Store modal reference
        this.authModal = modal;
        
        // Add event listeners
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => this.hideAuthModal());
        
        // Tab switching
        const tabButtons = modal.querySelectorAll('.auth-tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                modal.querySelectorAll('.auth-tab-content').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                const tabName = button.getAttribute('data-tab');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
        
        // Form submissions
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        const signupForm = document.getElementById('signupForm');
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
        
        // Close modal when clicking outside of it
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideAuthModal();
            }
        });
    }
    
    createUserMenu() {
        if (!document.getElementById('userMenu')) {
            const userMenu = document.createElement('div');
            userMenu.id = 'userMenu';
            userMenu.className = 'user-menu';
            
            // Add user menu items
            userMenu.innerHTML = `
                <div class="user-menu-content">
                    <div class="user-info">
                        <span class="user-email" id="userEmail"></span>
                    </div>
                    <button id="profileButton" class="menu-button">Profile</button>
                    <button id="logoutButton" class="logout-button">Logout</button>
                </div>
            `;
            
            // Add to document body
            document.body.appendChild(userMenu);
            
            // Add event listener to profile button
            document.getElementById('profileButton').addEventListener('click', () => {
                window.location.href = 'profile.html';
                this.hideUserMenu();
            });
            
            // Add event listener to logout button
            document.getElementById('logoutButton').addEventListener('click', () => {
                this.handleLogout();
                this.hideUserMenu();
            });
            
            // Close menu when clicking outside of it
            window.addEventListener('click', (e) => {
                const menu = document.getElementById('userMenu');
                const authButton = document.getElementById('authButton');
                
                if (menu && e.target !== menu && e.target !== authButton && !menu.contains(e.target) && !authButton.contains(e.target)) {
                    this.hideUserMenu();
                }
            });
        }
    }
    
    async checkCurrentAuth() {
        try {
            const { user, error } = await auth.getCurrentUser();
            
            if (user) {
                this.isAuthenticated = true;
                this.currentUser = user;
                this.updateAuthButton();
                
                // Notify other components about auth state
                this.notifyAuthChange();
            } else {
                this.isAuthenticated = false;
                this.currentUser = null;
                this.updateAuthButton();
            }
        } catch (err) {
            console.error('Error checking authentication:', err);
            this.isAuthenticated = false;
            this.currentUser = null;
            this.updateAuthButton();
        }
    }
    
    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorElement = document.getElementById('loginError');
        
        try {
            errorElement.textContent = '';
            
            // Show loading state
            const submitButton = document.querySelector('#loginForm .auth-submit-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Logging in...';
            submitButton.disabled = true;
            
            const { data, error } = await auth.signIn(email, password);
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            if (error) {
                errorElement.textContent = error.message || 'Login failed. Please check your credentials.';
                return;
            }
            
            // Login successful
            this.isAuthenticated = true;
            this.currentUser = data.user;
            this.updateAuthButton();
            this.hideAuthModal();
            
            // Notify other components
            this.notifyAuthChange();
            
            // Show confirmation
            alert('Logged in successfully!');
        } catch (err) {
            errorElement.textContent = 'An unexpected error occurred. Please try again.';
            console.error('Login error:', err);
            
            // Reset button if needed
            const submitButton = document.querySelector('#loginForm .auth-submit-btn');
            submitButton.textContent = 'Login';
            submitButton.disabled = false;
        }
    }
    
    async handleSignup() {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const errorElement = document.getElementById('signupError');
        
        try {
            errorElement.textContent = '';
            
            // Show loading state
            const submitButton = document.querySelector('#signupForm .auth-submit-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating account...';
            submitButton.disabled = true;
            
            const { data, error } = await auth.signUp(email, password);
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            if (error) {
                errorElement.textContent = error.message || 'Signup failed. Please try again.';
                return;
            }
            
            // Handle auto-confirmation vs. email confirmation
            if (data.user && data.session) {
                // Auto-confirmed
                this.isAuthenticated = true;
                this.currentUser = data.user;
                this.updateAuthButton();
                this.hideAuthModal();
                
                // Notify other components
                this.notifyAuthChange();
                
                // Show confirmation
                alert('Account created successfully! You are now logged in.');
            } else {
                // Email confirmation required
                alert('Account created! Please check your email for a confirmation link.');
                
                // Switch to login tab
                const loginTabButton = document.querySelector('.auth-tab-button[data-tab="login"]');
                if (loginTabButton) {
                    loginTabButton.click();
                }
            }
        } catch (err) {
            errorElement.textContent = 'An unexpected error occurred. Please try again.';
            console.error('Signup error:', err);
            
            // Reset button if needed
            const submitButton = document.querySelector('#signupForm .auth-submit-btn');
            submitButton.textContent = 'Sign Up';
            submitButton.disabled = false;
        }
    }
    
    async handleLogout() {
        try {
            const { error } = await auth.signOut();
            
            if (error) {
                console.error('Logout error:', error);
                alert('Error logging out. Please try again.');
                return;
            }
            
            // Logout successful
            this.isAuthenticated = false;
            this.currentUser = null;
            this.updateAuthButton();
            
            // Notify other components
            this.notifyAuthChange();
            
            // Show confirmation
            alert('Logged out successfully!');
        } catch (err) {
            console.error('Logout error:', err);
            alert('Error logging out. Please try again.');
        }
    }
    
    updateAuthButton() {
        const authButton = document.getElementById('authButton');
        
        if (this.isAuthenticated && this.currentUser) {
            // Show email on button
            const emailParts = this.currentUser.email.split('@');
            const username = emailParts[0];
            authButton.textContent = username;
            authButton.classList.add('authenticated');
            
            // Create user menu if it doesn't exist
            this.createUserMenu();
            
            // Update user email in menu
            document.getElementById('userEmail').textContent = this.currentUser.email;
        } else {
            authButton.textContent = 'Sign In';
            authButton.classList.remove('authenticated');
        }
    }
    
    showAuthModal() {
        this.authModal.style.display = 'flex';
        
        // Clear previous errors and inputs
        document.getElementById('loginError').textContent = '';
        document.getElementById('signupError').textContent = '';
        
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        
        // Add keyboard event handlers specific to the modal
        // This ensures keyboard events in the modal don't trigger app shortcuts
        const handleKeyDown = (e) => {
            // Stop propagation for all keyboard events inside the modal
            // This prevents other keyboard handlers from catching these events
            e.stopPropagation();
        };
        
        // Add listeners to all inputs in the modal
        const inputs = this.authModal.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keydown', handleKeyDown);
        });
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('loginEmail').focus();
        }, 100);
    }
    
    hideAuthModal() {
        this.authModal.style.display = 'none';
    }
    
    showUserMenu() {
        const userMenu = document.getElementById('userMenu');
        userMenu.style.display = 'block';
        
        // Position the menu below the auth button
        const authButton = document.getElementById('authButton');
        const rect = authButton.getBoundingClientRect();
        
        userMenu.style.top = (rect.bottom + window.scrollY) + 'px';
        userMenu.style.right = (window.innerWidth - rect.right) + 'px';
    }
    
    hideUserMenu() {
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.style.display = 'none';
        }
    }
    
    notifyAuthChange() {
        // Dispatch a custom event that other components can listen for
        const event = new CustomEvent('authStateChanged', {
            detail: {
                isAuthenticated: this.isAuthenticated,
                user: this.currentUser
            }
        });
        
        window.dispatchEvent(event);
        
        // Reload saved songs if song DB is active
        if (window.songDB) {
            window.songDB.checkAuthAndLoadCloudSongs();
        }
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authController = new AuthController();
}); 