// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Basic GSAP Entrance Animations
    
    // Navbar animation
    gsap.from(".logo, .nav-links li, .btn-nav", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });

    // Left section text animation
    gsap.from(".greeting, .name, .title", {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out"
    });

    // Social icons & Buttons animation
    gsap.from(".social-icons a, .action-buttons a", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.8,
        ease: "power3.out"
    });

    // Stats area animation
    gsap.from(".stats", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out"
    });

    // Right section image animation
    gsap.from(".image-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
    });
});
