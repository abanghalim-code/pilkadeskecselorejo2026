/* ============================================================
   PORTAL PILKADES SERENTAK 2026
   Kecamatan Selorejo Kabupaten Blitar

   app.js Final v4.0
   BAGIAN 1A

   ✓ Configuration
   ✓ DOM Ready
   ✓ App Class
   ✓ Cache DOM
   ✓ Utility
============================================================ */

"use strict";

/*============================================================
    CONFIGURATION
============================================================*/

const CONFIG = {

    headerOffset: 80,

    backTopOffset: 500,

    activeOffset: 150,

    animationDuration: 400

};


/*============================================================
    DATA PATH
============================================================*/

const DATA = {

    desa: "data/desa.json",

    tahapan: "data/tahapan.json",

    berita: "data/berita.json",

    regulasi: "data/regulasi.json",

    galeri: "data/galeri.json"

};


/*============================================================
    DOM READY
============================================================*/

document.addEventListener("DOMContentLoaded", () => {

    window.Pilkades = new PilkadesApp();

    window.Pilkades.init();

});


/*============================================================
    APP CLASS
============================================================*/

class PilkadesApp{

    constructor(){

        this.dom = {};

        this.state = {

            loaded:false,

            mobileOpen:false,

            currentSection:""

        };

    }


/*============================================================
    INITIALIZATION
============================================================*/

    async init(){

        this.cacheDOM();

        this.bindEvents();

        this.hideLoader();

        this.updateNavbar();

        this.updateActiveMenu();

    }


/*============================================================
    CACHE DOM
============================================================*/

    cacheDOM(){

        this.dom.body =
            document.body;

        this.dom.navbar =
            document.querySelector(".navbar");

        this.dom.navLinks =
            document.querySelectorAll(".nav-link");

        this.dom.sections =
            document.querySelectorAll("section[id]");

        this.dom.backTop =
            document.querySelector(".back-top");

        this.dom.mobileButton =
            document.querySelector(".mobile-toggle");

        this.dom.mobileMenu =
            document.querySelector(".navbar nav");

        this.dom.loader =
            document.querySelector(".loading");

        this.dom.running =
            document.getElementById("runningText");

        this.dom.desa =
            document.getElementById("desaContainer");

        this.dom.timeline =
            document.getElementById("timelineContainer");

        this.dom.berita =
            document.getElementById("beritaContainer");

        this.dom.regulasi =
            document.getElementById("regulasiContainer");

        this.dom.galeri =
            document.getElementById("galeriContainer");

    }


/*============================================================
    UTILITY
============================================================*/

    qs(selector){

        return document.querySelector(selector);

    }


    qsa(selector){

        return document.querySelectorAll(selector);

    }


    byId(id){

        return document.getElementById(id);

    }


    create(tag){

        return document.createElement(tag);

    }


    hasElement(element){

        return element !== null;

    }


    isArray(data){

        return Array.isArray(data);

    }


    log(message){

        console.log(

            "%c[PILKADES]",

            "color:#005baa;font-weight:bold",

            message

        );

    }


    error(message){

        console.error(

            "%c[PILKADES ERROR]",

            "color:red;font-weight:bold",

            message

        );

    }

}
/*============================================================
    EVENT BINDING
============================================================*/

    bindEvents(){

        /* Scroll */

        window.addEventListener("scroll", () => {

            this.handleScroll();

        });


        /* Resize */

        window.addEventListener("resize", () => {

            this.handleResize();

        });


        /* Navigation */

        this.dom.navLinks.forEach(link => {

            link.addEventListener("click", (event) => {

                this.smoothScroll(event);

            });

        });


        /* Mobile Menu */

        if(this.hasElement(this.dom.mobileButton)){

            this.dom.mobileButton.addEventListener("click", () => {

                this.toggleMobileMenu();

            });

        }


        /* Back To Top */

        if(this.hasElement(this.dom.backTop)){

            this.dom.backTop.addEventListener("click", () => {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            });

        }

    }


