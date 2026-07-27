/* ===========================================================
   APP.JS
   PORTAL PILKADES SERENTAK 2026
   PART 1
   DOM READY + HELPER FUNCTIONS + PRELOADER
===========================================================*/

"use strict";

/* ===========================================================
   DOM READY
===========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});


/* ===========================================================
   APPLICATION
===========================================================*/

const App = {

    init() {

        Utils.cacheDom();
        Utils.removeNoJs();
        Utils.setCurrentYear();

        Preloader.init();

        console.log("Portal Pilkades 2026 Initialized");

    }

};


/* ===========================================================
   HELPER FUNCTIONS
===========================================================*/

const Utils = {

    dom: {},

    cacheDom() {

        this.dom.window = window;
        this.dom.document = document;
        this.dom.body = document.body;
        this.dom.html = document.documentElement;

        this.dom.header = document.querySelector("header");
        this.dom.navbar = document.querySelector(".navbar");
        this.dom.backToTop = document.querySelector(".back-to-top");
        this.dom.preloader = document.querySelector(".preloader");
        this.dom.countdown = document.querySelector(".countdown");

    },

    qs(selector, scope = document) {

        return scope.querySelector(selector);

    },

    qsa(selector, scope = document) {

        return [...scope.querySelectorAll(selector)];

    },

    on(element, event, callback, options = false) {

        if (!element) return;

        element.addEventListener(event, callback, options);

    },

    scrollTop() {

        return window.pageYOffset ||
               document.documentElement.scrollTop;

    },

    removeNoJs() {

        document.documentElement.classList.remove("no-js");

    },

    setCurrentYear() {

        const year = document.querySelector("[data-current-year]");

        if (year) {

            year.textContent = new Date().getFullYear();

        }

    }

};


/* ===========================================================
   DEBOUNCE
===========================================================*/

function debounce(callback, delay = 100) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}


/* ===========================================================
   THROTTLE
===========================================================*/

function throttle(callback, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}


/* ===========================================================
   PRELOADER
===========================================================*/

const Preloader = {

    init() {

        const loader = Utils.dom.preloader;

        if (!loader) return;

        window.addEventListener("load", () => {

            this.hide(loader);

        });

    },

    hide(loader) {

        loader.classList.add("loaded");

        setTimeout(() => {

            loader.remove();

        }, 600);

    }

};


/* ===========================================================
   LOADING STATE
===========================================================*/

function showLoading(button) {

    if (!button) return;

    button.disabled = true;

    button.dataset.originalText = button.innerHTML;

    button.innerHTML = `
        <span class="spinner"></span>
        Memuat...
    `;

}

function hideLoading(button) {

    if (!button) return;

    button.disabled = false;

    if (button.dataset.originalText) {

        button.innerHTML = button.dataset.originalText;

    }

}


/* ===========================================================
   SMOOTH SCROLL HELPER
===========================================================*/

function scrollToElement(target, offset = 80) {

    const element = document.querySelector(target);

    if (!element) return;

    const top = element.offsetTop - offset;

    window.scrollTo({

        top,
        behavior: "smooth"

    });

}


/* ===========================================================
   VIEWPORT CHECK
===========================================================*/

function isInViewport(element) {

    if (!element) return false;

    const rect = element.getBoundingClientRect();

    return (

        rect.top <= window.innerHeight &&
        rect.bottom >= 0

    );

}


/* ===========================================================
   RANDOM ID
===========================================================*/

function randomID(length = 8) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        result += chars.charAt(

            Math.floor(Math.random() * chars.length)

        );

    }

    return result;

}


/* ===========================================================
   FORMAT NUMBER
===========================================================*/

function formatNumber(number) {

    return new Intl.NumberFormat("id-ID").format(number);

}


/* ===========================================================
   COPY TO CLIPBOARD
===========================================================*/

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}


/* ===========================================================
   CONSOLE INFO
===========================================================*/

console.log("%cPortal Pilkades Serentak 2026", "color:#0d6efd;font-size:16px;font-weight:bold;");
console.log("%cJavaScript Loaded Successfully", "color:#198754;");
