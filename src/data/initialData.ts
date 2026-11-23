import {
  Assignment,
  DayOfWeek,
  MaterialTopic,
  ProgressEntry,
  ScheduleItem,
  StudentProfile,
} from '../types/study';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Marchella Reynatha Azzahra',
  school: 'SMP Global Mandiri Jakarta',
  grade: 'Y8 EINSTEIN',
  academicYear: 'Semester Ganjil 2026/2027',
};

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  // Senin
  {
    id: 'sch-mon-1',
    day: 'Senin',
    startTime: '07: 40',
    endTime: '08:20',
    subject: 'Bahasa Inggris',
    room: 'Ruang 204',
    teacher: 'Ms Sissy, S.Pd.',
    topicFocus: 'Recount Text',
  },
  {
    id: 'sch-mon-2',
    day: 'Senin',
    startTime: '08:35',
    endTime: '09:55',
    subject: 'Informatika',
    room: 'Lab Komputer 1',
    teacher: 'Bapak Dimas Pratama, S.Kom.',
    topicFocus: 'Computer Sistem (Input, Process, Output)',
    linkedMaterialId: 'mat-ipo',
  },
  {
    id: 'sch-mon-3',
    day: 'Senin',
    startTime: '10:15',
    endTime: '11:35',
    subject: 'Bahasa Indonesia',
    room: 'Ruang 204',
    teacher: 'Ibu Maya Kusuma, M.Pd.',
    topicFocus: 'Teks Eksposisi & Analisis Gagasan',
  },
  {
    id: 'sch-mon-4',
    day: 'Senin',
    startTime: '12:30',
    endTime: '13:50',
    subject: 'IPA Terpadu',
    room: 'Lab Sains',
    teacher: 'Bapak Hendra Wijaya, S.Si.',
    topicFocus: 'Sistem Pencernaan Manusia',
  },

  // Selasa
  {
    id: 'sch-tue-1',
    day: 'Selasa',
    startTime: '07:15',
    endTime: '08:35',
    subject: 'Bahasa Inggris',
    room: 'Ruang 204',
    teacher: 'Ms. Clara Santoso, B.Ed.',
    topicFocus: 'Recount Text & Past Continuous Tense',
  },
  {
    id: 'sch-tue-2',
    day: 'Selasa',
    startTime: '08:35',
    endTime: '09:55',
    subject: 'IPS',
    room: 'Ruang 204',
    teacher: 'Ibu Dewi Lestari, S.Pd.',
    topicFocus: 'Mobilitas Sosial & Integrasi Bangsa',
  },
  {
    id: 'sch-tue-3',
    day: 'Selasa',
    startTime: '10:15',
    endTime: '11:35',
    subject: 'Informatika',
    room: 'Lab Komputer 1',
    teacher: 'Bapak Dimas Pratama, S.Kom.',
    topicFocus: 'Perlindungan Data Pribadi & Jejak Digital',
    linkedMaterialId: 'mat-privacy',
  },
  {
    id: 'sch-tue-4',
    day: 'Selasa',
    startTime: '12:30',
    endTime: '13:50',
    subject: 'Seni Budaya',
    room: 'Studio Seni',
    teacher: 'Ibu Nadia Permata, S.Sn.',
    topicFocus: 'Desain Poster Edukasi Digital',
  },

  // Rabu
  {
    id: 'sch-wed-1',
    day: 'Rabu',
    startTime: '07:15',
    endTime: '08:35',
    subject: 'Pendidikan Pancasila',
    room: 'Ruang 204',
    teacher: 'Bapak Agus Setiawan, S.Pd.',
    topicFocus: 'Etika Bermasyarakat & Kewarganegaraan',
    linkedMaterialId: 'mat-citizenship',
  },
  {
    id: 'sch-wed-2',
    day: 'Rabu',
    startTime: '08:35',
    endTime: '09:55',
    subject: 'Matematika',
    room: 'Ruang 204',
    teacher: 'Ibu Ratna Sari, S.Pd.',
    topicFocus: 'Sistem Persamaan Linear Dua Variabel',
  },
  {
    id: 'sch-wed-3',
    day: 'Rabu',
    startTime: '10:15',
    endTime: '11:35',
    subject: 'IPA Terpadu',
    room: 'Lab Sains',
    teacher: 'Bapak Hendra Wijaya, S.Si.',
    topicFocus: 'Zat Aditif & Adiktif',
  },
  {
    id: 'sch-wed-4',
    day: 'Rabu',
    startTime: '12:30',
    endTime: '13:50',
    subject: 'PJOK',
    room: 'Lapangan Utama',
    teacher: 'Bapak Raka Mahendra, S.Or.',
    topicFocus: 'Kebugaran Jasmani & Bola Basket',
  },

  // Kamis
  {
    id: 'sch-thu-1',
    day: 'Kamis',
    startTime: '07:15',
    endTime: '08:35',
    subject: 'Informatika',
    room: 'Lab Komputer 2',
    teacher: 'Bapak Dimas Pratama, S.Kom.',
    topicFocus: 'Vibe Coding & Prototipe Web',
    linkedMaterialId: 'mat-vibe-coding',
  },
  {
    id: 'sch-thu-2',
    day: 'Kamis',
    startTime: '08:35',
    endTime: '09:55',
    subject: 'Bahasa Inggris',
    room: 'Ruang 204',
    teacher: 'Ms. Clara Santoso, B.Ed.',
    topicFocus: 'Speaking Presentation: Digital Habits',
  },
  {
    id: 'sch-thu-3',
    day: 'Kamis',
    startTime: '10:15',
    endTime: '11:35',
    subject: 'Bahasa Indonesia',
    room: 'Ruang 204',
    teacher: 'Ibu Maya Kusuma, M.Pd.',
    topicFocus: 'Menulis Artikel Ilmiah Populer',
  },
  {
    id: 'sch-thu-4',
    day: 'Kamis',
    startTime: '12:30',
    endTime: '13:50',
    subject: 'Prakarya & Rekayasa',
    room: 'Ruang Bengkel',
    teacher: 'Bapak Dimas Pratama, S.Kom.',
    topicFocus: 'Deploy Proyek di GitHub & Vercel',
    linkedMaterialId: 'mat-deploy',
  },

  // Jumat
  {
    id: 'sch-fri-1',
    day: 'Jumat',
    startTime: '07:30',
    endTime: '08:50',
    subject: 'Informatika',
    room: 'Lab Komputer 1',
    teacher: 'Bapak Dimas Pratama, S.Kom.',
    topicFocus: 'Dampak Sosial & Kewarganegaraan Digital',
    linkedMaterialId: 'mat-social-impact',
  },
  {
    id: 'sch-fri-2',
    day: 'Jumat',
    startTime: '08:50',
    endTime: '10:10',
    subject: 'IPS',
    room: 'Ruang 204',
    teacher: 'Ibu Dewi Lestari, S.Pd.',
    topicFocus: 'Peran Teknologi dalam Ekonomi Kreatif',
  },
  {
    id: 'sch-fri-3',
    day: 'Jumat',
    startTime: '10:30',
    endTime: '11:45',
    subject: 'Bimbingan Belajar Mandiri',
    room: 'Perpustakaan',
    teacher: 'Wali Kelas VIII-B',
    topicFocus: 'Evaluasi Mingguan & Review Materi',
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'tsk-1',
    title: 'Diagram Alur Computer Sistem (Input - Process - Output)',
    subject: 'Informatika',
    dueDate: '2026-11-23',
    dueTime: '20:00',
    priority: 'Mendesak',
    status: 'Dikerjakan',
    description:
      'Buat diagram alur lengkap dari perangkat kasir minimarket atau mesin absensi QR sekolah, identifikasi komponen Input, CPU (ALU & CU), Output, dan Storage.',
    linkedMaterialId: 'mat-ipo',
    reminderEnabled: true,
  },
  {
    id: 'tsk-2',
    title: 'Audit Jejak Digital & Checklist Keamanan Akun Pribadi',
    subject: 'Informatika',
    dueDate: '2026-11-24',
    dueTime: '18:00',
    priority: 'Mendesak',
    status: 'Belum',
    description:
      'Catat perbedaan jejak digital aktif dan pasif dari aktivitas internet sehari-hari, lalu susun 5 langkah perlindungan data pribadi.',
    linkedMaterialId: 'mat-privacy',
    reminderEnabled: true,
  },
  {
    id: 'tsk-3',
    title: 'Latihan Soal Persamaan Garis Lurus (Hal. 142 No. 1–10)',
    subject: 'Matematika',
    dueDate: '2026-11-25',
    dueTime: '07:00',
    priority: 'Sedang',
    status: 'Belum',
    description:
      'Kerjakan di buku tulis berpetak lengkap dengan grafik titik koordinat untuk soal nomor 6 sampai 10.',
    reminderEnabled: true,
  },
  {
    id: 'tsk-4',
    title: 'Poster Kampanye Anti Perundungan Siber (Stop-Save-Block-Tell)',
    subject: 'Pendidikan Pancasila',
    dueDate: '2026-11-26',
    dueTime: '15:00',
    priority: 'Sedang',
    status: 'Belum',
    description:
      'Rancang konten kampanye singkat tentang etika berinternet dan cara menghadapi cyberbullying di lingkungan sekolah.',
    linkedMaterialId: 'mat-citizenship',
    reminderEnabled: true,
  },
  {
    id: 'tsk-5',
    title: 'Prompt Terstruktur & Eksperimen Prototipe Web Sederhana',
    subject: 'Informatika',
    dueDate: '2026-11-27',
    dueTime: '21:00',
    priority: 'Santai',
    status: 'Belum',
    description:
      'Tuliskan dokumentasi prompt Vibe Coding (Konteks, Fitur Utama, Desain) lalu unggah kode prototipe ke repository GitHub dan deploy di Vercel.',
    linkedMaterialId: 'mat-deploy',
    reminderEnabled: true,
  },
  {
    id: 'tsk-6',
    title: 'Esai Refleksi: Dampak Sosial Informatika bagi Pelajar SMP',
    subject: 'Informatika',
    dueDate: '2026-11-20',
    dueTime: '17:00',
    priority: 'Sedang',
    status: 'Selesai',
    description:
      'Menjelaskan 3 manfaat positif informatika di bidang pendidikan serta 2 tantangan yang harus diwaspadai.',
    linkedMaterialId: 'mat-social-impact',
    reminderEnabled: false,
  },
];

