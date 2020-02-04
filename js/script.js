function tampilkanSemuaMenu() {
    // ambil data smartphone.json dan convert menjadi object (hasil)
    $.getJSON('js/smartphone.json', function (hasil) {

        // simpan objectnya kedalam menu
        let smartphone = hasil.smartphone;

        // foreach smartphone
        $.each(smartphone, function (i, data) {
            $('#daftarMenu').append('<div class="col-md-4"><div class="card mb-3"><img src="' + data.foto + '" class="img-thumbnail"><div class="card-body"><h5 class="card-title">' + data.tipe + '</h5><h6 class="card-title">' + data.harga + ',-</h6><p class="card-text">Harga asli <strike class="text-danger h6">' + data.hargaAsli + ',-</strike></p><a href="#" class="btn btn-primary tombolDetail" data-tipe="' + data.tipe + '" data-toggle="modal" data-target="#exampleModal">Detail</a></div></div></div>');
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
                content += '<div class="col-md-4"><div class="card mb-3"><img src="' + data.foto + '" class="img-thumbnail"><div class="card-body"><h5 class="card-title">' + data.tipe + '</h5><h6 class="card-title">' + data.harga + ',-</h6><p class="card-text">Harga asli <strike class="text-danger">' + data.hargaAsli + ',-</strike></p><a href="#" class="btn btn-primary tombolDetail" data-tipe="' + data.tipe + '" data-toggle="modal" data-target="#exampleModal">Detail</a></div></div></div>';
            }
        });
        // lalu set isi dari daftarMenu mengikuti isi dari content
        $('#daftarMenu').html(content);
    });

});

// Ketika detail di klik
$(document).on('click', '.tombolDetail', function () {

    const tipe = $(this).data('tipe');
    console.log(tipe);

    $.getJSON('js/smartphone.json', function (hasil) {
        let smartphone = hasil.smartphone;
        let content = '';

        $.each(smartphone, function (i, data) {

            if (data.tipe == tipe) {

                content += `<div class="row">
                    <div class="col-lg-6">
                        <figure class="figure">
                            <img src="` + data.foto + `" class="figure-img img-fluid rounded" alt="...">
                        </figure>
                    </div>
                    <div class="col-lg-6">

                        <h3 class="h3 mb-3 mt-3">` + data.tipe + `</h3>
                        <table>
                            <tr>
                                <td width="100">Harga</td>
                                <td> : ` + data.harga + `</td>
                            </tr>
                            <tr>
                                <td>Harga Asli</td>
                                <td> : ` + data.hargaAsli + `</td>
                            </tr>
                            <tr>
                                <td>Internal</td>
                                <td> : ` + data.internal + `</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td> : ` + data.ram + `</td>
                            </tr>
                            <tr>
                                <td>Battery</td>
                                <td> : ` + data.batre + `</td>
                            </tr>
                        </table>

                        <div class="alert alert-primary mt-3 font-weight-light" role="alert">
                            Note : Kamu tidak bisa request memory internal, RAM, dan warna smartphone. Kamu akan dapat memory internal, RAM, dan warna smartphone secara random.
                        </div>
                    </div>
                </div>`;
            }
        });
        $('.modal-body').html(content);
    });
});

// Scroll to top button appear
$(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});

// Smooth scrolling using jQuery easing
$(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
});
