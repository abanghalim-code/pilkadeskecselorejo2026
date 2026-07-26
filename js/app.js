/* =====================================================
   PORTAL PILKADES SERENTAK 2026
   Kecamatan Selorejo Kabupaten Blitar
   app.js Final v3.0

   BAGIAN 1
   --------------------------------------------
   ✓ DOM Ready
   ✓ Sticky Navbar
   ✓ Active Menu
   ✓ Smooth Scroll
   ✓ Back To Top
   ✓ Mobile Menu
   ✓ Loading Screen
=====================================================*/

"use strict";

/*=====================================================
    DOM READY
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});


/*=====================================================
    APP OBJECT
=====================================================*/

const App = {

init(){

    this.cacheDOM();

    this.bindEvents();

    this.hideLoader();

    this.updateActiveMenu();

    loadWebsiteData();

}

/*=====================================================
    CACHE DOM
=====================================================*/

    cacheDOM(){

        this.navbar = document.querySelector(".navbar");

        this.backTop = document.querySelector(".back-top");

        this.navLinks = document.querySelectorAll(".nav-link");

        this.sections = document.querySelectorAll("section[id]");

        this.mobileButton = document.querySelector(".mobile-toggle");

        this.mobileMenu = document.querySelector(".navbar nav");

        this.loader = document.querySelector(".loading");

    },


/*=====================================================
    EVENTS
=====================================================*/

    bindEvents(){

        window.addEventListener("scroll", () => {

            this.onScroll();

        });


        window.addEventListener("resize", () => {

            this.closeMobileMenu();

        });


        this.navLinks.forEach(link=>{

            link.addEventListener("click",(e)=>{

                this.smoothScroll(e);

            });

        });


        if(this.mobileButton){

            this.mobileButton.addEventListener("click",()=>{

                this.toggleMobileMenu();

            });

        }


        if(this.backTop){

            this.backTop.addEventListener("click",()=>{

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            });

        }

    },


/*=====================================================
    SCROLL
=====================================================*/

    onScroll(){

        this.stickyNavbar();

        this.showBackTop();

        this.updateActiveMenu();

    },


/*=====================================================
    STICKY NAVBAR
=====================================================*/

    stickyNavbar(){

        if(!this.navbar) return;

        if(window.scrollY > 80){

            this.navbar.classList.add("scrolled");

        }

        else{

            this.navbar.classList.remove("scrolled");

        }

    },


/*=====================================================
    ACTIVE MENU
=====================================================*/

    updateActiveMenu(){

        let current = "";

        this.sections.forEach(section=>{

            const top = section.offsetTop - 150;

            const height = section.offsetHeight;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });


        this.navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    },


/*=====================================================
    SMOOTH SCROLL
=====================================================*/

    smoothScroll(e){

        const href = e.currentTarget.getAttribute("href");

        if(!href.startsWith("#")) return;

        const target = document.querySelector(href);

        if(!target) return;

        e.preventDefault();

        window.scrollTo({

            top:target.offsetTop - 70,

            behavior:"smooth"

        });

        this.closeMobileMenu();

    },


/*=====================================================
    MOBILE MENU
=====================================================*/

    toggleMobileMenu(){

        if(!this.mobileMenu) return;

        this.mobileMenu.classList.toggle("show");

    },


    closeMobileMenu(){

        if(!this.mobileMenu) return;

        this.mobileMenu.classList.remove("show");

    },


/*=====================================================
    BACK TO TOP
=====================================================*/

    showBackTop(){

        if(!this.backTop) return;

        if(window.scrollY > 500){

            this.backTop.classList.add("show");

        }

        else{

            this.backTop.classList.remove("show");

        }

    },


/*=====================================================
    LOADING
=====================================================*/

    hideLoader(){

        if(!this.loader) return;

        window.addEventListener("load",()=>{

            this.loader.classList.add("hide");

        });

    }

};
/* =====================================================
   APP.JS FINAL V3.0

   BAGIAN 2

   Dynamic JSON Loader

=====================================================*/


/*=====================================================
    JSON CONFIG
=====================================================*/

const DATA = {

    desa: "data/desa.json",

    tahapan: "data/tahapan.json",

    berita: "data/berita.json",

    regulasi: "data/regulasi.json",

    galeri: "data/galeri.json"

};


