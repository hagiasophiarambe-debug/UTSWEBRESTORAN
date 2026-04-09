// ================= DATA MENU =================
let daftarMenu = [
    {nama: "Dendeng", harga: 20000},
    {nama: "Ayam Geprek", harga: 25000},
    {nama: "Nasi Goreng", harga: 17000}
];

// ================= TAMPILKAN KE HALAMAN =================
function tampilkanMenu(){
    let container = document.getElementById("listMenu");
    container.innerHTML = "";

    daftarMenu.forEach((item, index) => {
        container.innerHTML += `
            <div style="margin:10px; padding:10px; background:#2b1b12; border-radius:10px;">
                <b>${item.nama}</b> - Rp${item.harga}
                <button onclick="hapusMenu(${index})">Hapus</button>
            </div>
        `;
    });
}

// ================= TAMBAH MENU =================
function tambahMenuBaru(){
    let nama = document.getElementById("namaMenu").value;
    let harga = document.getElementById("hargaMenu").value;

    if(nama === "" || harga === ""){
        alert("Isi dulu semua!");
        return;
    }

    daftarMenu.push({
        nama: nama,
        harga: parseInt(harga)
    });

    tampilkanMenu();
}

// ================= HAPUS MENU =================
function hapusMenu(index){
    daftarMenu.splice(index, 1);
    tampilkanMenu();
}

// ================= LOAD AWAL =================
tampilkanMenu();

document.getElementById("formUser").addEventListener("submit", function(e){
    e.preventDefault();

    let nama = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();
    let nomor = document.getElementById("nomor").value.trim();

    let error = document.querySelectorAll(".error");

    // reset error
    error.forEach(e => e.innerText = "");

    let valid = true;

    if(nama === ""){
        error[0].innerText = "Isi dulu nama!";
        valid = false;
    }

    if(email === ""){
        error[1].innerText = "Isi dulu email!";
        valid = false;
    }

    if(nomor === ""){
        error[2].innerText = "Isi dulu nomor!";
        valid = false;
    }

    if(valid){
        alert("Registrasi berhasil ✅");
    }
});

function tambahMenuBaru(){
    let nama = document.getElementById("namaMenu").value;
    let harga = document.getElementById("hargaMenu").value;

    if(nama === "" || harga === ""){
        alert("Isi dulu!");
        return;
    }

    daftarMenu.push({
        nama: nama,
        harga: parseInt(harga)
    });

    tampilkanMenu();

    // notif selesai
    alert("Menu berhasil ditambahkan ✅");

    // kosongkan input
    document.getElementById("namaMenu").value = "";
    document.getElementById("hargaMenu").value = "";
}

function tambahMenuBaru(){
    let nama = document.getElementById("namaMenu").value;
    let harga = document.getElementById("hargaMenu").value;

    if(nama === "" || harga === ""){
        alert("Isi dulu!");
        return;
    }

    daftarMenu.push({
        nama: nama,
        harga: parseInt(harga)
    });

    tampilkanMenu();

    // NOTIF INI YANG KAU MAU
    alert("TERIMAKASIH, menu berhasil ditambahkan 🙏✨");

    // kosongkan input
    document.getElementById("namaMenu").value = "";
    document.getElementById("hargaMenu").value = "";
}
function tambahMenu(btn){
    let card = btn.closest(".card");
    let jumlahEl = card.querySelector(".jumlah");

    let jumlah = parseInt(jumlahEl.innerText) || 0;
    jumlah++;

    jumlahEl.innerText = jumlah;
}

function kurangMenu(btn){
    let card = btn.closest(".card");
    let jumlahEl = card.querySelector(".jumlah");

    let jumlah = parseInt(jumlahEl.innerText) || 0;

    if(jumlah > 0){
        jumlah--;
        jumlahEl.innerText = jumlah;
    }
}