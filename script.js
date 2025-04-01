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
    let lastScrollTop = 0;
    const header = document.getElementById("header");

    if (!header) return; // Pastikan header ada sebelum eksekusi

    window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll ke bawah, header sembunyi
            header.style.top = "-80px";
        } else {
            // Scroll ke atas, header muncul lagi dengan delay
            setTimeout(() => {
                header.style.top = "0";
            }, 200); // Delay 200ms biar smooth
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Fix untuk scroll ke atas
    });
}

//fungsi hamburger
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
