import * as readlineSync from 'readline-sync';

const NAMA_BIOSKOP = "T1H CINEMA";
const BIAYA_ADMINISTRASI = 2500;

interface Reservasi {
    id: number;
    namaPemesan: string;
    isMember: boolean;
    judulFilm: string;
    namaStudio: string;
    namaHari: string;
    jumlahTiket: number;
    subTotal: number;
    diskonPersen: number;
    jumlahDiskon: number;
    totalBayar: number;
}

let dataReservasi: Reservasi[] = [
    {
        id: 1,
        namaPemesan: "Javier Naufal",
        isMember: true,
        judulFilm: "Avengers: Doomsday (Action)",
        namaStudio: "Studio IMAX",
        namaHari: "Rabu",
        jumlahTiket: 3,
        subTotal: 152500,
        diskonPersen: 0.25,
        jumlahDiskon: 38125,
        totalBayar: 114375
    },
    {
        id: 2,
        namaPemesan: "Budi Santoso",
        isMember: false,
        judulFilm: "Laut Bercerita (Drama)",
        namaStudio: "Studio Reguler",
        namaHari: "Sabtu",
        jumlahTiket: 2,
        subTotal: 72500,
        diskonPersen: 0.02,
        jumlahDiskon: 1450,
        totalBayar: 71050
    }
];

