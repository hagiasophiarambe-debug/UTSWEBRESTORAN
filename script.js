// VALIDASI
document.getElementById("formUser").onsubmit = function(e){
    e.preventDefault();

    let nama = document.getElementById("nama");
    let email = document.getElementById("email");
    let nomor = document.getElementById("nomor");

    let valid = true;

    document.querySelectorAll(".error").forEach(e => e.innerText="");

    if(nama.value===""){
        nama.nextElementSibling.innerText="Isi nama!";
        valid=false;
    }

    if(!email.value.includes("@")){
        email.nextElementSibling.innerText="Email salah!";
        valid=false;
    }

    if(nomor.value<=0){
        nomor.nextElementSibling.innerText="Nomor salah!";
        valid=false;
    }

    if(valid){
        alert("Berhasil daftar 😎");
    }
}

// DOM MENU
let menu = [];

function tambahMenu(){
    let nama = document.getElementById("namaMenu").value;
    let harga = document.getElementById("hargaMenu").value;

    if(nama=="" || harga==""){
        alert("Isi dulu!");
        return;
    }

    menu.push({nama,harga});
    tampil();
}

function tampil(){
    let list = document.getElementById("listMenu");
    list.innerHTML="";

    menu.forEach((m,i)=>{
        list.innerHTML += `
        <div>
            ${m.nama} - Rp${m.harga}
            <button onclick="hapus(${i})">X</button>
        </div>`;
    });
}

function hapus(i){
    menu.splice(i,1);
    tampil();
}

// ANIMASI ANGKA RATING
let rating = document.getElementById("ratingNumber");

let value = 0;
let target = 5.0;

let interval = setInterval(() => {
    value += 0.1;

    if (value >= target) {
        value = target;
        clearInterval(interval);
    }

    rating.innerText = value.toFixed(1);
}, 50);