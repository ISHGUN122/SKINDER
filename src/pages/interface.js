

        // In-memory user database (simulating backend)
        const userDatabase = {
            users: [],
            
            addUser(user) {
                this.users.push(user);
                console.log('User registered:', user);
                console.log('Total users:', this.users.length);
            },
            
            findUser(email) {
                return this.users.find(u => u.email === email);
            },
            
            validateCredentials(email, password) {
                const user = this.findUser(email);
                return user && user.password === password;
            }
        };

        // Current session
        let currentSession = {
            isLoggedIn: false,
            user: null
        };

        // Form state
        let isSignUpMode = false;

        // Elements
        const emailModal = document.getElementById('emailModal');
        const emailBtn = document.getElementById('emailBtn');
        const googleBtn = document.getElementById('googleBtn');
        const facebookBtn = document.getElementById('facebookBtn');
        const closeModal = document.getElementById('closeModal');
        const authForm = document.getElementById('authForm');
        const toggleLink = document.getElementById('toggleLink');
        const modalTitle = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');
        const toggleText = document.getElementById('toggleText');
        const nameGroup = document.getElementById('nameGroup');
        const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
        const successMessage = document.getElementById('successMessage');

        // Password toggle
        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
            this.textContent = passwordInput.type === 'password' ? '👁️' : '🙈';
        });

        document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
            const confirmPasswordInput = document.getElementById('confirmPassword');
            confirmPasswordInput.type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
            this.textContent = confirmPasswordInput.type === 'password' ? '👁️' : '🙈';
        });

        // Show email modal
        emailBtn.addEventListener('click', function() {
            emailModal.classList.add('active');
            isSignUpMode = false;
            updateFormMode();
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            emailModal.classList.remove('active');
            clearForm();
        });

        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.remove('active');
                clearForm();
            }
        });

        // Toggle between sign in and sign up
        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;
            updateFormMode();
            clearErrors();
        });

        function updateFormMode() {
            if (isSignUpMode) {
                modalTitle.textContent = 'Sign Up for Skinder';
                submitBtn.textContent = 'Sign Up';
                toggleText.innerHTML = 'Already have an account? <a id="toggleLink">Sign In</a>';
                nameGroup.style.display = 'block';
                confirmPasswordGroup.style.display = 'block';
            } else {
                modalTitle.textContent = 'Sign In to Skinder';
                submitBtn.textContent = 'Sign In';
                toggleText.innerHTML = 'Don\'t have an account? <a id="toggleLink">Sign Up</a>';
                nameGroup.style.display = 'none';
                confirmPasswordGroup.style.display = 'none';
            }
            
            // Re-attach event listener to new toggle link
            document.getElementById('toggleLink').addEventListener('click', (e) => {
                e.preventDefault();
                isSignUpMode = !isSignUpMode;
                updateFormMode();
                clearErrors();
            });
        }

        // Form submission
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validation
            let isValid = true;

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Password validation
            if (password.length < 6) {
                showError('passwordError', 'Password must be at least 6 characters');
                isValid = false;
            }

            if (isSignUpMode) {
                // Name validation
                if (name.length < 2) {
                    showError('nameError', 'Please enter your full name');
                    isValid = false;
                }

                // Confirm password validation
                if (password !== confirmPassword) {
                    showError('confirmPasswordError', 'Passwords do not match');
                    isValid = false;
                }

                // Check if user already exists
                if (userDatabase.findUser(email)) {
                    showError('emailError', 'Email already registered');
                    isValid = false;
                }
            } else {
                // Sign in - check credentials
                if (!userDatabase.validateCredentials(email, password)) {
                    showError('emailError', 'Invalid email or password');
                    isValid = false;
                }
            }

            if (!isValid) return;

            // Process authentication
            if (isSignUpMode) {
                // Sign up
                const newUser = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    password: password,
                    createdAt: new Date().toISOString()
                };
                
                userDatabase.addUser(newUser);
                currentSession.isLoggedIn = true;
                currentSession.user = { ...newUser, password: undefined };
                
                showSuccessMessage(`Welcome, ${name}! Your account has been created.`);
                console.log('Sign up successful!', currentSession);
                
                setTimeout(() => {
                    emailModal.classList.remove('active');
                    showWelcomeScreen(name);
                }, 2000);
                
            } else {
                // Sign in
                const user = userDatabase.findUser(email);
                currentSession.isLoggedIn = true;
                currentSession.user = { ...user, password: undefined };
                
                showSuccessMessage(`Welcome back, ${user.name}!`);
                console.log('Sign in successful!', currentSession);
                
                setTimeout(() => {
                    emailModal.classList.remove('active');
                    showWelcomeScreen(user.name);
                }, 2000);
            }
        });

        // Google Sign In
        googleBtn.addEventListener('click', function() {
            setLoading(this, true);
            setTimeout(() => {
                setLoading(this, false);
                const mockUser = {
                    id: Date.now(),
                    name: 'Google User',
                    email: 'user@gmail.com',
                    provider: 'google',
                    createdAt: new Date().toISOString()
                };
                currentSession.isLoggedIn = true;
                currentSession.user = mockUser;
                console.log('Google sign-in successful!', currentSession);
                showWelcomeScreen(mockUser.name);
            }, 1500);
        });

        // Facebook Sign In
        facebookBtn.addEventListener('click', function() {
            setLoading(this, true);
            setTimeout(() => {
                setLoading(this, false);
                const mockUser = {
                    id: Date.now(),
                    name: 'Facebook User',
                    email: 'user@facebook.com',
                    provider: 'facebook',
                    createdAt: new Date().toISOString()
                };
                currentSession.isLoggedIn = true;
                currentSession.user = mockUser;
                console.log('Facebook sign-in successful!', currentSession);
                showWelcomeScreen(mockUser.name);
            }, 1500);
        });

        // Helper functions
        function setLoading(button, isLoading) {
            if (isLoading) {
                button.classList.add('loading');
                button.disabled = true;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
            }
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function clearErrors() {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => {
                error.style.display = 'none';
                error.textContent = '';
            });
            successMessage.style.display = 'none';
        }

        function clearForm() {
            authForm.reset();
            clearErrors();
        }

        function showSuccessMessage(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
        }

        function showWelcomeScreen(name) {
            alert(`🎉 Welcome to Skinder, ${name}!\n\nYou're now logged in and ready to start swiping, matching, and growing!`);
            console.log('Current Session:', currentSession);
            console.log('User Database:', userDatabase.users);
        }

        // More options
        document.getElementById('moreOptions').addEventListener('click', (e) => {
            e.preventDefault();
            alert('📱 More sign-in options:\n\n• Phone Number\n• Apple ID\n• Microsoft Account\n\nComing soon!');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && emailModal.classList.contains('active')) {
                emailModal.classList.remove('active');
                clearForm();
            }
        });

        // Initialize
        console.log('Skinder Authentication System Loaded');
        console.log('Features: Email Sign Up/In, Google, Facebook');
        console.log('User Database Ready');