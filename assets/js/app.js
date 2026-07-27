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
/* ===========================================================
   PART 2
   STICKY HEADER + ACTIVE MENU + SMOOTH SCROLL
===========================================================*/


/* ===========================================================
   NAVIGATION
===========================================================*/

const Navigation = {

    sections: [],
    menuLinks: [],

    init() {

        this.cache();
        this.bindEvents();
        this.setActiveMenu();

    },

    cache() {

        this.menuLinks = Utils.qsa('.navbar a[href^="#"]');

        this.sections = this.menuLinks
            .map(link => {

                const id = link.getAttribute("href");

                return document.querySelector(id);

            })
            .filter(Boolean);

    },

    bindEvents() {

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.handleScroll();

            }, 20)

        );

        this.menuLinks.forEach(link => {

            Utils.on(link, "click", (event) => {

                this.handleClick(event);

            });

        });

    },

    handleScroll() {

        this.stickyHeader();
        this.setActiveMenu();

    },

    handleClick(event) {

        const link = event.currentTarget;

        const target = link.getAttribute("href");

        if (!target.startsWith("#")) return;

        event.preventDefault();

        scrollToElement(target, 90);

    },

    stickyHeader() {

        const header = Utils.dom.header;

        if (!header) return;

        if (Utils.scrollTop() > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    },

    setActiveMenu() {

        const scrollPosition = Utils.scrollTop() + 140;

        this.menuLinks.forEach(link => {

            const id = link.getAttribute("href");

            const section = document.querySelector(id);

            if (!section) return;

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPosition >= top &&
                scrollPosition < bottom) {

                this.menuLinks.forEach(item => {

                    item.classList.remove("active");

                });

                link.classList.add("active");

            }

        });

    }

};


/* ===========================================================
   HEADER SHADOW
===========================================================*/

const HeaderEffect = {

    init() {

        this.handle();

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.handle();

            }, 20)

        );

    },

    handle() {

        const header = Utils.dom.header;

        if (!header) return;

        if (Utils.scrollTop() > 10) {

            header.classList.add("header-shadow");

        } else {

            header.classList.remove("header-shadow");

        }

    }

};


/* ===========================================================
   SMOOTH SCROLL
===========================================================*/

const SmoothScroll = {

    init() {

        Utils.qsa('a[href^="#"]').forEach(link => {

            Utils.on(link, "click", event => {

                const target =
                    link.getAttribute("href");

                if (target === "#") return;

                const section =
                    document.querySelector(target);

                if (!section) return;

                event.preventDefault();

                scrollToElement(target, 90);

            });

        });

    }

};


/* ===========================================================
   SCROLL OFFSET FIX
===========================================================*/

window.addEventListener("load", () => {

    if (window.location.hash) {

        setTimeout(() => {

            scrollToElement(

                window.location.hash,

                90

            );

        }, 300);

    }

});


/* ===========================================================
   KEYBOARD ACCESSIBILITY
===========================================================*/

document.addEventListener("keyup", (event) => {

    if (event.key !== "Tab") return;

    document.body.classList.add("keyboard-user");

});


/* ===========================================================
   RESIZE EVENT
===========================================================*/

window.addEventListener(

    "resize",

    debounce(() => {

        Navigation.cache();
        Navigation.setActiveMenu();

    }, 200)

);


/* ===========================================================
   INITIALIZE
===========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    Navigation.init();

    HeaderEffect.init();

    SmoothScroll.init();

});
/* ===========================================================
   PART 3
   COUNTDOWN + BACK TO TOP + SCROLL PROGRESS
===========================================================*/


/* ===========================================================
   COUNTDOWN TIMER
===========================================================*/

const Countdown = {

    targetDate: new Date("2026-11-18T07:00:00"),

    elements: {},

    init() {

        this.elements.days =
            document.querySelector("[data-days]");

        this.elements.hours =
            document.querySelector("[data-hours]");

        this.elements.minutes =
            document.querySelector("[data-minutes]");

        this.elements.seconds =
            document.querySelector("[data-seconds]");

        if (!this.elements.days) return;

        this.update();

        setInterval(() => {

            this.update();

        }, 1000);

    },

    update() {

        const now = new Date().getTime();

        const distance =
            this.targetDate.getTime() - now;

        if (distance <= 0) {

            this.finish();

            return;

        }

        const days =
            Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours =
            Math.floor(

                (distance %
                    (1000 * 60 * 60 * 24))

                    /

                    (1000 * 60 * 60)

            );

        const minutes =
            Math.floor(

                (distance %
                    (1000 * 60 * 60))

                    /

                    (1000 * 60)

            );

        const seconds =
            Math.floor(

                (distance %
                    (1000 * 60))

                    /

                    1000

            );

        this.elements.days.textContent =
            String(days).padStart(2, "0");

        this.elements.hours.textContent =
            String(hours).padStart(2, "0");

        this.elements.minutes.textContent =
            String(minutes).padStart(2, "0");

        this.elements.seconds.textContent =
            String(seconds).padStart(2, "0");

    },

    finish() {

        this.elements.days.textContent = "00";
        this.elements.hours.textContent = "00";
        this.elements.minutes.textContent = "00";
        this.elements.seconds.textContent = "00";

    }

};


/* ===========================================================
   BACK TO TOP
===========================================================*/

const BackToTop = {

    button: null,

    init() {

        this.button =
            document.querySelector(".back-to-top");

        if (!this.button) return;

        this.bind();

        this.handle();

    },

    bind() {

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.handle();

            }, 20)

        );

        this.button.addEventListener(

            "click",

            event => {

                event.preventDefault();

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    },

    handle() {

        if (window.scrollY > 350) {

            this.button.classList.add("show");

        } else {

            this.button.classList.remove("show");

        }

    }

};


