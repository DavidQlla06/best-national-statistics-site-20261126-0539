// DataNusa — program penyerahan untuk make.fun (Node 22, pustaka standar saja).
//
// Situsnya adalah berkas statis di app/ (index.html + CSS + modul ES + data),
// tanpa langkah build dan tanpa permintaan jaringan. Program ini hanya
// menyerahkan apa yang sudah jadi: menyalin app/ dan screenshots/ dari
// repositori ini ke direktori keluaran, lalu menulis dossier.json dengan
// pustaka make.fun yang sudah dibundel di vendor/ (jangan diubah).
//
// Program ini tidak membangun ulang, tidak me-render, dan tidak mengunduh
// apa pun saat penilai berjalan — jadi aman dijalankan di penilai yang
// tanpa jaringan dan berbatas 10 detik. Di luar penilai, MAKEFUN_OUTPUT_DIR
// menggantikan /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// Batas yang sama dengan yang dipakai penilai: dossier paling banyak
// 160 KiB teks, paling banyak 4 tangkapan layar @ 256 KiB, app/ paling
// banyak 993 berkas dan direktori dengan total 16 MiB.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
