// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // Intro Screen Logic
    const introScreen = document.getElementById('intro-screen');
    
    setTimeout(() => {
        introScreen.classList.add('hidden');
        
        // Initial reveal for hero section after intro
        setTimeout(() => {
            gsap.to('#hero', {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out"
            });
        }, 500);
    }, 2000);

    // GSAP Scroll Animations
    const glassPanels = document.querySelectorAll('.glass-panel');

    // Scroll reveal for other panels
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    glassPanels.forEach(panel => {
        if (panel.id !== 'hero') {
            observer.observe(panel);
        }
    });

    // Glitch effect on title hover
    const title = document.querySelector('.glitch');
    if (title) {
        title.addEventListener('mouseenter', () => {
            gsap.to(title, {
                x: () => Math.random() * 10 - 5,
                y: () => Math.random() * 10 - 5,
                duration: 0.1,
                yoyo: true,
                repeat: 5,
                onComplete: () => {
                    gsap.to(title, {x: 0, y: 0, duration: 0.1});
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
