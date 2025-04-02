document.addEventListener("DOMContentLoaded", function () {
    // Load header dan footer otomatis
    loadComponent("header.html", "header-container", function () {
        setupScrollHeader(); // Setup efek scroll setelah header terload
        highlightActiveMenu(); // Highlight menu aktif
    });

    loadComponent("footer.html", "footer-container");
});

// Fungsi buat load file HTML eksternal
function loadComponent(file, containerId, callback = null) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback(); // Jalankan callback kalau ada (misal setup scroll header)
        })
        .catch(error => console.error(`Gagal load ${file}:`, error));
}

// Fungsi buat efek scroll pada header
function setupScrollHeader() {
    let lastScrollTop = 0; // Posisi scroll sebelumnya
    let timeout; // Variabel untuk setTimeout
    const header = document.getElementById("header-container");

    if (!header) return; // Pastikan header ada sebelum eksekusi

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll ke bawah, sembunyikan header
            header.style.transition = "top 0.3s ease"; // Animasi smooth
            header.style.top = "-80px"; // Header sembunyi

            // Batalkan timeout sebelumnya, kalau ada
            clearTimeout(timeout);

            // Set timeout untuk menampilkan header kembali setelah 2 detik
            timeout = setTimeout(() => {
                header.style.top = "0"; // Header muncul kembali
            }, 2000); // Delay 2 detik (2000 ms)
        } else {
            // Scroll ke atas, langsung muncul header
            clearTimeout(timeout); // Hapus timeout jika scroll ke atas sebelum delay
            header.style.transition = "top 0.3s ease"; // Animasi smooth
            header.style.top = "0"; // Header muncul
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Memastikan scrollTop tidak negatif
    });
}

// Fungsi hamburger untuk menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active'); // Toggle class 'active' untuk menampilkan/menyembunyikan menu
}

// Menutup menu ketika salah satu item diklik
const menuItems = document.querySelectorAll('nav a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        menu.classList.remove('active'); // Menghapus class 'active' supaya menu hilang
    });
});

// Menutup menu ketika klik di luar area menu atau hamburger
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');

    // Cek apakah klik terjadi di luar area menu atau hamburger
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('active'); // Menutup menu jika klik di luar area
    }
});