/*============================================================
    HANDLE SCROLL
============================================================*/

    handleScroll(){

        this.updateNavbar();

        this.updateBackTop();

        this.updateActiveMenu();

    }


/*============================================================
    HANDLE RESIZE
============================================================*/

    handleResize(){

        if(window.innerWidth > 992){

            this.closeMobileMenu();

        }

    }


/*============================================================
    STICKY NAVBAR
============================================================*/

    updateNavbar(){

        if(!this.hasElement(this.dom.navbar)) return;

        if(window.scrollY > 60){

            this.dom.navbar.classList.add("scrolled");

        }

        else{

            this.dom.navbar.classList.remove("scrolled");

        }

    }
/*============================================================
    ACTIVE MENU
============================================================*/

    updateActiveMenu(){

        if(!this.dom.sections.length) return;

        let current = "";

        this.dom.sections.forEach(section => {

            const sectionTop =
                section.offsetTop - CONFIG.activeOffset;

            const sectionHeight =
                section.offsetHeight;

            if(
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ){

                current = section.id;

            }

        });

        this.state.currentSection = current;

        this.dom.navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if(target === "#" + current){

                link.classList.add("active");

            }

        });

    }


/*============================================================
    SMOOTH SCROLL
============================================================*/

    smoothScroll(event){

        const href =
            event.currentTarget.getAttribute("href");

        if(
            !href ||
            !href.startsWith("#")
        ){

            return;

        }

        const target =
            document.querySelector(href);

        if(!target){

            return;

        }

        event.preventDefault();

        const destination =
            target.offsetTop -
            CONFIG.headerOffset;

        window.scrollTo({

            top: destination,

            behavior: "smooth"

        });

        this.closeMobileMenu();

    }
/*============================================================
    MOBILE MENU
============================================================*/

    toggleMobileMenu(){

        if(!this.hasElement(this.dom.mobileMenu)) return;

        this.state.mobileOpen = !this.state.mobileOpen;

        this.dom.mobileMenu.classList.toggle(
            "show",
            this.state.mobileOpen
        );

        if(this.hasElement(this.dom.mobileButton)){

            this.dom.mobileButton.classList.toggle(
                "active",
                this.state.mobileOpen
            );

        }

    }


/*============================================================
    CLOSE MOBILE MENU
============================================================*/

    closeMobileMenu(){

        if(!this.hasElement(this.dom.mobileMenu)) return;

        this.state.mobileOpen = false;

        this.dom.mobileMenu.classList.remove("show");

        if(this.hasElement(this.dom.mobileButton)){

            this.dom.mobileButton.classList.remove("active");

        }

    }


/*============================================================
    BACK TO TOP
============================================================*/

    updateBackTop(){

        if(!this.hasElement(this.dom.backTop)) return;

        if(window.scrollY >= CONFIG.backTopOffset){

            this.dom.backTop.classList.add("show");

        }

        else{

            this.dom.backTop.classList.remove("show");

        }

    }


/*============================================================
    LOADING SCREEN
============================================================*/

    hideLoader(){

        if(!this.hasElement(this.dom.loader)) return;

        window.addEventListener("load", () => {

            this.dom.loader.classList.add("hide");

            setTimeout(() => {

                this.dom.loader.style.display = "none";

            },300);

        });

    }


/*============================================================
    SCROLL TO TOP
============================================================*/

    scrollTop(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }


/*============================================================
    REFRESH ACTIVE COMPONENT
============================================================*/

    refresh(){

        this.updateNavbar();

        this.updateBackTop();

        this.updateActiveMenu();

    }

}
/*============================================================
    LOAD WEBSITE
============================================================*/

    async loadWebsite(){

        const tasks = [];

        if(this.hasElement(this.dom.desa))
            tasks.push(this.loadDesa());

        if(this.hasElement(this.dom.timeline))
            tasks.push(this.loadTahapan());

        if(this.hasElement(this.dom.berita))
            tasks.push(this.loadBerita());

        if(this.hasElement(this.dom.regulasi))
            tasks.push(this.loadRegulasi());

        if(this.hasElement(this.dom.galeri))
            tasks.push(this.loadGaleri());

        await Promise.all(tasks);

    }


