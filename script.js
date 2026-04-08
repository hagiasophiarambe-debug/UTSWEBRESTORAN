let pesanan = {};

function tambahMenu(btn){
    let card = btn.closest(".card");
    let nama = card.querySelector("h3").innerText;
    let jumlahEl = card.querySelector(".jumlah");

    let jumlah = parseInt(jumlahEl.innerText);
    jumlah++;

    jumlahEl.innerText = jumlah;
    pesanan[nama] = jumlah;
}

function kurangMenu(btn){
    let card = btn.closest(".card");
    let nama = card.querySelector("h3").innerText;
    let jumlahEl = card.querySelector(".jumlah");

    let jumlah = parseInt(jumlahEl.innerText);

    if(jumlah > 0){
        jumlah--;
        jumlahEl.innerText = jumlah;

        if(jumlah === 0){
            delete pesanan[nama];
        } else {
            pesanan[nama] = jumlah;
        }
    }
}