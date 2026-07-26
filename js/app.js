/* =====================================================
   PORTAL PILKADES SERENTAK 2026
   KECAMATAN SELOREJO
   APP.JS FINAL
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENT
    ===================================== */

    const navbar = document.querySelector(".navbar");

    const backTop = document.querySelector(".back-top");

    const menuLinks = document.querySelectorAll("nav a");

    const sections = document.querySelectorAll("section");



    /* =====================================
       NAVBAR SCROLL
    ===================================== */

    function navbarScroll(){

        if(window.scrollY > 80){

            navbar.classList.add("navbar-scroll");

        }else{

            navbar.classList.remove("navbar-scroll");

        }

    }



    /* =====================================
       BACK TO TOP
    ===================================== */

    function backTopButton(){

        if(window.scrollY > 500){

            backTop.style.opacity="1";

            backTop.style.visibility="visible";

        }else{

            backTop.style.opacity="0";

            backTop.style.visibility="hidden";

        }

    }



    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    menuLinks.forEach(link=>{

        link.addEventListener("click",(e)=>{

            const target=link.getAttribute("href");

            if(target.startsWith("#")){

                e.preventDefault();

                document.querySelector(target).scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });



    /* =====================================
       ACTIVE MENU
    ===================================== */

    function activeMenu(){

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-120;

            const height=section.offsetHeight;

            if(window.scrollY>=top){

                current=section.getAttribute("id");

            }

        });

        menuLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    }



    /* =====================================
       REVEAL ANIMATION
    ===================================== */

    const revealItems=document.querySelectorAll(

        ".profil-card,.desa-item,.timeline-item,.berita-card,.regulasi-card,.galeri-item,.contact-card"

    );



    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });



    revealItems.forEach(item=>{

        item.classList.add("hidden");

        observer.observe(item);

    });



    /* =====================================
       PARALLAX HERO
    ===================================== */

    const hero=document.querySelector(".hero");



    window.addEventListener("scroll",()=>{

        if(hero){

            hero.style.backgroundPositionY=

                window.scrollY*0.35+"px";

        }

    });



    /* =====================================
       COUNTER ANIMATION
    ===================================== */

    const stats=document.querySelectorAll(".stat-item h3");



    function animateNumber(el){

        const target=parseInt(

            el.dataset.target

        );



        if(isNaN(target)) return;



        let number=0;



        const speed=Math.max(10,target/80);



        const timer=setInterval(()=>{

            number+=speed;

            if(number>=target){

                number=target;

                clearInterval(timer);

            }

            el.innerHTML=Math.floor(number);

        },20);

    }



    const statObserver=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateNumber(

                    entry.target

                );

                statObserver.unobserve(

                    entry.target

                );

            }

        });

    });



    stats.forEach(item=>{

        statObserver.observe(item);

    });



    /* =====================================
       LOADING
    ===================================== */

    window.addEventListener("load",()=>{

        document.body.classList.add("loaded");

    });



    /* =====================================
       BACK TO TOP CLICK
    ===================================== */

    if(backTop){

        backTop.addEventListener("click",(e)=>{

            e.preventDefault();

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }



    /* =====================================
       SCROLL EVENT
    ===================================== */

    window.addEventListener("scroll",()=>{

        navbarScroll();

        backTopButton();

        activeMenu();

    });



    navbarScroll();

    backTopButton();

    activeMenu();

});
// =============================
// 4. Tahapan Pilkades
// =============================

function getTahapanAktif(data){

    const today = new Date();

    return data.find(item=>{

        const start = new Date(item.start);
        const end = new Date(item.end);

        return today >= start && today <= end;

    });

}
});
// =============================
// 5. Membaca tahapan.json
// =============================
async function loadTahapan(){

    try{

        const response = await fetch("data/tahapan.json");

        const data = await response.json();

        const aktif = getTahapanAktif(data);

        console.log(aktif);

    }catch(error){

        console.error(error);

    }

}

loadTahapan();
