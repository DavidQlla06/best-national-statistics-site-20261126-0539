// DataNusa — data statistik Indonesia.
// Semua angka berasal dari publikasi Badan Pusat Statistik (BPS) yang
// dirilis sebelum 26 November 2026. Setiap seri mencantumkan sumber dan
// periode rujukannya; halaman Metodologi memuat daftar rilis lengkapnya.
// Angka dibulatkan untuk tampilan; nilai aslinya tetap seperti di rilis.

export const META = {
  siteName: 'DataNusa',
  tagline: 'Statistik Indonesia, terbuka untuk semua.',
  updated: '26 November 2026',
  country: 'Indonesia',
  sourceNote: 'Sumber data: Badan Pusat Statistik (BPS). Situs ini independen dan tidak berafiliasi dengan BPS.',
};

// Indikator utama di beranda: nilai, konteks, dan sumbernya.
export const HEADLINE = [
  {
    id: 'penduduk', label: 'Jumlah penduduk', value: '284,44 jt',
    context: 'Pertengahan 2025 · tumbuh 1,09% per tahun',
    source: 'BPS, proyeksi pertengahan tahun 2025',
    route: '#/penduduk',
  },
  {
    id: 'pdb', label: 'PDB (harga berlaku)', value: 'Rp23.821 T',
    context: 'Tahun 2025 · tumbuh 5,11% (c-to-c)',
    source: 'BPS, Pendapatan Nasional 2021–2025',
    route: '#/ekonomi',
  },
  {
    id: 'inflasi', label: 'Inflasi (y-on-y)', value: '2,86%',
    context: 'Oktober 2025 · IHK 109,04 · inti 2,36%',
    source: 'BPS, Berita Resmi Statistik, 3 Nov 2025',
    route: '#/harga',
  },
  {
    id: 'tpt', label: 'Pengangguran terbuka', value: '4,85%',
    context: 'Agustus 2025 · 7,46 juta orang menganggur',
    source: 'BPS, Keadaan Ketenagakerjaan, Nov 2025',
    route: '#/kerja',
  },
  {
    id: 'miskin', label: 'Penduduk miskin', value: '8,47%',
    context: 'Maret 2025 · 23,85 juta jiwa · garis kemiskinan Rp609.160',
    source: 'BPS, Profil Kemiskinan, 25 Jul 2025',
    route: '#/kemiskinan',
  },
  {
    id: 'ipm', label: 'Indeks Pembangunan Manusia', value: '75,02',
    context: 'Tahun 2024 · kategori tinggi · naik 0,63 poin',
    source: 'BPS, Indeks Pembangunan Manusia 2024',
    route: '#/kemiskinan',
  },
];

// Pertumbuhan PDB (persen, c-to-c) dan PDB nominal (Rp triliun).
export const GDP = {
  source: 'BPS, Berita Resmi Statistik Pertumbuhan Ekonomi, 5 Feb 2025 & 5 Feb 2026',
  years: [2021, 2022, 2023, 2024, 2025],
  growth: [3.70, 5.31, 5.05, 5.03, 5.11],
  nominal: [16977, 18587, 20168, 22139, 23821],
  perCapitaJt: [62.2, 71.0, 75.0, 78.6, 83.7],
  quarterly2025: [
    { q: 'Triwulan I', value: 4.87 },
    { q: 'Triwulan II', value: 5.12 },
    { q: 'Triwulan III', value: 5.04 },
    { q: 'Triwulan IV', value: 5.39 },
  ],
};

// Pangsa PDB 2024 menurut lapangan usaha (persen, harga berlaku).
export const SECTORS = {
  source: 'BPS, BRS No. 17/02/Th. XXVIII, 5 Februari 2025',
  note: 'Empat lapangan usaha terbesar; sisanya 46,19% tersebar di 13 lapangan usaha lain.',
  rows: [
    { name: 'Industri pengolahan', share: 18.98, growth: 4.43 },
    { name: 'Perdagangan besar dan eceran', share: 13.07, growth: 4.86 },
    { name: 'Pertanian, kehutanan, dan perikanan', share: 12.61, growth: 0.67 },
    { name: 'Pertambangan dan penggalian', share: 9.15, growth: null },
    { name: 'Lapangan usaha lainnya (13 sektor)', share: 46.19, growth: null },
  ],
  fastest2024: [
    { name: 'Jasa lainnya', growth: 9.80 },
    { name: 'Transportasi dan pergudangan', growth: 8.69 },
    { name: 'Penyediaan akomodasi dan makan minum', growth: 8.56 },
  ],
};

