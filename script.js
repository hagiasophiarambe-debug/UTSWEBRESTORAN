// ================= DATA MENU =================
let daftarMenu = [
    {nama: "Dendeng", harga: 20000},
    {nama: "Ayam Geprek", harga: 25000},
    {nama: "Nasi Goreng", harga: 17000}
];

// ================= TAMPILKAN MENU TAMBAHAN =================
function tampilkanMenu(){
    let container = document.getElementById("listMenu");
    if(!container) return;

    container.innerHTML = "";

    daftarMenu.forEach((item, index) => {
        container.innerHTML += `
            <div style="margin:10px; padding:10px; background:#2b1b12; border-radius:10px; color:white;">
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
        alert("Isi dulu!");
        return;
    }

    daftarMenu.push({
        nama: nama,
        harga: parseInt(harga)
    });

    tampilkanMenu();

    alert("TERIMAKASIH, menu berhasil ditambahkan 🙏✨");

    document.getElementById("namaMenu").value = "";
    document.getElementById("hargaMenu").value = "";
}

// ================= HAPUS MENU =================
function hapusMenu(index){
    daftarMenu.splice(index, 1);
    tampilkanMenu();
}

// ================= REGISTRASI =================
let form = document.getElementById("formUser");
if(form){
form.addEventListener("submit", function(e){
    e.preventDefault();

    let nama = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();
    let nomor = document.getElementById("nomor").value.trim();

    let error = document.querySelectorAll(".error");

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
}

// ================== SISTEM ORDER ==================
let total = 0;
let pesanan = [];

// TAMBAH MENU
function tambahMenu(btn){
    let card = btn.closest(".card");

    let nama = card.querySelector("h3").innerText;
    let hargaText = card.querySelector("p").innerText;
    let jumlahEl = card.querySelector(".jumlah");

    let harga = parseInt(hargaText.replace("Rp","").replace(".",""));
    let jumlah = parseInt(jumlahEl.innerText) || 0;

    jumlah++;
    jumlahEl.innerText = jumlah;

    total += harga;

    let item = pesanan.find(p => p.nama === nama);

    if(item){
        item.qty++;
    } else {
        pesanan.push({nama, harga, qty:1});
    }

    updateUI();
}

// KURANG MENU
function kurangMenu(btn){
    let card = btn.closest(".card");

    let nama = card.querySelector("h3").innerText;
    let hargaText = card.querySelector("p").innerText;
    let jumlahEl = card.querySelector(".jumlah");

    let harga = parseInt(hargaText.replace("Rp","").replace(".",""));
    let jumlah = parseInt(jumlahEl.innerText) || 0;

    if(jumlah > 0){
        jumlah--;
        jumlahEl.innerText = jumlah;
        total -= harga;

        let item = pesanan.find(p => p.nama === nama);
        if(item){
            item.qty--;
            if(item.qty === 0){
                pesanan = pesanan.filter(p => p.nama !== nama);
            }
        }
    }

    updateUI();
}

// UPDATE TOTAL
function updateUI(){
    let totalEl = document.getElementById("totalHarga");
    let box = document.getElementById("checkoutBox");

    if(!totalEl || !box) return;

    totalEl.innerText = total;
    box.style.display = total > 0 ? "block" : "none";
}

// ================= CHECKOUT STEP 1 =================
function checkout(){
    document.getElementById("checkoutBox").style.display = "none"; // 🔥 tombol hilang

    let paymentBox = document.getElementById("paymentBox");

    paymentBox.innerHTML = `
        <h3>Isi Data Dulu Ya 😊</h3>

        <input type="text" id="namaUser" placeholder="Atas nama siapa?" class="input-user"><br>
        <input type="email" id="emailUser" placeholder="Masukkan Email" class="input-user"><br>
        <input type="number" id="hpUser" placeholder="Masukkan No HP" class="input-user"><br><br>

        <button onclick="lanjutBayar()">Lanjut</button>
        <br><br>
        <button onclick="tutup()">Tutup</button>
    `;

    paymentBox.style.display = "block";
}

// ================= STEP 2 =================
function lanjutBayar(){
    let nama = document.getElementById("namaUser").value;
    let email = document.getElementById("emailUser").value;
    let hp = document.getElementById("hpUser").value;

    if(nama === "" || email === "" || hp === ""){
        alert("Isi dulu semua ya 😭");
        return;
    }

    let paymentBox = document.getElementById("paymentBox");

    let html = "<h4>Pesanan Kamu:</h4>";

    pesanan.forEach(item => {
        html += `<p>${item.nama} x${item.qty}</p>`;
    });

    html += `<hr><p><b>Total: Rp ${total}</b></p>`;

    html += `
        <h4>Pilih Pembayaran</h4>

        <label><input type="radio" name="bank" onclick="pilihBank()"> Mandiri</label><br>
        <label><input type="radio" name="bank" onclick="pilihBank()"> BRI</label><br>
        <label><input type="radio" name="bank" onclick="pilihBank()"> BCA</label><br><br>

        <button id="btnBayar" disabled onclick="bayar('${nama}')">Bayar</button>
        <br><br>
        <button onclick="tutup()">Tutup</button>
    `;

    paymentBox.innerHTML = html;
}

// AKTIFKAN TOMBOL
function pilihBank(){
    document.getElementById("btnBayar").disabled = false;
}

// ================= BAYAR =================
function bayar(nama){
    let paymentBox = document.getElementById("paymentBox");

    paymentBox.innerHTML = `
        <h3 style="color:green;">✅ TERIMAKASIH YA ${nama} 😍</h3>
        <p>Pesanan mu segera diproses</p>
        <br>
        <button onclick="tutup()">Tutup</button>
    `;
}

// ================= TUTUP =================
function tutup(){
    document.getElementById("paymentBox").style.display = "none";
}

// ================= LOAD =================
tampilkanMenu();