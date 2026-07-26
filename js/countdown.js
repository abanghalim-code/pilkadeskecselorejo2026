/* =====================================================
   PORTAL PILKADES SERENTAK 2026
   KECAMATAN SELOREJO
   COUNTDOWN.JS FINAL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       TARGET TANGGAL
    ========================== */

    // 23 November 2026
    // Jam 07.00 WIB

    const targetDate = new Date(
        "2026-11-23T07:00:00+07:00"
    ).getTime();



    /* ==========================
       ELEMENT HTML
    ========================== */

    const dayElement = document.getElementById("days");

    const hourElement = document.getElementById("hours");

    const minuteElement = document.getElementById("minutes");

    const secondElement = document.getElementById("seconds");



    /* ==========================
       FORMAT ANGKA
    ========================== */

    function twoDigit(number){

        return number.toString().padStart(2,"0");

    }



    /* ==========================
       UPDATE COUNTDOWN
    ========================== */

    function updateCountdown(){

        const now = new Date().getTime();

        const distance = targetDate - now;



        /* ==========================
           WAKTU HABIS
        ========================== */

        if(distance <= 0){

            dayElement.innerHTML="000";

            hourElement.innerHTML="00";

            minuteElement.innerHTML="00";

            secondElement.innerHTML="00";

            const jadwal=document.querySelector(".jadwal");

            if(jadwal){

                jadwal.innerHTML=`
                    <i class="fa-solid fa-check-circle"></i>
                    <strong>
                    Hari Pemungutan Suara Telah Tiba
                    </strong>
                `;

            }

            clearInterval(timer);

            return;

        }



        /* ==========================
           PERHITUNGAN
        ========================== */

        const days=Math.floor(

            distance/(1000*60*60*24)

        );



        const hours=Math.floor(

            (distance%(1000*60*60*24))

            /(1000*60*60)

        );



        const minutes=Math.floor(

            (distance%(1000*60*60))

            /(1000*60)

        );



        const seconds=Math.floor(

            (distance%(1000*60))

            /1000

        );



        /* ==========================
           TAMPILKAN
        ========================== */

        dayElement.innerHTML=days;

        hourElement.innerHTML=twoDigit(hours);

        minuteElement.innerHTML=twoDigit(minutes);

        secondElement.innerHTML=twoDigit(seconds);

    }



    /* ==========================
       UPDATE PERTAMA
    ========================== */

    updateCountdown();



    /* ==========================
       UPDATE TIAP DETIK
    ========================== */

    const timer=setInterval(

        updateCountdown,

        1000

    );



});
