// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================
       1. CUSTOM CURSOR & MAGNETIC EFFECT
       ========================================== */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const magnetics = document.querySelectorAll('.magnetic');
    const links = document.querySelectorAll('a, button, input, textarea, .theme-switch');

    // Move cursor
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
        });

        // Hover effect on links
        links.forEach(link => {
            link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });

        // Magnetic Effect
        magnetics.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(this, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', function() {
                gsap.to(this, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
            });
        });
    }

    /* ==========================================
       2. THREE.JS BACKGROUND
       ========================================== */
    const initThreeJS = () => {
        const canvas = document.querySelector('#webgl-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x8b5cf6, // Vibrant purple to match the new cosmic theme
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Mouse interaction for particles
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });

        const tick = () => {
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            // Subtle mouse parallax
            particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
            particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };
        tick();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };
    initThreeJS();

    /* ==========================================
       3. LOCOMOTIVE SCROLL SETUP
       ========================================== */
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        lerp: 0.05
    });

    // Update ScrollTrigger when Locomotive Scroll updates
    scroll.on('scroll', ScrollTrigger.update);
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    /* ==========================================
       4. INITIAL LOADER ANIMATION
       ========================================== */
    const tlLoader = gsap.timeline();
    tlLoader.to('.loader-progress', {
        width: '100%',
        duration: 1.5,
        ease: 'power3.inOut'
    })
    .to('.loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
            document.querySelector('.loader').style.display = 'none';
            // Start Hero Animations
            animateHero();
        }
    });

    const animateHero = () => {
        const tlHero = gsap.timeline();
        
        // Split text for animation
        const nameText = new SplitType('.name', { types: 'chars' });
        
        tlHero.from('.greeting', { y: 20, opacity: 0, duration: 0.5 })
              .from(nameText.chars, {
                  y: 50,
                  opacity: 0,
                  rotationX: -90,
                  stagger: 0.05,
                  duration: 0.8,
                  ease: 'back.out(1.7)'
              }, "-=0.2")
              .from('.subtitle-container', { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
              .from('.hero-cta a', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
              .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.2")
              .from('.navbar', { y: -100, opacity: 0, duration: 0.8, ease: 'power3.out'}, "-=1");
    };

    /* ==========================================
       5. SCROLL TRIGGER ANIMATIONS
       ========================================== */
    
    // Navbar background on scroll
    scroll.on('scroll', (obj) => {
        const navbar = document.querySelector('.navbar');
        if (obj.scroll.y > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate stats counter
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            scroller: '[data-scroll-container]',
            start: 'top 85%',
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            },
            once: true
        });
    });

    // Animate skills progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        ScrollTrigger.create({
            trigger: bar,
            scroller: '[data-scroll-container]',
            start: 'top 90%',
            onEnter: () => {
                const target = bar.style.getPropertyValue('--target');
                gsap.to(bar, { width: target, duration: 1.5, ease: "power3.out" });
            },
            once: true
        });
    });

    // Split text animation for paragraphs
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(text => {
        const split = new SplitType(text, { types: 'lines' });
        gsap.from(split.lines, {
            scrollTrigger: {
                trigger: text,
                scroller: '[data-scroll-container]',
                start: 'top 85%'
            },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Tilt Cards 3D effect (Vanilla JS)
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        if (window.innerWidth > 992) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'none';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s ease';
            });
        }
    });

    /* ==========================================
       6. UI INTERACTIONS (Nav, Theme)
       ========================================== */
    
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'light');
        }
    });

    // Back to top
    document.getElementById('back-to-top').addEventListener('click', () => {
        scroll.scrollTo(0);
    });

    // Refresh ScrollTrigger when everything is loaded
    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();
});