// Perdagangan barang 2024 (miliar dolar AS).
export const TRADE = {
  source: 'BPS, Perkembangan Ekspor dan Impor, Januari 2025',
  year: 2024,
  exports: 264.70,
  imports: 233.66,
  surplus: 31.04,
  exports2023: 258.82,
};

// Inflasi tahunan (persen, kalender) dan bulanan y-on-y (persen).
export const INFLATION = {
  source: 'BPS, Berita Resmi Statistik Inflasi; Bank Indonesia, Analisis Inflasi Oktober 2025',
  annual: [
    { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
  monthly: [
    { m: 'Jan 24', value: 2.57 }, { m: 'Feb 24', value: 2.75 },
    { m: 'Mar 24', value: 3.05 }, { m: 'Apr 24', value: 3.00 },
    { m: 'Mei 24', value: 2.84 }, { m: 'Jun 24', value: 2.51 },
    { m: 'Jul 24', value: 2.13 }, { m: 'Agu 24', value: 2.12 },
    { m: 'Sep 24', value: 1.84 }, { m: 'Okt 24', value: 1.71 },
    { m: 'Nov 24', value: 1.55 }, { m: 'Des 24', value: 1.57 },
    { m: 'Jan 25', value: 0.76 }, { m: 'Feb 25', value: -0.09 },
    { m: 'Mar 25', value: 1.03 }, { m: 'Apr 25', value: 1.95 },
    { m: 'Mei 25', value: 1.60 }, { m: 'Jun 25', value: 1.87 },
    { m: 'Jul 25', value: 2.37 }, { m: 'Agu 25', value: 2.31 },
    { m: 'Sep 25', value: 2.65 }, { m: 'Okt 25', value: 2.86 },
  ],
  groupsOct2025: [
    { name: 'Makanan, minuman, dan tembakau', value: 4.99, note: 'Andil 1,43 poin terhadap inflasi tahunan' },
    { name: 'Inflasi inti', value: 2.36, note: 'Naik dari 2,19% pada September 2025' },
    { name: 'Harga bergejolak (volatile food)', value: 6.59, note: 'Naik dari 6,44% pada September 2025' },
    { name: 'Harga diatur pemerintah', value: 1.45, note: 'Naik dari 1,10% pada September 2025' },
  ],
};

// Penduduk: hasil sensus dan survei BPS (juta jiwa).
export const POPULATION = {
  source: 'BPS, Sensus Penduduk 2010 & 2020; SUPAS 2015 & 2025',
  census: [
    { year: 2010, value: 237.64, label: 'SP2010' },
    { year: 2015, value: 255.18, label: 'SUPAS 2015' },
    { year: 2020, value: 270.20, label: 'SP2020' },
    { year: 2025, value: 284.67, label: 'SUPAS 2025' },
  ],
  midYear2025: 284.44,
  growthPerYear: 1.09,
  javaShare2025: 55.65,
  age2025: [
    { group: 'Generasi Z (lahir 1997–2012)', share: 24.93 },
    { group: 'Milenial (lahir 1981–1996)', share: 24.34 },
    { group: 'Generasi lain (X, Boomer, Alpha)', share: 50.73 },
  ],
  ageNote: 'Pangsa Generasi Z dan Milenial dari SUPAS 2025 (BPS, 5 Mei 2026); sisanya 50,73% adalah gabungan generasi lainnya. Usia produktif (15–64 tahun) 68,94%; penduduk lansia (60+) 11,97%; angka fertilitas total 2,13.',
  islands: [
    { name: 'Jawa', share: 56.10, note: '55,65% pada SUPAS 2025' },
    { name: 'Sumatera', share: 21.68, note: '' },
    { name: 'Sulawesi', share: 7.36, note: '' },
    { name: 'Kalimantan', share: 6.05, note: '' },
    { name: 'Bali dan Nusa Tenggara', share: 5.54, note: '' },
    { name: 'Maluku dan Papua', share: 3.17, note: '' },
  ],
  islandsSource: 'BPS, Sensus Penduduk 2020 (pangsa penduduk per pulau)',
};

// Sepuluh provinsi berpenduduk terbanyak, 2024 (juta jiwa; BPS).
export const PROVINCES = {
  source: 'BPS, Jumlah Penduduk menurut Provinsi, 2024',
  total2024: 281.60,
  rows: [
    { name: 'Jawa Barat', pop: 50.35, density: 1359 },
    { name: 'Jawa Timur', pop: 41.92, density: 870 },
    { name: 'Jawa Tengah', pop: 37.89, density: 1104 },
    { name: 'Sumatera Utara', pop: 15.59, density: 214 },
    { name: 'Banten', pop: 12.43, density: 1329 },
    { name: 'DKI Jakarta', pop: 10.68, density: 16165 },
    { name: 'Sulawesi Selatan', pop: 9.50, density: 203 },
    { name: 'Lampung', pop: 9.40, density: 265 },
    { name: 'Sumatera Selatan', pop: 8.80, density: 96 },
    { name: 'Riau', pop: 6.70, density: 77 },
  ],
  densitySource: 'Kepadatan dihitung dari jumlah penduduk BPS 2024 dibagi luas wilayah provinsi (jiwa per km²).',
};

// Ketenagakerjaan: Tingkat Pengangguran Terbuka (TPT, persen).
export const LABOR = {
  source: 'BPS, Berita Resmi Statistik Keadaan Ketenagakerjaan Indonesia',
  feb: [
    { year: 2019, value: 5.01 }, { year: 2020, value: 4.99 },
    { year: 2021, value: 6.26 }, { year: 2022, value: 5.83 },
    { year: 2023, value: 5.45 }, { year: 2024, value: 4.82 },
    { year: 2025, value: 4.76 },
  ],
  aug: [
    { year: 2024, value: 4.91 },
    { year: 2025, value: 4.85 },
  ],
  unemployedAug2025: 7.46,
  noteSmk: 'TPT tertinggi menurut pendidikan pada Agustus 2025 adalah lulusan SMK, 8,63%.',
};

// Kemiskinan, ketimpangan, dan pembangunan manusia.
export const WELFARE = {
  source: 'BPS, Profil Kemiskinan; BPS, Indeks Pembangunan Manusia',
  poverty: [
    { period: 'Mar 2019', value: 9.41, million: 25.14 },
    { period: 'Sep 2019', value: 9.22, million: null },
    { period: 'Mar 2020', value: 9.78, million: 26.42 },
    { period: 'Sep 2020', value: 10.19, million: null },
    { period: 'Mar 2021', value: 10.14, million: 27.54 },
    { period: 'Sep 2021', value: 9.71, million: null },
    { period: 'Mar 2022', value: 9.54, million: 26.16 },
    { period: 'Sep 2022', value: 9.57, million: null },
    { period: 'Mar 2023', value: 9.36, million: 25.90 },
    { period: 'Sep 2023', value: 9.36, million: null },
    { period: 'Mar 2024', value: 9.03, million: 25.22 },
    { period: 'Sep 2024', value: 8.57, million: null },
    { period: 'Mar 2025', value: 8.47, million: 23.85 },
    { period: 'Sep 2025', value: 8.25, million: 23.36 },
  ],
  urbanRuralMar2025: { urban: 6.73, rural: 11.03 },
  povertyLineMar2025: 609160,
  gini: [
    { period: 'Mar 2021', value: 0.381 },
    { period: 'Mar 2022', value: 0.381 },
    { period: 'Mar 2023', value: 0.379 },
    { period: 'Mar 2024', value: 0.379 },
    { period: 'Mar 2025', value: 0.375 },
    { period: 'Sep 2025', value: 0.363 },
  ],
  hdi: [
    { year: 2020, value: 71.94 },
    { year: 2021, value: 72.29 },
    { year: 2022, value: 73.37 },
    { year: 2023, value: 74.39 },
    { year: 2024, value: 75.02 },
  ],
};

// Rilis terbaru yang disorot di beranda.
export const RELEASES = [
  {
    date: '3 November 2025', title: 'Inflasi Oktober 2025 sebesar 2,86% (y-on-y)',
    text: 'IHK naik menjadi 109,04. Inflasi inti 2,36%, harga bergejolak 6,59%, harga diatur pemerintah 1,45%. Inflasi tetap dalam sasaran 2,5±1%.',
    route: '#/harga',
  },
  {
    date: '5 November 2025', title: 'Pengangguran Agustus 2025 turun ke 4,85%',
    text: 'Jumlah penganggur 7,46 juta orang, berkurang 4.092 orang dibanding Agustus 2024. Penduduk bekerja bertambah 1,90 juta orang.',
    route: '#/kerja',
  },
  {
    date: '25 Juli 2025', title: 'Kemiskinan Maret 2025 turun ke 8,47%',
    text: 'Penduduk miskin 23,85 juta orang, turun 0,21 juta dari September 2024. Garis kemiskinan Rp609.160 per kapita per bulan.',
    route: '#/kemiskinan',
  },
  {
    date: '5 Mei 2026', title: 'SUPAS 2025: penduduk 284,67 juta jiwa',
    text: 'Laju pertumbuhan melambat ke 1,08% per tahun. Generasi Z 24,93% dan Milenial 24,34% menjadi kelompok terbesar; usia produktif 68,94%.',
    route: '#/penduduk',
  },
];
