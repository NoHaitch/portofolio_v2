import type { Messages } from '@/lib/i18n/types'

const id = {
  metadataDescription:
    'Portofolio Francisco Trianto, software engineer yang berfokus pada keamanan, sistem, AI, dan pengembangan produk yang praktis.',
  navigation: {
    label: 'Navigasi utama',
    home: 'Beranda',
    education: 'Pendidikan',
    experience: 'Karier',
    contact: 'Kontak',
  },
  languageLabel: 'Pilih bahasa',
  switchToLight: 'Beralih ke mode terang',
  switchToDark: 'Beralih ke mode gelap',
  footer: {
    copyright: '© 2026 Francisco Trianto',
  },
  home: {
    eyebrow: 'Software engineer · Indonesia',
    roles: ['Rekayasa sistem', 'AI & ilmu data', 'Keamanan siber'],
    introduction:
      'Lulusan Informatika ITB yang membangun perangkat lunak praktis dengan perhatian pada keamanan, sistem yang andal, dan data yang bermanfaat.',
    portraitAlt: 'Francisco Trianto saat wisuda',
    projects: 'Lihat proyek',
    contact: 'Hubungi saya',
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
    certificateLabel: 'Lihat ijazah resmi (terbuka di tab baru)',
  },
  experience: {
    eyebrow: 'Riwayat karier',
    title: 'Pengalaman kerja',
    introduction:
      'Linimasa kronologis pengalaman saya di bidang rekayasa perangkat lunak, pengajaran, dan kepemimpinan kampus.',
    tabsLabel: 'Bidang pengalaman',
    parallelNote:
      'Peran diurutkan dari yang paling awal. Pilih jalur untuk fokus pada satu bidang.',
    branches: {
      engineering: 'Rekayasa perangkat lunak',
      academic: 'Pengajaran & akademik',
      leadership: 'Kampus & komunitas',
    },
    entries: [
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'Pengembang Full-Stack (Freelance)',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: 'Apr 2025 - Mar 2026',
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
