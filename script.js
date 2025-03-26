// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(4, 28, 52, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(4, 28, 52, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Gallery item click handler
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        showImageModal(imgSrc, imgAlt);
    });
});

// Image modal for gallery
function showImageModal(src, alt) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    
    const caption = document.createElement('p');
    caption.textContent = alt;
    
    // Append elements
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(caption);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    modalContent.style.margin = 'auto';
    modalContent.style.display = 'block';
    modalContent.style.maxWidth = '80%';
    modalContent.style.position = 'relative';
    
    img.style.width = '100%';
    img.style.maxHeight = '80vh';
    img.style.objectFit = 'contain';
    
    caption.style.margin = '10px 0 0';
    caption.style.color = 'white';
    caption.style.textAlign = 'center';
    
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '-40px';
    closeBtn.style.right = '0';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '35px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    
    // Close modal events
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add animation on scroll
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const animateElements = document.querySelectorAll('.section-header, .about-content, .busas-content, .announcement-card, .gallery-item');
    
    animateElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section-header, .about-content, .busas-content, .announcement-card, .gallery-item {
        opacity: 0;
    }
    
    .animated {
        opacity: 1;
    }
`;
document.head.appendChild(animationStyle);

// Run animation check on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Countdown to event
const eventDate = new Date('2025-11-22T09:00:00');

function updateCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;
    
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    
    if (diff <= 0) {
        countdownElement.innerHTML = '<div class="countdown-item">Etkinlik başladı!</div>';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Gün</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Saat</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Dakika</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Saniye</span>
        </div>
    `;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if countdown element exists and update it
    if (document.querySelector('.countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Initialize other functions that should run on load
    animateOnScroll();
});