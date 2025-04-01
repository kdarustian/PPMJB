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

// Fungsi buat kasih class 'active' ke menu yang sesuai dengan halaman sekarang
function highlightActiveMenu() {
    let currentPage = window.location.pathname.split("/").pop(); // Ambil nama file halaman
    let navLinks = document.querySelectorAll("nav a"); // Ambil semua link di navbar

    navLinks.forEach(link => {
        let linkHref = link.getAttribute("href");

        // Kalau href link cocok sama halaman sekarang, kasih class 'active'
        if (currentPage === linkHref) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}
