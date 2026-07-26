/* =====================================================
   PORTAL PILKADES SERENTAK 2026
   Kecamatan Selorejo Kabupaten Blitar
   countdown.js Final v3.0

   BAGIAN 1
   --------------------------------------------
   ✓ Konfigurasi
   ✓ DOM Element
   ✓ Helper Function
   ✓ Format Indonesia
   ✓ Jam Digital
=====================================================*/

"use strict";

/*=====================================================
  KONFIGURASI
=====================================================*/

// Waktu pelaksanaan Pilkades
const TARGET_DATE = new Date("2026-11-23T07:00:00");

// Awal perhitungan progress
const START_DATE = new Date("2026-01-01T00:00:00");


/*=====================================================
  DOM ELEMENT
=====================================================*/

const dayElement = document.getElementById("days");
const hourElement = document.getElementById("hours");
const minuteElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");

const digitalClock = document.getElementById("digitalClock");
const todayDate = document.getElementById("todayDate");

const countdownStatus = document.getElementById("countdownStatus");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");


/*=====================================================
  NAMA HARI & BULAN
=====================================================*/

const DAY_NAMES = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
];

const MONTH_NAMES = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];


/*=====================================================
  HELPER FUNCTION
=====================================================*/

function pad(value) {
    return String(value).padStart(2, "0");
}

function setText(element, value) {

    if (!element) return;

    element.textContent = value;

}

function setHTML(element, value) {

    if (!element) return;

    element.innerHTML = value;

}


/*=====================================================
  FORMAT TANGGAL INDONESIA
=====================================================*/

function formatDateIndonesia(date){

    const hari = DAY_NAMES[date.getDay()];

    const tanggal = date.getDate();

    const bulan = MONTH_NAMES[date.getMonth()];

    const tahun = date.getFullYear();

    return `${hari}, ${tanggal} ${bulan} ${tahun}`;

}


/*=====================================================
  JAM DIGITAL
=====================================================*/

function updateDigitalClock(){

    const now = new Date();

    const jam = pad(now.getHours());

    const menit = pad(now.getMinutes());

    const detik = pad(now.getSeconds());

    setText(
        digitalClock,
        `${jam}:${menit}:${detik} WIB`
    );

    setText(
        todayDate,
        formatDateIndonesia(now)
    );

}


/*=====================================================
  UPDATE SETIAP DETIK
=====================================================*/

setInterval(updateDigitalClock,1000);

// tampil pertama kali
updateDigitalClock();


/*=====================================================
  ANIMASI ANGKA
=====================================================*/

function animateNumber(element){

    if(!element) return;

    element.classList.remove("number-pop");

    void element.offsetWidth;

    element.classList.add("number-pop");

}


/*=====================================================
  FUNGSI BANTU
=====================================================*/

function getNow(){

    return new Date();

}

function millisecondsBetween(start,end){

    return end - start;

}
/* =====================================================
   countdown.js Final v3.0

   BAGIAN 2
   --------------------------------------------
   ✓ Countdown Engine
   ✓ Update Hari/Jam/Menit/Detik
   ✓ Animasi Angka
=====================================================*/


/*=====================================================
  MENYIMPAN NILAI SEBELUMNYA
=====================================================*/

let previousCountdown = {

    days: null,

    hours: null,

    minutes: null,

    seconds: null

};


/*=====================================================
  UPDATE SATU ANGKA
=====================================================*/

function updateNumber(element, value, previousValue){

    if(!element) return;

    if(previousValue !== value){

        setText(element, pad(value));

        animateNumber(element);

    }

}


/*=====================================================
  HITUNG COUNTDOWN
=====================================================*/

function calculateCountdown(){

    const now = getNow();

    const distance = TARGET_DATE - now;

    // Jika waktu sudah habis
    if(distance <= 0){

        return{

            finished:true,

            days:0,

            hours:0,

            minutes:0,

            seconds:0

        };

    }

    const days = Math.floor(

        distance / (1000 * 60 * 60 * 24)

    );

    const hours = Math.floor(

        (distance % (1000 * 60 * 60 * 24))

        / (1000 * 60 * 60)

    );

    const minutes = Math.floor(

        (distance % (1000 * 60 * 60))

        / (1000 * 60)

    );

    const seconds = Math.floor(

        (distance % (1000 * 60))

        / 1000

    );

    return{

        finished:false,

        days,

        hours,

        minutes,

        seconds

    };

}


/*=====================================================
  UPDATE TAMPILAN COUNTDOWN
=====================================================*/

