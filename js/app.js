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
