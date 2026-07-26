/* ==========================================================
   PILKADES KECAMATAN SELOREJO 2026
   Official Website
   app.js Final v1.0

   Part 1
   ----------------------------------------------------------
   ✓ DOM Ready
   ✓ Utility Functions
   ✓ Preloader
========================================================== */

'use strict';

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    App.init();

});


/* ==========================================================
   MAIN APPLICATION
========================================================== */

const App = {

    /* ==========================================
       INITIALIZATION
    ========================================== */

    init() {

        this.cacheDom();

        this.preloader();

        console.log(
            '%cPilkades Kecamatan Selorejo 2026',
            'color:#0d6efd;font-size:16px;font-weight:bold;'
        );

        console.log('App Initialized');

    },



    /* ==========================================
       CACHE DOM
    ========================================== */

    cacheDom() {

        this.body = document.body;

        this.html = document.documentElement;

        this.preloaderElement =
            document.getElementById('preloader');

    },



    /* ==========================================
       PRELOADER
    ========================================== */

    preloader() {

        if (!this.preloaderElement) return;

        window.addEventListener('load', () => {

            this.preloaderElement.classList.add('loaded');

            setTimeout(() => {

                this.preloaderElement.remove();

            }, 700);

        });

    }

};



/* ==========================================================
   UTILITY FUNCTIONS
========================================================== */

const Utils = {

    /* ==========================================
       SELECTOR
    ========================================== */

    qs(selector, scope = document) {

        return scope.querySelector(selector);

    },



    qsa(selector, scope = document) {

        return scope.querySelectorAll(selector);

    },



    /* ==========================================
       EVENT
    ========================================== */

    on(element, event, handler) {

        if (!element) return;

        element.addEventListener(event, handler);

    },



    /* ==========================================
       CLASS
    ========================================== */

    addClass(element, className) {

        if (!element) return;

        element.classList.add(className);

    },



    removeClass(element, className) {

        if (!element) return;

        element.classList.remove(className);

    },



    toggleClass(element, className) {

        if (!element) return;

        element.classList.toggle(className);

    },



    /* ==========================================
       SCROLL
    ========================================== */

    scrollTop() {

        return window.pageYOffset
            || document.documentElement.scrollTop;

    },



    scrollTo(target) {

        if (!target) return;

        target.scrollIntoView({

            behavior: 'smooth',

            block: 'start'

        });

    },



    /* ==========================================
       STORAGE
    ========================================== */

    save(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },



    load(key, fallback = null) {

        const data = localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : fallback;

    },



    /* ==========================================
       FORMAT NUMBER
    ========================================== */

    number(value) {

        return new Intl.NumberFormat('id-ID')
            .format(value);

    },



    /* ==========================================
       DEBOUNCE
    ========================================== */

    debounce(callback, delay = 200) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

};



/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

window.addEventListener('error', (event) => {

    console.error(

        'JavaScript Error:',

        event.message

    );

});



/* ==========================================================
   UNHANDLED PROMISE
========================================================== */

window.addEventListener(

    'unhandledrejection',

    (event) => {

        console.error(

            'Promise Error:',

            event.reason

        );

    }

);
/* ==========================================
   STICKY HEADER
========================================== */

stickyHeader() {

    const header = document.getElementById('header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {

        const currentScroll = window.pageYOffset;

        /* Shadow ketika discroll */

        if (currentScroll > 50) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

        /* Hide ketika scroll turun */

        if (
            currentScroll > lastScroll &&
            currentScroll > 120
        ) {

            header.classList.remove('show');
            header.classList.add('hide');

        } else {

            header.classList.remove('hide');
            header.classList.add('show');

        }

        lastScroll = currentScroll;

    });

},



/* ==========================================
   SMOOTH SCROLL
========================================== */

smoothScroll() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach(link => {

        link.addEventListener('click', e => {

            const href = link.getAttribute('href');

            if (
                href === '#' ||
                href.length < 2
            ) return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            const header = document.getElementById('header');

            const offset = header
                ? header.offsetHeight
                : 80;

            const top =
                target.offsetTop - offset;

            window.scrollTo({

                top,

                behavior: 'smooth'

            });

        });

    });

},



/* ==========================================
   ACTIVE MENU
========================================== */

