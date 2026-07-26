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
