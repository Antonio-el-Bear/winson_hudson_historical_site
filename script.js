// Smooth scroll behavior (already set in CSS, but ensuring it's applied)
document.documentElement.style.scrollBehavior = 'smooth';

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll event listener for parallax effects
    window.addEventListener('scroll', handleScroll);

    // Initialize gallery items
    initGallery();

    // Initialize CTA button
    initCTAButton();

    // Add smooth scroll to footer links
    initSmoothScroll();

    // Initialize navigation
    initNavigation();

    // Initialize falling elements
    initFallingElements();
});

// Handle scroll effects
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// Initialize gallery with click handlers
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add pulse animation
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = '';
            }, 10);
        });
    });
}

// Initialize CTA button
function initCTAButton() {
    // Scroll to biography section when clicking hero quote
    const heroQuote = document.querySelector('.hero-quote');
    
    if (heroQuote) {
        heroQuote.style.cursor = 'pointer';
        heroQuote.addEventListener('click', () => {
            const biographySection = document.getElementById('biographySection');
            if (biographySection) {
                biographySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initialize smooth scroll for all internal links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Counter animation for highlight numbers
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animations when highlights are visible
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numberElement = entry.target.querySelector('.highlight-number');
            const targetValue = parseInt(numberElement.textContent);
            animateCounter(numberElement, targetValue);
        }
    });
}, { threshold: 0.5 });

// Observe highlight items
document.addEventListener('DOMContentLoaded', () => {
    const highlights = document.querySelectorAll('.highlight-item');
    highlights.forEach(highlight => {
        highlightObserver.observe(highlight);
    });
});

// Add hover effect enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Timeline items pulse on hover
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Recognition cards tilt effect
    const recognitionCards = document.querySelectorAll('.recognition-card');
    recognitionCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => imageObserver.observe(img));
    });
}

// Add scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(to right, #d97706, #f59e0b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
}

