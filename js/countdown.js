/*==================================================
  Countdown Final
  Website Pilkades Kecamatan Selorejo 2026
==================================================*/

(() => {
    "use strict";

    // ==========================================
    // Target Waktu
    // 23 November 2026
    // 07:00 WIB
    // ==========================================

    const TARGET_DATE = new Date("2026-11-23T07:00:00+07:00");

    // awal countdown
    const START_DATE = new Date("2026-01-01T00:00:00+07:00");

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const messageEl = document.getElementById("countdown-message");
    const progressBar = document.getElementById("count-progress-bar");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function pad(num, digit = 2) {
        return String(num).padStart(digit, "0");
    }

    function animate(el) {
        el.classList.remove("flip");

        void el.offsetWidth;

        el.classList.add("flip");
    }

    function updateProgress(now) {

        if (!progressBar) return;

        const total = TARGET_DATE - START_DATE;
        const current = now - START_DATE;

        let percent = (current / total) * 100;

        percent = Math.min(100, Math.max(0, percent));

        progressBar.style.width = percent + "%";
    }

    function updateCountdown() {

        const now = new Date();

        const distance = TARGET_DATE - now;

        if (distance <= 0) {

            daysEl.textContent = "000";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            if (messageEl) {

                messageEl.innerHTML =
                    "🗳️ Hari Pemungutan Suara Pilkades Serentak Kecamatan Selorejo Tahun 2026 telah dimulai.";

            }

            if (progressBar)
                progressBar.style.width = "100%";

            clearInterval(timer);

            return;
        }

        const days =
            Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours =
            Math.floor(
                (distance % (1000 * 60 * 60 * 24))
                / (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance % (1000 * 60 * 60))
                / (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance % (1000 * 60))
                / 1000
            );

        const newDays = pad(days, 3);
        const newHours = pad(hours);
        const newMinutes = pad(minutes);
        const newSeconds = pad(seconds);

        if (daysEl.textContent !== newDays) {
            daysEl.textContent = newDays;
            animate(daysEl);
        }

        if (hoursEl.textContent !== newHours) {
            hoursEl.textContent = newHours;
            animate(hoursEl);
        }

        if (minutesEl.textContent !== newMinutes) {
            minutesEl.textContent = newMinutes;
            animate(minutesEl);
        }

        if (secondsEl.textContent !== newSeconds) {
            secondsEl.textContent = newSeconds;
            animate(secondsEl);
        }

        updateProgress(now);
    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

})();
