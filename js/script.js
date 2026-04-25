// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Show preloader animation
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 2500);
    }
});

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

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

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
    }, '-=0.6');

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

    // Services Cards Stagger Animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }
        );

        // Stagger internal contents
        gsap.from(card.querySelectorAll('.service-icon, .service-title, .service-desc, .service-list li'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
        });
    });

    // Parallax on Video Banner
    gsap.to('.video-banner .hero-video', {
        scrollTrigger: {
            trigger: '.video-banner',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 100, // Moves video slightly to create parallax
        ease: 'none'
    });

    // Projects Filtering and Animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Initial Projects Animation
    gsap.utils.toArray(projectCards).forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }
        );
        
        // Image subtle scale on scroll
        gsap.fromTo(card.querySelector('.project-img'), 
            { scale: 1.1 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'bottom top',
                    scrub: true
                },
                scale: 1,
                ease: 'none'
            }
        );
    });

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

    // Contact form submit over HTTPS with in-page status feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const submitBtnDefault = submitBtn ? submitBtn.innerHTML : 'Send Message';
        const formSubmitEndpoint = 'https://formsubmit.co/ajax/UGsolution@outlook.com';

        const setFormStatus = (message, statusClass = '') => {
            if (!formStatus) {
                return;
            }

            formStatus.textContent = message;
            formStatus.classList.remove('is-loading', 'is-success', 'is-error');

            if (statusClass) {
                formStatus.classList.add(`is-${statusClass}`);
            }
        };

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            setFormStatus('Sending your message...', 'loading');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('is-loading');
                submitBtn.textContent = 'Sending...';
            }

            try {
                const response = await fetch(formSubmitEndpoint, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json().catch(() => ({}));
                const isSuccess = response.ok && (result.success === true || result.success === 'true' || typeof result.success === 'undefined');

                if (!isSuccess) {
                    throw new Error(result.message || 'Unable to send message right now.');
                }

                setFormStatus('Message sent successfully. We will contact you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Contact form submit failed:', error);
                setFormStatus('Message could not be sent. Please try again or email UGsolution@outlook.com.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('is-loading');
                    submitBtn.innerHTML = submitBtnDefault;
                }
            }
        });
    }
});
