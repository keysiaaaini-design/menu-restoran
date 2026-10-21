```css
/* Pengaturan warna utama */
:root {
    --cokelat: #814b2b;
    --krem: #fff8ef;
    --putih: #ffffff;
    --teks: #30251f;
    --garis: #eadfd5;
}

/* Pengaturan dasar */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: var(--krem);
    color: var(--teks);
    line-height: 1.5;
}

/* Header website */
header {
    text-align: center;
    background: var(--cokelat);
    color: white;
    padding: 25px 15px;
}

header h1 {
    font-size: 32px;
}

header h1 span {
    color: #ffd29d;
}

/* Pembungkus konten */
.container {
    width: 92%;
    max-width: 1100px;
    margin: 30px auto;
}

/* Judul bagian */
h2 {
    margin-bottom: 20px;
}

/* Input pencarian dan data pelanggan */
input,
textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--garis);
    border-radius: 8px;
    margin: 8px 0 15px;
    font: inherit;
    background: white;
}

input:focus,
textarea:focus {
    outline: 2px solid #c99a75;
}

label {
    display: block;
    font-weight: bold;
    margin-top: 12px;
}

/* Tombol kategori */
.categories {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0 25px;
}

.categories button {
    border: 1px solid var(--cokelat);
    padding: 9px 16px;
    border-radius: 20px;
    background: white;
    color: var(--cokelat);
    cursor: pointer;
}

.categories button.active,
.categories button:hover {
    background: var(--cokelat);
    color: white;
}

/* Susunan kartu menu */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}

/* Kartu produk */
.menu-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--garis);
    box-shadow: 0 3px 10px #00000008;
}

/* Foto produk */
.menu-card img {
    display: block;
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #f1e6d9;
}

/* Informasi produk */
.menu-info {
    padding: 15px;
}

.menu-info h3 {
    margin-bottom: 5px;
}

.category-label {
    display: inline-block;
    font-size: 12px;
    color: var(--cokelat);
    background: var(--krem);
    padding: 4px 8px;
    border-radius: 5px;
    margin-bottom: 8px;
}

.description {
    font-size: 13px;
    color: #74665d;
    margin-bottom: 12px;
}

.price {
    color: var(--cokelat);
    font-weight: bold;
    margin-bottom: 12px;
}

/* Tombol tambah menu */
.add-button,
.order-button,
.reset-button {
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 8px;
}

.add-button,
.order-button {
    background: var(--cokelat);
    color: white;
}

.add-button:hover,
.order-button:hover {
    background: #60351d;
}

/* Bagian keranjang */
.cart-section {
    background: white;
    border: 1px solid var(--garis);
    border-radius: 12px;
    padding: 25px;
}

/* Baris barang dalam keranjang */
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--garis);
    padding: 15px 0;
}

.cart-item h3 {
    font-size: 15px;
}

.cart-item p {
    color: var(--cokelat);
    font-size: 13px;
}

/* Tombol jumlah barang */
.quantity {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity button {
    width: 30px;
    height: 30px;
    border: 1px solid var(--garis);
    border-radius: 5px;
    background: var(--krem);
    cursor: pointer;
}

/* Tombol hapus barang */
.delete-button {
    border: none;
    background: none;
    color: #c0392b;
    cursor: pointer;
}

/* Total harga */
.total {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 25px 0;
    padding: 20px 0;
    border-top: 2px solid var(--garis);
    border-bottom: 2px solid var(--garis);
}

.total strong {
    color: var(--cokelat);
    font-size: 22px;
}

/* Tombol kosongkan keranjang */
.reset-button {
    background: #eee5dd;
    color: var(--teks);
}

/* Keterangan website */
.info {
    color: #74665d;
    font-size: 12px;
    text-align: center;
    margin-top: 15px;
}

/* Footer */
footer {
    background: #30251f;
    color: white;
    text-align: center;
    padding: 25px 10px;
    font-size: 13px;
}

/* Tampilan tablet */
@media (max-width: 800px) {
    .menu-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

/* Tampilan HP */
@media (max-width: 520px) {
    .menu-grid {
        grid-template-columns: 1fr;
    }

    .menu-card img {
        height: 220px;
    }

    .cart-section {
        padding: 18px;
    }

    .cart-item {
        flex-wrap: wrap;
    }
}
```
