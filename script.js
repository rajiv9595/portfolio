// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Basic GSAP Entrance Animations for Hero
        const animTargets = [
            { el: ".logo, .nav-links li, .btn-nav", props: { y: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" } },
            { el: ".greeting, .name, .title", props: { x: -30, opacity: 0, duration: 1, stagger: 0.2, delay: 0.3, ease: "power3.out" } },
            { el: ".social-icons a, .action-buttons a", props: { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.8, ease: "power3.out" } },
            { el: ".stats", props: { y: 30, opacity: 0, duration: 1, delay: 1.2, ease: "power3.out" } },
            { el: ".image-container", props: { scale: 0.8, opacity: 0, duration: 1.2, delay: 0.6, ease: "power3.out" } }
        ];

        animTargets.forEach(target => {
            if (document.querySelector(target.el)) {
                gsap.from(target.el, target.props);
            }
        });
    }

    // Smooth Scrolling for Navigation inside the content-area
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollArea = document.getElementById('scroll-area');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Remove active class from all
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add to clicked
                    this.classList.add('active');

                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        if (scrollArea) {
                            targetSection.scrollIntoView({
                                behavior: 'smooth'
                            });
                        } else {
                            // Standard window scroll fallback
                            const offsetTop = targetSection.offsetTop;
                            window.scrollTo({
                                top: offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
        });
    }

    // Defensive scroll checking to avoid any crashes on missing elements
    if (scrollArea && navLinks.length > 0) {
        scrollArea.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('.page-section, .hero-section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollArea.scrollTop >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});
