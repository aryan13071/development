 // DOM Elements
        const lengthSlider = document.getElementById('lengthSlider');
        const lengthValue = document.getElementById('lengthValue');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        const dots = [document.getElementById('dot1'), document.getElementById('dot2'), 
                     document.getElementById('dot3'), document.getElementById('dot4')];
        const passwordText = document.getElementById('passwordText');
        const copyButton = document.getElementById('copyButton');
        const generateButton = document.getElementById('generateButton');
        const notification = document.getElementById('notification');
        const fireworksContainer = document.getElementById('fireworks');
        
        // Checkboxes
        const uppercase = document.getElementById('uppercase');
        const lowercase = document.getElementById('lowercase');
        const numbers = document.getElementById('numbers');
        const symbols = document.getElementById('symbols');
        
        let len = 7;
        
        // Update length display and strength when slider changes
        lengthSlider.addEventListener('input', function() {
            len = parseInt(this.value);
            lengthValue.textContent = len;
            updateStrengthIndicator(len);
        });
        
        // Update strength indicator based on password length
        function updateStrengthIndicator(length) {
            let strength = 0;
            let width = '30%';
            let color = '#EF4444';
            let text = 'WEAK';
            
            if (length > 10) {
                strength = 4;
                width = '100%';
                color = '#10B981';
                text = 'STRONG';
            } else if (length > 7) {
                strength = 3;
                width = '75%';
                color = '#F59E0B';
                text = 'MEDIUM';
            } else if (length > 5) {
                strength = 2;
                width = '50%';
                color = '#F59E0B';
                text = 'MEDIUM';
            } else {
                strength = 1;
                width = '25%';
                color = '#EF4444';
                text = 'WEAK';
            }
            
            // Update strength bar
            strengthFill.style.width = width;
            strengthFill.style.background = `linear-gradient(90deg, ${color}, ${color})`;
            
            // Update text
            strengthText.textContent = text;
            strengthText.style.color = color;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index < strength) {
                    dot.style.background = color;
                    dot.style.boxShadow = `0 0 8px ${color}`;
                } else {
                    dot.style.background = 'rgba(255, 255, 255, 0.1)';
                    dot.style.boxShadow = 'none';
                }
            });
        }
        
        // Count checked options
        function countChecked() {
            let count = 0;
            if (uppercase.checked) count++;
            if (lowercase.checked) count++;
            if (numbers.checked) count++;
            if (symbols.checked) count++;
            return count;
        }
        
        // Add event listeners to checkboxes
        [uppercase, lowercase, numbers, symbols].forEach(checkbox => {
            checkbox.addEventListener('change', countChecked);
        });
        
        // API call to generate password
        async function generatePassword() {
            const apiKey = "FxyJoXZXw9Vh5GR0vYFHSA==z2bya1dkdYT41s0I";
            const url = `https://api.api-ninjas.com/v1/passwordgenerator?length=${len}`;
            
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "X-Api-Key": apiKey
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                return data.random_password;
            } catch (error) {
                console.error("Error:", error);
                // Fallback to a simple random password if API fails
                return fallbackPassword();
            }
        }
        
        // Fallback password generator if API fails
        function fallbackPassword() {
            const chars = [];
            if (uppercase.checked) chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            if (lowercase.checked) chars.push('abcdefghijklmnopqrstuvwxyz');
            if (numbers.checked) chars.push('0123456789');
            if (symbols.checked) chars.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
            
            // Default to all if none selected
            if (chars.length === 0) {
                chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%^&*()_+-=[]{}|;:,.<>?');
            }
            
            const allChars = chars.join('');
            let password = '';
            
            for (let i = 0; i < len; i++) {
                password += allChars.charAt(Math.floor(Math.random() * allChars.length));
            }
            
            return password;
        }
        
        // Copy password to clipboard
        copyButton.addEventListener('click', function() {
            if (passwordText.textContent !== 'Your password will appear here...') {
                navigator.clipboard.writeText(passwordText.textContent).then(() => {
                    // Show notification
                    notification.classList.add('show');
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 2000);
                });
            }
        });
        
        // Generate password on button click
        generateButton.addEventListener('click', async function() {
            // Add loading animation
            generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            generateButton.disabled = true;
            
            const password = await generatePassword();
            
            // Display password with typing animation
            passwordText.textContent = '';
            let i = 0;
            const typingEffect = setInterval(() => {
                if (i < password.length) {
                    passwordText.textContent += password.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                    
                    // Reset button
                    generateButton.innerHTML = '<i class="fas fa-key"></i> Generate Secure Password';
                    generateButton.disabled = false;
                    
                    // Create fireworks effect
                    createFireworks();
                }
            }, 50);
            
            // Update strength indicator
            updateStrengthIndicator(len);
        });
        
        // Create fireworks animation
        function createFireworks() {
            fireworksContainer.innerHTML = '';
            const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                particle.style.width = `${Math.random() * 5 + 2}px`;
                particle.style.height = particle.style.width;
                
                const x = (Math.random() - 0.5) * 100;
                const y = (Math.random() - 0.5) * 100;
                
                particle.style.setProperty('--x', `${x}vw`);
                particle.style.setProperty('--y', `${y}vh`);
                
                particle.style.left = '50%';
                particle.style.top = '50%';
                
                particle.style.animation = `fireworks 1s ease-out forwards`;
                particle.style.animationDelay = `${Math.random() * 0.5}s`;
                
                fireworksContainer.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
        }
        
        // Initialize strength indicator
        updateStrengthIndicator(len);