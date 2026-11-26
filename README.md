# DataNusa — Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/DavidQlla06/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/DavidQlla06/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

DataNusa adalah situs statistik nasional Indonesia yang berjalan sepenuhnya
dari berkas statis, tanpa permintaan jaringan: penduduk, ekonomi, harga,
ketenagakerjaan, kemiskinan, dan daerah — dengan angka resmi terbaru beserta
sumbernya, grafik SVG buatan tangan, dan tabel yang bisa dicari dan diurutkan.

## Angka kunci (per 26 November 2026)

- **Penduduk:** 284,44 juta jiwa (pertengahan 2025, BPS)
- **PDB:** Rp23.821 triliun, tumbuh 5,11% (2025, BPS)
- **Inflasi:** 2,86% y-on-y (Oktober 2025, BPS)
- **Pengangguran terbuka:** 4,85% (Agustus 2025, BPS)
- **Penduduk miskin:** 8,47% (Maret 2025, BPS)
- **IPM:** 75,02 (2024, BPS)

## Halaman

- `#/` — Beranda: enam indikator utama, grafik pertumbuhan PDB dan inflasi, rilis terbaru
- `#/penduduk` — Sensus dan survei, struktur generasi, sebaran pulau, 10 provinsi terbesar
- `#/ekonomi` — PDB nominal dan pertumbuhan, struktur sektor, perdagangan barang
- `#/harga` — Inflasi bulanan 2024–2025 dan per kelompok pengeluaran
- `#/kerja` — Tren pengangguran 2019–2025 dan sorotan Agustus 2025
- `#/kemiskinan` — Kemiskinan, Gini Ratio, dan IPM
- `#/daerah` — Provinsi dan kepadatan penduduk
- `#/metodologi` — Sumber data, definisi, dan unduhan `data.csv`

Setiap grafik bisa dialihkan ke tampilan tabel, tabel provinsi bisa dicari
dan diurutkan, dan seluruh data bisa diunduh sebagai `app/data.csv`.

## Menjalankan

```sh
node serve.ts
```

Lalu buka http://localhost:8080 di desktop atau ponsel.

## Menyerahkan (program entry)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` hanya menyalin `app/` dan `screenshots/` yang sudah jadi ke
direktori keluaran dan menulis `dossier.json` — tanpa build ulang, tanpa
jaringan — sehingga aman dijalankan penilai.

## Sumber data

Seluruh angka berasal dari publikasi Badan Pusat Statistik (BPS) yang
dirilis sebelum 26 November 2026; tiap halaman mencantumkan sumbernya.
DataNusa adalah situs independen dan tidak berafiliasi dengan BPS.

---

<sub>Entered on [make.fun](https://make.fun/?ref=56285tn4&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
