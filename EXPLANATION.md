### Tentang Task
Pada test ini "FRONTEND TASK" dimana peserta ujian diberikan soal tentang mengolah data API dan melakukan CRUD.
pada kesempatan ini saya menggunakan VUE.JS karena pada ketentuan test diperbolehkan menggunakan VUE.JS. alasan lainnya karena VUE.JS cocok untuk digunakan dalam pembuatan aplikasi yang ringan karena pada dasarnya VUE.JS lebih ringan dibandingkan REACT dan yang paling penting saya sudah lebih terbiasa menggunakan VUE.JS. Dalam pembuat aplikasi ini saya tidak menggunakan Framework UI karena asumsi saya hal tersebut hanya akan memberatkan aplikasi terlebih karena aplikasinya masih tergolong kecil dan component yang diperlukannya pun sedikit, sehingga saya lebih memilih untuk menggunakan VUE CLI + SCSS yang saya bikin sendiri.

### Tentang UI
Pada test ini saya mengolah data API kedalam bentuk Tabel (window view) dan bentuk Card (Mobile view) design yang saya usung bertemakan klasik tidak mengarah ke flat design, material design atau skeuomorphism hal ini saya buat dengan asumsi pemakai berusia 40 tahun keatas sehingga perbedaan antar warna harus terlihat dengan jelas, untuk menguatkan kesan klasiknya saya hanya menggunakan beberapa ikon saja yang lumrah digunakan seperti pagination dan sorting pada button lainnya saya lebih memilih menggunakan text yang jelas terbaca.

### Tentang UX
Pada test ini saya banyak sekali untuk mengimplementasikan beberapa UX namun hal tersebut harus dikurangi karena kondisi data yang tidak terlalu enak. Kondisi data yang terlalu banyak anomali data, sehingga banyak waktu terbuang untuk membuat function pembersih data, misalnya regrouping option area, reformated tanggal, provisi, kota dan price. sehingga UX yang saya kedepankan lebih kearah ringan, navigasi gampang dan hanya menampilkan informasi penting saja. 

- Ringan

Ringan disini dalam artian cepat mengolah dan menampilkan data. dalam proses pennampilan data saya memotong beberapa data kedalam beberapa pagination untuk tampilan mobile berjumlah 5 item dan untuk desktop berjumlah 12 item. hal ini bertujuan bila pada tampilan desktop user dapat langsung melihat banyak data, dan untuk tampilan mobile supaya tidak terlalu jauh dalam melakukan vertical scrolling. untuk masalah kecepatan dalam memproses data sama sekali tidak berpengaruh, karena proses dilakukan diawal sehingga untuk perpindahan pagination data sudah disiapkan sebelumnya tanpa perlu melibatkan pihak ketiga.

- Navigasi

Navigasi yang saya bikin lebih kearah semua terlihat dengan harapan cukup 1 kali akses yang dimaksud terpernuhi. misalnya untuk menambahkan data user tinggal melakukan klik tombol pada tambah data maka form pun terpanggil dan user siap mengisi, untuk melakukan searching user tinggal memilih kolom yang akan diisi kemudian mengisi kata kunci dan tombol search pun terbuka begitu pula dengan sorting user tinggal mengklik icon yang tersedia di header table pada setiap column yang tersedia.

- informasi penting

Dalam peranacangan ini saya meminimalisir penggunaan image supaya tujuan user dalam mencari data lebih terarah dibantu dengan card border yang membuat user lebih fokus kedalam data penting yang tersedia, ditambah dengan perbedaan warna setiap row membuat user lebih mudah membedakan data yang fokus user lihat.

### Tentang function

Asplikasi yang saya rancang memiliki beberapa fungsi penting untuk menompang kemudahan dalam menggunakan aplikasi daiantaranya terdapa date formated, format money, searching, sorting and navigation. semua fonction dibuat dengan logic saya sendiri tanpa melakukan import dari library namun beberapa converting data saya menggunaka beberapa library seperti momentjs untuk mempermudah dalam convert format data. selebihnya saya menggunaka regex untuk mempermudah melakukan identifikasi sebuah string atau value

### TODO

Aplikasi yang saya bikin masih rigid dalam masalah UI namun saya optimalkan melalui UX yang ditawarkan lewar beberapa input handler dan kemudahan dalam mencari data. namun beberapa tampilan masih menampilan Bounce design seperti data yang kepanjangan sehingga height dari tabel tidak static. sehingga agak kurang enak untuk dipandang. untuk harapan yang belum terimplementasi yakni :

- membuat design yang dynamic dan fluid sehingga tidak melelahkan mata dan bervariasi
- memperbanyak reusable component agar codingan lebih readable
