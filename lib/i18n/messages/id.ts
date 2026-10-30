import type { Messages } from '@/lib/i18n/types'

const id = {
  metadataDescription:
    'Portofolio Francisco Trianto, software engineer yang berfokus pada keamanan, sistem, AI, dan pengembangan produk yang praktis.',
  navigation: {
    label: 'Navigasi utama',
    projects: 'Proyek',
    home: 'Beranda',
    education: 'Pendidikan',
    experience: 'Pengalaman',
    about: 'Tentang',
    contact: 'Kontak',
  },
  languageLabel: 'Pilih bahasa',
  switchToLight: 'Beralih ke mode terang',
  switchToDark: 'Beralih ke mode gelap',
  footer: {
    copyright: '© 2026 Francisco Trianto',
    tagline: 'Software engineer dengan fokus pada keamanan, sistem, dan AI. Berbasis di Indonesia.',
    quickLinks: 'Tautan cepat',
    connect: 'Terhubung',
    backToTop: 'Kembali ke atas',
    aboutSite: 'Tentang situs ini',
  },
  about: {
    eyebrow: 'Tentang saya',
    title: 'Pendiam di awal, penuh rasa ingin tahu.',
    introduction:
      'Saya Francisco, lulusan baru Teknik Informatika dari Bandung, Indonesia. Saya suka membuat sesuatu yang aman, jelas, dan tahan lama.',
    story: [
      'Saya lulus dari Institut Teknologi Bandung pada 2026 dengan gelar Teknik Informatika dan predikat cum laude. Di sepanjang jalan, saya tertarik pada keamanan, sistem, dan AI, serta pada titik temu di antara ketiganya.',
      'Saya lebih suka berpikir yang rapi, terstruktur, dan logis, dan paling menikmati masalah yang bisa dipecah sampai menjadi sederhana. Saya juga nyaman mengikuti intuisi bila cocok, terutama dalam hal kreatif seperti musik.',
      'Saya seorang ambivert yang sedikit condong ke introvert. Pendiam di awal, lebih banyak bicara dengan orang yang sudah dekat.',
    ],
    shibuyaPhotoAlt: 'Francisco Trianto bersandar pada patung Hachiko di Shibuya, Tokyo',
    nameHeading: 'Cara memanggil saya',
    names: [
      { name: 'Francisco', note: 'Nama depan saya, dan yang saya pakai secara profesional.' },
      { name: 'Ciko', note: 'Nama pendek saya.' },
      {
        name: 'NoHaitch',
        note: 'Nama panggilan saya di dunia maya. Orang sering menulis Chiko dengan H, jadi saya buang H-nya.',
      },
    ],
    hobbiesHeading: 'Di luar pekerjaan',
    hobbies: [
      {
        title: 'Musik',
        description:
          'Jazz adalah favorit saya. Saya bermain piano dan suka datang ke festival jazz.',
      },
      {
        title: 'Olahraga',
        description: 'Voli adalah olahraga utama saya, dan dulu saya juga bermain sepak bola.',
      },
      { title: 'Gaming', description: 'Cara yang enak untuk melepas penat.' },
    ],
    singaporePhotoAlt: 'Francisco Trianto di tepi pantai dengan latar cakrawala gedung Singapura',
    interestsHeading: 'Hal yang saya minati',
    interests: [
      'Keamanan siber',
      'AI dan ilmu data',
      'Rekayasa perangkat lunak sistem',
      'Pengembangan web',
      'Sistem terdistribusi',
      'DevOps',
      'Desain sistem yang aman dan skalabel',
    ],
    contactHeading: 'Mari ngobrol',
    contactDescription: 'Kalau ada yang menarik bagi Anda, saya senang mendengar kabar dari Anda.',
    contactLink: 'Hubungi saya',
  },
  aboutSite: {
    eyebrow: 'Tentang situs ini',
    title: 'Portofolio yang dibuat untuk dibaca, bukan sekadar dilihat.',
    introduction:
      'Situs ini adalah rumah saya di web. Isinya karya, pengalaman, dan pendidikan saya dalam satu tempat yang cepat, mudah diakses, dan tersedia dalam empat bahasa.',
    purposeHeading: 'Untuk apa situs ini',
    purposeItems: [
      'Menunjukkan siapa saya dan apa yang bisa saya lakukan, dari rekayasa perangkat lunak hingga AI dan keamanan siber.',
      'Menyimpan catatan terstruktur tentang proyek, pengalaman, dan pendidikan saya.',
      'Memudahkan rekruter, kolaborator, dan rekan untuk menghubungi saya.',
    ],
    workflowHeading: 'Cara situs ini dibuat',
    workflowIntroduction:
      'Situs ini dibuat dengan alur agentic coding, dengan keputusan manusia pada bagian yang paling penting dan penyempurnaan manual pada hal-hal yang sering terlewat oleh agen.',
    workflowSteps: [
      {
        title: 'Penyiapan proyek secara manual',
        description:
          'Saya menyiapkan fondasinya sendiri: Next.js, Bun, Tailwind CSS, shadcn/ui, Prettier, dan ESLint, sehingga setiap perubahan berikutnya dibangun di atas pilihan yang saya buat dengan sengaja.',
      },
      {
        title: 'Menyiapkan agen',
        description:
          'Saya menambahkan skill untuk agen, berkas konteks tertulis tentang saya, dan aturan proyek yang mencakup stack, model konten, pengujian, dan gaya penulisan.',
      },
      {
        title: 'Gambaran awal',
        description:
          'Sebelum menghasilkan apa pun, saya menentukan tampilan dan isi situs: halaman, nada, bahasa, dan kesan keseluruhan.',
      },
      {
        title: 'Agentic coding dalam langkah kecil',
        description:
          'Agen membangun sebagian besar halaman, komponen, dan terjemahan lewat satu permintaan terarah pada satu waktu, berdasarkan konteks dan aturan di atas.',
      },
      {
        title: 'Verifikasi dan tinjauan',
        description:
          'Setiap perubahan diperiksa dengan build, pemeriksaan tipe, dan pengujian di browser sungguhan, lalu saya meninjau hasilnya sebelum lanjut.',
      },
      {
        title: 'Penyempurnaan dan dokumentasi',
        description:
          'Saya memperbaiki hal yang terlewat oleh agen, seperti aksesibilitas, jarak, pilihan kata, dan interaksi kecil, lalu mencatat konvensinya agar perubahan berikutnya tetap konsisten.',
      },
    ],
    stackHeading: 'Teknologi dan alat',
    stack: [
      { label: 'Framework', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'Gaya dan UI', items: ['Tailwind CSS', 'shadcn/ui', 'Base UI', 'Lucide'] },
      { label: 'Perkakas', items: ['Bun', 'Prettier', 'ESLint'] },
    ],
    sourceHeading: 'Kode sumber',
    sourceDescription: 'Seluruh situs ini bersifat open source. Silakan lihat-lihat.',
    sourceLink: 'Lihat di GitHub',
  },
  home: {
    eyebrow: 'Informatics · Indonesia',
    roles: ['Systems engineering', 'AI & Data Science', 'Cyber security', 'Software Engineer'],
    introduction:
      'Lulusan Informatika ITB yang membangun perangkat lunak praktis dengan perhatian pada keamanan, sistem yang andal, dan data yang bermanfaat.',
    portraitAlt: 'Potret Francisco Trianto dengan blazer biru tua',
    projects: 'Lihat proyek',
    contact: 'Hubungi saya',
    scrollHint: 'Gulir untuk menjelajah',
    philosophyQuote:
      'Jack of all trades, master of none, but oftentimes better than master of one.',
    expertiseLabel: 'Bidang keahlian',
    expertiseAreas: [
      {
        title: 'Rekayasa perangkat lunak',
        description:
          'Saya dapat membangun perangkat lunak secara menyeluruh atau mengembangkan sistem yang ada. Saya terbiasa dengan Agile dan Waterfall, serta memakai coding berbantuan AI untuk umpan balik lebih cepat.',
      },
      {
        title: 'Keamanan siber',
        description:
          'Saya memahami lanskap ancaman, dari kerentanan klasik hingga yang baru seperti prompt injection. Saya juga melihat AI kini ikut mendorong serangan, bukan hanya pertahanan.',
      },
      {
        title: 'Rekayasa sistem',
        description:
          'Saya memahami sistem secara luas sehingga dapat menimbang kelebihan dan kekurangan setiap desain, dari monolit sederhana hingga microservices berlapis, lalu memilih yang tepat untuk masalahnya.',
      },
      {
        title: 'Sistem tertanam',
        description:
          'Saya tertarik pada perkembangan sistem tertanam, terutama Edge AI yang berjalan di perangkat keras dan masa depan robotika yang lebih mampu dan cerdas.',
      },
      {
        title: 'Operations & DevOps',
        description:
          'Operasi adalah inti dari layanan yang hebat, dari pipeline hingga otomatisasi. Saya menjaga monitoring dan observabilitas tetap kuat di data, sistem, dan AI, termasuk pipeline model yang baru.',
      },
      {
        title: 'Agentic coding',
        description:
          'Model agentik adalah alat andalan era ini karena tugas rutin selesai lebih cepat. Saya memakai agen berbasis terminal dan IDE, serta mengikuti model terbaru beserta skill dan konteksnya.',
      },
      {
        title: 'AI & Data Science',
        description:
          'AI telah mengubah keputusan bisnis dari tebakan kasar menjadi rencana yang matang. Saya memakai prediksi dan analisis berbasis data untuk menemukan apa yang membuat rencana berhasil.',
      },
      {
        title: 'Machine Learning',
        description:
          'Saya telah mengerjakan sisi model dari AI, dari ML klasik hingga Deep Learning di NLP dan Vision. Saya mengikuti RAG dan MCP, serta pernah merancang evaluasi untuk membandingkan model.',
      },
      {
        title: 'Ilmu komputer & riset',
        description:
          'Saya antusias dengan terobosan baru di dunia komputasi, dari AI dan ML hingga bidang lain, dan selalu memikirkan ide yang mungkin membentuk masa depan.',
      },
    ],
  },
  projects: {
    eyebrow: 'Karya pilihan & lainnya',
    title: 'Proyek dan aktivitas',
    introduction:
      'Sekilas lebih dekat pada hal-hal yang saya bangun dan komunitas tempat saya belajar.',
    projectsHeading: 'Proyek pilihan',
    activitiesHeading: 'Aktivitas & sorotan',
    activitiesIntroduction:
      'Beberapa pengalaman bermakna di luar pembuatan perangkat lunak, tanpa mengulang seluruh linimasa pekerjaan.',
    projects: [
      {
        title: 'Sistem Antrean Terdistribusi',
        category: 'Proyek profesional',
        period: 'Apr 2025 - Mar 2026',
        summary:
          'Membangun platform manajemen antrean dengan lima komponen dan pembaruan real-time antara klien loket dan layar.',
        tags: ['Sistem terdistribusi', 'Pembaruan real-time', 'Manajemen antrean'],
      },
      {
        title: 'Kios Check-in Hotel Multibahasa',
        category: 'Proyek magang',
        period: 'Jun 2025 - Sep 2025',
        summary:
          'Menghubungkan aplikasi desktop .NET dengan aplikasi Laravel dan Vue.js, sekaligus membuat prototipe interaksi perangkat pembayaran dan kartu kamar.',
        tags: ['.NET', 'Laravel', 'Vue.js', 'Integrasi perangkat'],
      },
      {
        title: 'Pemilu Mahasiswa HMIF',
        category: 'Proyek kampus',
        period: 'Okt 2024 - Feb 2025',
        summary:
          'Membangun platform pemilu responsif untuk lebih dari 700 pemilih mahasiswa dan membantu pengembang junior menerapkan pola UI serta code review.',
        tags: ['Frontend', 'Platform pemilu', '700+ pemilih'],
      },
      {
        title: 'Pemungutan Suara Digital HIMA ILKOM',
        category: 'Proyek freelance',
        period: 'Okt 2021 - Des 2021',
        summary:
          'Bersama tim membangun platform pemungutan suara digital yang memproses lebih dari 1.000 suara tervalidasi dengan uptime 100% selama pemilihan tiga hari.',
        tags: ['Full-stack', 'Pemungutan suara digital', 'Keandalan'],
      },
    ],
    activityHighlights: [
      {
        title: 'Lokakarya pengembangan karakter',
        description:
          'Memfasilitasi lokakarya dan sesi refleksi untuk 50 mahasiswa baru dalam empat hari kegiatan.',
        relatedRoute: 'experience',
      },
      {
        title: 'Komunitas kampus dan bola voli',
        description:
          'Berkontribusi di Unit Bola Voli ITB dan membantu menyusun kegiatan orientasi untuk lebih dari 100 anggota baru.',
        relatedRoute: 'experience',
      },
      {
        title: 'Kompetisi matematika SMA',
        description:
          'Dua kali mengikuti OSK Matematika tingkat Kota Bandung dan lulus sebagai siswa berprestasi.',
        relatedRoute: 'education',
      },
    ],
    viewExperience: 'Lihat pengalaman',
    viewEducation: 'Lihat pendidikan',
  },
  education: {
    eyebrow: 'Latar belakang',
    title: 'Pendidikan',
    introduction:
      'Perjalanan akademik yang membentuk minat saya pada perangkat lunak, sistem, dan keamanan.',
    universityDegree: 'Sarjana Sains bidang Informatika / Ilmu Komputer',
    universityPeriod: 'Jul 2022 – Agu 2026',
    universityGrade: 'IPK: 3,57 / 4,00 · Cum laude',
    universityDetailsLabel: 'Capaian akademik',
    universityDetails: [
      'Lulus dengan predikat cum laude setelah menyelesaikan 151 SKS, melebihi persyaratan 144 SKS.',
      'Menyelesaikan skema peminatan pilihan di bidang Keamanan Siber dan Rekayasa Perangkat Lunak Sistem.',
      'Mata kuliah pilihan: Kecerdasan Buatan, Deep Learning, Keamanan Siber, Rekayasa Perangkat Lunak Sistem, Sistem Terdistribusi, serta Struktur Data & Algoritma.',
    ],
    universityActivitiesLabel: 'Aktivitas dan organisasi',
    universityActivities: [
      'Himpunan Mahasiswa Informatika (HMIF) ITB',
      'Asisten Laboratorium Computational Science & Engineering',
      'Asisten Mata Kuliah ITB',
      'Pelatih Character Development Training (CDT)',
      'Unit Bola Voli (UBV) ITB',
    ],
    skillsLabel: 'Keahlian pilihan',
    universitySkills: [
      'Machine Learning',
      'Ilmu Komputer',
      'Keamanan Siber',
      'Rekayasa Sistem',
      'Sistem Terdistribusi',
      'Deep Learning',
    ],
    highSchoolDegree: 'Ijazah SMA · Ilmu Pengetahuan Alam (STEM)',
    highSchoolPeriod: 'Jul 2019 – Jul 2022',
    highSchoolActivitiesLabel: 'Aktivitas dan organisasi',
    highSchoolActivities: [
      'Five Cyber Community (FCC)',
      'Dua kali peserta OSK Matematika tingkat Kota Bandung',
    ],
    highSchoolHonorsLabel: 'Penghargaan akademik',
    highSchoolHonors: [
      'Siswa berprestasi; peringkat 1 di kelas dan masuk 3 besar di tingkat sekolah.',
    ],
    certificate: 'Lihat ijazah',
    certificateLabel: 'Lihat ijazah resmi',
    photoAlt: 'Francisco Trianto saat wisuda',
  },
  experience: {
    eyebrow: 'Latar belakang profesional',
    title: 'Pengalaman Profesional',
    introduction:
      'Pilihan pengalaman profesional, akademik, dan komunitas di bidang rekayasa perangkat lunak, AI dan Data Science, pengajaran, serta kepemimpinan.',
    tabsLabel: 'Bidang pengalaman',
    parallelNote: 'Pilih jalur untuk fokus pada satu bidang.',
    sortOldestFirst: 'Tampilkan yang terlama lebih dahulu',
    sortNewestFirst: 'Tampilkan yang terbaru lebih dahulu',
    certificateLinkLabel: 'Lihat sertifikat kelulusan',
    branches: {
      engineering: 'Rekayasa perangkat lunak',
      academic: 'Pengajaran & akademik',
      leadership: 'Kampus & komunitas',
      aiData: 'AI & Data Science',
    },
    entries: [
      {
        id: 'gci-world-training',
        branch: 'aiData',
        title: 'Pelatihan AI & Data Science',
        organization: 'GCI World, Matsuo Lab, Universitas Tokyo',
        period: 'Apr - Agu 2026',
        startDate: '2026-04',
        arrangement: 'Pelatihan profesional',
        summary:
          'Menyelesaikan 14 pelajaran mingguan yang mencakup dasar-dasar Python dan Machine Learning untuk Data Science. Menerapkan materi melalui kompetisi Data Science dan proyek akhir berupa proposal bisnis berbasis data berdasarkan skenario dan kumpulan data yang diberikan.',
        proofUrl:
          '/certificates/GCI%20World%20April%20MatsuoLab%20TokyoU%20-%20Raden%20Francisco%20Trianto%20Bratadiningrat.pdf',
      },
      {
        id: 'data-annotation',
        branch: 'aiData',
        title: 'Anotasi AI',
        organization: 'Platform anotasi data',
        period: 'Sep 2026',
        startDate: '2026-09',
        arrangement: 'Freelance',
        summary:
          'Menganotasi prompt dan hasil model AI, membandingkan serta mengevaluasi dua model, menyusun prompt dan rubrik evaluasi, serta menggunakan Harbor dan OpenCode untuk menjalankan dan memberi tugas kepada model agentik dalam codebase berukuran menengah.',
      },
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'Pengembang Full-Stack (Freelance)',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: 'Apr 2025 - Mar 2026',
        startDate: '2025-04',
        arrangement: 'Jarak jauh',
        summary:
          'Membangun sistem antrean terdistribusi dengan lima komponen dan pembaruan real-time antara klien loket dan layar.',
      },
      {
        id: 'akhdani',
        branch: 'engineering',
        title: 'Magang Software Engineer',
        organization: 'PT Akhdani Reka Solusi',
        period: 'Jun 2025 - Sep 2025',
        startDate: '2025-06',
        arrangement: 'Di kantor',
        summary:
          'Membuat prototipe kios check-in hotel multibahasa dengan menghubungkan aplikasi desktop .NET ke aplikasi Laravel dan Vue.js, termasuk simulasi perangkat pembayaran dan kartu kamar.',
      },
      {
        id: 'hmif-election',
        branch: 'engineering',
        title: 'Pengembang Frontend',
        organization: 'Pemilu HMIF 2025',
        period: 'Okt 2024 - Feb 2025',
        startDate: '2024-10',
        arrangement: 'Di kantor',
        summary:
          'Membangun platform pemilu responsif untuk lebih dari 700 pemilih mahasiswa dan membantu tiga pengembang junior menerapkan pola UI serta praktik code review.',
      },
      {
        id: 'hima-ilkom-election',
        branch: 'engineering',
        title: 'Pengembang Full-Stack (Freelance)',
        organization: 'Pemilu HIMA ILKOM 2021',
        period: 'Okt 2021 - Des 2021',
        startDate: '2021-10',
        arrangement: 'Jarak jauh',
        summary:
          'Mengembangkan platform pemungutan suara digital yang memproses lebih dari 1.000 suara tervalidasi dengan uptime 100% selama pemilihan tiga hari.',
      },
      {
        id: 'cse-lab',
        branch: 'academic',
        title: 'Asisten Laboratorium Computational Science and Engineering',
        organization: 'STEI ITB',
        period: 'Agu 2024 - Agu 2026',
        startDate: '2024-08',
        arrangement: 'Di kantor',
        summary:
          'Mendukung operasional lab dan pelaksanaan perkuliahan serta membantu rekrutmen dan evaluasi asisten baru. Terpilih sebagai satu dari 12 asisten dari lebih dari 50 pelamar.',
      },
      {
        id: 'if2224',
        branch: 'academic',
        title: 'Asisten IF2224 Teori Bahasa Formal dan Otomata',
        organization: 'STEI ITB',
        period: 'Agu 2025 - Jul 2026',
        startDate: '2025-08',
        arrangement: 'Di kantor',
        summary:
          'Merancang proyek akhir compiler dan interpreter dengan empat milestone, menulis panduan teknis, dan membantu mahasiswa melalui code review serta debugging.',
      },
      {
        id: 'if2211',
        branch: 'academic',
        title: 'Asisten IF2211 Strategi Algoritma',
        organization: 'STEI ITB',
        period: 'Jan 2025 - Jul 2025',
        startDate: '2025-01',
        arrangement: 'Di kantor',
        summary:
          'Menyusun enam proyek perkuliahan tentang strategi algoritma dan mengevaluasi efisiensi, kompleksitas, serta kasus tepi implementasinya.',
      },
      {
        id: 'if1220',
        branch: 'academic',
        title: 'Koordinator / Kepala Asisten IF1220 Matematika Diskrit',
        organization: 'STEI ITB',
        period: 'Agu 2024 - Jan 2025',
        startDate: '2024-08',
        arrangement: 'Di kantor',
        summary:
          'Memimpin lima asisten pengajar dan menyusun bank soal serta solusi ujian untuk 172 mahasiswa dalam tiga kelas.',
      },
      {
        id: 'character-trainer',
        branch: 'academic',
        title: 'Pelatih Pengembangan Karakter',
        organization: 'Institut Teknologi Bandung',
        period: 'Jul 2023 - Mar 2024',
        startDate: '2023-07',
        arrangement: 'Di kantor',
        summary:
          'Memfasilitasi lokakarya pengembangan karakter dan sesi refleksi untuk 50 mahasiswa baru dalam empat hari kegiatan.',
      },
      {
        id: 'hmif-academic',
        branch: 'leadership',
        title: 'Staf Divisi Akademik',
        organization: 'HMIF ITB',
        period: 'Jul 2024 - Jun 2025',
        startDate: '2024-07',
        arrangement: 'Di kantor',
        summary:
          'Menata arsip mata kuliah dan membuat panduan persiapan ujian serta lembar belajar modular untuk komunitas mahasiswa dengan lebih dari 700 anggota.',
      },
      {
        id: 'arka-vidia',
        branch: 'leadership',
        title: 'Strategis Konten',
        organization: 'ARKA VIDIA 9.0',
        period: 'Nov 2024 - Mei 2025',
        startDate: '2024-11',
        arrangement: 'Di kantor',
        summary:
          'Merancang kampanye promosi dan liputan langsung untuk acara teknologi nasional, berkoordinasi dengan tim desain dan pemasaran.',
      },
      {
        id: 'sparta-hmif',
        branch: 'leadership',
        title: 'Staf Materi & Metode, SPARTA',
        organization: 'HMIF ITB',
        period: 'Jun 2024 - Sep 2024',
        startDate: '2024-06',
        arrangement: 'Di kantor',
        summary:
          'Merancang kegiatan orientasi dan lokakarya untuk lebih dari 300 calon anggota, termasuk proses evaluasi kandidat yang terstruktur.',
      },
      {
        id: 'wisokto',
        branch: 'leadership',
        title: 'Staf Sumber Daya Manusia, Wisokto',
        organization: 'HMIF ITB',
        period: 'Sep 2023 - Nov 2023',
        startDate: '2023-09',
        arrangement: 'Hybrid',
        summary:
          'Mengoordinasikan tim beranggotakan delapan orang untuk acara wisuda dan memelihara data keanggotaan 183 panitia.',
      },
      {
        id: 'pab-ubv',
        branch: 'leadership',
        title: 'Staf Materi & Metode, PAB',
        organization: 'UBV ITB',
        period: 'Agu 2023 - Mei 2024',
        startDate: '2023-08',
        arrangement: 'Di kantor',
        summary:
          'Menyusun kegiatan pembentukan karakter dan orientasi bagi lebih dari 100 anggota baru klub bola voli.',
      },
      {
        id: 'regeneration-ubv',
        branch: 'leadership',
        title: 'Staf Divisi Regenerasi',
        organization: 'UBV ITB',
        period: 'Mei 2023 - Mei 2024',
        startDate: '2023-05',
        arrangement: 'Di kantor',
        summary:
          'Mendukung regenerasi kepemimpinan melalui seleksi dan wawancara kandidat serta mengamati proses penerimaan anggota tahunan.',
      },
      {
        id: 'tpb-cup',
        branch: 'leadership',
        title: 'Staf Divisi Keamanan',
        organization: 'TPB CUP V Oli UBV ITB 2023',
        period: 'Jan 2023 - Mar 2023',
        startDate: '2023-01',
        arrangement: 'Di kantor',
        summary:
          'Mengelola keamanan acara, alur penonton, dan akses terbatas selama turnamen bola voli antar-fakultas.',
      },
      {
        id: 'gathering-stei',
        branch: 'leadership',
        title: 'Staf Dokumentasi, Gathering STEI 2.0',
        organization: 'STEI ITB',
        period: 'Agu 2022 - Sep 2022',
        startDate: '2022-08',
        arrangement: 'Di kantor',
        summary:
          'Mendokumentasikan sesi orientasi dan upacara, menata arsip media bersama, serta membuat video rangkuman acara.',
      },
      {
        id: 'fcc-programming',
        branch: 'leadership',
        title: 'Ketua Bidang Programming',
        organization: 'FCC SMAN 5 Bandung',
        period: 'Agu 2019 - Jun 2022',
        startDate: '2019-08',
        arrangement: 'Di kantor',
        summary:
          'Memimpin kurikulum programming selama dua tahun, melatih lebih dari 20 siswa, dan membuat proyek praktik sebagai persiapan seleksi klub.',
      },
    ],
  },
  contact: {
    eyebrow: 'Kontak',
    title: 'Mari terhubung.',
    introduction:
      'Hubungi saya untuk membahas rekayasa perangkat lunak, keamanan, data, atau proyek menarik.',
    professional: 'Profesional',
    community: 'Tulisan & komunitas',
  },
} satisfies Messages

export default id