activeNavigation() {

    const sections =
        document.querySelectorAll('section[id]');

    const navLinks =
        document.querySelectorAll(
            '#navbar a[href^="#"], #mobileMenu a[href^="#"]'
        );

    if (!sections.length) return;

    window.addEventListener('scroll', () => {

        const scrollY =
            window.pageYOffset + 140;

        sections.forEach(section => {

            const top = section.offsetTop;

            const height = section.offsetHeight;

            if (
                scrollY >= top &&
                scrollY < top + height
            ) {

                const id = section.getAttribute('id');

                navLinks.forEach(link => {

                    link.classList.remove('active');

                    if (
                        link.getAttribute('href') ===
                        `#${id}`
                    ) {

                        link.classList.add('active');

                    }

                });

            }

        });

    });

},
/* ==========================================
   MOBILE MENU
========================================== */

mobileMenu() {

    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');

    const openBtn = document.getElementById('mobileMenuButton');
    const closeBtn = document.getElementById('closeMobileMenu');

    if (!menu || !openBtn) return;

    const openMenu = () => {

        menu.classList.add('active');

        overlay?.classList.add('active');

        document.body.classList.add('menu-open');

        openBtn.setAttribute(
            'aria-expanded',
            'true'
        );

    };

    const closeMenu = () => {

        menu.classList.remove('active');

        overlay?.classList.remove('active');

        document.body.classList.remove('menu-open');

        openBtn.setAttribute(
            'aria-expanded',
            'false'
        );

    };

    openBtn.addEventListener('click', openMenu);

    closeBtn?.addEventListener('click', closeMenu);

    overlay?.addEventListener('click', closeMenu);

    menu.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', closeMenu);

    });

    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {

            closeMenu();

        }

    });

},



/* ==========================================
   SEARCH MODAL
========================================== */

searchModal() {

    const modal = document.getElementById('searchModal');

    const button = document.getElementById('searchButton');

    if (!modal || !button) return;

    const input = modal.querySelector('input');

    const openSearch = () => {

        modal.classList.add('active');

        input?.focus();

    };

    const closeSearch = () => {

        modal.classList.remove('active');

    };

    button.addEventListener('click', openSearch);

    modal.addEventListener('click', e => {

        if (e.target === modal) {

            closeSearch();

        }

    });

    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {

            closeSearch();

        }

    });

},



/* ==========================================
   SCROLL PROGRESS
========================================== */

scrollProgress() {

    const progress = document.getElementById(
        'scroll-progress-bar'
    );

    if (!progress) return;

    window.addEventListener('scroll', () => {

        const total =

            document.documentElement.scrollHeight -

            window.innerHeight;

        const current = window.pageYOffset;

        const percent =

            (current / total) * 100;

        progress.style.width =

            `${percent}%`;

    });

},



/* ==========================================
   BACK TO TOP
========================================== */

backToTop() {

    const button =

        document.getElementById('backToTop');

    if (!button) return;

    window.addEventListener('scroll', () => {

        if (window.pageYOffset > 500) {

            button.classList.add('show');

        } else {

            button.classList.remove('show');

        }

    });

    button.addEventListener('click', () => {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    });

},
/* ==========================================
   ACCESSIBILITY
========================================== */

