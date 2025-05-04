
// Wait until DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome toast
    showToast('Welcome to Interaction Lab! 🧪', 'Experiment with different user interactions!', 'info');
  
    // ============== Event Handling Section ==============
    // Button Click Counter
    const clickButton = document.getElementById('clickButton');
    const clickCountElement = document.getElementById('clickCount');
    let clickCount = 0;
  
    clickButton.addEventListener('click', () => {
      clickCount++;
      clickCountElement.textContent = clickCount;
      showToast('Button clicked!', '', 'success');
    });
  
    // Keypress Detection
    const lastKeyElement = document.getElementById('lastKey');
    document.addEventListener('keydown', (e) => {
      lastKeyElement.textContent = e.key;
      showToast(`Key pressed: ${e.key}`, '', 'info');
    });
  
    // Secret Interactions
    const secretButton = document.getElementById('secretButton');
    let longPressTimer;
    let secretActivated = false;
  
    // Double click handler
    secretButton.addEventListener('dblclick', () => {
      activateSecret();
      showToast('🎉 Secret activated!', 'You found the double-click secret!', 'success');
    });
  
    // Long press handlers
    secretButton.addEventListener('mousedown', () => {
      longPressTimer = setTimeout(() => {
        activateSecret();
        secretButton.classList.add('shimmer');
        showToast('🎉 Secret activated!', 'You found the long press secret!', 'success');
      }, 1000);
    });
  
    secretButton.addEventListener('mouseup', () => {
      clearTimeout(longPressTimer);
      if (secretActivated) {
        secretButton.classList.remove('shimmer');
      }
    });
  
    secretButton.addEventListener('mouseleave', () => {
      clearTimeout(longPressTimer);
      if (secretActivated) {
        secretButton.classList.remove('shimmer');
      }
    });
  
    function activateSecret() {
      secretActivated = true;
      secretButton.textContent = 'Secret Found! 🎉';
      secretButton.classList.add('secret-active');
      secretButton.classList.remove('outline');
    }
  
    // ============== Interactive Elements Section ==============
    // Color Changing Button
    const colorButton = document.getElementById('colorButton');
    const colors = [
      { name: 'Purple', class: 'color-purple' },
      { name: 'Blue', class: 'color-blue' },
      { name: 'Pink', class: 'color-pink' },
      { name: 'Green', class: 'color-green' },
      { name: 'Yellow', class: 'color-yellow' }
    ];
    let currentColorIndex = 0;
  
    colorButton.addEventListener('click', () => {
      // Get the next color (avoiding the current one)
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      const newColor = colors[currentColorIndex];
      
      // Remove all color classes
      colors.forEach(color => {
        colorButton.classList.remove(color.class);
      });
      
      // Add new color class
      colorButton.classList.add(newColor.class);
      colorButton.textContent = `Color: ${newColor.name}`;
    });
  
    // Carousel
    const carouselInner = document.getElementById('carouselInner');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentSlide = 0;
    const slides = carouselInner.children;
    const totalSlides = slides.length;
  
    // Set up initial carousel position
    updateCarousel();
  
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });
  
    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab panel
        tabPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // ============== Form Validation Section ==============
    const form = document.getElementById('validationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    // Show password strength meter when password field is in use
    password.addEventListener('input', () => {
      if (password.value.length > 0) {
        passwordStrength.classList.remove('hidden');
        updatePasswordStrength(password.value);
      } else {
        passwordStrength.classList.add('hidden');
      }
    });
  
    // Username validation
    username.addEventListener('blur', () => {
      validateUsername();
    });
  
    // Email validation
    email.addEventListener('blur', () => {
      validateEmail();
    });
  
    // Password validation
    password.addEventListener('blur', () => {
      validatePassword();
    });
  
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate all fields
      const isUsernameValid = validateUsername();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      
      if (isUsernameValid && isEmailValid && isPasswordValid) {
        showToast('Form submitted successfully!', 'All validations passed.', 'success');
      } else {
        showToast('Form has errors', 'Please fix the errors before submitting.', 'error');
      }
    });
  
    function validateUsername() {
      if (username.value === '') {
        setError(username, usernameError, 'Username is required');
        return false;
      } else if (username.value.length < 3) {
        setError(username, usernameError, 'Username must be at least 3 characters');
        return false;
      } else {
        clearError(username, usernameError);
        return true;
      }
    }
  
    function validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value === '') {
        setError(email, emailError, 'Email is required');
        return false;
      } else if (!emailRegex.test(email.value)) {
        setError(email, emailError, 'Please enter a valid email address');
        return false;
      } else {
        clearError(email, emailError);
        return true;
      }
    }
  
    function validatePassword() {
      if (password.value === '') {
        setError(password, passwordError, 'Password is required');
        return false;
      } else if (password.value.length < 8) {
        setError(password, passwordError, 'Password must be at least 8 characters');
        return false;
      } else {
        clearError(password, passwordError);
        return true;
      }
    }
  
    function setError(input, errorElement, message) {
      input.classList.add('error');
      errorElement.textContent = message;
    }
  
    function clearError(input, errorElement) {
      input.classList.remove('error');
      errorElement.textContent = '';
    }
  
    function updatePasswordStrength(password) {
      let score = 0;
      
      // Check length
      if (password.length >= 8) {
        score++;
        document.getElementById('req1').classList.add('requirement-met');
      } else {
        document.getElementById('req1').classList.remove('requirement-met');
      }
      
      // Check uppercase
      if (/[A-Z]/.test(password)) {
        score++;
        document.getElementById('req2').classList.add('requirement-met');
      } else {
        document.getElementById('req2').classList.remove('requirement-met');
      }
      
      // Check numbers
      if (/[0-9]/.test(password)) {
        score++;
        document.getElementById('req3').classList.add('requirement-met');
      } else {
        document.getElementById('req3').classList.remove('requirement-met');
      }
      
      // Check special characters
      if (/[^A-Za-z0-9]/.test(password)) {
        score++;
        document.getElementById('req4').classList.add('requirement-met');
      } else {
        document.getElementById('req4').classList.remove('requirement-met');
      }
      
      // Update strength indicator
      const percent = (score / 4) * 100;
      strengthBar.style.width = `${percent}%`;
      
      if (score === 0) {
        strengthBar.style.backgroundColor = 'var(--red)';
        strengthText.textContent = 'Too weak';
      } else if (score === 1) {
        strengthBar.style.backgroundColor = 'var(--red)';
        strengthText.textContent = 'Weak';
      } else if (score === 2) {
        strengthBar.style.backgroundColor = 'var(--orange)';
        strengthText.textContent = 'Fair';
      } else if (score === 3) {
        strengthBar.style.backgroundColor = 'var(--yellow)';
        strengthText.textContent = 'Good';
      } else {
        strengthBar.style.backgroundColor = 'var(--green)';
        strengthText.textContent = 'Strong';
      }
    }
  
    // ============== Toast Notification System ==============
    function showToast(title, message = '', type = 'info') {
      const toast = document.getElementById('toast');
      
      // Set toast content
      toast.innerHTML = `
        <strong>${title}</strong>
        ${message ? `<p>${message}</p>` : ''}
      `;
      
      // Set toast type
      toast.className = 'toast';
      toast.classList.add(`toast-${type}`);
      
      // Show toast
      toast.classList.add('show');
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  });