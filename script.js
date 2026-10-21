```javascript
/* ========================================
   1. DATA MENU
======================================== */

// Daftar menu contoh yang ditampilkan di website.
// Ganti nama, harga, deskripsi, dan gambar sesuai kebutuhan.
const menuData = [
    {
        id: 1,
        name: "Nasi Goreng",
        category: "Makanan",
        price: 15000,
        description: "Nasi goreng dengan bumbu khas cafe.",
        image: "images/nasi-goreng.jpg",
        available: true
    },
    {
        id: 2,
        name: "Mie Goreng",
        category: "Makanan",
        price: 13000,
        description: "Mie goreng gurih dengan sayuran.",
        image: "images/mie-goreng.jpg",
        available: true
    },
    {
        id: 3,
        name: "Ayam Geprek",
        category: "Makanan",
        price: 18000,
        description: "Ayam crispy dengan sambal pilihan.",
        image: "images/ayam-geprek.jpg",
        available: true
    },
    {
        id: 4,
        name: "Kentang Goreng",
        category: "Camilan",
        price: 10000,
        description: "Kentang goreng renyah dan gurih.",
        image: "images/kentang-goreng.jpg",
        available: true
    },
    {
        id: 5,
        name: "Es Teh",
        category: "Minuman",
        price: 5000,
        description: "Teh segar yang cocok menemani makanan.",
        image: "images/es-teh.jpg",
        available: true
    },
    {
        id: 6,
        name: "Kopi Susu",
        category: "Minuman",
        price: 12000,
        description: "Perpaduan kopi dan susu yang nikmat.",
        image: "images/kopi-susu.jpg",
        available: true
    }
];


/* ========================================
   2. PENGATURAN KERANJANG
======================================== */

// Keranjang menyimpan ID produk dan jumlah yang dipilih.
let cart = [];

// Kategori yang sedang dipilih.
let selectedCategory = "Semua";

// Mengambil elemen HTML yang diperlukan.
const menuList = document.getElementById("menu-list");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-button");
const emptyMenu = document.getElementById("empty-menu");

const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const orderForm = document.getElementById("order-form");
const customerName = document.getElementById("customer-name");
const orderNote = document.getElementById("order-note");


/* ========================================
   3. FORMAT HARGA
======================================== */

// Mengubah angka menjadi format Rupiah.
function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(amount);
}


/* ========================================
   4. MENAMPILKAN DAFTAR MENU
======================================== */

// Membuat kartu menu berdasarkan data yang tersedia.
function displayMenu() {
    const keyword = searchInput.value.trim().toLowerCase();

    // Menyaring menu berdasarkan pencarian dan kategori.
    const filteredMenu = menuData.filter(function (menu) {
        const matchesSearch =
            menu.name.toLowerCase().includes(keyword) ||
            menu.description.toLowerCase().includes(keyword);

        const matchesCategory =
            selectedCategory === "Semua" ||
            menu.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Mengosongkan daftar sebelum menampilkan hasil baru.
    menuList.innerHTML = "";

    // Menampilkan pesan jika menu tidak ditemukan.
    emptyMenu.hidden = filteredMenu.length > 0;

    // Membuat kartu untuk setiap menu.
    filteredMenu.forEach(function (menu) {
        const card = document.createElement("article");
        card.className = "menu-card";

        // Membuat elemen gambar.
        const image = document.createElement("img");
        image.src = menu.image;
        image.alt = menu.name;
        image.loading = "lazy";

        // Menampilkan pengganti jika foto gagal dimuat.
        image.addEventListener("error", function () {
            image.alt = "Foto " + menu.name + " belum tersedia";
            image.removeAttribute("src");
            image.style.height = "200px";
            image.style.objectFit = "contain";
        }, { once: true });

        // Bagian informasi produk.
        const info = document.createElement("div");
        info.className = "menu-info";

        const category = document.createElement("span");
        category.className = "menu-category";
        category.textContent = menu.category;

        const title = document.createElement("h3");
        title.textContent = menu.name;

        const description = document.createElement("p");
        description.className = "menu-description";
        description.textContent = menu.description;

        const bottom = document.createElement("div");
        bottom.className = "menu-bottom";

        const price = document.createElement("span");
        price.className = "menu-price";
        price.textContent = formatRupiah(menu.price);

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.type = "button";

        // Menu yang habis tidak bisa ditambahkan.
        if (menu.available) {
            addButton.textContent = "+ Tambah";

            addButton.addEventListener("click", function () {
                addToCart(menu.id);
            });
        } else {
            addButton.textContent = "Habis";
            addButton.disabled = true;
        }

        // Menyusun elemen kartu.
        bottom.append(price, addButton);
        info.append(category, title, description, bottom);
        card.append(image, info);

        menuList.appendChild(card);
    });
}


/* ========================================
   5. PENCARIAN DAN FILTER KATEGORI
======================================== */

// Menampilkan hasil ketika pengguna mengetik.
searchInput.addEventListener("input", displayMenu);

// Mengganti kategori menu ketika tombol diklik.
categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;

        // Memperbarui tampilan tombol aktif.
        categoryButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        // Menampilkan menu sesuai kategori.
        displayMenu();
    });
});


/* ========================================
   6. MENAMBAHKAN MENU KE KERANJANG
======================================== */

// Menambahkan produk atau menaikkan jumlah produk.
function addToCart(menuId) {
    const menu = menuData.find(function (item) {
        return item.id === menuId;
    });

    // Menghentikan proses jika menu tidak tersedia.
    if (!menu || !menu.available) {
        alert("Maaf, menu ini sedang tidak tersedia.");
        return;
    }

    // Memeriksa apakah produk sudah ada di keranjang.
    const existingItem = cart.find(function (item) {
        return item.id === menuId;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: menuId,
            quantity: 1
        });
    }

    // Memperbarui tampilan keranjang.
    displayCart();
}


/* ========================================
   7. MENGUBAH JUMLAH PESANAN
======================================== */

// Mengubah jumlah produk di keranjang.
function changeQuantity(menuId, change) {
    const cartItem = cart.find(function (item) {
        return item.id === menuId;
    });

    if (!cartItem) {
        return;
    }

    cartItem.quantity += change;

    // Menghapus produk jika jumlahnya nol.
    if (cartItem.quantity <= 0) {
        cart = cart.filter(function (item) {
            return item.id !== menuId;
        });
    }

    displayCart();
}


// Menghapus produk tertentu dari keranjang.
function removeFromCart(menuId) {
    cart = cart.filter(function (item) {
        return item.id !== menuId;
    });

    displayCart();
}


/* ========================================
   8. MENAMPILKAN KERANJANG
======================================== */

// Menampilkan semua produk yang dipilih dan total harga.
function displayCart() {
    cartList.innerHTML = "";

    // Menghitung jumlah seluruh barang.
    const totalItems = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    // Menghitung total harga pesanan.
    const totalPrice = cart.reduce(function (total, item) {
        const menu = menuData.find(function (product) {
            return product.id === item.id;
        });

        return total + (menu ? menu.price * item.quantity : 0);
    }, 0);

    // Memperbarui jumlah barang dan total harga.
    cartCount.textContent = totalItems;
    cartTotal.textContent = formatRupiah(totalPrice);

    // Menampilkan pesan jika keranjang kosong.
    if (cart.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-cart";
        message.textContent = "Keranjang masih kosong.";

        cartList.appendChild(message);
        return;
    }

    // Menampilkan setiap produk di keranjang.
    cart.forEach(function (item) {
        const menu = menuData.find(function (product) {
            return product.id === item.id;
        });

        if (!menu) {
            return;
        }

        const row = document.createElement("div");
        row.className = "cart-item";

        // Informasi nama dan subtotal produk.
        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = menu.name;

        const subtotal = document.createElement("p");
        subtotal.textContent = formatRupiah(
            menu.price * item.quantity
        );

        details.append(title, subtotal);

        // Tombol untuk mengurangi atau menambah jumlah.
        const quantityControl = document.createElement("div");
        quantityControl.className = "quantity-control";

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.textContent = "-";
        decreaseButton.setAttribute(
            "aria-label",
            "Kurangi " + menu.name
        );

        decreaseButton.addEventListener("click", function () {
            changeQuantity(menu.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute(
            "aria-label",
            "Tambah " + menu.name
        );

        increaseButton.addEventListener("click", function () {
            changeQuantity(menu.id, 1);
        });

        quantityControl.append(
            decreaseButton,
            quantity,
            increaseButton
        );

        // Tombol untuk menghapus produk.
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.textContent = "Hapus";

        removeButton.addEventListener("click", function () {
            removeFromCart(menu.id);
        });

        row.append(details, quantityControl, removeButton);
        cartList.appendChild(row);
    });
}


/* ========================================
   9. MENGIRIM PESANAN KE WHATSAPP
======================================== */

// Ganti nomor berikut dengan nomor WhatsApp cafe.
// Gunakan kode negara tanpa tanda +, spasi, atau tanda hubung.
// Contoh: 6281234567890
const whatsappNumber = "6281234567890";

// Menyiapkan ringkasan pesanan ketika form dikirim.
orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Memeriksa apakah keranjang kosong.
    if (cart.length === 0) {
        alert("Silakan pilih menu terlebih dahulu.");
        return;
    }

    // Mengambil nama pelanggan.
    const name = customerName.value.trim();

    if (!name) {
        alert("Silakan masukkan nama pemesan.");
        customerName.focus();
        return;
    }

    // Menyusun daftar produk yang dipesan.
    let message = "Halo, saya ingin memesan menu.\n\n";
    message += "Nama: " + name + "\n\n";
    message += "Daftar Pesanan:\n";

    let total = 0;

    cart.forEach(function (item, index) {
        const menu = menuData.find(function (product) {
            return product.id === item.id;
        });

        if (!menu) {
            return;
        }

        const subtotal = menu.price * item.quantity;
        total += subtotal;

        message +=
            (index + 1) + ". " +
            menu.name + " x" + item.quantity +
            " = " + formatRupiah(subtotal) + "\n";
    });

    // Menambahkan catatan pelanggan jika tersedia.
    const note = orderNote.value.trim();

    if (note) {
        message += "\nCatatan: " + note + "\n";
    }

    // Menambahkan total harga.
    message += "\nTotal: " + formatRupiah(total);
    message += "\n\nMohon konfirmasi pesanan saya. Terima kasih.";

    // Memastikan nomor WhatsApp sudah diganti.
    if (!/^\d{10,15}$/.test(whatsappNumber)) {
        alert("Nomor WhatsApp cafe belum diatur.");
        return;
    }

    // Membuka WhatsApp dengan pesan yang sudah disiapkan.
    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});


/* ========================================
   10. MENAMPILKAN WEBSITE PERTAMA KALI
======================================== */

// Menampilkan menu dan keranjang saat halaman dibuka.
displayMenu();
displayCart();
```
