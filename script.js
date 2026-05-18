// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Basic GSAP Entrance Animations for Hero
    gsap.from(".logo, .nav-links li, .btn-nav", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });

    gsap.from(".greeting, .name, .title", {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from(".social-icons a, .action-buttons a", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.8,
        ease: "power3.out"
    });

    gsap.from(".stats", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out"
    });

    gsap.from(".image-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
    });

    // Smooth Scrolling for Navigation inside the content-area
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollArea = document.getElementById('scroll-area');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            // Add to clicked
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Update active nav link on scroll
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
});