/*============================================================
    FETCH JSON
============================================================*/

    async fetchJSON(path){

        try{

            const response = await fetch(path,{

                cache:"no-cache"

            });

            if(!response.ok){

                throw new Error(

                    `Gagal memuat ${path}
                    (${response.status})`

                );

            }

            return await response.json();

        }

        catch(error){

            this.error(error);

            return [];

        }

    }


/*============================================================
    LOAD DESA
============================================================*/

    async loadDesa(){

        const data = await this.fetchJSON(DATA.desa);

        if(!this.isArray(data)){

            this.dom.desa.innerHTML =

            `<p class="text-center">
                Data desa tidak tersedia.
            </p>`;

            return;

        }

        let html = "";

        data.forEach(desa=>{

            html += `

            <article class="desa-card">

                <div class="desa-image">

                    <img
                        src="${desa.gambar}"
                        alt="${desa.nama}"
                        loading="lazy">

                </div>

                <div class="desa-content">

                    <h3>${desa.nama}</h3>

                    <p>${desa.deskripsi}</p>

                    <div class="desa-meta">

                        <span>
                            📍 ${desa.lokasi}
                        </span>

                        <span>
                            🗳 ${desa.kategori}
                        </span>

                    </div>

                    <a
                        href="${desa.link}"
                        class="btn-primary">

                        Selengkapnya

                    </a>

                </div>

            </article>

            `;

        });

        this.dom.desa.innerHTML = html;

        this.log(

            `${data.length} desa berhasil dimuat.`

        );

    }
/*============================================================
    LOAD TAHAPAN
============================================================*/

async loadTahapan(){

    const data = await this.fetchJSON(DATA.tahapan);

    if(!this.isArray(data) || !this.hasElement(this.dom.timeline)){

        this.dom.timeline.innerHTML =
        `<p class="text-center">
            Data tahapan belum tersedia.
        </p>`;

        return;

    }

    let html = "";

    const today = new Date();

    data.forEach((item,index)=>{

        const startDate = new Date(item.mulai);
        const endDate   = new Date(item.selesai);

        let status = "Akan Datang";
        let badge  = "badge-upcoming";

        if(today > endDate){

            status = "Selesai";
            badge = "badge-success";

        }else if(today >= startDate && today <= endDate){

            status = "Berlangsung";
            badge = "badge-active";

        }

        html += `

        <article class="timeline-item">

            <div class="timeline-number">

                ${index + 1}

            </div>

            <div class="timeline-content">

                <h3>${item.nama}</h3>

                <p>${item.deskripsi}</p>

                <div class="timeline-date">

                    📅 ${item.mulai}
                    &mdash;
                    ${item.selesai}

                </div>

                <span class="timeline-status ${badge}">

                    ${status}

                </span>

            </div>

        </article>

        `;

    });

    this.dom.timeline.innerHTML = html;

    this.updateRunningInfo(data);

    this.log(`${data.length} tahapan berhasil dimuat.`);

}


/*============================================================
    RUNNING INFORMATION
============================================================*/

updateRunningInfo(data){

    if(!this.hasElement(this.dom.running)) return;

    if(!this.isArray(data)) return;

    const today = new Date();

    const current = data.find(item=>{

        const mulai = new Date(item.mulai);

        const selesai = new Date(item.selesai);

        return today >= mulai && today <= selesai;

    });

    if(current){

        this.dom.running.innerHTML =

        `🔴 Tahapan saat ini :
        <strong>${current.nama}</strong>`;

        return;

    }

    const next = data.find(item=>{

        return new Date(item.mulai) > today;

    });

    if(next){

        this.dom.running.innerHTML =

        `🟢 Tahapan berikutnya :
        <strong>${next.nama}</strong>`;

        return;

    }

    this.dom.running.innerHTML =

    `✅ Seluruh tahapan Pilkades telah selesai.`;

}
/*============================================================
    LOAD BERITA
============================================================*/

