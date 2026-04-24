document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
            nav.style.boxShadow = 'none';
        }
    });

    // Hero Video Slider
    const heroVideos = document.querySelectorAll('.hero-video');
    let currentVideo = 0;
    
    if(heroVideos.length > 1) {
        setInterval(() => {
            heroVideos[currentVideo].classList.remove('active');
            currentVideo = (currentVideo + 1) % heroVideos.length;
            heroVideos[currentVideo].classList.add('active');
        }, 8000); // Change video every 8 seconds
    }

    // Hero Animations
    const heroTl = gsap.timeline();
    
    // Zoom from earth / blink effect
    heroTl.from('.hero-content', {
        scale: 0.1,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1.2, 0.5)'
    })
    .from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=1')
    .from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.7')
    .from('.hero-btns', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.2');

    // Subtle Parallax on scroll (Stable, no shrinking)
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 60, // Smooth, gentle parallax drop
        ease: 'none'
    });

    // Section Titles Animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // Services Cards Stagger Animation (Using fromTo for absolute safety against being stuck at 0)
    gsap.fromTo('.service-card', 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }
    );

    // Projects Filtering and Animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Initial Projects Animation
    gsap.fromTo(projectCards, 
        { y: 40, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out'
        }
    );

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Animate out
            gsap.to(projectCards, {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    // Update visibility
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });

                    // Animate in visible cards
                    const visibleCards = Array.from(projectCards).filter(c => c.style.display !== 'none');
                    gsap.fromTo(visibleCards, 
                        { scale: 0.9, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
                    );
                    
                    // Refresh ScrollTrigger
                    ScrollTrigger.refresh();
                }
            });
        });
    });
});