function renderCountdown(){

    const countdown = calculateCountdown();

    updateNumber(
        dayElement,
        countdown.days,
        previousCountdown.days
    );

    updateNumber(
        hourElement,
        countdown.hours,
        previousCountdown.hours
    );

    updateNumber(
        minuteElement,
        countdown.minutes,
        previousCountdown.minutes
    );

    updateNumber(
        secondElement,
        countdown.seconds,
        previousCountdown.seconds
    );

    previousCountdown.days = countdown.days;

    previousCountdown.hours = countdown.hours;

    previousCountdown.minutes = countdown.minutes;

    previousCountdown.seconds = countdown.seconds;

}


/*=====================================================
  STATUS COUNTDOWN
=====================================================*/

function updateCountdownStatus(){

    if(!countdownStatus) return;

    const now = getNow();

    const distance = TARGET_DATE - now;

    if(distance <= 0){

        countdownStatus.innerHTML = `
            <strong>
                🗳️ PILKADES SEDANG BERLANGSUNG
            </strong>
        `;

        return;

    }

    const daysLeft = Math.floor(

        distance / (1000 * 60 * 60 * 24)

    );

    if(daysLeft > 180){

        countdownStatus.innerHTML =
            "Tahap Persiapan Pilkades";

    }

    else if(daysLeft > 90){

        countdownStatus.innerHTML =
            "Tahap Pembentukan Panitia";

    }

    else if(daysLeft > 60){

        countdownStatus.innerHTML =
            "Tahap Pendaftaran Bakal Calon";

    }

    else if(daysLeft > 30){

        countdownStatus.innerHTML =
            "Tahap Penetapan Calon";

    }

    else if(daysLeft > 7){

        countdownStatus.innerHTML =
            "Tahap Kampanye";

    }

    else{

        countdownStatus.innerHTML =
            "Menuju Hari Pemungutan Suara";

    }

}


/*=====================================================
  UPDATE COUNTDOWN
=====================================================*/

function updateCountdown(){

    renderCountdown();

    updateCountdownStatus();

}


/*=====================================================
  JALANKAN PERTAMA KALI
=====================================================*/

updateCountdown();


/*=====================================================
  UPDATE SETIAP DETIK
=====================================================*/

setInterval(updateCountdown,1000);
/* =====================================================
   countdown.js Final v3.0

   BAGIAN 3
   --------------------------------------------
   ✓ Progress Bar
   ✓ Persentase Progress
   ✓ Countdown Finished
   ✓ Initialization
=====================================================*/


/*=====================================================
  HITUNG PROGRESS
=====================================================*/

function updateProgress(){

    if(!progressBar || !progressText) return;

    const now = getNow();

    const totalDuration = TARGET_DATE - START_DATE;

    const elapsed = now - START_DATE;

    let percent = (elapsed / totalDuration) * 100;

    percent = Math.max(0, Math.min(percent,100));

    progressBar.style.width = percent.toFixed(2) + "%";

    progressText.textContent =
        percent.toFixed(1) + "% Persiapan Menuju Pilkades";

}


/*=====================================================
  EVENT SAAT COUNTDOWN SELESAI
=====================================================*/

function countdownFinished(){

    if(dayElement) dayElement.textContent = "00";
    if(hourElement) hourElement.textContent = "00";
    if(minuteElement) minuteElement.textContent = "00";
    if(secondElement) secondElement.textContent = "00";

    if(countdownStatus){

        countdownStatus.innerHTML = `
            <div class="countdown-finished">

                <h2>🗳️</h2>

                <h3>
                    PEMILIHAN KEPALA DESA
                </h3>

                <p>

                    Hari Pemungutan Suara
                    Sedang Berlangsung

                </p>

            </div>
        `;

    }

}


/*=====================================================
  UPDATE SELURUH KOMPONEN
=====================================================*/

function updateAll(){

    const countdown = calculateCountdown();

    renderCountdown();

    updateCountdownStatus();

    updateProgress();

    if(countdown.finished){

        countdownFinished();

    }

}


/*=====================================================
  REFRESH OTOMATIS
=====================================================*/

function startCountdown(){

    updateDigitalClock();

    updateAll();

    setInterval(function(){

        updateDigitalClock();

        updateAll();

    },1000);

}


/*=====================================================
  DOM READY
=====================================================*/

document.addEventListener("DOMContentLoaded",function(){

    startCountdown();

});


/*=====================================================
  CONSOLE INFO
=====================================================*/

console.log(
    "%cPortal Pilkades 2026",
    "color:#0d6efd;font-size:16px;font-weight:bold;"
);

console.log(
    "Countdown Engine Final v3.0 Loaded"
);
