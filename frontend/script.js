document.addEventListener('DOMContentLoaded', () => {

    // --- Sidebar & Menu Toggle Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = menuToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (
                sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        sidebar.addEventListener('click', e => e.stopPropagation());
    }

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, button, .menu-toggle');

    if (cursor) {
        window.addEventListener('mousemove', e => {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
        });

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // --- Expanding Search Bar Logic ---
    const searchContainer = document.getElementById('searchContainer');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    if (searchContainer && searchButton && searchInput) {
        searchButton.addEventListener('click', (event) => {
            event.stopPropagation();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', (event) => {
            const isClickInside = searchContainer.contains(event.target);
            if (!isClickInside && searchContainer.classList.contains('active')) {
                searchContainer.classList.remove('active');
            }
        });
    }

    // --- Login Form Validation Logic ---
    // Note: This assumes you have a login form with id="loginForm" on another page.
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting by default
            clearErrors(); // Clear previous errors

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            let isValid = true;

            // Validate Email
            if (email === '') {
                showError('emailError', 'Email address is required.');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Password
            if (password === '') {
                showError('passwordError', 'Password is required.');
                isValid = false;
            } else if (password.length < 8) {
                showError('passwordError', 'Password must be at least 8 characters long.');
                isValid = false;
            }

            // If everything is valid, proceed
            if (isValid) {
                storeSession(email);
                window.location.href = "index.html"; // Redirect after successful login
            }
        });
    }
});

// --- Helper Functions for Validation ---

/**
 * Displays an error message for a specific form field.
 * @param {string} elementId - The ID of the div where the error message will be shown.
 * @param {string} message - The error message to display.
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if(errorElement) errorElement.textContent = message;
}

/**
 * Clears all previous error messages from the form.
 */
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((element) => {
        element.textContent = '';
    });
}

/**
 * Checks if an email string has a valid format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// --- Session Management Functions ---

/**
 * Stores the user's email in sessionStorage and shows a confirmation alert.
 * @param {string} userEmail - The email of the logged-in user.
 */
function storeSession(userEmail) {
    sessionStorage.setItem("username", userEmail);
    alert("Login successful! Welcome, " + userEmail);
}

/**
 * Greets the user if they are logged in, or prompts them to log in.
 */
function greetUser() {
    let user = sessionStorage.getItem("username");
    if (user) {
        alert("Welcome back, " + user + "!");
    } else {
        alert("Please login first.");
    }
}