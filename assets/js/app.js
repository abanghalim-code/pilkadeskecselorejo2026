/* ==========================================================
   APP.JS
   PORTAL PILKADES SERENTAK 2026
   KECAMATAN SELOREJO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================================
       SELECTOR
    =========================================== */

    const header = document.querySelector(".header");
    const backTop = document.querySelector(".back-top");
    const nav = document.querySelector("nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");



    /* ===========================================
       STICKY HEADER
    =========================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });



    /* ===========================================
       MOBILE MENU
    =========================================== */

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }



    /* ===========================================
       CLOSE MENU
    =========================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });



    /* ===========================================
       SMOOTH SCROLL
    =========================================== */

    navLinks.forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                window.scrollTo({

                    top:target.offsetTop - 70,

                    behavior:"smooth"

                });

            }

        });

    });



    /* ===========================================
       ACTIVE MENU
    =========================================== */

    function activeMenu(){

        let scrollY = window.pageYOffset;

        sections.forEach(current=>{

            const sectionHeight = current.offsetHeight;

            const sectionTop = current.offsetTop - 120;

            const sectionId = current.getAttribute("id");

            const menu = document.querySelector("nav a[href*="+sectionId+"]");

            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){

                menu.classList.add("active");

            }else{

                menu.classList.remove("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);



    /* ===========================================
       BACK TO TOP
    =========================================== */

    window.addEventListener("scroll", ()=>{

        if(window.scrollY > 400){

            backTop.style.opacity="1";

            backTop.style.visibility="visible";

        }else{

            backTop.style.opacity="0";

            backTop.style.visibility="hidden";

        }

    });



    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });



    /* ===========================================
       COUNTDOWN
    =========================================== */

    const targetDate = new Date("November 23, 2026 07:00:00").getTime();

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");



    function countdown(){

        const now = new Date().getTime();

        const distance = targetDate - now;

        if(distance < 0){

            days.innerHTML="00";
            hours.innerHTML="00";
            minutes.innerHTML="00";
            seconds.innerHTML="00";

            return;

        }

        const d = Math.floor(distance/(1000*60*60*24));

        const h = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

        const m = Math.floor((distance%(1000*60*60))/(1000*60));

        const s = Math.floor((distance%(1000*60))/1000);

        days.innerHTML = String(d).padStart(2,"0");
        hours.innerHTML = String(h).padStart(2,"0");
        minutes.innerHTML = String(m).padStart(2,"0");
        seconds.innerHTML = String(s).padStart(2,"0");

    }

    countdown();

    setInterval(countdown,1000);



    /* ===========================================
       SCROLL ANIMATION
    =========================================== */

    const reveals = document.querySelectorAll(

        ".card,.count-box,.section-title,.hero-content,.floating-card"

    );



    function reveal(){

        reveals.forEach(item=>{

            const windowHeight = window.innerHeight;

            const revealTop = item.getBoundingClientRect().top;

            const revealPoint = 120;

            if(revealTop < windowHeight - revealPoint){

                item.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll",reveal);

    reveal();



    /* ===========================================
       PRELOADER
    =========================================== */

    window.addEventListener("load",()=>{

        const preloader = document.querySelector(".preloader");

        if(preloader){

            preloader.style.opacity="0";

            setTimeout(()=>{

                preloader.style.display="none";

            },500);

        }

    });



    /* ===========================================
       FOOTER YEAR
    =========================================== */

    const footer = document.querySelector(".footer p");

    if(footer){

        footer.innerHTML =
        "© " +
        new Date().getFullYear() +
        " Portal Pilkades Serentak Kecamatan Selorejo";

    }



});
