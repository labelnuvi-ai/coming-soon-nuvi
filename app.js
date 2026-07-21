/* LABEL NUVI - Luxury Fashion Refined Script */

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    if (document.fonts) {
        document.fonts.ready.then(() => {
            initApp();
        });
    } else {
        setTimeout(initApp, 600);
    }
});

function initApp() {
    // ----------------------------------------------------
    // 1. CUSTOM CURSOR TRACKING
    // ----------------------------------------------------
    const customCursor = document.getElementById('custom-cursor');
    const cursorText = customCursor ? customCursor.querySelector('.cursor-text') : null;
    
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        if (!isMoving && customCursor) {
            gsap.to(customCursor, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            isMoving = true;
        }
    });

    function updateCursor() {
        cursorX += (targetX - cursorX) * 0.14;
        cursorY += (targetY - cursorY) * 0.14;
        
        if (customCursor) {
            customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // ----------------------------------------------------
    // 2. 3D INTERACTIVE SMARTPHONE TILT & AMBIENT MOTION
    // ----------------------------------------------------
    const phoneContainer = document.getElementById('phone-3d');
    const phoneBody = document.querySelector('.phone-body');

    if (phoneContainer) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
            
            // Subtle, understated tilt (-7deg to 7deg)
            const rotateX = -y * 7;
            const rotateY = x * 7;
            
            gsap.to(phoneContainer, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.9,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        document.addEventListener('mouseleave', () => {
            gsap.to(phoneContainer, {
                rotateX: 0,
                rotateY: 0,
                duration: 1.2,
                ease: 'power2.out'
            });
        });

        if (phoneBody) {
            gsap.to(phoneBody, {
                y: '+=6',
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    // ----------------------------------------------------
    // 3. LOOKBOOK SLIDESHOW TOGGLE
    // ----------------------------------------------------
    const screenClick = document.getElementById('phone-screen-click');
    const slides = document.querySelectorAll('.slide');
    const lookTag = document.getElementById('screen-look-tag');
    const lookName = document.getElementById('screen-look-name');
    let currentSlide = 0;

    if (screenClick && slides.length > 0) {
        screenClick.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            
            const lookTagText = slides[currentSlide].getAttribute('data-look');
            const lookNameText = slides[currentSlide].getAttribute('data-name');
            
            if (lookTag && lookName) {
                lookTag.textContent = lookTagText;
                lookName.textContent = lookNameText;
                
                gsap.fromTo([lookTag, lookName], 
                    { opacity: 0, y: 3 }, 
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
                );
            }
        });

        screenClick.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.classList.add('hovering-phone');
                if (cursorText) cursorText.textContent = 'EXPLORE';
            }
        });

        screenClick.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.classList.remove('hovering-phone');
                if (cursorText) cursorText.textContent = 'EXPLORE';
            }
        });
    }

    const interactives = document.querySelectorAll('a, button, input, .screen-date-pill');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.classList.add('hovering-link');
            }
        });
        el.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.classList.remove('hovering-link');
            }
        });
    });

    // ----------------------------------------------------
    // 4. GSAP GENTLE ENTRANCE TIMELINE
    // ----------------------------------------------------
    if (window.gsap) {
        const tl = gsap.timeline();
        
        gsap.set(['.grid-overlay', '.header', '.phone-perspective-wrapper', '.control-center', '.footer', '.marquee', '.kinetic-bg'], { opacity: 0 });
        gsap.set('.phone-container-3d', { y: 15 });
        
        tl.to('.grid-overlay', { opacity: 1, duration: 1.8, ease: 'power2.out' })
          .to('.header', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=1')
          .to('.kinetic-bg', { opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=0.8')
          .to('.phone-perspective-wrapper', { opacity: 1, duration: 1.4, ease: 'power2.out' }, '-=1.2')
          .to('.phone-container-3d', { y: 0, duration: 1.6, ease: 'power2.out' }, '-=1.4')
          .to('.control-center', { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=1')
          .to('.footer', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.8')
          .to('.marquee', { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=1');
    }

    // ----------------------------------------------------
    // 5. COUNTDOWN TIMER
    // ----------------------------------------------------
    const targetDate = new Date('2026-09-09T00:00:00Z').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ----------------------------------------------------
    // 6. SIDEBAR MENU CONTROLS
    // ----------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.getElementById('sidebar-menu');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // ----------------------------------------------------
    // 7. SUBSCRIPTION FORM SUBMISSION
    // ----------------------------------------------------
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email-input');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.querySelector('.submit-btn');
    const subscriptionCard = document.querySelector('.subscription-card');

    function setFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = 'form-feedback ' + type;
        
        if (type !== 'success') {
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback';
            }, 4000);
        }
    }

    if (localStorage.getItem('nuvi_subscribed') === 'true') {
        renderSubscribedState();
    }

    function renderSubscribedState() {
        if (subscriptionCard) {
            subscriptionCard.innerHTML = `
                <div style="text-align: left; padding: 5px 0;">
                    <h3 class="card-title" style="color: var(--text-color); margin-bottom: 8px;">YOU ARE ON THE WAITLIST</h3>
                    <p class="card-subtitle" style="margin-bottom: 0;">Access key for Collection 01 will be delivered prior to public release.</p>
                </div>
            `;
        }
    }

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailValue = emailInput.value.trim();
            if (!emailValue) {
                setFeedback('PLEASE ENTER A VALID EMAIL', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                setFeedback('INVALID EMAIL FORMAT', 'error');
                return;
            }

            submitBtn.disabled = true;
            emailInput.disabled = true;
            submitBtn.innerHTML = `<span class="btn-text">PROCESSING...</span>`;

            setTimeout(() => {
                localStorage.setItem('nuvi_subscribed', 'true');
                setFeedback('ACCESS CONFIRMED.', 'success');
                
                if (window.gsap) {
                    gsap.to(subscriptionCard, {
                        opacity: 0,
                        duration: 0.4,
                        onComplete: () => {
                            renderSubscribedState();
                            gsap.to(subscriptionCard, { opacity: 1, duration: 0.4 });
                        }
                    });
                } else {
                    renderSubscribedState();
                }
            }, 1000);
        });
    }
}