/* ===========================================================
   SCROLL PROGRESS BAR
===========================================================*/

const ScrollProgress = {

    progressBar:null,

    init(){

        this.create();

        this.update();

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.update();

            },16)

        );

    },

    create(){

        this.progressBar =
            document.createElement("div");

        this.progressBar.className =
            "scroll-progress";

        document.body.appendChild(

            this.progressBar

        );

    },

    update(){

        const scrollTop =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percent =
            (scrollTop / height) * 100;

        this.progressBar.style.width =
            percent + "%";

    }

};


/* ===========================================================
   SCROLL REVEAL
===========================================================*/

const Reveal = {

    items:[],

    init(){

        this.items = document.querySelectorAll(

            ".reveal"

        );

        if(!this.items.length) return;

        this.check();

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.check();

            },20)

        );

    },

    check(){

        this.items.forEach(item=>{

            if(isInViewport(item)){

                item.classList.add("active");

            }

        });

    }

};


/* ===========================================================
   NUMBER COUNTER
===========================================================*/

const Counter = {

    counters:[],

    started:false,

    init(){

        this.counters = document.querySelectorAll(

            "[data-counter]"

        );

        if(!this.counters.length) return;

        window.addEventListener(

            "scroll",

            throttle(()=>{

                this.check();

            },20)

        );

    },

    check(){

        if(this.started) return;

        this.counters.forEach(counter=>{

            if(isInViewport(counter)){

                this.started=true;

                this.animate();

            }

        });

    },

    animate(){

        this.counters.forEach(counter=>{

            const target =
                Number(counter.dataset.counter);

            let value = 0;

            const speed = target / 80;

            const timer = setInterval(()=>{

                value += speed;

                if(value >= target){

                    value = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    formatNumber(

                        Math.floor(value)

                    );

            },20);

        });

    }

};


/* ===========================================================
   INITIALIZE
===========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Countdown.init();

        BackToTop.init();

        ScrollProgress.init();

        Reveal.init();

        Counter.init();

    }

);
/* ===========================================================
   PART 4
   SCROLL ANIMATION + LAZY LOADING + FINAL INITIALIZATION
===========================================================*/


/* ===========================================================
   SCROLL ANIMATION
===========================================================*/

const ScrollAnimation = {

    elements: [],

    init() {

        this.elements = document.querySelectorAll(

            ".fade-up, .fade-left, .fade-right, .zoom-in"

        );

        if (!this.elements.length) return;

        this.observe();

    },

    observe() {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("animated");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {

                threshold: 0.15

            }

        );

        this.elements.forEach(item => {

            observer.observe(item);

        });

    }

};


/* ===========================================================
   LAZY IMAGE
===========================================================*/

const LazyImage = {

    images: [],

    init() {

        this.images = document.querySelectorAll(

            "img[data-src]"

        );

        if (!this.images.length) return;

        this.observe();

    },

    observe() {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const img = entry.target;

                    img.src = img.dataset.src;

                    img.removeAttribute("data-src");

                    img.onload = () => {

                        img.classList.add("loaded");

                    };

                    observer.unobserve(img);

                });

            },

            {

                rootMargin: "100px"

            }

        );

        this.images.forEach(img => {

            observer.observe(img);

        });

    }

};


/* ===========================================================
   IMAGE HOVER EFFECT
===========================================================*/

const ImageEffect = {

    init() {

        document.querySelectorAll(

            ".card img"

        ).forEach(img => {

            img.addEventListener(

                "mouseenter",

                () => {

                    img.classList.add("hover");

                }

            );

            img.addEventListener(

                "mouseleave",

                () => {

                    img.classList.remove("hover");

                }

            );

        });

    }

};


/* ===========================================================
   BUTTON RIPPLE
===========================================================*/

const Ripple = {

    init() {

        document.querySelectorAll(

            ".btn"

        ).forEach(button => {

            button.addEventListener(

                "click",

                function (event) {

                    const ripple = document.createElement("span");

                    ripple.className = "ripple";

                    const rect = this.getBoundingClientRect();

                    ripple.style.left =

                        event.clientX - rect.left + "px";

                    ripple.style.top =

                        event.clientY - rect.top + "px";

                    this.appendChild(ripple);

                    setTimeout(() => {

                        ripple.remove();

                    }, 600);

                }

            );

        });

    }

};


/* ===========================================================
   WINDOW RESIZE
===========================================================*/

const WindowResize = {

    init() {

        window.addEventListener(

            "resize",

            debounce(() => {

                Navigation.cache();

                Navigation.setActiveMenu();

            }, 250)

        );

    }

};


/* ===========================================================
   PAGE VISIBILITY
===========================================================*/

const Visibility = {

    init() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    console.log("Page Hidden");

                } else {

                    console.log("Page Visible");

                }

            }

        );

    }

};


/* ===========================================================
   PERFORMANCE LOGGER
===========================================================*/

const PerformanceInfo = {

    init() {

        window.addEventListener(

            "load",

            () => {

                const t = performance.now();

                console.log(

                    "Load Time :",

                    Math.round(t),

                    "ms"

                );

            }

        );

    }

};


/* ===========================================================
   FINAL APPLICATION
===========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Navigation.init();

        HeaderEffect.init();

        SmoothScroll.init();

        Countdown.init();

        BackToTop.init();

        ScrollProgress.init();

        Reveal.init();

        Counter.init();

        ScrollAnimation.init();

        LazyImage.init();

        ImageEffect.init();

        Ripple.init();

        WindowResize.init();

        Visibility.init();

        PerformanceInfo.init();

        console.log(

            "%cPortal Pilkades Serentak 2026 Ready",

            "color:#16a34a;font-size:15px;font-weight:bold"

        );

    }

);