function buatReservasi() {
    let namaPemesan = "";
    let pilihanFilm = 0;
    let pilihanStudio = 0;
    let pilihanHari = 0;
    let jumlahTiket = 0;
    let inputMember = "";

    let judulFilm = "";
    let namaStudio = "";
    let tambahanStudio = 0;
    let hargaHari = 0;
    let namaHari = "";
    let diskonPersen = 0;

    console.clear();
    console.log(`=== ${NAMA_BIOSKOP} - RESERVASI TIKET ===\n`);

    while (true) {
        namaPemesan = readlineSync.question("Masukkan Nama Anda                       : ").trim();
        let mengandungAngka = /\d/.test(namaPemesan);

        if (namaPemesan !== "" && !mengandungAngka) break;

        if (namaPemesan === "") {
            console.log("[INVALID] Nama pemesan tidak boleh kosong! Silakan isi kembali.\n");
        } else {
            console.log("[INVALID] Nama pemesan tidak boleh mengandung angka! Silakan isi kembali.\n");
        }
    }

    console.log("\nDaftar Film Tersedia:");
    console.log("  [1] Avengers: Doomsday (Action)");
    console.log("  [2] Laut Bercerita (Drama)");
    console.log("  [3] 3726 Mdpl (Romance)");
    console.log("  [4] Hexed (Animation)");
    console.log("  [5] Pengabdi Setan 3: Origin (Horror)");
    while (true) {
        pilihanFilm = readlineSync.questionInt("Pilih Film (1-5)                         : ");
        if (pilihanFilm >= 1 && pilihanFilm <= 5) break;
        console.log("[INVALID] Pilihan film tidak tersedia! Masukkan angka 1 sampai 5.\n");
    }

    console.log("\nPilihan Jenis Studio:");
    console.log("  [1] Studio Reguler (+Rp 0)");
    console.log("  [2] Studio Premiere (+Rp 15.000)");
    console.log("  [3] Studio IMAX (+Rp 25.000)");
    while (true) {
        pilihanStudio = readlineSync.questionInt("Pilih Studio (1-3)                       : ");
        if (pilihanStudio >= 1 && pilihanStudio <= 3) break;
        console.log("[INVALID] Pilihan studio tidak sesuai! Masukkan angka 1, 2, atau 3.\n");
    }

    console.log("\nPilihan Hari Penayangan:");
    console.log("  [1] Senin (Rp 25.000)");
    console.log("  [2] Selasa (Rp 25.000)");
    console.log("  [3] Rabu (Rp 25.000)");
    console.log("  [4] Kamis (Rp 25.000)");
    console.log("  [5] Jumat (Rp 30.000)");
    console.log("  [6] Sabtu (Rp 35.000)");
    console.log("  [7] Minggu (Rp 35.000)");
    while (true) {
        pilihanHari = readlineSync.questionInt("Pilih Hari (1-7)                         : ");
        if (pilihanHari >= 1 && pilihanHari <= 7) break;
        console.log("[INVALID] Pilihan hari tidak sesuai! Masukkan angka 1 sampai 7.\n");
    }

    while (true) {
        jumlahTiket = readlineSync.questionInt("\nJumlah Tiket yang Dibeli (Min. 1)        : ");
        if (jumlahTiket > 0) break;
        console.log("[INVALID] Jumlah tiket minimal harus 1! Silakan masukkan angka yang valid.\n");
    }

    while (true) {
        inputMember = readlineSync.question("Apakah Anda Member? (y/t)                : ").toLowerCase().trim();
        if (inputMember === 'y' || inputMember === 't') break;
        console.log("[INVALID] Input tidak sesuai! Ketik 'y' untuk Ya atau 't' untuk Tidak.\n");
    }

    let isMember = inputMember === 'y';

    switch (pilihanFilm) {
        case 1: judulFilm = "Avengers: Doomsday (Action)"; break;
        case 2: judulFilm = "Laut Bercerita (Drama)"; break;
        case 3: judulFilm = "3726 Mdpl (Romance)"; break;
        case 4: judulFilm = "Hexed (Animation)"; break;
        case 5: judulFilm = "Pengabdi Setan 3: Origin (Horror)"; break;
    }

    switch (pilihanStudio) {
        case 1: namaStudio = "Studio Reguler"; tambahanStudio = 0; break;
        case 2: namaStudio = "Studio Premiere"; tambahanStudio = 15000; break;
        case 3: namaStudio = "Studio IMAX"; tambahanStudio = 25000; break;
    }

    switch (pilihanHari) {
        case 1: namaHari = "Senin"; hargaHari = 25000; break;
        case 2: namaHari = "Selasa"; hargaHari = 25000; break;
        case 3: namaHari = "Rabu"; hargaHari = 25000; break;
        case 4: namaHari = "Kamis"; hargaHari = 25000; break;
        case 5: namaHari = "Jumat"; hargaHari = 30000; break;
        case 6: namaHari = "Sabtu"; hargaHari = 35000; break;
        case 7: namaHari = "Minggu"; hargaHari = 35000; break;
    }

    let subTotal = ((hargaHari + tambahanStudio) * jumlahTiket) + BIAYA_ADMINISTRASI;
    let isWeekend = pilihanHari === 6 || pilihanHari === 7;

    if (isMember) {
        if (jumlahTiket >= 3 && !isWeekend) {
            diskonPersen = 0.25;
        } else {
            diskonPersen = 0.05;
        }
    } else {
        if (jumlahTiket >= 5 || isWeekend) {
            diskonPersen = 0.02;
        }
    }

    let jumlahDiskon = subTotal * diskonPersen;
    let totalBayar = subTotal - jumlahDiskon;
    const dataTerakhir = dataReservasi[dataReservasi.length - 1];
    let idBaru = dataTerakhir ? dataTerakhir.id + 1 : 1;
    
    dataReservasi.push({
        id: idBaru,
        namaPemesan,
        isMember,
        judulFilm,
        namaStudio,
        namaHari,
        jumlahTiket,
        subTotal,
        diskonPersen,
        jumlahDiskon,
        totalBayar
    });

    console.log(`\n==================================================`);
    console.log(`              STRUK RESERVASI TIKET               `);
    console.log(`==================================================`);
    console.log(`ID Reservasi       : #${idBaru}`);
    console.log(`Nama Pemesan       : ${namaPemesan}`);
    console.log(`Status Member      : ${isMember ? "Member VIP" : "Non-Member"}`);
    console.log(`Judul Film         : ${judulFilm}`);
    console.log(`Jenis Studio       : ${namaStudio}`);
    console.log(`Hari Tayang        : ${namaHari}`);
    console.log(`Jumlah Tiket       : ${jumlahTiket} Tiket`);
    console.log(`--------------------------------------------------`);
    console.log(`Subtotal + Admin   : Rp ${subTotal.toLocaleString('id-ID')}`);
    console.log(`Diskon (${diskonPersen * 100}%)       : -Rp ${jumlahDiskon.toLocaleString('id-ID')}`);
    console.log(`==================================================`);
    console.log(`TOTAL PEMBAYARAN   : Rp ${totalBayar.toLocaleString('id-ID')}`);
    console.log(`==================================================\n`);
}

let menu = 0;

do {
    console.clear();
    console.log(`==================================================`);
    console.log(`        SELAMAT DATANG DI ${NAMA_BIOSKOP}         `);
    console.log(`==================================================`);
    console.log(`1. Buat Reservasi`);
    console.log(`0. Keluar`);
    console.log(`==================================================`);

    menu = readlineSync.questionInt("Pilih menu: ");

    switch (menu) {
        case 1:
            buatReservasi();
            readlineSync.question("Tekan Enter untuk lanjut...", { hideEchoBack: true, mask: "" });
            break;
        case 0:
            console.log(`\nTerima kasih telah menggunakan layanan ${NAMA_BIOSKOP}!`);
            break;
        default:
            console.log("\n[INVALID] Menu tidak tersedia!");
            readlineSync.question("Tekan Enter untuk lanjut...", { hideEchoBack: true, mask: "" });
            break;
    }
} while (menu !== 0);