document.addEventListener('DOMContentLoaded', createScrollIndicator);

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Safety check
    if (!navToggle || !navMenu) {
        console.error('Navigation elements missing');
        return;
    }
    
    // Toggle menu on hamburger click
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Read More functionality
function initReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const biographyExcerpt = document.querySelector('.biography-excerpt');
    const biographyFull = document.querySelector('.biography-full');
    
    if (readMoreBtn && biographyFull) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = biographyFull.style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                biographyFull.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
                readMoreBtn.classList.remove('expanded');
            } else {
                // Expand
                biographyFull.style.display = 'block';
                readMoreBtn.textContent = 'Read Less';
                readMoreBtn.classList.add('expanded');
                
                // Smooth scroll to biography section
                document.querySelector('.biography-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
}

// Timeline expansion for mobile
function initTimelineExpand() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const description = item.querySelector('.timeline-description');
        if (!description) return;
        
        // Add expand button after description
        const expandBtn = document.createElement('button');
        expandBtn.className = 'expand-btn';
        expandBtn.textContent = 'Read More';
        expandBtn.setAttribute('aria-expanded', 'false');
        
        description.parentNode.insertBefore(expandBtn, description.nextSibling);
        
        expandBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                description.style.maxHeight = '80px';
                expandBtn.textContent = 'Read More';
                expandBtn.setAttribute('aria-expanded', 'false');
            } else {
                description.style.maxHeight = 'none';
                expandBtn.textContent = 'Read Less';
                expandBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Falling Elements functionality
function initFallingElements() {
    const container = document.getElementById('fallingElements');
    
    // Color scheme for different sections
    const colorSchemes = [
        { name: 'heroSection', colors: ['#d97706', '#f59e0b', '#fbbf24'] }, // Orange/Yellow
        { name: 'biographySection', colors: ['#3b82f6', '#60a5fa', '#93c5fd'], skip: true }, // Blue - Skip
        { name: 'timelineSection', colors: ['#ef4444', '#f87171', '#fca5a5'], skip: true }, // Red - Skip
        { name: 'gallerySection', colors: ['#8b5cf6', '#a78bfa', '#ddd6fe'] }, // Purple
        { name: 'recognitionSection', colors: ['#10b981', '#34d399', '#a7f3d0'] }, // Green
        { name: 'legacySection', colors: ['#ec4899', '#f472b6', '#fbcfe8'] }, // Pink
    ];

    let currentSectionIndex = 0;
    let shouldCreateElements = true;

    function createFallingElement(colors) {
        const element = document.createElement('div');
        element.classList.add('falling-element');
        
        // Random element type
        const types = ['falling-poster', 'falling-flyer', 'falling-ticket'];
        const type = types[Math.floor(Math.random() * types.length)];
        element.classList.add(type);
        
        // Array of icon files from the icons folder
        const icons = [
            'icons/fist.png',
            'icons/fist (1).png',
            'icons/human-rights.svg',
            'icons/demonstrate.svg',
            'icons/independent.svg',
            'icons/newspaper.svg'
        ];
        
        // Random icon
        const icon = icons[Math.floor(Math.random() * icons.length)];
        
        // Create image element
        const img = document.createElement('img');
        img.src = icon;
        img.alt = 'Justice Icon';
        
        element.appendChild(img);
        
        // Random horizontal position
        const startX = Math.random() * window.innerWidth;
        element.style.left = startX + 'px';
        element.style.top = '-200px';
        
        // Random duration between 8-16 seconds
        const duration = 8 + Math.random() * 8;
        element.style.animationDuration = duration + 's';
        
        // Add justice-themed symbols
        const justiceSymbols = ['✊', '⚖️', '📜', '📢', '🤝', '📖', '🎯', '💪', '🔥', '✨', '🌟', '💯'];
        const symbol = justiceSymbols[Math.floor(Math.random() * justiceSymbols.length)];
        element.textContent = symbol;
        
        container.appendChild(element);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, (duration) * 1000);
    }

    // Monitor scroll position to change element colors based on current section
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 200;
        
        colorSchemes.forEach((scheme, index) => {
            const section = document.getElementById(scheme.name);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSectionIndex = index;
                    shouldCreateElements = !scheme.skip; // Skip if marked
                }
            }
        });
    });

    // Create falling elements continuously
    setInterval(() => {
        // Only create elements if we shouldn't skip this section
        if (shouldCreateElements) {
            const colors = colorSchemes[currentSectionIndex].colors;
            const numElements = Math.floor(Math.random() * 3) + 1; // Create 1-3 elements
            
            for (let i = 0; i < numElements; i++) {
                setTimeout(() => {
                    createFallingElement(colors);
                }, i * 200); // Stagger creation
            }
        }
    }, 2000); // Create new batch every 2 seconds

    // Create initial elements
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFallingElement(colorSchemes[0].colors);
        }, i * 300);
    }
}

// Hero Image Carousel functionality
function initHeroImageCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.hero-carousel-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateCarousel() {
        // Remove active from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active to new image
        images[currentIndex].classList.add('active');
    }
    
    // Rotate every 8 seconds
    setInterval(rotateCarousel, 8000);
}

// Image Carousel functionality
function initImageCarousel() {
    const carousel = document.getElementById('fadingCarousel');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.carousel-image');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateCarousel() {
        // Remove active from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active to new image
        images[currentIndex].classList.add('active');
    }
    
    // Rotate every 8 seconds (2s fade in + 4s hold + 2s fade out)
    setInterval(rotateCarousel, 8000);
}

// Timeline Image Scroll Animation
function initTimelineImageScroll() {
    const timelineImages = document.querySelectorAll('.timeline-image');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    timelineImages.forEach(image => {
        observer.observe(image);
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate recognition cards
                const cards = entry.target.querySelectorAll('.recognition-card');
                cards.forEach((card, index) => {
                    card.style.animation = `slideInRight 0.8s ease-out ${index * 0.2}s forwards`;
                    card.style.opacity = '1';
                });
                
                // Animate gallery items
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`;
                    item.style.opacity = '1';
                });
                
                // Animate legacy initiatives
                const initiatives = entry.target.querySelectorAll('.initiative');
                initiatives.forEach((init, index) => {
                    init.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s forwards`;
                    init.style.opacity = '1';
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Parallax scrolling effect
function initParallax() {
    const heroImage = document.querySelector('.hero-image-carousel');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPos * 0.3}px)`;
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFallingElements();
    initHeroImageCarousel();
    initImageCarousel();
    initTimelineImageScroll();
    initScrollAnimations();
    initParallax();
    initReadMore();
    initTimelineExpand();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});
