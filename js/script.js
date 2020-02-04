function tampilkanSemuaMenu() {
    // ambil data smartphone.json dan convert menjadi object (hasil)
    $.getJSON('js/smartphone.json', function (hasil) {

        // simpan objectnya kedalam menu
        let smartphone = hasil.smartphone;
        console.log(smartphone);


        // foreach smartphone
        $.each(smartphone, function (i, data) {
            $('#daftarMenu').append('<div class="col-md-4"><div class="card mb-3"><img src="' + data.foto + '" class="img-thumbnail"><div class="card-body"><h5 class="card-title">' + data.tipe + '</h5><h6 class="card-title">' + data.harga + ',-</h6><p class="card-text">Harga asli <strike class="text-danger h6">' + data.hargaAsli + ',-</strike></p><a href="#" class="btn btn-primary">Detail</a></div></div></div>');
        });
    });
}

// Jalankan fungsi untuk menampilkan semua data menu
tampilkanSemuaMenu();

// Tangkap menu nav-link ketika di klik
$('.nav-link').on('click', function () {
    // Ketika ada menu yang di klik, hapus semua class active
    $('.nav-link').removeClass('active');

    // Kasih class active ke menu yang di klik
    $(this).addClass('active');

    // Tangkap isi dari menu yang diklik
    let kategori = $(this).html();

    // Simpan isi menu yang di klik ke dalam h1
    $('h1').html(kategori);

    // Jika kategori yang di klik adalah all meu
    if (kategori == 'All Brand') {
        // Maka set isi dari daftarMenunya menjadi kosong
        $('#daftarMenu').html('');

        // dan jalankan fungsi untuk menampilkan semua menu
        tampilkanSemuaMenu();
        return;
    }

    // cari pizza json dan decode menjadi object
    $.getJSON('js/smartphone.json', function (hasil) {
        // simpan objectnya kedalam menu, dan siapkan content untuk isi menunya
        let smartphone = hasil.smartphone;
        let content = '';

        // foreach smartphonenya
        $.each(smartphone, function (i, data) {
            // Jika smartphone kategorinya == kategori yang di klik
            if (data.brand == kategori) {
                // maka contentnya akan berisi smartphone berdasarkan kategorinya aja
                content += '<div class="col-md-4"><div class="card mb-3"><img src="' + data.foto + '" class="img-thumbnail"><div class="card-body"><h5 class="card-title">' + data.tipe + '</h5><h6 class="card-title">' + data.harga + ',-</h6><p class="card-text">Harga asli <strike class="text-danger">' + data.hargaAsli + ',-</strike></p><a href="#" class="btn btn-primary">Detail</a></div></div></div>';
            }
        });
        // lalu set isi dari daftarMenu mengikuti isi dari content
        $('#daftarMenu').html(content);
    });

});