async loadBerita(){

    const data = await this.fetchJSON(DATA.berita);

    if(!this.isArray(data) || !this.hasElement(this.dom.berita)){

        this.dom.berita.innerHTML = `
            <p class="text-center">
                Belum ada berita.
            </p>
        `;

        return;

    }

    let html = "";

    data.forEach(item=>{

        html += `

        <article class="news-card">

            <div class="news-image">

                <img
                    src="${item.gambar}"
                    alt="${item.judul}"
                    loading="lazy">

            </div>

            <div class="news-content">

                <span class="news-category">

                    ${item.kategori}

                </span>

                <h3>

                    ${item.judul}

                </h3>

                <small>

                    📅 ${item.tanggal}

                </small>

                <p>

                    ${item.ringkasan}

                </p>

                <a
                    href="${item.link}"
                    target="_blank"
                    rel="noopener"
                    class="btn-primary">

                    Baca Selengkapnya

                </a>

            </div>

        </article>

        `;

    });

    this.dom.berita.innerHTML = html;

    this.log(`${data.length} berita dimuat.`);

}


/*============================================================
    LOAD REGULASI
============================================================*/

async loadRegulasi(){

    const data = await this.fetchJSON(DATA.regulasi);

    if(!this.isArray(data) || !this.hasElement(this.dom.regulasi)){

        this.dom.regulasi.innerHTML = `
            <p class="text-center">
                Belum ada regulasi.
            </p>
        `;

        return;

    }

    let html = "";

    data.forEach(item=>{

        html += `

        <article class="reg-card">

            <h3>

                ${item.judul}

            </h3>

            <small>

                ${item.tahun}

            </small>

            <p>

                ${item.deskripsi}

            </p>

            <a
                href="${item.file}"
                target="_blank"
                rel="noopener"
                class="btn-secondary">

                📄 Download

            </a>

        </article>

        `;

    });

    this.dom.regulasi.innerHTML = html;

    this.log(`${data.length} regulasi dimuat.`);

}


/*============================================================
    LOAD GALERI
============================================================*/

async loadGaleri(){

    const data = await this.fetchJSON(DATA.galeri);

    if(!this.isArray(data) || !this.hasElement(this.dom.galeri)){

        this.dom.galeri.innerHTML = `
            <p class="text-center">
                Galeri belum tersedia.
            </p>
        `;

        return;

    }

    let html = "";

    data.forEach(item=>{

        html += `

        <figure class="gallery-item">

            <img
                src="${item.gambar}"
                alt="${item.judul}"
                loading="lazy">

            <figcaption>

                <strong>

                    ${item.judul}

                </strong>

                <br>

                <small>

                    ${item.tanggal}

                </small>

            </figcaption>

        </figure>

        `;

    });

    this.dom.galeri.innerHTML = html;

    this.log(`${data.length} foto dimuat.`);

}
/*============================================================
    INITIALIZE ANIMATION
============================================================*/

initAnimation(){

    this.observeElements();

    this.animateCounter();

    this.preloadHero();

}


/*============================================================
    INTERSECTION OBSERVER
============================================================*/

observeElements(){

    const elements = document.querySelectorAll(

        ".reveal,.card,.desa-card,.timeline-item,.news-card,.gallery-item,.reg-card"

    );

    if(!elements.length) return;

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.15,

            rootMargin:"0px 0px -50px 0px"

        }

    );

    elements.forEach(el=>{

        observer.observe(el);

    });

}


/*============================================================
    COUNTER ANIMATION
============================================================*/

animateCounter(){

    const counters = document.querySelectorAll("[data-counter]");

    if(!counters.length) return;

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const counter = entry.target;

                const target = Number(

                    counter.dataset.counter

                );

                let current = 0;

                const increment = Math.max(

                    1,

                    Math.ceil(target/100)

                );

                const timer = setInterval(()=>{

                    current += increment;

                    if(current >= target){

                        current = target;

                        clearInterval(timer);

                    }

                    counter.textContent = current.toLocaleString("id-ID");

                },20);

                observer.unobserve(counter);

            });

        },

        {

            threshold:0.5

        }

    );

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}


