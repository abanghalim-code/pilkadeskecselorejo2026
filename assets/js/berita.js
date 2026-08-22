document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("berita-list");
    if (!container) return;

    fetch("data/berita.json?v=" + Date.now())
        .then(response => {
            if (!response.ok) throw new Error("Gagal memuat data berita.");
            return response.json();
        })
        .then(berita => {
            if (!Array.isArray(berita) || berita.length === 0) {
                container.innerHTML = '<p>Belum ada berita.</p>';
                return;
            }

            container.innerHTML = berita.map(item => `
                <article class="card berita-card">
                    <img src="${item.gambar}" alt="${item.judul}">
                    <div class="card-body">
                        <span class="kategori">${item.kategori}</span>
                        <h3>${item.judul}</h3>
                        ${item.tanggal ? `<small>${item.tanggal}</small>` : ""}
                        <p>${item.ringkasan}</p>
                        <a href="#" class="berita-detail" data-id="${item.id}">
                            Selengkapnya
                        </a>
                    </div>
                </article>
            `).join("");

            container.querySelectorAll(".berita-detail").forEach(link => {
                link.addEventListener("click", event => {
                    event.preventDefault();
                    const item = berita.find(x => String(x.id) === link.dataset.id);
                    if (!item) return;

                    const isi = item.isi || item.ringkasan || "Detail berita belum tersedia.";
                    alert(`${item.judul}\n\n${isi}`);
                });
            });
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = '<p>Berita belum dapat dimuat.</p>';
        });
});
