async function loadTahapan() {
    const response = await fetch("data/tahapan.json");
    return await response.json();
}
