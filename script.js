/* ===========================================
   COUNTDOWN PILKADES SERENTAK 2026
   Kecamatan Selorejo
=========================================== */

// Target waktu:
// 23 November 2026 pukul 07:00:00 WIB
// WIB = UTC+7

const targetDate = new Date("2026-11-23T07:00:00+07:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    // Jika waktu sudah habis
    if (distance <= 0) {

        document.getElementById("days").innerHTML = "000";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        document.querySelector(".pesan h2").innerHTML =
            "🗳️ HARI PEMUNGUTAN SUARA TELAH TIBA";

        document.querySelector(".pesan p").innerHTML =
            "Gunakan hak pilih Anda dengan tertib, aman, damai, dan bertanggung jawab.";

        clearInterval(timer);

        return;
    }

    // Perhitungan waktu

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

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

    // Menampilkan angka

    document.getElementById("days").innerHTML =
        String(days).padStart(3, "0");

    document.getElementById("hours").innerHTML =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2, "0");

}

// Jalankan pertama kali
updateCountdown();

// Jalankan setiap detik
const timer = setInterval(updateCountdown, 1000);