/*=====================================================
    FETCH JSON
=====================================================*/

async function fetchJSON(url){

    try{

        const response = await fetch(url);

        if(!response.ok){

            throw new Error("Gagal mengambil data : " + url);

        }

        return await response.json();

    }

    catch(error){

        console.error(error);

        return [];

    }

}


/*=====================================================
    LOAD DESA
=====================================================*/

async function loadDesa(){

    const data = await fetchJSON(DATA.desa);

    const container = document.getElementById("desaContainer");

    if(!container) return;

    container.innerHTML="";

    data.forEach(desa=>{

        container.innerHTML += `

        <div class="desa-card">

            <img src="${desa.gambar}" alt="${desa.nama}">

            <div class="desa-content">

                <h3>${desa.nama}</h3>

                <p>${desa.deskripsi}</p>

                <a href="${desa.link}" class="btn-primary">

                    Selengkapnya

                </a>

            </div>

        </div>

        `;

    });

}


/*=====================================================
    LOAD TAHAPAN
=====================================================*/

async function loadTahapan(){

    const data = await fetchJSON(DATA.tahapan);

    const timeline = document.getElementById("timelineContainer");

    if(!timeline) return;

    timeline.innerHTML="";

    data.forEach(item=>{

        timeline.innerHTML += `

        <div class="timeline-item">

            <div class="timeline-date">

                ${item.tanggal}

            </div>

            <div class="timeline-content">

                <span class="badge">

                    ${item.tahap}

                </span>

                <h3>

                    ${item.kegiatan}

                </h3>

                <p>

                    <strong>Pelaksana :</strong>

                    ${item.pelaksana}

                </p>

            </div>

        </div>

        `;

    });

}


/*=====================================================
    RUNNING INFORMATION
=====================================================*/

async function loadRunningInfo(){

    const berita = await fetchJSON(DATA.berita);

    const running = document.getElementById("runningText");

    if(!running) return;

    if(berita.length===0){

        running.innerHTML="Belum ada informasi terbaru.";

        return;

    }

    let text="";

    berita.forEach(item=>{

        text += "📢 " + item.judul + " &nbsp;&nbsp;&nbsp;&nbsp;";

    });

    running.innerHTML=text;

}


/*=====================================================
    LOAD SEMUA DATA
=====================================================*/

async function loadWebsiteData(){

    await Promise.all([

        loadDesa(),

        loadTahapan(),

        loadRunningInfo()

    ]);

}
/* =====================================================
   APP.JS FINAL V3.0

   BAGIAN 3

   BERITA
   REGULASI
   GALERI

=====================================================*/


/*=====================================================
    LOAD BERITA
=====================================================*/

async function loadBerita(){

    const data = await fetchJSON(DATA.berita);

    const container = document.getElementById("beritaContainer");

    if(!container) return;

    container.innerHTML = "";

    if(data.length === 0){

        container.innerHTML = `
            <div class="empty-data">

                Belum ada berita.

            </div>
        `;

        return;

    }

    data.forEach(item=>{

        container.innerHTML += `

        <article class="berita-card">

            <img
                src="${item.gambar}"
                alt="${item.judul}"
                loading="lazy"
            >

            <div class="berita-content">

                <span class="berita-date">

                    📅 ${item.tanggal}

                </span>

                <h3>

                    ${item.judul}

                </h3>

                <p>

                    ${item.ringkasan}

                </p>

                <a
                    href="${item.link}"
                    class="btn-outline"
                    target="_blank"
                >

                    Baca Selengkapnya

                </a>

            </div>

        </article>

        `;

    });

}



/*=====================================================
    LOAD REGULASI
=====================================================*/

async function loadRegulasi(){

    const data = await fetchJSON(DATA.regulasi);

    const container = document.getElementById("regulasiContainer");

    if(!container) return;

    container.innerHTML = "";

    if(data.length===0){

        container.innerHTML = `
            <div class="empty-data">

                Belum ada regulasi.

            </div>
        `;

        return;

    }

    data.forEach(item=>{

        container.innerHTML += `

        <div class="regulasi-card">

            <div>

                <h3>

                    📄 ${item.judul}

                </h3>

                <p>

                    ${item.deskripsi}

                </p>

            </div>

            <a

                href="${item.file}"

                target="_blank"

                class="btn-primary"

            >

                Download

            </a>

        </div>

        `;

    });

}