/*============================================================
    PRELOAD HERO IMAGE
============================================================*/

preloadHero(){

    const hero = document.querySelector(".hero img");

    if(!hero) return;

    const image = new Image();

    image.src = hero.src;

}


/*============================================================
    EXTRA LAZY LOADING
============================================================*/

lazyLoadImages(){

    const images = document.querySelectorAll(

        "img[data-src]"

    );

    if(!images.length) return;

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            });

        },

        {

            threshold:0.1

        }

    );

    images.forEach(img=>{

        observer.observe(img);

    });

}


/*============================================================
    DEBOUNCE
============================================================*/

debounce(callback,delay=200){

    let timer;

    return (...args)=>{

        clearTimeout(timer);

        timer = setTimeout(()=>{

            callback.apply(this,args);

        },delay);

    };

}


/*============================================================
    THROTTLE
============================================================*/

throttle(callback,limit=100){

    let waiting=false;

    return (...args)=>{

        if(waiting) return;

        callback.apply(this,args);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },limit);

    };

}


/*============================================================
    PERFORMANCE OPTIMIZATION
============================================================*/

optimizePerformance(){

    window.addEventListener(

        "scroll",

        this.throttle(()=>{

            this.handleScroll();

        },50),

        {

            passive:true

        }

    );

    window.addEventListener(

        "resize",

        this.debounce(()=>{

            this.handleResize();

        },200)

    );

}


/*============================================================
    START UI ENGINE
============================================================*/

startUI(){

    this.initAnimation();

    this.lazyLoadImages();

    this.optimizePerformance();

    this.fixBrokenImages();

    this.preloadAssets();

    this.performanceInfo();

}
/*============================================================
    SKELETON LOADING
============================================================*/

showSkeleton(container,count=3){

    if(!this.hasElement(container)) return;

    let html="";

    for(let i=0;i<count;i++){

        html+=`

        <div class="skeleton-card">

            <div class="skeleton-image"></div>

            <div class="skeleton-title"></div>

            <div class="skeleton-text"></div>

            <div class="skeleton-text short"></div>

        </div>

        `;

    }

    container.innerHTML=html;

}


/*============================================================
    EMPTY STATE
============================================================*/

showEmpty(container,message){

    if(!this.hasElement(container)) return;

    container.innerHTML=`

    <div class="empty-state">

        <i class="fas fa-folder-open"></i>

        <h3>Belum Ada Data</h3>

        <p>${message}</p>

    </div>

    `;

}


/*============================================================
    ERROR STATE
============================================================*/

showError(container,message){

    if(!this.hasElement(container)) return;

    container.innerHTML=`

    <div class="error-state">

        <i class="fas fa-circle-exclamation"></i>

        <h3>Terjadi Kesalahan</h3>

        <p>${message}</p>

    </div>

    `;

}


/*============================================================
    IMAGE FALLBACK
============================================================*/

fixBrokenImages(){

    document.querySelectorAll("img").forEach(img=>{

        img.onerror=()=>{

            img.src="images/no-image.webp";

        };

    });

}


/*============================================================
    PRELOAD IMPORTANT FILES
============================================================*/

preloadAssets(){

    [

        "css/style.css",

        "css/responsive.css",

        "images/logo.png"

    ].forEach(file=>{

        const link=document.createElement("link");

        link.rel="preload";

        link.as=file.endsWith(".css")?"style":"image";

        link.href=file;

        document.head.appendChild(link);

    });

}


/*============================================================
    MEMORY CLEANUP
============================================================*/

cleanup(){

    window.removeEventListener("scroll",this.handleScroll);

    window.removeEventListener("resize",this.handleResize);

}


/*============================================================
    PERFORMANCE INFO
============================================================*/

performanceInfo(){

    if(!window.performance) return;

    const load=

        performance.now().toFixed(0);

    this.log(

        `Website loaded in ${load} ms`

    );

}