accessibility() {

    const html = document.documentElement;

    const increase =
        document.getElementById('increase-font');

    const decrease =
        document.getElementById('decrease-font');

    const reset =
        document.getElementById('reset-font');

    const dark =
        document.getElementById('dark-mode');

    const darkQuick =
        document.getElementById('darkModeToggle');

    const contrast =
        document.getElementById('high-contrast');

    const gray =
        document.getElementById('grayscale-mode');

    const animation =
        document.getElementById('disable-animation');

    let fontSize =
        Number(localStorage.getItem('fontSize')) || 100;

    /* ===============================
       LOAD SAVED SETTINGS
    =============================== */

    this.applyFont(fontSize);

    if (localStorage.getItem('darkMode') === 'true') {

        html.classList.add('dark-mode');

    }

    if (localStorage.getItem('highContrast') === 'true') {

        html.classList.add('high-contrast');

    }

    if (localStorage.getItem('grayscale') === 'true') {

        html.classList.add('grayscale');

    }

    if (localStorage.getItem('reduceMotion') === 'true') {

        html.classList.add('reduce-motion');

    }

    /* ===============================
       FONT SIZE
    =============================== */

    increase?.addEventListener('click', () => {

        if (fontSize >= 130) return;

        fontSize += 10;

        this.applyFont(fontSize);

    });

    decrease?.addEventListener('click', () => {

        if (fontSize <= 80) return;

        fontSize -= 10;

        this.applyFont(fontSize);

    });

    reset?.addEventListener('click', () => {

        fontSize = 100;

        this.applyFont(fontSize);

    });

    /* ===============================
       DARK MODE
    =============================== */

    const toggleDark = () => {

        html.classList.toggle('dark-mode');

        localStorage.setItem(

            'darkMode',

            html.classList.contains('dark-mode')

        );

    };

    dark?.addEventListener('click', toggleDark);

    darkQuick?.addEventListener('click', toggleDark);

    /* ===============================
       HIGH CONTRAST
    =============================== */

    contrast?.addEventListener('click', () => {

        html.classList.toggle('high-contrast');

        localStorage.setItem(

            'highContrast',

            html.classList.contains('high-contrast')

        );

    });

    /* ===============================
       GRAYSCALE
    =============================== */

    gray?.addEventListener('click', () => {

        html.classList.toggle('grayscale');

        localStorage.setItem(

            'grayscale',

            html.classList.contains('grayscale')

        );

    });

    /* ===============================
       REDUCE MOTION
    =============================== */

    animation?.addEventListener('click', () => {

        html.classList.toggle('reduce-motion');

        localStorage.setItem(

            'reduceMotion',

            html.classList.contains('reduce-motion')

        );

    });

},



/* ==========================================
   APPLY FONT SIZE
========================================== */

applyFont(size) {

    document.documentElement.style.fontSize =
        `${size}%`;

    localStorage.setItem(

        'fontSize',

        size

    );

},
/* ==========================================
   COUNTER ANIMATION
========================================== */

counterAnimation() {

    const counters = document.querySelectorAll('[data-counter]');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(
                counter.dataset.counter
            );

            const duration = 2000;

            const step = target / (duration / 16);

            let current = 0;

            const timer = setInterval(() => {

                current += step;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    Math.floor(current).toLocaleString('id-ID');

            }, 16);

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.4

    });

    counters.forEach(item => observer.observe(item));

},



/* ==========================================
   AOS INITIALIZATION
========================================== */

initAOS() {

    if (typeof AOS === 'undefined') return;

    AOS.init({

        duration: 800,

        easing: 'ease-out-cubic',

        once: true,

        offset: 80,

        mirror: false

    });

},



/* ==========================================
   SWIPER INITIALIZATION
========================================== */

initSwiper() {

    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.swiper').forEach(swiper => {

        new Swiper(swiper, {

            loop: true,

            speed: 700,

            spaceBetween: 24,

            autoplay: {

                delay: 5000,

                disableOnInteraction: false

            },

            pagination: {

                el: swiper.querySelector('.swiper-pagination'),

                clickable: true

            },

            navigation: {

                nextEl: swiper.querySelector('.swiper-button-next'),

                prevEl: swiper.querySelector('.swiper-button-prev')

            },

            breakpoints: {

                0: {

                    slidesPerView: 1

                },

                768: {

                    slidesPerView: 2

                },

                1200: {

                    slidesPerView: 3

                }

            }

        });

    });

},



/* ==========================================
   GLIGHTBOX
========================================== */

initLightbox() {

    if (typeof GLightbox === 'undefined') return;

    GLightbox({

        selector: '.glightbox',

        touchNavigation: true,

        loop: true,

        autoplayVideos: true

    });

},



/* ==========================================
   LAZY IMAGE
========================================== */

lazyImages() {

    const images = document.querySelectorAll(
        'img[loading="lazy"]'
    );

    if (!images.length) return;

    images.forEach(image => {

        image.decoding = 'async';

    });

},



/* ==========================================
   FINAL STARTUP
========================================== */

startupReport() {

    console.group(

        'Pilkades Kecamatan Selorejo 2026'

    );

    console.log('✓ DOM Ready');

    console.log('✓ Navigation');

    console.log('✓ Accessibility');

    console.log('✓ Counter');

    console.log('✓ Swiper');

    console.log('✓ AOS');

    console.log('✓ Lightbox');

    console.log('✓ Lazy Images');

    console.groupEnd();

},