export const STUDY_MATERIALS: MaterialTopic[] = [
  {
    id: 'mat-social-impact',
    order: '01',
    title: 'Dampak Sosial Informatika',
    shortTitle: 'Dampak Sosial Informatika',
    subject: 'Informatika',
    estimatedReadMin: 6,
    summaryLead:
      'Memahami bagaimana teknologi informasi mengubah cara manusia belajar, berkomunikasi, bekerja, dan berinteraksi di masyarakat modern beserta etika penggunaannya.',
    sections: [
      {
        heading: 'Transformasi Kehidupan Sehari-hari',
        summary:
          'Informatika mempercepat akses informasi dan efisiensi layanan publik maupun pendidikan.',
        points: [
          'Pendidikan: Pembelajaran jarak jauh, perpustakaan digital, simulasi interaktif, dan aplikasi pengatur jadwal belajar.',
          'Komunikasi & Kolaborasi: Pertukaran informasi lintas jarak secara instan melalui pesan terenkripsi dan dokumen bersama.',
          'Ekonomi Digital: Munculnya e-commerce, pembayaran non-tunai (QRIS), serta profesi kreatif baru di bidang teknologi.',
        ],
      },
      {
        heading: 'Tantangan dan Risiko Sosial',
        summary:
          'Kemajuan teknologi juga membawa konsekuensi yang perlu diantisipasi secara kritis oleh pelajar.',
        points: [
          'Kesenjangan Digital (Digital Divide): Perbedaan akses internet dan perangkat antar wilayah yang memengaruhi kesempatan belajar.',
          'Informasi Palsu (Hoaks) & Echo Chamber: Algoritma media sosial dapat mengurung pengguna pada satu sudut pandang saja.',
          'Ketergantungan Gawai & Kesehatan Mental: Paparan layar berlebihan tanpa manajemen waktu mengganggu fokus belajar dan tidur.',
        ],
      },
      {
        heading: 'Sikap Bijak Pelajar di Era Digital',
        summary:
          'Teknologi harus menjadi alat bantu produktivitas, bukan pengendali waktu.',
        points: [
          'Verifikasi sumber berita sebelum membagikan ulang informasi (prinsip Saring Sebelum Sharing).',
          'Menghargai hak cipta karya orang lain dengan mencantumkan sumber atau menggunakan lisensi Creative Commons.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Literasi Digital',
        definition:
          'Kemampuan menemukan, mengevaluasi, memanfaatkan, dan membuat informasi secara bijak menggunakan teknologi digital.',
      },
      {
        term: 'Kesenjangan Digital',
        definition:
          'Ketimpangan akses terhadap perangkat keras, koneksi internet, dan keterampilan teknologi antar kelompok masyarakat.',
      },
      {
        term: 'Hak Kekayaan Intelektual (HKI)',
        definition:
          'Perlindungan hukum atas karya cipta digital seperti tulisan, foto, musik, dan kode program.',
      },
    ],
    realWorldExample:
      'Di SMP Global Mandiri, sistem pengumpulan tugas daring memudahkan guru memberi umpan balik cepat, namun siswa tetap harus mengatur batas waktu layar agar tidak kelelahan digital.',
    interactiveLabType: 'social-impact',
    quiz: [
      {
        id: 'q-si-1',
        question:
          'Apa langkah paling tepat ketika menerima berita viral di grup kelas yang belum jelas sumbernya?',
        options: [
          'Langsung meneruskan ke grup keluarga agar semua cepat tahu',
          'Memeriksa kebenaran sumber melalui situs resmi atau media tepercaya terlebih dahulu',
          'Mengubah judulnya agar terlihat lebih menarik sebelum dibagikan',
          'Membiarkan tanpa membaca tetapi tetap menyimpannya sebagai fakta',
        ],
        correctIndex: 1,
        explanation:
          'Prinsip "Saring Sebelum Sharing" menuntut kita memverifikasi kredibilitas sumber sebelum menyebarkan informasi.',
      },
      {
        id: 'q-si-2',
        question:
          'Istilah yang menggambarkan ketimpangan akses internet dan perangkat teknologi antar daerah disebut...',
        options: [
          'Jejak Digital',
          'Kesenjangan Digital (Digital Divide)',
          'Komputasi Awan',
          'Otomasi Industri',
        ],
        correctIndex: 1,
        explanation:
          'Digital divide atau kesenjangan digital terjadi ketika ada perbedaan kesempatan akses teknologi dan internet.',
      },
      {
        id: 'q-si-3',
        question:
          'Salah satu dampak positif informatika yang paling terasa dalam kegiatan belajar harian siswi SMP adalah...',
        options: [
          'Menghilangkan kebutuhan membaca buku sama sekali',
          'Memudahkan akses sumber belajar terstruktur dan manajemen tugas sekolah',
          'Membuat semua tugas dikerjakan tanpa proses berpikir',
          'Mengurangi interaksi langsung dengan teman sebaya di kelas',
        ],
        correctIndex: 1,
        explanation:
          'Informatika mendukung efisiensi akses materi dan pengorganisasian belajar secara terstruktur.',
      },
    ],
  },
  {
    id: 'mat-ipo',
    order: '02',
    title: 'Computer Sistem (INPUT, PROCESS, OUTPUT)',
    shortTitle: 'Computer Sistem (IPO)',
    subject: 'Informatika',
    estimatedReadMin: 7,
    summaryLead:
      'Mengenal cara kerja fundamental komputer melalui siklus Input, Process, Output, dan Storage (IPOS), serta peran CPU (CU & ALU), memori, dan perangkat keras pendukung.',
    sections: [
      {
        heading: '1. INPUT (Perangkat Masukan)',
        summary:
          'Tahap awal saat pengguna atau sensor memasukkan data mentah maupun perintah ke dalam sistem komputer.',
        points: [
          'Perangkat Input Teks & Penunjuk: Keyboard, Mouse, Touchpad, Stylus Pen.',
          'Perangkat Input Audio, Visual & Sensor: Mikrofon, Webcam, Scanner QR/Barcode, Layar Sentuh (Touchscreen).',
          'Data yang masuk diubah menjadi sinyal biner (0 dan 1) agar dapat dibaca oleh komputer.',
        ],
      },
      {
        heading: '2. PROCESS (Unit Pemrosesan & Memori)',
        summary:
          'Inti komputer yang mengolah data mentah menjadi informasi bermakna menggunakan instruksi program.',
        points: [
          'CPU (Central Processing Unit): Otak komputer yang terdiri dari Control Unit (CU) untuk mengatur alur instruksi dan ALU (Arithmetic Logic Unit) untuk menghitung operasi matematika serta logika.',
          'RAM (Random Access Memory): Memori kerja sementara berkecepatan tinggi untuk menyimpan data yang sedang aktif diproses.',
          'Storage (SSD / HDD): Penyimpanan jangka panjang agar file dan sistem operasi tidak hilang saat daya dimatikan.',
        ],
      },
      {
        heading: '3. OUTPUT (Perangkat Keluaran)',
        summary:
          'Tahap akhir menampilkan hasil pengolahan data dalam bentuk yang dapat dipahami oleh manusia atau perangkat lain.',
        points: [
          'Output Visual: Monitor, Proyektor kelas, Layar Smartphone.',
          'Output Audio & Fisik: Speaker, Headphone, Printer (mencetak dokumen fisik), dan Aktuator pada robotika.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'ALU (Arithmetic Logic Unit)',
        definition:
          'Bagian dalam CPU yang bertugas melakukan operasi hitung matematika (+, -, ×, ÷) dan perbandingan logika.',
      },
      {
        term: 'Control Unit (CU)',
        definition:
          'Pengendali utama di dalam CPU yang mengarahkan aliran data antara memori, perangkat input, dan output.',
      },
      {
        term: 'RAM vs Storage (SSD)',
        definition:
          'RAM bersifat sementara (volatile) saat program berjalan, sedangkan SSD menyimpan data secara permanen.',
      },
    ],
    realWorldExample:
      'Saat kamu memindai kartu pelajar QR di gerbang sekolah: Kamera Scanner (Input) membaca pola QR → Komputer sekolah mencocokkan ID dengan database siswa di RAM/CPU (Process) → Layar menampilkan "Selamat Datang, Marchella — Hadir 06:58" dan mencatat ke database (Output & Storage).',
    interactiveLabType: 'ipo-system',
    quiz: [
      {
        id: 'q-ipo-1',
        question:
          'Komponen di dalam CPU yang bertugas melakukan perhitungan matematika dan perbandingan logika adalah...',
        options: ['Control Unit (CU)', 'ALU (Arithmetic Logic Unit)', 'SSD', 'Printer'],
        correctIndex: 1,
        explanation:
          'ALU menangani seluruh operasi aritmetika dan logika, sedangkan CU mengatur kendali alur instruksi.',
      },
      {
        id: 'q-ipo-2',
        question:
          'Ketika kamu merekam suara untuk tugas Bahasa Inggris menggunakan mikrofon, mikrofon berperan sebagai perangkat...',
        options: ['Process', 'Output', 'Input', 'Backup'],
        correctIndex: 2,
        explanation:
          'Mikrofon menangkap gelombang suara dari luar dan mengubahnya menjadi data masukan digital ke komputer.',
      },
      {
        id: 'q-ipo-3',
        question:
          'Mengapa data di RAM akan hilang ketika laptop dimatikan secara penuh?',
        options: [
          'Karena RAM hanya menyimpan data sementara (volatile) selama proses berlangsung',
          'Karena RAM ukurannya lebih besar dari SSD',
          'Karena RAM adalah perangkat Output',
          'Karena CPU menghapus semua file di SSD saat mati',
        ],
        correctIndex: 0,
        explanation:
          'RAM merupakan memori kerja sementara yang membutuhkan daya listrik untuk mempertahankan data aktif.',
      },
    ],
  },
  {
    id: 'mat-privacy',
    order: '03',
    title: 'Perlindungan Data Pribadi dan Jejak Digital',
    shortTitle: 'Data Pribadi & Jejak Digital',
    subject: 'Informatika',
    estimatedReadMin: 6,
    summaryLead:
      'Mengenali kategori data pribadi yang wajib dilindungi, memahami jejak digital aktif maupun pasif, dan menerapkan kebiasaan keamanan akun di internet.',
    sections: [
      {
        heading: 'Klasifikasi Data Pribadi',
        summary:
          'Tidak semua informasi diri aman dibagikan secara publik di media sosial atau formulir daring.',
        points: [
          'Data Pribadi Umum: Nama lengkap, jenis kelamin, kewarganegaraan, alamat rumah, dan tanggal lahir.',
          'Data Pribadi Spesifik / Sensitif: Nomor Induk Kependudukan (NIK), data biometrik (sidik jari/wajah), riwayat kesehatan, kata sandi, dan data keuangan.',
          'Prinsip Minimasi Data: Hanya berikan data yang benar-benar diperlukan pada platform tepercaya.',
        ],
      },
      {
        heading: 'Jejak Digital Aktif vs Pasif',
        summary:
          'Setiap aktivitas di internet meninggalkan rekam jejak yang sulit dihapus sepenuhnya.',
        points: [
          'Jejak Digital Aktif: Data yang sengaja kita unggah atau kirimkan, seperti foto di Instagram, komentar, email, dan status media sosial.',
          'Jejak Digital Pasif: Data yang dikumpulkan tanpa disadari langsung, seperti riwayat pencarian, cookies situs web, alamat IP, dan lokasi GPS.',
        ],
      },
      {
        heading: 'Strategi Perlindungan Akun Pelajar',
        summary:
          'Langkah praktis mencegah peretasan akun sekolah maupun media sosial pribadi.',
        points: [
          'Gunakan kombinasi kata sandi unik minimal 12 karakter (huruf besar, kecil, angka, simbol) dan berbeda tiap akun.',
          'Aktifkan Autentikasi Dua Faktor (2FA) untuk email sekolah dan akun utama.',
          'Hindari login akun penting melalui Wi-Fi publik tanpa enkripsi atau meminjamkan kode OTP kepada siapa pun.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Jejak Digital (Digital Footprint)',
        definition:
          'Rekam jejak data unik yang ditinggalkan seseorang ketika beraktivitas di jaringan internet.',
      },
      {
        term: 'Autentikasi Dua Faktor (2FA)',
        definition:
          'Lapisan keamanan tambahan selain kata sandi, misalnya kode OTP atau aplikasi autentikator sebelum masuk akun.',
      },
      {
        term: 'Phishing',
        definition:
          'Upaya penipuan digital dengan menyamar sebagai pihak resmi untuk mencuri kata sandi, OTP, atau data pribadi.',
      },
    ],
    realWorldExample:
      'Mengunggah foto kartu pelajar lengkap dengan NISN dan alamat rumah ke story publik dapat disalahgunakan pihak tak bertanggung jawab untuk penipuan identitas.',
    interactiveLabType: 'data-privacy',
    quiz: [
      {
        id: 'q-priv-1',
        question:
          'Manakah di bawah ini yang termasuk Jejak Digital Pasif?',
        options: [
          'Mengunggah foto kegiatan lomba sekolah di media sosial',
          'Menulis komentar positif di blog teman',
          'Riwayat lokasi dan cookies yang direkam otomatis oleh situs belanja saat kamu menjelajah',
          'Mengirim email tugas ke guru Informatika',
        ],
        correctIndex: 2,
        explanation:
          'Jejak digital pasif terekam otomatis di latar belakang tanpa kita mengunggahnya secara sadar.',
      },
      {
        id: 'q-priv-2',
        question:
          'Jika seseorang mengirim pesan mengaku sebagai admin sekolah dan meminta kode OTP yang masuk ke SMS kamu, tindakan yang benar adalah...',
        options: [
          'Memberikan kode OTP agar akun tidak terblokir',
          'Menolak, tidak membagikan kode OTP kepada siapa pun, dan melaporkan pesan tersebut sebagai indikasi phishing',
          'Mengirimkan kata sandi akun saja sebagai pengganti OTP',
          'Meneruskan kode OTP ke teman sebangku untuk dicek',
        ],
        correctIndex: 1,
        explanation:
          'Kode OTP bersifat rahasia mutlak; pihak resmi tidak pernah meminta kode OTP pengguna.',
      },
      {
        id: 'q-priv-3',
        question:
          'Mengapa menggunakan satu kata sandi yang sama untuk semua akun (email, game, media sosial) sangat berisiko?',
        options: [
          'Membuat komputer menjadi lambat saat loading',
          'Jika satu aplikasi mengalami kebocoran data, seluruh akun lain ikut rentan dibobol',
          'Karena password yang sama tidak bisa menggunakan angka',
          'Agar sulit diingat oleh pemilik akun sendiri',
        ],
        correctIndex: 1,
        explanation:
          'Kebocoran satu layanan memungkinkan penyerang mencoba kombinasi yang sama di layanan lain (credential stuffing).',
      },
    ],
  },
  {
    id: 'mat-citizenship',
    order: '04',
    title: 'Kewarganegaraan Digital & Perundungan Siber',
    shortTitle: 'Kewarganegaraan Digital',
    subject: 'Informatika',
    estimatedReadMin: 6,
    summaryLead:
      'Membangun perilaku bertanggung jawab, empatik, dan aman saat berinteraksi di ruang digital serta strategi menghadapi dan mencegah perundungan siber (cyberbullying).',
    sections: [
      {
        heading: 'Makna Kewarganegaraan Digital',
        summary:
          'Menjadi warga digital berarti menerapkan norma sopan santun, hukum, dan empati yang sama baiknya di dunia maya maupun nyata.',
        points: [
          'Netiket (Etika Berinternet): Menulis pesan dengan bahasa santun, menghargai waktu orang lain, dan tidak memicu pertengkaran (flaming).',
          'Tanggung Jawab Konten: Memastikan setiap unggahan atau komentar tidak merendahkan suku, agama, fisik, maupun privasi orang lain.',
        ],
      },
      {
        heading: 'Mengenali Bentuk Perundungan Siber (Cyberbullying)',
        summary:
          'Perundungan siber adalah tindakan agresif dan berulang menggunakan perangkat digital untuk menyakiti atau mempermalukan orang lain.',
        points: [
          'Harassment & Flaming: Mengirim komentar kasar, ejekan berulang, atau hinaan di kolom komentar maupun grup chat.',
          'Doxxing: Menyebarkan informasi pribadi atau foto memalukan seseorang tanpa izin.',
          'Exclusion & Impersonation: Sengaja mengucilkan teman dari grup kelas atau membuat akun palsu mengatasnamakan korban.',
        ],
      },
      {
        heading: 'Protokol Menghadapi Cyberbullying: STOP - SAVE - BLOCK - TELL',
        summary:
          'Langkah terstruktur yang harus dilakukan jika kamu atau temanmu mengalami perundungan siber.',
        points: [
          'STOP: Jangan membalas komentar pelaku dengan emosi agar situasi tidak semakin memanas.',
          'SAVE: Simpan bukti tangkapan layar (screenshot), tautan akun, dan waktu kejadian.',
          'BLOCK: Blokir dan laporkan (report) akun pelaku pada fitur keamanan platform.',
          'TELL: Ceritakan segera kepada orang tua, wali kelas, atau guru BK di sekolah agar mendapat pendampingan.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Netiket',
        definition:
          'Tata krama atau etika berkomunikasi yang baik dan saling menghormati di ruang digital.',
      },
      {
        term: 'Doxxing',
        definition:
          'Tindakan menyebarluaskan data pribadi seseorang (alamat, nomor telepon, foto pribadi) tanpa izin dengan niat merugikan.',
      },
      {
        term: 'Upstander',
        definition:
          'Seseorang yang berani membela korban, tidak ikut menyebarkan ejekan, dan membantu melaporkan perundungan siber.',
      },
    ],
    realWorldExample:
      'Ketika melihat foto teman dijadikan stiker ejekan di grup kelas, seorang upstander tidak ikut tertawa atau meneruskannya, melainkan menegur dengan baik dan melapor ke wali kelas.',
    interactiveLabType: 'digital-citizenship',
    quiz: [
      {
        id: 'q-cit-1',
        question:
          'Apa arti huruf "SAVE" dalam langkah menghadapi perundungan siber (STOP - SAVE - BLOCK - TELL)?',
        options: [
          'Menghapus seluruh akun media sosial seketika',
          'Menyimpan bukti tangkapan layar (screenshot) dan detail kejadian sebelum memblokir pelaku',
          'Membalas pesan pelaku dengan kata-kata yang lebih tegas',
          'Menyimpan rahasia sendiri tanpa memberitahu orang dewasa',
        ],
        correctIndex: 1,
        explanation:
          'Bukti tangkapan layar penting sebagai dokumentasi apabila diperlukan penanganan oleh sekolah atau orang tua.',
      },
      {
        id: 'q-cit-2',
        question:
          'Tindakan menyebarkan nomor telepon pribadi dan alamat rumah teman tanpa izin ke forum publik disebut...',
        options: ['Netiket', 'Doxxing', 'Archiving', 'Vibe Coding'],
        correctIndex: 1,
        explanation:
          'Doxxing adalah pelanggaran privasi serius dengan mempublikasikan informasi pribadi target tanpa persetujuan.',
      },
      {
        id: 'q-cit-3',
        question:
          'Peran pelajar yang melihat perundungan siber terjadi pada temannya dan memilih membela serta melaporkan disebut...',
        options: ['Bystander pasif', 'Upstander', 'Moderator anonim', 'Trolling'],
        correctIndex: 1,
        explanation:
          'Upstander bertindak aktif mendukung korban dan menghentikan rantai perundungan.',
      },
    ],
  },
  {
    id: 'mat-vibe-coding',
    order: '05',
    title: 'Vibe Coding',
    shortTitle: 'Vibe Coding',
    subject: 'Informatika',
    estimatedReadMin: 6,
    summaryLead:
      'Memahami paradigma Vibe Coding: membangun perangkat lunak dengan mengarahkan AI menggunakan bahasa alami secara terstruktur, iteratif, dan tetap memahami logika serta kualitas hasilnya.',
    sections: [
      {
        heading: 'Apa Itu Vibe Coding?',
        summary:
          'Vibe Coding adalah pendekatan membuat aplikasi di mana kreator bertindak sebagai pengarah konsep (architect) menggunakan instruksi bahasa manusia (prompt), sementara AI membantu menulis struktur kodenya.',
        points: [
          'Fokus bergeser dari menghafal sintaks semata menjadi merumuskan masalah, merancang pengalaman pengguna (UX), dan menguji alur logika.',
          'Tetap membutuhkan pemahaman dasar pemrograman (variabel, kondisi, alur data) agar kita bisa mengecek jika kode AI keliru.',
        ],
      },
      {
        heading: 'Formula Prompt Efektif (Konteks → Fitur → Batasan)',
        summary:
          'Instruksi yang jelas menghasilkan aplikasi yang rapi, sedangkan instruksi kabur menghasilkan bug.',
        points: [
          '1. Konteks & Pengguna: Siapa yang memakai aplikasi dan apa tujuannya (contoh: siswi SMP yang ingin mengatur jadwal belajar).',
          '2. Fitur Spesifik: Daftar fungsi nyata yang dibutuhkan (contoh: tabel jadwal Senin–Jumat, pengingat tenggat tugas, grafik progres).',
          '3. Tampilan & Aturan: Gaya visual yang bersih, bahasa yang dipakai, dan perilaku saat data kosong atau diubah.',
        ],
      },
      {
        heading: 'Iterasi Bertahap & Verifikasi',
        summary:
          'Jangan membangun semuanya sekaligus dalam satu perintah raksasa tanpa diuji.',
        points: [
          'Bangun versi inti terlebih dahulu, uji setiap tombol dan formulir, lalu perbaiki bagian yang kurang tepat secara bertahap.',
          'Selalu periksa keamanan dasar: jangan pernah menaruh kunci rahasia (API Key) di dalam kode tampilan depan (frontend).',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Prompt Engineering',
        definition:
          'Seni menyusun instruksi yang jelas, terstruktur, dan spesifik agar AI menghasilkan keluaran sesuai kebutuhan.',
      },
      {
        term: 'Iterasi',
        definition:
          'Proses menguji, mengevaluasi, dan menyempurnakan prototipe aplikasi secara berulang hingga berfungsi optimal.',
      },
      {
        term: 'Debugging',
        definition:
          'Proses mencari, menganalisis, dan memperbaiki kesalahan (bug) pada program agar berjalan sesuai rancangan.',
      },
    ],
    realWorldExample:
      'Alih-alih menulis "buatkan web sekolah", seorang pelajar menulis: "Buatkan aplikasi jadwal pelajaran Senin–Jumat dengan pengingat tugas yang terhubung ke mata pelajaran serta grafik progres belajar harian."',
    interactiveLabType: 'vibe-coding',
    quiz: [
      {
        id: 'q-vc-1',
        question:
          'Apa peran utama pelajar saat melakukan Vibe Coding?',
        options: [
          'Menutup mata terhadap error karena semua otomatis sempurna',
          'Menjadi perancang solusi yang memberi arahan jelas, menguji hasil, dan memahami alur logika aplikasi',
          'Menghafalkan ribuan baris kode biner tanpa menguji aplikasi',
          'Mengunggah kunci rahasia akun ke halaman publik',
        ],
        correctIndex: 1,
        explanation:
          'Dalam Vibe Coding, manusia tetap memegang kendali arah desain, spesifikasi fitur, dan verifikasi kualitas hasil.',
      },
      {
        id: 'q-vc-2',
        question:
          'Urutan penyusunan prompt Vibe Coding yang paling efektif adalah...',
        options: [
          'Satu kata saja agar AI menebak sendiri',
          'Menyebutkan Konteks/Tujuan, Fitur Spesifik, serta Batasan/Tampilan yang diinginkan',
          'Langsung meminta warna tombol tanpa menjelaskan fungsi aplikasinya',
          'Mengirimkan pesan berulang yang sama tanpa menjelaskan masalahnya',
        ],
        correctIndex: 1,
        explanation:
          'Konteks, fitur terukur, dan batasan desain membuat hasil implementasi jauh lebih akurat.',
      },
      {
        id: 'q-vc-3',
        question:
          'Mengapa kita tetap perlu menguji setiap tombol dan fitur setelah AI menghasilkan kode?',
        options: [
          'Agar kita bisa memastikan tidak ada kesalahan logika, data kosong tertangani, dan aplikasi berjalan sesuai kebutuhan pengguna',
          'Supaya ukuran file menjadi lebih besar',
          'Karena aplikasi web hanya bisa dibuka satu kali',
          'Untuk memperlambat proses pembuatan',
        ],
        correctIndex: 0,
        explanation:
          'Pengujian (testing) memastikan aplikasi benar-benar fungsional dan bebas bug sebelum dibagikan ke pengguna.',
      },
    ],
  },
  {
    id: 'mat-deploy',
    order: '06',
    title: 'Google AI Studio, GitHub dan Vercel',
    shortTitle: 'AI Studio, GitHub & Vercel',
    subject: 'Informatika',
    estimatedReadMin: 7,
    summaryLead:
      'Memahami alur kerja modern dari merancang prototipe di Google AI Studio, menyimpan serta mengelola riwayat kode di GitHub, hingga menerbitkan aplikasi ke internet menggunakan Vercel.',
    sections: [
      {
        heading: '1. Google AI Studio (Merancang & Prototipe)',
        summary:
          'Platform berbasis web dari Google untuk bereksperimen dengan model AI dan membangun prototipe aplikasi secara cepat.',
        points: [
          'Tempat menguji ide, menyusun prompt terstruktur, dan melihat pratinjau langsung aplikasi web yang dibuat.',
          'Mendukung iterasi cepat untuk membangun komponen antarmuka dan logika aplikasi sebelum kode diunduh atau diekspor.',
        ],
      },
      {
        heading: '2. GitHub (Penyimpanan Kode & Kontrol Versi)',
        summary:
          'Layanan hosting repository Git untuk menyimpan seluruh file proyek, melacak setiap perubahan, dan berkolaborasi.',
        points: [
          'Repository (Repo): Folder proyek utama di cloud yang menyimpan kode sumber, gambar, dan konfigurasi.',
          'Commit & Push: Menyimpan catatan perubahan (snapshot) kode secara rapi sehingga kita bisa kembali ke versi sebelumnya jika terjadi kesalahan.',
        ],
      },
      {
        heading: '3. Vercel (Deployment & Publikasi Online)',
        summary:
          'Platform cloud yang menghubungkan repository GitHub agar aplikasi web otomatis dibangun (build) dan bisa diakses publik melalui URL.',
        points: [
          'Continuous Deployment: Setiap kali ada perubahan baru (push) ke cabang utama GitHub, Vercel otomatis memperbarui situs live.',
          'Menyediakan sertifikat HTTPS gratis dan domain instan (contoh: nama-proyek.vercel.app) untuk presentasi tugas sekolah.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Repository (Repo)',
        definition:
          'Wadah penyimpanan proyek kode beserta seluruh riwayat perubahannya di GitHub.',
      },
      {
        term: 'Commit',
        definition:
          'Rekaman perubahan kode pada titik waktu tertentu disertai pesan deskriptif mengenai apa yang diubah.',
      },
      {
        term: 'Deployment',
        definition:
          'Proses memaketkan kode aplikasi dan menempatkannya di server cloud agar dapat dibuka melalui browser oleh siapa saja.',
      },
    ],
    realWorldExample:
      'Alur proyek Prakarya/Informatika: Marchella merancang Aplikasi Agenda Belajar di Google AI Studio → mengekspor kode ke repository GitHub → menghubungkan repo ke Vercel sehingga teman sekelas bisa membuka aplikasinya lewat tautan web.',
    interactiveLabType: 'cloud-pipeline',
    quiz: [
      {
        id: 'q-dep-1',
        question:
          'Fungsi utama GitHub dalam alur pengembangan aplikasi web modern adalah...',
        options: [
          'Sebagai tempat menyunting foto profil siswa',
          'Menyimpan repository kode sumber, melacak riwayat perubahan (commit), dan memudahkan kolaborasi',
          'Menggantikan browser Chrome untuk membuka internet',
          'Menghapus kode lama secara permanen setiap hari',
        ],
        correctIndex: 1,
        explanation:
          'GitHub berfungsi sebagai sistem kontrol versi dan penyimpanan repository kode proyek.',
      },
      {
        id: 'q-dep-2',
        question:
          'Apa keunggulan utama menghubungkan GitHub dengan Vercel (Continuous Deployment)?',
        options: [
          'Setiap kali kode baru di-push ke GitHub, Vercel otomatis membangun dan memperbarui situs web yang tayang',
          'Vercel mengubah kode aplikasi menjadi dokumen PDF',
          'Tidak perlu koneksi internet untuk membuka situs web publik',
          'Kode program langsung disembunyikan dari pemilik proyek',
        ],
        correctIndex: 0,
        explanation:
          'Integrasi GitHub + Vercel mengotomatiskan proses build dan deployment setiap ada pembaruan kode.',
      },
      {
        id: 'q-dep-3',
        question:
          'Urutan alur kerja yang tepat dari ide hingga aplikasi dapat diakses publik melalui URL adalah...',
        options: [
          'Vercel → GitHub → Google AI Studio',
          'Google AI Studio (Prototipe) → GitHub (Simpan & Versi Kode) → Vercel (Deploy Online)',
          'GitHub → Printer → Google AI Studio',
          'Browser → Kabel LAN → Commit',
        ],
        correctIndex: 1,
        explanation:
          'Aplikasi dirancang di Google AI Studio, dikelola versinya di GitHub, lalu diterbitkan secara daring melalui Vercel.',
      },
    ],
  },
];

export const INITIAL_PROGRESS_LOGS: ProgressEntry[] = [
  {
    id: 'prg-1',
    materialId: 'mat-social-impact',
    date: '2026-10-16',
    weekLabel: 'Pekan 1 · Okt',
    score: 68,
    confidence: 'Mulai Mengerti',
    note: 'Sudah paham contoh dampak positif, masih perlu membedakan echo chamber dan filter bubble.',
    quizScore: 67,
  },
  {
    id: 'prg-2',
    materialId: 'mat-social-impact',
    date: '2026-11-06',
    weekLabel: 'Pekan 1 · Nov',
    score: 88,
    confidence: 'Menguasai',
    note: 'Selesai menulis esai refleksi Informatika dan memahami prinsip Saring Sebelum Sharing.',
    quizScore: 100,
  },
  {
    id: 'prg-3',
    materialId: 'mat-ipo',
    date: '2026-10-26',
    weekLabel: 'Pekan 3 · Okt',
    score: 55,
    confidence: 'Mulai Mengerti',
    note: 'Masih sering tertukar antara peran RAM dan SSD dalam siklus Computer Sistem.',
  },
  {
    id: 'prg-4',
    materialId: 'mat-ipo',
    date: '2026-11-16',
    weekLabel: 'Pekan 2 · Nov',
    score: 82,
    confidence: 'Paham',
    note: 'Sudah lancar memetakan Input, ALU/CU di CPU, Output, dan Storage lewat simulasi scanner QR.',
    quizScore: 100,
  },
  {
    id: 'prg-5',
    materialId: 'mat-privacy',
    date: '2026-11-10',
    weekLabel: 'Pekan 1 · Nov',
    score: 74,
    confidence: 'Paham',
    note: 'Sudah mengaktifkan 2FA di akun belajar dan memahami beda jejak digital aktif vs pasif.',
    quizScore: 67,
  },
  {
    id: 'prg-6',
    materialId: 'mat-citizenship',
    date: '2026-11-12',
    weekLabel: 'Pekan 2 · Nov',
    score: 80,
    confidence: 'Paham',
    note: 'Hafal protokol STOP-SAVE-BLOCK-TELL dan contoh sikap upstander di grup kelas.',
    quizScore: 100,
  },
  {
    id: 'prg-7',
    materialId: 'mat-vibe-coding',
    date: '2026-11-18',
    weekLabel: 'Pekan 3 · Nov',
    score: 64,
    confidence: 'Mulai Mengerti',
    note: 'Baru berlatih menyusun prompt Konteks-Fitur-Batasan; perlu latihan membaca ulang struktur kode.',
  },
  {
    id: 'prg-8',
    materialId: 'mat-deploy',
    date: '2026-11-20',
    weekLabel: 'Pekan 3 · Nov',
    score: 58,
    confidence: 'Mulai Mengerti',
    note: 'Sudah coba Google AI Studio dan buat akun GitHub; minggu ini praktik hubungkan ke Vercel.',
  },
];
