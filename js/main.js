// ============================================
// Parenting Blog Website - Main JavaScript
// ============================================

// ===== Search Functionality =====
const searchIcon = document.querySelector('.search-icon');
const searchOverlay = document.querySelector('.search-overlay');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('.search-box input');

if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
}

if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });
}

if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });
}

// ===== Category Filtering =====
const categoryTags = document.querySelectorAll('.category-tag');
if (categoryTags.length > 0) {
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            categoryTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');
            
            // Filter blog posts (if on blog page)
            const category = tag.dataset.category || tag.textContent.trim();
            filterPosts(category);
        });
    });
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.blog-post-card');
    posts.forEach(post => {
        const postCategory = post.dataset.category || '';
        if (category === 'All' || postCategory.toLowerCase().includes(category.toLowerCase())) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing! Check your email for confirmation.');
            newsletterForm.reset();
        }
    });
}

// ===== Contact Form =====
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Mobile Menu Toggle =====
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navCenter = document.querySelector('.nav-center');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navCenter.classList.toggle('active');
    });
}

// ===== Chat Button =====
const chatButton = document.querySelector('.chat-button');
if (chatButton) {
    chatButton.addEventListener('click', () => {
        alert('Chat feature coming soon! For now, please use our contact form.');
    });
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Back to Top Button =====
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--color-accent-teal);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 998;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Parenting Blog Website loaded successfully!');
});