/*=====================================================
    LOAD GALERI
=====================================================*/

async function loadGaleri(){

    const data = await fetchJSON(DATA.galeri);

    const container = document.getElementById("galeriContainer");

    if(!container) return;

    container.innerHTML = "";

    if(data.length===0){

        container.innerHTML = `
            <div class="empty-data">

                Galeri belum tersedia.

            </div>
        `;

        return;

    }

    data.forEach(item=>{

        container.innerHTML += `

        <div class="galeri-item">

            <img

                src="${item.gambar}"

                alt="${item.judul}"

                loading="lazy"

            >

            <div class="galeri-overlay">

                <h4>

                    ${item.judul}

                </h4>

                <small>

                    ${item.tanggal}

                </small>

            </div>

        </div>

        `;

    });

}



/*=====================================================
    LAZY IMAGE
=====================================================*/

function lazyImage(){

    const images = document.querySelectorAll("img");

    images.forEach(img=>{

        img.loading = "lazy";

    });

}



/*=====================================================
    REFRESH WEBSITE
=====================================================*/

async function refreshContent(){

    await Promise.all([

        loadBerita(),

        loadRegulasi(),

        loadGaleri()

    ]);

    lazyImage();

}
/* =====================================================
   PORTAL PILKADES SERENTAK 2026
   Kecamatan Selorejo Kabupaten Blitar

   app.js Final v3.0

   BAGIAN 4

   ✓ Scroll Reveal
   ✓ Intersection Observer
   ✓ Counter Animation
   ✓ Image Fade
   ✓ Performance
   ✓ Final Initialization
=====================================================*/


/*=====================================================
    SCROLL REVEAL
=====================================================*/

function revealElements(){

    const elements = document.querySelectorAll(

        ".reveal"

    );

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    elements.forEach(el=>{

        observer.observe(el);

    });

}



/*=====================================================
    COUNTER ANIMATION
=====================================================*/

function animateCounter(){

    const counters = document.querySelectorAll(

        "[data-counter]"

    );

    counters.forEach(counter=>{

        const target = Number(

            counter.dataset.counter

        );

        const speed = 50;

        let value = 0;

        function update(){

            const increment =

                Math.ceil(target / speed);

            value += increment;

            if(value > target){

                value = target;

            }

            counter.textContent = value;

            if(value < target){

                requestAnimationFrame(update);

            }

        }

        update();

    });

}



/*=====================================================
    IMAGE FADE
=====================================================*/

function imageFade(){

    const images = document.querySelectorAll(

        "img"

    );

    images.forEach(img=>{

        img.addEventListener("load",()=>{

            img.classList.add("loaded");

        });

    });

}



/*=====================================================
    OBSERVE SECTION
=====================================================*/

function observeSection(){

    const sections = document.querySelectorAll(

        "section"

    );

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.classList.add("visible");

                }

            });

        },

        {

            threshold:.25

        }

    );

    sections.forEach(section=>{

        observer.observe(section);

    });

}



/*=====================================================
    PERFORMANCE
=====================================================*/

function optimizeWebsite(){

    document.querySelectorAll("a").forEach(link=>{

        if(

            link.hostname===location.hostname

        ){

            link.setAttribute(

                "draggable",

                "false"

            );

        }

    });

}



/*=====================================================
    PRELOAD IMAGE
=====================================================*/

function preloadHero(){

    const hero = new Image();

    hero.src="images/hero.png";

}



/*=====================================================
    INITIALIZATION
=====================================================*/

window.addEventListener("load",()=>{

    revealElements();

    animateCounter();

    imageFade();

    observeSection();

    optimizeWebsite();

    preloadHero();

});



/*=====================================================
    WEBSITE READY
=====================================================*/

console.log(

    "%cPortal Pilkades Kecamatan Selorejo",

    "color:#005baa;font-size:16px;font-weight:bold;"

);

console.log(

    "%cVersion 3.0 Loaded",

    "color:green;font-size:14px;"

);
