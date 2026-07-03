// ==============================
// LIBSYS - Library Management System
// ==============================

const STORAGE_KEY = "dataPerpustakaan";

// ==============================
// Ambil Data
// ==============================

function getData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// ==============================
// Simpan Data
// ==============================

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ==============================
// FORM
// ==============================

const form = document.getElementById("formPerpustakaan");

if (form) {

    const params = new URLSearchParams(window.location.search);
    const editIndex = params.get("edit");

    // ==========================
    // MODE EDIT
    // ==========================

    if (editIndex !== null) {

        const data = getData();
        const item = data[editIndex];

        if (item) {

            document.getElementById("nama").value = item.nama;
            document.getElementById("nim").value = item.nim;
            document.getElementById("buku").value = item.buku;
            document.getElementById("kategori").value = item.kategori;
            document.getElementById("tanggal").value = item.tanggal;
            document.getElementById("keterangan").value = item.keterangan;

        }

    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const nim = document.getElementById("nim").value.trim();
        const buku = document.getElementById("buku").value.trim();
        const kategori = document.getElementById("kategori").value;
        const tanggal = document.getElementById("tanggal").value;
        const keterangan = document.getElementById("keterangan").value.trim();

        const pesan = document.getElementById("pesanError");

        pesan.textContent = "";

        // ======================
        // VALIDASI
        // ======================

        if (
            nama === "" ||
            nim === "" ||
            buku === "" ||
            kategori === "" ||
            tanggal === ""
        ) {

            pesan.textContent = "Semua field wajib diisi.";

            return;
        }

        if (nim.length != 8 || isNaN(nim)) {

            pesan.textContent = "NIM harus terdiri dari 8 digit angka.";

            return;
        }

        let data = getData();

        // ======================
        // EDIT
        // ======================

        if (editIndex !== null) {

            data[editIndex] = {
                nama,
                nim,
                buku,
                kategori,
                tanggal,
                keterangan
            };

        }

        // ======================
        // TAMBAH
        // ======================

        else {

            data.push({

                nama,
                nim,
                buku,
                kategori,
                tanggal,
                keterangan

            });

        }

        saveData(data);

        alert("Data berhasil disimpan.");

        window.location.href = "data.html";

    });

}

// ==============================
// TABEL DATA
// ==============================

const tableBody = document.getElementById("tableBody");

if (tableBody) {

    tampilkanData();

}

// ==============================
// TAMPILKAN DATA
// ==============================

function tampilkanData() {

    const data = getData();

    const kosong = document.getElementById("kosong");

    tableBody.innerHTML = "";

    if (data.length === 0) {

        kosong.style.display = "block";

        return;

    }

    kosong.style.display = "none";

    data.forEach(function (item, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${item.nama}</td>

            <td>${item.nim}</td>

            <td>${item.buku}</td>

            <td>${item.kategori}</td>

            <td>${item.tanggal}</td>

            <td>${item.keterangan}</td>

            <td>

                <button
                    class="btn-edit"
                    onclick="editData(${index})">

                    Edit

                </button>

                <button
                    class="btn-delete"
                    onclick="hapusData(${index})">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

}

// ==============================
// EDIT
// ==============================

function editData(index) {

    window.location.href = "index.html?edit=" + index;

}

// ==============================
// HAPUS SATU
// ==============================

function hapusData(index) {

    if (!confirm("Yakin ingin menghapus data ini?")) {

        return;

    }

    let data = getData();

    data.splice(index, 1);

    saveData(data);

    tampilkanData();

}

// ==============================
// HAPUS SEMUA
// ==============================

const btnHapus = document.getElementById("hapusSemua");

if (btnHapus) {

    btnHapus.addEventListener("click", function () {

        if (!confirm("Hapus seluruh data?")) {

            return;

        }

        localStorage.removeItem(STORAGE_KEY);

        tampilkanData();

    });

}