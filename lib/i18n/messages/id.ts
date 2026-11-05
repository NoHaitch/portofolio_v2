import type { Messages } from '@/lib/i18n/types'

const id = {
  metadataDescription:
    'Portofolio Francisco Trianto, software engineer yang berfokus pada keamanan, rekayasa sistem, AI, dan pengembangan produk.',
  navigation: {
    label: 'Navigasi utama',
    work: 'Karya',
    home: 'Beranda',
    education: 'Pendidikan',
    experience: 'Pengalaman',
    about: 'Tentang',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    contact: 'Kontak',
  },
  languageLabel: 'Pilih bahasa',
  switchToLight: 'Beralih ke mode terang',
  switchToDark: 'Beralih ke mode gelap',
  footer: {
    copyright: '© 2026 Francisco Trianto',
    tagline: 'Software engineer di Indonesia dengan fokus pada security, systems, dan AI.',
    quickLinks: 'Navigasi cepat',
    connect: 'Terhubung',
    backToTop: 'Kembali ke atas',
    aboutSite: 'Tentang situs ini',
  },
  about: {
    eyebrow: 'Tentang saya',
    title: 'Membangun software yang aman dan andal.',
    introduction:
      'Saya Francisco, lulusan Teknik Informatika ITB. Saya senang membangun software yang aman, mudah dipahami, dan andal.',
    story: [
      'Saya menyelesaikan studi Teknik Informatika di Institut Teknologi Bandung pada 2026 dengan predikat cum laude. Selama kuliah, minat saya tumbuh pada security, systems, dan AI, terutama di persinggungan ketiganya.',
      'Saya menyukai cara berpikir yang rapi, terstruktur, dan logis. Saya senang mengurai masalah hingga inti persoalannya jelas, tetapi juga mengandalkan intuisi saat tepat, terutama dalam hal kreatif seperti musik.',
    ],
    shibuyaPhotoAlt: 'Francisco Trianto bersandar pada patung Hachiko di Shibuya, Tokyo',
    nameHeading: 'Nama dan panggilan',
    names: [
      {
        name: 'Francisco',
        note: 'Nama depan sekaligus nama yang saya gunakan secara profesional.',
      },
      { name: 'Ciko', note: 'Nama pendek saya.' },
      {
        name: 'NoHaitch',
        note: 'NoHaitch adalah handle saya, permainan kata dari kebiasaan orang menulis Ciko sebagai “Chiko” dengan H.',
      },
    ],
    hobbiesHeading: 'Di luar pekerjaan',
    hobbies: [
      {
        title: 'Musik',
        description:
          'Jazz adalah musik favorit saya. Saya bermain piano dan senang menghadiri festival jazz.',
      },
      {
        title: 'Jalan-jalan',
        description:
          'Saya senang menjelajahi tempat baru. Sejauh ini, saya sudah mengunjungi Singapura, Jepang, Hong Kong, Malaysia, dan Bali.',
      },
      {
        title: 'Olahraga',
        description: 'Saya senang bermain sepak bola dan bola voli.',
      },
      { title: 'Game', description: 'Saya juga suka bermain game.' },
    ],
    singaporePhotoAlt: 'Francisco Trianto di tepi pantai dengan latar cakrawala gedung Singapura',
    interestsHeading: 'Minat saya',
    interests: [
      'Cybersecurity',
      'AI and Data Science',
      'System Software Engineering',
      'Web Development',
      'Distributed Systems',
      'DevOps',
      'Secure and Scalable System Design',
    ],
    contactHeading: 'Mari berbincang',
    contactDescription: 'Ada topik menarik untuk dibahas? Silakan hubungi saya.',
    contactLink: 'Hubungi saya',
  },
  aboutSite: {
    eyebrow: 'Tentang situs ini',
    title: 'Portofolio untuk dibaca, bukan sekadar dilihat.',
    introduction:
      'Situs ini merangkum karya, pengalaman, dan pendidikan saya dalam satu tempat. Saya merancangnya agar cepat, mudah diakses, dan tersedia dalam empat bahasa.',
    purposeHeading: 'Tujuan situs ini',
    purposeItems: [
      'Memperkenalkan diri dan kemampuan saya, dari software engineering hingga AI dan cybersecurity.',
      'Mendokumentasikan proyek, pengalaman, dan pendidikan secara terstruktur.',
      'Memudahkan recruiter, kolaborator, dan rekan kerja menghubungi saya.',
    ],
    workflowHeading: 'Cara situs ini dibuat',
    workflowIntroduction:
      'Saya mengembangkan situs ini dengan bantuan AI coding agent. Keputusan penting tetap saya pegang, dan saya meninjau langsung detail yang kerap terlewat oleh agen.',
    workflowSteps: [
      {
        title: 'Menyiapkan fondasi proyek',
        description:
          'Saya menyiapkan fondasi proyek sendiri dengan Next.js, Bun, Tailwind CSS, shadcn/ui, Prettier, dan ESLint. Pilihan ini menjadi dasar pengembangan berikutnya.',
      },
      {
        title: 'Menyiapkan coding agent',
        description:
          'Saya menambahkan agent skills, file konteks tentang diri saya, serta panduan proyek untuk stack, model konten, pengujian, dan gaya penulisan.',
      },
      {
        title: 'Menentukan arah desain',
        description:
          'Sebelum mulai membangun, saya menentukan halaman, tone, bahasa, dan nuansa situs.',
      },
      {
        title: 'Membangun bertahap dengan AI',
        description:
          'Coding agent membantu membangun sebagian besar halaman, komponen, dan terjemahan secara bertahap, dengan berpegang pada konteks dan panduan proyek.',
      },
      {
        title: 'Menguji dan meninjau',
        description:
          'Saya memeriksa setiap perubahan lewat build, type check, dan pengujian di browser, lalu meninjaunya sebelum melanjutkan.',
      },
      {
        title: 'Merapikan dan mendokumentasikan',
        description:
          'Saya membenahi detail yang luput, seperti aksesibilitas, jarak, pilihan kata, dan interaksi. Saya juga mendokumentasikan pola yang digunakan agar perubahan berikutnya tetap konsisten.',
      },
    ],
    stackHeading: 'Teknologi dan tools',
    stack: [
      { label: 'Framework', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'Styling dan UI', items: ['Tailwind CSS', 'shadcn/ui', 'Base UI', 'Lucide'] },
      { label: 'Tools', items: ['Bun', 'Prettier', 'ESLint'] },
    ],
    sourceHeading: 'Kode sumber',
    sourceDescription: 'Seluruh kode situs ini open source. Silakan lihat repositorinya.',
    sourceLink: 'Lihat di GitHub',
  },
  home: {
    eyebrow: 'Informatika · Indonesia',
    roles: ['Systems Engineering', 'AI & Data Science', 'Cybersecurity', 'Software Engineer'],
    introduction:
      'Lulusan Teknik Informatika ITB yang membangun software praktis dengan perhatian pada keamanan, keandalan sistem, dan pemanfaatan data.',
    portraitAlt: 'Potret Francisco Trianto dengan blazer biru tua',
    work: 'Lihat karya',
    contact: 'Hubungi saya',
    scrollHint: 'Jelajahi lebih lanjut',
    philosophyQuote:
      'Jack of all trades, master of none, but oftentimes better than master of one.',
    expertiseLabel: 'Bidang keahlian',
    recentProjectsHeading: 'Proyek terbaru',
    recentActivitiesHeading: 'Aktivitas terbaru',
    viewAllProjects: 'Lihat semua proyek',
    viewAllActivities: 'Lihat semua aktivitas',
    expertiseAreas: [
      {
        title: 'Software Engineering',
        description:
          'Saya bisa membangun software dari awal hingga siap digunakan atau mengembangkan sistem yang sudah berjalan. Saya terbiasa dengan Agile maupun Waterfall, serta memakai AI-assisted coding untuk mempercepat feedback.',
      },
      {
        title: 'Cybersecurity',
        description:
          'Saya memahami berbagai ancaman keamanan, dari kerentanan klasik hingga isu baru seperti prompt injection. AI kini dapat digunakan untuk melancarkan serangan maupun memperkuat pertahanan.',
      },
      {
        title: 'Systems Engineering',
        description:
          'Saya memahami sistem secara menyeluruh dan dapat menimbang trade-off tiap desain, dari monolith sederhana hingga microservices berlapis, lalu memilih pendekatan yang sesuai kebutuhan.',
      },
      {
        title: 'Embedded Systems',
        description:
          'Saya tertarik pada perkembangan embedded systems, terutama Edge AI di perangkat keras dan peluang hadirnya robot dengan kemampuan yang semakin maju.',
      },
      {
        title: 'Operations & DevOps',
        description:
          'Operasional yang solid menjadi fondasi layanan andal, dari pipeline hingga otomatisasi. Saya menjaga monitoring dan observability untuk data, sistem, dan AI, termasuk pipeline model.',
      },
      {
        title: 'Agentic coding',
        description:
          'Coding agent dapat menangani tugas rutin dengan lebih cepat. Saya menggunakannya lewat terminal maupun IDE, serta mengikuti perkembangan model, skills, dan context.',
      },
      {
        title: 'AI & Data Science',
        description:
          'AI dan data membantu membuat keputusan bisnis lebih terarah. Saya menggunakan prediksi dan analisis berbasis data untuk mengidentifikasi faktor yang mendukung keberhasilan sebuah rencana.',
      },
      {
        title: 'Machine Learning',
        description:
          'Saya pernah mengembangkan model AI, dari machine learning klasik hingga deep learning untuk NLP dan computer vision. Saya mengikuti perkembangan RAG dan MCP, serta merancang evaluasi untuk membandingkan model.',
      },
      {
        title: 'Computer Science & Research',
        description:
          'Saya antusias mengikuti terobosan di berbagai bidang komputasi, dari AI dan machine learning hingga bidang lain. Saya juga senang memikirkan ide yang berpotensi membentuk masa depan.',
      },
    ],
  },
  work: {
    eyebrow: 'Karya pilihan dan aktivitas lain',
    title: 'Proyek dan aktivitas',
    introduction:
      'Jelajahi proyek yang pernah saya bangun, serta kompetisi, webinar, dan acara yang memberi saya banyak pelajaran.',
    featuredHeading: 'Proyek unggulan',
    featuredIntroduction: 'Pilihan proyek yang paling saya banggakan.',
    viewAllProjects: 'Lihat semua proyek',
    recentHeading: 'Aktivitas terbaru',
    recentIntroduction: 'Kompetisi, webinar, lokakarya, dan acara terbaru yang saya ikuti.',
    viewAllActivities: 'Jelajahi aktivitas',
    projectsPage: {
      eyebrow: 'Proyek',
      title: 'Semua proyek',
      introduction:
        'Berikut beberapa proyek yang boleh saya bagikan secara publik, mulai dari tugas kuliah hingga pekerjaan freelance dan eksperimen pribadi. Sebagian pekerjaan tidak dapat ditampilkan karena terikat NDA.',
      searchLabel: 'Cari proyek',
      searchPlaceholder: 'Cari nama, tag, atau kata kunci',
      backLabel: 'Kembali ke semua proyek',
    },
    activitiesPage: {
      eyebrow: 'Aktivitas pilihan',
      title: 'Beberapa aktivitas terbaru',
      introduction:
        'Pilihan aktivitas terbaru saya di luar pengembangan software, mulai dari kepanitiaan dan olahraga hingga acara serta pencapaian. Ini bukan daftar lengkap. Cari berdasarkan nama, topik, atau kategori.',
      searchLabel: 'Cari aktivitas',
      searchPlaceholder: 'Cari nama, tag, atau kata kunci',
      backLabel: 'Kembali ke aktivitas',
    },
    allCategories: 'Semua',
    categoryFilterLabel: 'Filter kategori',
    applicationTypesLabel: 'Jenis aplikasi',
    fieldsLabel: 'Bidang',
    applyFiltersButton: 'Terapkan filter',
    searchButton: 'Cari',
    resultCount: 'Menampilkan {start}–{end} dari {total}',
    noResults: 'Belum ada hasil yang cocok dengan pencarian.',
    noProjectsFound:
      'Belum ada proyek yang cocok dengan filter pilihan. Coba ubah atau hapus filternya.',
    clearFilters: 'Reset filter',
    paginationLabel: 'Navigasi halaman',
    previousPage: 'Sebelumnya',
    nextPage: 'Berikutnya',
    pageNumberLabel: 'Halaman {page}',
    viewDetails: 'Lihat detail',
    linksHeading: 'Tautan',
    teamLabel: 'Tim',
    categories: {
      academic: 'Akademik',
      personal: 'Pribadi',
      organization: 'Organisasi',
      freelance: 'Freelance',
      committee: 'Kepanitiaan',
      sports: 'Olahraga',
      event: 'Acara',
      milestone: 'Pencapaian',
    },
  },
  education: {
    eyebrow: 'Latar belakang',
    title: 'Pendidikan',
    introduction:
      'Latar pendidikan yang membentuk minat saya pada software, systems, dan security.',
    universityDegree: 'Sarjana Teknik Informatika / Ilmu Komputer',
    universityPeriod: 'Jul 2022 – Agu 2026',
    universityGrade: 'IPK 3,57/4,00 · Cum laude',
    universityDetailsLabel: 'Pencapaian akademik',
    universityDetails: [
      'Lulus dengan predikat cum laude setelah menuntaskan 151 SKS, melampaui syarat kelulusan 144 SKS.',
      'Menuntaskan peminatan di bidang Cybersecurity dan System Software Engineering.',
      'Mata kuliah pilihan: Artificial Intelligence, Deep Learning, Cybersecurity, System Software Engineering, Distributed Systems, serta Data Structures & Algorithms.',
    ],
    universityActivitiesLabel: 'Aktivitas dan organisasi',
    universityActivities: [
      'Himpunan Mahasiswa Informatika (HMIF) ITB',
      'Asisten Laboratorium Computational Science & Engineering',
      'Asisten mata kuliah',
      'Pelatih Character Development Training (CDT)',
      'Unit Bola Voli (UBV) ITB',
    ],
    skillsLabel: 'Keahlian terpilih',
    universitySkills: [
      'Machine Learning',
      'Computer Science',
      'Cybersecurity',
      'Systems Engineering',
      'Distributed Systems',
      'Deep Learning',
    ],
    highSchoolDegree: 'Ijazah SMA · Ilmu Pengetahuan Alam (STEM)',
    highSchoolPeriod: 'Jul 2019 – Jul 2022',
    highSchoolActivitiesLabel: 'Aktivitas dan organisasi',
    highSchoolActivities: [
      'Five Cyber Community (FCC)',
      'Dua kali peserta OSK Matematika tingkat Kota Bandung',
    ],
    highSchoolHonorsLabel: 'Prestasi akademik',
    highSchoolHonors: [
      'Siswa berprestasi: peringkat pertama di kelas dan masuk tiga besar di tingkat sekolah.',
    ],
    certificate: 'Lihat ijazah',
    certificateLabel: 'Lihat ijazah resmi',
    photoAlt: 'Francisco Trianto saat wisuda',
  },
  experience: {
    eyebrow: 'Pengalaman profesional',
    title: 'Pengalaman profesional',
    introduction:
      'Pengalaman pilihan di bidang software engineering, AI & Data Science, pengajaran, dan kepemimpinan di kampus maupun komunitas.',
    tabsLabel: 'Bidang pengalaman',
    parallelNote: 'Pilih bidang untuk melihat pengalaman terkait.',
    sortOldestFirst: 'Urutkan dari yang paling lama',
    sortNewestFirst: 'Urutkan dari yang terbaru',
    certificateLinkLabel: 'Lihat sertifikat',
    branches: {
      engineering: 'Software Engineering',
      academic: 'Pengajaran & akademik',
      leadership: 'Kampus & komunitas',
      aiData: 'AI & Data Science',
    },
    entries: [
      {
        id: 'gci-world-training',
        branch: 'aiData',
        title: 'AI & Data Science Trainee',
        organization: 'GCI World, Matsuo Lab, The University of Tokyo',
        period: 'Apr - Agu 2026',
        startDate: '2026-04',
        arrangement: 'Pelatihan profesional',
        summary:
          'Menyelesaikan 14 sesi mingguan tentang dasar Python dan konsep inti Machine Learning untuk Data Science. Menerapkan materi lewat kompetisi Data Science dan proyek akhir berupa proposal bisnis berbasis data berdasarkan skenario dan dataset yang disediakan.',
        proofUrl:
          '/certificates/GCI%20World%20April%20MatsuoLab%20TokyoU%20-%20Raden%20Francisco%20Trianto%20Bratadiningrat.pdf',
      },
      {
        id: 'data-annotation',
        branch: 'aiData',
        title: 'AI Annotation',
        organization: 'Platform data annotation',
        period: 'Sep 2026',
        startDate: '2026-09',
        arrangement: 'Freelance',
        summary:
          'Menganotasi prompt dan output model AI, membandingkan serta mengevaluasi dua model, dan menyusun prompt beserta rubrik evaluasi. Saya juga menggunakan Harbor dan OpenCode untuk menjalankan coding agent dan memberinya tugas dalam codebase berukuran menengah.',
      },
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: 'Apr 2025 - Mar 2026',
        startDate: '2025-04',
        arrangement: 'Remote',
        summary:
          'Membangun sistem antrean terdistribusi yang terdiri atas lima komponen, dengan pembaruan real-time antara aplikasi loket dan layar informasi.',
      },
      {
        id: 'akhdani',
        branch: 'engineering',
        title: 'Software Engineer Intern',
        organization: 'PT Akhdani Reka Solusi',
        period: 'Jun 2025 - Sep 2025',
        startDate: '2025-06',
        arrangement: 'Onsite',
        summary:
          'Membuat prototipe kios check-in hotel multibahasa dengan menghubungkan aplikasi desktop .NET ke aplikasi Laravel dan Vue.js, termasuk simulasi perangkat pembayaran dan kartu kunci kamar.',
      },
      {
        id: 'hmif-election',
        branch: 'engineering',
        title: 'Frontend Developer',
        organization: 'Pemilu HMIF 2025',
        period: 'Okt 2024 - Feb 2025',
        startDate: '2024-10',
        arrangement: 'Onsite',
        summary:
          'Membangun platform pemilu responsif untuk lebih dari 700 mahasiswa pemilih dan membantu tiga developer junior menerapkan pola UI serta praktik code review.',
      },
      {
        id: 'hima-ilkom-election',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'Pemilu HIMA ILKOM 2021',
        period: 'Okt 2021 - Des 2021',
        startDate: '2021-10',
        arrangement: 'Remote',
        summary:
          'Bersama tim, membangun platform pemungutan suara digital yang memproses lebih dari 1.000 suara tervalidasi dan menjaga uptime 100% selama pemilihan tiga hari.',
      },
      {
        id: 'cse-lab',
        branch: 'academic',
        title: 'Computational Science and Engineering Laboratory Assistant',
        organization: 'STEI ITB',
        period: 'Agu 2024 - Agu 2026',
        startDate: '2024-08',
        arrangement: 'Onsite',
        summary:
          'Mendukung operasional lab dan perkuliahan, serta membantu merekrut dan mengevaluasi asisten baru. Terpilih sebagai satu dari 12 asisten dari lebih dari 50 pelamar.',
      },
      {
        id: 'if2224',
        branch: 'academic',
        title: 'Course Assistant, IF2224 Formal Language and Automata Theory',
        organization: 'STEI ITB',
        period: 'Agu 2025 - Jul 2026',
        startDate: '2025-08',
        arrangement: 'Onsite',
        summary:
          'Merancang proyek akhir compiler dan interpreter dalam empat milestone, menulis panduan teknis, serta membantu mahasiswa lewat code review dan debugging.',
      },
      {
        id: 'if2211',
        branch: 'academic',
        title: 'Course Assistant, IF2211 Algorithm Strategies',
        organization: 'STEI ITB',
        period: 'Jan 2025 - Jul 2025',
        startDate: '2025-01',
        arrangement: 'Onsite',
        summary:
          'Menyusun enam proyek mata kuliah tentang strategi algoritma, lalu mengevaluasi efisiensi, kompleksitas, dan edge case implementasinya.',
      },
      {
        id: 'if1220',
        branch: 'academic',
        title: 'Coordinator / Head Assistant, IF1220 Discrete Mathematics',
        organization: 'STEI ITB',
        period: 'Agu 2024 - Jan 2025',
        startDate: '2024-08',
        arrangement: 'Onsite',
        summary:
          'Memimpin lima asisten pengajar serta menyusun bank soal dan pembahasan ujian untuk 172 mahasiswa dalam tiga kelas.',
      },
      {
        id: 'character-trainer',
        branch: 'academic',
        title: 'Character Development Trainer',
        organization: 'Institut Teknologi Bandung',
        period: 'Jul 2023 - Mar 2024',
        startDate: '2023-07',
        arrangement: 'Onsite',
        summary:
          'Memfasilitasi lokakarya pengembangan karakter dan sesi refleksi bagi 50 mahasiswa baru selama empat hari.',
      },
      {
        id: 'hmif-academic',
        branch: 'leadership',
        title: 'Academic Division Staff',
        organization: 'HMIF ITB',
        period: 'Jul 2024 - Jun 2025',
        startDate: '2024-07',
        arrangement: 'Onsite',
        summary:
          'Menata arsip mata kuliah serta menyusun panduan persiapan ujian dan lembar belajar modular bagi komunitas mahasiswa dengan lebih dari 700 anggota.',
      },
      {
        id: 'arka-vidia',
        branch: 'leadership',
        title: 'Content Strategist',
        organization: 'ARKA VIDIA 9.0',
        period: 'Nov 2024 - Mei 2025',
        startDate: '2024-11',
        arrangement: 'Onsite',
        summary:
          'Merancang kampanye promosi dan liputan langsung untuk acara teknologi nasional, berkoordinasi dengan tim desain dan marketing.',
      },
      {
        id: 'sparta-hmif',
        branch: 'leadership',
        title: 'Materials & Methods Staff, SPARTA',
        organization: 'HMIF ITB',
        period: 'Jun 2024 - Sep 2024',
        startDate: '2024-06',
        arrangement: 'Onsite',
        summary:
          'Merancang kegiatan orientasi dan lokakarya bagi lebih dari 300 calon anggota, termasuk proses seleksi yang terstruktur.',
      },
      {
        id: 'wisokto',
        branch: 'leadership',
        title: 'Human Resources Staff, Wisokto',
        organization: 'HMIF ITB',
        period: 'Sep 2023 - Nov 2023',
        startDate: '2023-09',
        arrangement: 'Hybrid',
        summary:
          'Mengoordinasikan tim beranggotakan delapan orang untuk acara wisuda dan mengelola data 183 anggota panitia.',
      },
      {
        id: 'pab-ubv',
        branch: 'leadership',
        title: 'Materials & Methods Staff, PAB',
        organization: 'UBV ITB',
        period: 'Agu 2023 - Mei 2024',
        startDate: '2023-08',
        arrangement: 'Onsite',
        summary:
          'Menyusun kegiatan pengembangan karakter dan orientasi bagi lebih dari 100 anggota baru klub bola voli.',
      },
      {
        id: 'regeneration-ubv',
        branch: 'leadership',
        title: 'Regeneration Division Staff',
        organization: 'UBV ITB',
        period: 'Mei 2023 - Mei 2024',
        startDate: '2023-05',
        arrangement: 'Onsite',
        summary:
          'Mendukung regenerasi kepemimpinan melalui seleksi dan wawancara kandidat, serta mengamati proses penerimaan anggota tahunan.',
      },
      {
        id: 'tpb-cup',
        branch: 'leadership',
        title: 'Security Division Staff',
        organization: 'TPB CUP V Oli UBV ITB 2023',
        period: 'Jan 2023 - Mar 2023',
        startDate: '2023-01',
        arrangement: 'Onsite',
        summary:
          'Mengelola keamanan acara, arus penonton, dan akses terbatas selama turnamen bola voli antar-fakultas.',
      },
      {
        id: 'gathering-stei',
        branch: 'leadership',
        title: 'Documentation Staff, Gathering STEI 2.0',
        organization: 'STEI ITB',
        period: 'Agu 2022 - Sep 2022',
        startDate: '2022-08',
        arrangement: 'Onsite',
        summary:
          'Mendokumentasikan sesi orientasi dan upacara, menata arsip media bersama, serta membuat video rangkuman.',
      },
      {
        id: 'fcc-programming',
        branch: 'leadership',
        title: 'Head of Programming',
        organization: 'FCC SMAN 5 Bandung',
        period: 'Agu 2019 - Jun 2022',
        startDate: '2019-08',
        arrangement: 'Onsite',
        summary:
          'Memimpin kurikulum programming selama dua tahun, melatih lebih dari 20 siswa, dan membuat proyek praktik untuk persiapan seleksi anggota klub.',
      },
    ],
  },
  contact: {
    eyebrow: 'Kontak',
    title: 'Mari berbincang.',
    introduction:
      'Hubungi saya untuk berdiskusi tentang software engineering, security, data, atau proyek menarik.',
    professional: 'Profesional',
    community: 'Tulisan dan komunitas',
  },
} satisfies Messages

export default id
