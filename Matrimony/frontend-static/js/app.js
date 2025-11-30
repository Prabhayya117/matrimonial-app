/* js/app.js */

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // 1. Custom Cursor Effect
    // -----------------------------------------------------
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        document.addEventListener('mousemove', e => {
            // Move the custom cursor with the mouse
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Check if the target element should enlarge the cursor
            let target = e.target.closest('.hover-target');
            if (target) {
                cursor.classList.add('cursor-large');
            } else {
                cursor.classList.remove('cursor-large');
            }
        });
    }

    // -----------------------------------------------------
    // 2. Magnetic Button Effect
    // -----------------------------------------------------
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            
            // Calculate the center of the button
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate the distance from the cursor to the center
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // Apply a subtle translation, scaled down (e.g., by 0.2)
            const strength = 0.2;
            button.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
        });

        button.addEventListener('mouseleave', () => {
            // Reset translation on mouse leave
            button.style.transform = `translate(0px, 0px)`;
        });

        // Simple Button Functionality (Handles page navigation/action feedback)
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            if (url && url.endsWith('.html')) {
                // Simulate navigation for internal links
                window.location.href = url;
            } else if (url) {
                // For action buttons like 'connect' or 'report'
                console.log(`Action for ${url} triggered!`);
                alert(`Action: ${button.textContent.trim()} triggered successfully.`);
            }
        });
    });

    // -----------------------------------------------------
    // 3. Footer Navigation Active State Logic
    // -----------------------------------------------------
    const navItems = document.querySelectorAll('.footer-nav .nav-item');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

    navItems.forEach(item => {
        // Get the target file name from the href attribute
        const itemHref = item.getAttribute('href')?.toLowerCase() || '';

        // Check if the item's href matches the current page URL
        if (itemHref === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }

        // Ensure that clicking a link navigates (if it's a real page)
        item.addEventListener('click', (e) => {
            // If it's a real page URL, let the browser handle navigation
            if (!itemHref) {
                e.preventDefault();
                console.log(`Navigation to ${item.querySelector('span')?.textContent || ''} clicked.`);
            }
        });
    });

    // -----------------------------------------------------
    // 4. Input Validation
    // -----------------------------------------------------
    const ageInput = document.getElementById('age-input');

    if (ageInput) {
        ageInput.addEventListener('input', () => {
            const age = parseInt(ageInput.value);
            if (age <= 0 || isNaN(age)) {
                ageInput.setCustomValidity("Age must be a positive number.");
                ageInput.reportValidity();
            } else {
                ageInput.setCustomValidity(""); // Reset validation message
            }
        });
    }
});
