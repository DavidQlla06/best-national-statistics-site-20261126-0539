// DataNusa — halaman-halaman situs, dirender dari data.js.
// Setiap halaman adalah hash route (#/penduduk, #/ekonomi, ...).
// Tombol dan tautan di sini semuanya berfungsi: pengalih grafik/tabel,
// penyaring dan pengurut tabel, serta pemilih metrik — logikanya di main.js.

import { HEADLINE, GDP, SECTORS, TRADE, INFLATION, POPULATION, PROVINCES, LABOR, WELFARE, RELEASES, META } from './data.js';
import { lineChart, barChart, hbarChart, dataTable } from './charts.js';

function sourceLine(text) {
  return `<p class="source">Sumber: ${text}</p>`;
}

function kpiCard(k) {
  return `<a class="kpi" href="${k.route}">
    <span class="kpi-label">${k.label}</span>
    <span class="kpi-value">${k.value}</span>
    <span class="kpi-context">${k.context}</span>
    <span class="kpi-source">${k.source}</span>
  </a>`;
}

// Kartu grafik dengan tombol Grafik/Tabel yang berfungsi.
function chartCard(id, title, subtitle, chartHtml, tableHtml, source) {
  return `<section class="card chart-card" aria-label="${title}">
    <div class="card-head">
      <div><h3>${title}</h3><p class="card-sub">${subtitle}</p></div>
      <div class="seg" role="group" aria-label="Tampilan ${title}">
        <button type="button" data-action="show-chart" data-target="${id}" class="seg-btn active" aria-pressed="true">Grafik</button>
        <button type="button" data-action="show-table" data-target="${id}" class="seg-btn" aria-pressed="false">Tabel</button>
      </div>
    </div>
    <div class="chart-view" id="${id}-chart">${chartHtml}</div>
    <div class="table-view" id="${id}-table" hidden>${tableHtml}</div>
    ${sourceLine(source)}
  </section>`;
}

export function homeView() {
  const kpis = HEADLINE.map(kpiCard).join('');
  const gdpPoints = GDP.years.map((y, i) => ({ label: String(y), value: GDP.growth[i] }));
  const gdpChart = lineChart(gdpPoints, { label: 'Pertumbuhan PDB 2021–2025', unit: '%', min: 3, max: 5.6 });
  const gdpTable = dataTable(
    GDP.years.map((y, i) => ({ label: String(y), value: `${GDP.growth[i].toFixed(2).replace('.', ',')}% · Rp${GDP.nominal[i].toLocaleString('id-ID')} triliun` })),
    'Tahun', 'Pertumbuhan dan PDB nominal',
  );
  const infPoints = INFLATION.monthly.slice(-12).map((m) => ({ label: m.m, value: m.value }));
  const infChart = lineChart(infPoints, { label: 'Inflasi bulanan y-on-y, 12 bulan terakhir', unit: '%', min: -0.5, max: 3.2 });
  const infTable = dataTable(
    INFLATION.monthly.slice(-12).map((m) => ({ label: m.m, value: `${m.value.toFixed(2).replace('.', ',')}%` })),
    'Bulan', 'Inflasi y-on-y',
  );
  const releases = RELEASES.map((r) => `<li class="release">
      <span class="release-date">${r.date}</span>
      <a class="release-title" href="${r.route}">${r.title}</a>
      <p>${r.text}</p>
    </li>`).join('');
  const topics = [
    { route: '#/penduduk', title: 'Penduduk', text: '284,44 juta jiwa, sebaran pulau, dan struktur generasi.' },
    { route: '#/ekonomi', title: 'Ekonomi', text: 'PDB Rp23.821 triliun, sektor penyumbang, dan perdagangan.' },
    { route: '#/harga', title: 'Harga', text: 'Inflasi 2,86% dan pergerakan harga per kelompok.' },
    { route: '#/kerja', title: 'Ketenagakerjaan', text: 'Pengangguran 4,85% dan tren lima tahun terakhir.' },
    { route: '#/kemiskinan', title: 'Kemiskinan & IPM', text: 'Kemiskinan 8,47%, ketimpangan, dan IPM 75,02.' },
    { route: '#/daerah', title: 'Daerah', text: 'Sepuluh provinsi terbesar dan kepadatan penduduk.' },
  ].map((t) => `<a class="topic" href="${t.route}"><strong>${t.title}</strong><span>${t.text}</span></a>`).join('');

  return `
  <section class="hero">
    <p class="eyebrow">Portal statistik Indonesia · Data diperbarui ${META.updated}</p>
    <h1>Angka-angka Indonesia,<br>dalam satu tempat.</h1>
    <p class="lede">Penduduk, ekonomi, harga, pekerjaan, dan kesejahteraan — angka resmi
    terbaru beserta sumbernya, tersaji sebagai grafik dan tabel yang bisa
    dijelajahi dari desktop maupun ponsel.</p>
    <p class="hero-note">Seluruh angka di situs ini berasal dari Badan Pusat Statistik (BPS).
    DataNusa adalah situs independen dan tidak berafiliasi dengan BPS.</p>
  </section>
  <section class="kpis" aria-label="Indikator utama">${kpis}</section>
  <div class="grid-2">
    ${chartCard('gdp', 'Pertumbuhan ekonomi', 'PDB tumbuh 5,11% pada 2025 — akselerasi dari 5,03% pada 2024.', gdpChart, gdpTable, GDP.source)}
    ${chartCard('inf', 'Inflasi 12 bulan terakhir', 'Inflasi tahunan Oktober 2025 sebesar 2,86%, dalam sasaran 2,5±1%.', infChart, infTable, INFLATION.source)}
  </div>
  <div class="grid-2">
    <section class="card" aria-label="Rilis terbaru">
      <div class="card-head"><div><h3>Rilis terbaru</h3><p class="card-sub">Berita resmi statistik yang paling baru masuk.</p></div></div>
      <ul class="releases">${releases}</ul>
    </section>
    <section class="card" aria-label="Jelajahi berdasarkan topik">
      <div class="card-head"><div><h3>Jelajahi berdasarkan topik</h3><p class="card-sub">Enam topik, satu angka kunci di setiap halaman.</p></div></div>
      <div class="topics">${topics}</div>
    </section>
  </div>`;
}

export function populationView() {
  const censusPoints = POPULATION.census.map((c) => ({ label: String(c.year), value: c.value }));
  const censusChart = lineChart(censusPoints, { label: 'Jumlah penduduk hasil sensus dan survei', unit: ' jt', min: 230, max: 290 });
  const censusTable = dataTable(
    POPULATION.census.map((c) => ({ label: `${c.year} (${c.label})`, value: `${c.value.toFixed(2).replace('.', ',')} juta jiwa` })),
    'Tahun', 'Jumlah penduduk',
  );
  const ageBars = hbarChart(
    POPULATION.age2025.map((a) => ({ label: a.group, value: a.share })),
    { label: 'Pangsa generasi, SUPAS 2025', unit: '%', labelWidth: 250 },
  );
  const islandBars = hbarChart(
    POPULATION.islands.map((p) => ({ label: p.name, value: p.share })),
    { label: 'Pangsa penduduk per pulau, SP2020', unit: '%', labelWidth: 210 },
  );
  const provRows = PROVINCES.rows.map((p, i) => `<tr>
      <td>${i + 1}</td><th scope="row">${p.name}</th>
      <td class="num">${p.pop.toFixed(2).replace('.', ',')}</td>
      <td class="num">${p.density.toLocaleString('id-ID')}</td>
    </tr>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Penduduk</p>
    <h1>Penduduk Indonesia: 284,44 juta jiwa</h1>
    <p class="lede">Jumlah penduduk pertengahan 2025. Hasil Survei Penduduk Antar Sensus
    (SUPAS) 2025 mencatat 284,67 juta jiwa, dengan laju pertumbuhan 1,08%
    per tahun — melambat dari 1,10% pada periode sebelumnya.</p>
  </section>
  <div class="grid-2">
    ${chartCard('pop', 'Penduduk hasil sensus dan survei', 'Dari 237,64 juta (2010) menjadi 284,67 juta (2025).', censusChart, censusTable, POPULATION.source)}
    <section class="card" aria-label="Struktur generasi">
      <div class="card-head"><div><h3>Siapa saja penduduknya?</h3><p class="card-sub">Generasi Z dan Milenial membentuk hampir setengah penduduk.</p></div></div>
      ${ageBars}
      <p class="fact">Usia produktif (15–64 tahun) mencapai <strong>68,94%</strong> penduduk.
      Penduduk lansia (60+) sudah <strong>11,97%</strong>. Angka fertilitas total
      turun ke <strong>2,13</strong> — nyaris di level pengganti 2,1.</p>
      ${sourceLine('BPS, Hasil SUPAS 2025, 5 Mei 2026')}
    </section>
  </div>
  <section class="card" aria-label="Sebaran per pulau">
    <div class="card-head"><div><h3>Di mana mereka tinggal?</h3><p class="card-sub">Jawa masih menampung lebih dari separuh penduduk Indonesia.</p></div></div>
    ${islandBars}
    <p class="fact">Pada SUPAS 2025, pangsa Jawa tercatat <strong>55,65%</strong> — sedikit
    turun dari 56,10% pada Sensus 2020. Sumatera 21,68%, Sulawesi 7,36%,
    Kalimantan 6,05%, Bali dan Nusa Tenggara 5,54%, Maluku dan Papua 3,17%.</p>
    ${sourceLine(POPULATION.islandsSource)}
  </section>
  <section class="card" aria-label="Provinsi berpenduduk terbanyak">
    <div class="card-head">
      <div><h3>Sepuluh provinsi berpenduduk terbanyak, 2024</h3><p class="card-sub">Ketik nama provinsi untuk menyaring, atau klik judul kolom untuk mengurutkan.</p></div>
      <label class="search">Cari provinsi
        <input type="search" id="prov-search" placeholder="mis. Jawa Barat" autocomplete="off">
      </label>
    </div>
    <div class="table-wrap"><table class="data" id="prov-table">
      <thead><tr>
        <th scope="col">#</th>
        <th scope="col"><button type="button" data-action="sort-prov" data-key="name">Provinsi</button></th>
        <th scope="col"><button type="button" data-action="sort-prov" data-key="pop">Penduduk (juta jiwa)</button></th>
        <th scope="col"><button type="button" data-action="sort-prov" data-key="density">Kepadatan (jiwa/km²)</button></th>
      </tr></thead>
      <tbody>${provRows}</tbody>
    </table></div>
    <p class="fact" id="prov-count">Menampilkan 10 dari 10 provinsi. Total penduduk nasional 2024: 281,60 juta jiwa.</p>
    ${sourceLine(`${PROVINCES.source}. ${PROVINCES.densitySource}`)}
  </section>`;
}

export function economyView() {
  const nominalBars = barChart(
    GDP.years.map((y) => ({ label: String(y), value: GDP.nominal[GDP.years.indexOf(y)] })),
    { label: 'PDB nominal 2021–2025', unit: '', max: 26000 },
  );
  const nominalTable = dataTable(
    GDP.years.map((y, i) => ({ label: String(y), value: `Rp${GDP.nominal[i].toLocaleString('id-ID')} triliun · per kapita Rp${GDP.perCapitaJt[i].toFixed(1).replace('.', ',')} juta` })),
    'Tahun', 'PDB nominal dan per kapita',
  );
  const qBars = barChart(
    GDP.quarterly2025.map((q) => ({ label: q.q.replace('Triwulan ', 'TW '), value: q.value })),
    { label: 'Pertumbuhan PDB per triwulan 2025', unit: '%', min: 4.5, max: 5.6 },
  );
  const sectorBars = hbarChart(
    SECTORS.rows.map((s) => ({ label: s.name, value: s.share })),
    { label: 'Pangsa PDB 2024', unit: '%', labelWidth: 250 },
  );
  const fastest = SECTORS.fastest2024.map((f) => `<li><strong>${f.name}</strong> tumbuh ${f.growth.toFixed(2).replace('.', ',')}% pada 2024.</li>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Ekonomi</p>
    <h1>Ekonomi tumbuh 5,11% pada 2025</h1>
    <p class="lede">PDB atas dasar harga berlaku mencapai Rp23.821,1 triliun dan PDB per
    kapita Rp83,7 juta. Pertumbuhan mengakselerasi dari 5,03% pada 2024,
    ditopang industri pengolahan dan ekspor barang dan jasa.</p>
  </section>
  <div class="grid-2">
    ${chartCard('gdpn', 'PDB nominal 2021–2025', 'Naik sekitar 40% dalam lima tahun, dari Rp16.977 triliun.', nominalBars, nominalTable, GDP.source)}
    <section class="card" aria-label="Pertumbuhan per triwulan 2025">
      <div class="card-head"><div><h3>Pertumbuhan per triwulan, 2025</h3><p class="card-sub">Empat triwulan 2025 semuanya di atas 4,8%.</p></div></div>
      ${qBars}
      <p class="fact">Triwulan IV-2025 menjadi yang tercepat, <strong>5,39%</strong>, setelah
      Triwulan I 4,87%, Triwulan II 5,12%, dan Triwulan III 5,04%.</p>
      ${sourceLine(GDP.source)}
    </section>
  </div>
  <div class="grid-2">
    <section class="card" aria-label="Struktur PDB">
      <div class="card-head"><div><h3>Siapa penyumbang terbesar PDB?</h3><p class="card-sub">Pangsa PDB 2024 menurut lapangan usaha, harga berlaku.</p></div></div>
      ${sectorBars}
      <p class="fact">${SECTORS.note}</p>
      ${sourceLine(SECTORS.source)}
    </section>
    <section class="card" aria-label="Sektor tumbuh tercepat">
      <div class="card-head"><div><h3>Sektor dengan pertumbuhan tercepat, 2024</h3><p class="card-sub">Tiga lapangan usaha dengan pertumbuhan (c-to-c) tertinggi.</p></div></div>
      <ul class="bullets">${fastest}</ul>
      <p class="fact">Industri pengolahan — penyumbang terbesar PDB — tumbuh
      <strong>4,43%</strong> pada 2024 dan mengakselerasi ke <strong>5,30%</strong>
      pada 2025. Perdagangan tumbuh 4,86% pada 2024 dan 5,49% pada 2025.</p>
      <h4>Perdagangan barang, 2024</h4>
      <dl class="stats">
        <div><dt>Ekspor</dt><dd>US$${TRADE.exports.toFixed(2).replace('.', ',')} miliar</dd></div>
        <div><dt>Impor</dt><dd>US$${TRADE.imports.toFixed(2).replace('.', ',')} miliar</dd></div>
        <div><dt>Surplus</dt><dd>US$${TRADE.surplus.toFixed(2).replace('.', ',')} miliar</dd></div>
      </dl>
      <p class="fact">Ekspor naik dari US$258,82 miliar pada 2023. Pulau Jawa menyumbang
      57,02% PDB nasional pada 2024.</p>
      ${sourceLine(TRADE.source)}
    </section>
  </div>`;
}

export function pricesView() {
  const monthlyPoints = INFLATION.monthly.map((m) => ({ label: m.m, value: m.value }));
  const monthlyChart = lineChart(monthlyPoints, { label: 'Inflasi bulanan y-on-y, 2024–2025', unit: '%', min: -0.5, max: 3.4 });
  const monthlyTable = dataTable(
    INFLATION.monthly.map((m) => ({ label: m.m, value: `${m.value.toFixed(2).replace('.', ',')}%` })),
    'Bulan', 'Inflasi y-on-y',
  );
  const annualBars = barChart(
    INFLATION.annual.map((a) => ({ label: String(a.year), value: a.value })),
    { label: 'Inflasi tahunan 2020–2024', unit: '%', max: 6 },
  );
  const groupRows = INFLATION.groupsOct2025.map((g) => `<tr><th scope="row">${g.name}</th><td class="num">${g.value.toFixed(2).replace('.', ',')}%</td><td>${g.note}</td></tr>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Harga</p>
    <h1>Inflasi Oktober 2025: 2,86%</h1>
    <p class="lede">Inflasi tahunan naik dari 2,65% pada September 2025. Indeks Harga
    Konsumen (IHK) mencapai 109,04 dari 106,01 pada Oktober 2024. Inflasi
    tetap terjaga dalam sasaran 2,5±1%.</p>
  </section>
  <div class="grid-2">
    ${chartCard('infm', 'Inflasi bulanan (y-on-y)', 'Dua puluh dua bulan, Januari 2024 sampai Oktober 2025.', monthlyChart, monthlyTable, INFLATION.source)}
    <section class="card" aria-label="Inflasi tahunan">
      <div class="card-head"><div><h3>Inflasi tahunan, 2020–2024</h3><p class="card-sub">Puncak 5,51% pada 2022, lalu turun ke 1,57% pada 2024.</p></div></div>
      ${annualBars}
      <p class="fact">Februari 2025 sempat mencatat deflasi tahunan <strong>−0,09%</strong>
      — satu-satunya bulan deflasi dalam dua tahun terakhir — sebelum
      inflasi kembali naik sepanjang 2025.</p>
      ${sourceLine(INFLATION.source)}
    </section>
  </div>
  <section class="card" aria-label="Inflasi per kelompok, Oktober 2025">
    <div class="card-head"><div><h3>Apa yang mendorong inflasi Oktober 2025?</h3><p class="card-sub">Inflasi per kelompok pengeluaran, year-on-year.</p></div></div>
    <div class="table-wrap"><table class="data">
      <thead><tr><th scope="col">Kelompok</th><th scope="col">Inflasi y-on-y</th><th scope="col">Catatan</th></tr></thead>
      <tbody>${groupRows}</tbody>
    </table></div>
    <p class="fact">Kelompok makanan, minuman, dan tembakau naik 4,99% dan memberi andil
    1,43 poin — pendorong utama inflasi tahunan Oktober 2025.</p>
    ${sourceLine('BPS, Berita Resmi Statistik Inflasi, 3 November 2025')}
  </section>`;
}

export function laborView() {
  const febPoints = LABOR.feb.map((f) => ({ label: String(f.year), value: f.value }));
  const febChart = lineChart(febPoints, { label: 'TPT Februari 2019–2025', unit: '%', min: 4.5, max: 6.6 });
  const febTable = dataTable(
    LABOR.feb.map((f) => ({ label: `Februari ${f.year}`, value: `${f.value.toFixed(2).replace('.', ',')}%` })),
    'Periode', 'TPT',
  );
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Ketenagakerjaan</p>
    <h1>Pengangguran terbuka: 4,85%</h1>
    <p class="lede">Pada Agustus 2025, jumlah penganggur sebanyak 7,46 juta orang. TPT turun
    0,06 poin dari Agustus 2024, dan penduduk bekerja bertambah 1,90 juta orang.</p>
  </section>
  <div class="grid-2">
    ${chartCard('tpt', 'Tingkat Pengangguran Terbuka (Februari)', 'Lonjakan pandemi 2021 (6,26%) terus menurun hingga 4,76% pada 2025.', febChart, febTable, LABOR.source)}
    <section class="card" aria-label="Sorotan Agustus 2025">
      <div class="card-head"><div><h3>Sorotan Agustus 2025</h3><p class="card-sub">Perbandingan dengan Agustus 2024.</p></div></div>
      <dl class="stats">
        <div><dt>TPT Agustus 2025</dt><dd>4,85%</dd></div>
        <div><dt>TPT Agustus 2024</dt><dd>4,91%</dd></div>
        <div><dt>Penganggur</dt><dd>7,46 juta orang</dd></div>
        <div><dt>Perubahan penganggur</dt><dd>−4.092 orang</dd></div>
        <div><dt>Tambahan penduduk bekerja</dt><dd>+1,90 juta orang</dd></div>
        <div><dt>TPT lulusan SMK</dt><dd>8,63%</dd></div>
      </dl>
      <p class="fact">${LABOR.noteSmk} Lulusan sekolah menengah kejuruan masih
      menghadapi pengangguran tertinggi di antara semua tingkat pendidikan.</p>
      ${sourceLine('BPS, Laporan Bulanan Data Sosial Ekonomi, Oktober 2025')}
    </section>
  </div>`;
}

export function welfareView() {
  const povPoints = WELFARE.poverty.map((p) => ({ label: p.period, value: p.value }));
  const povChart = lineChart(povPoints, { label: 'Persentase penduduk miskin 2019–2025', unit: '%', min: 8, max: 10.5 });
  const povTable = dataTable(
    WELFARE.poverty.map((p) => ({ label: p.period, value: `${p.value.toFixed(2).replace('.', ',')}%${p.million ? ` · ${p.million.toFixed(2).replace('.', ',')} juta jiwa` : ''}` })),
    'Periode', 'Penduduk miskin',
  );
  const hdiPoints = WELFARE.hdi.map((h) => ({ label: String(h.year), value: h.value }));
  const hdiChart = lineChart(hdiPoints, { label: 'IPM 2020–2024', unit: '', min: 71.5, max: 75.5 });
  const giniRows = WELFARE.gini.map((g) => ({ label: g.period, value: g.value.toFixed(3).replace('.', ',') }));
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Kemiskinan &amp; Kesejahteraan</p>
    <h1>Kemiskinan turun ke 8,47%</h1>
    <p class="lede">Pada Maret 2025, penduduk miskin berjumlah 23,85 juta orang — turun
    0,21 juta dari September 2024 dan 1,37 juta dari Maret 2024. Ini angka
    terendah sejak pandemi.</p>
  </section>
  <div class="grid-2">
    ${chartCard('pov', 'Persentase penduduk miskin', 'Naik saat pandemi (10,19% pada Sep 2020), lalu turun konsisten.', povChart, povTable, WELFARE.source)}
    ${chartCard('hdi', 'Indeks Pembangunan Manusia', 'IPM naik setiap tahun: 71,94 pada 2020 menjadi 75,02 pada 2024.', hdiChart, dataTable(WELFARE.hdi.map((h) => ({ label: String(h.year), value: h.value.toFixed(2).replace('.', ',') })), 'Tahun', 'IPM'), WELFARE.source)}
  </div>
  <div class="grid-2">
    <section class="card" aria-label="Kota dan desa">
      <div class="card-head"><div><h3>Kota dan desa, Maret 2025</h3><p class="card-sub">Kemiskinan jauh lebih tinggi di perdesaan.</p></div></div>
      <dl class="stats">
        <div><dt>Perkotaan</dt><dd>6,73%</dd></div>
        <div><dt>Perdesaan</dt><dd>11,03%</dd></div>
        <div><dt>Garis kemiskinan</dt><dd>Rp609.160 /kapita/bulan</dd></div>
        <div><dt>Kemiskinan ekstrem</dt><dd>0,85% penduduk</dd></div>
      </dl>
      <p class="fact">Jumlah penduduk miskin perkotaan justru bertambah sekitar 220 ribu
      orang dibanding September 2024 (menjadi 11,27 juta), sementara
      perdesaan turun dari 11,34% menjadi 11,03%.</p>
      ${sourceLine('BPS, Profil Kemiskinan, 25 Juli 2025')}
    </section>
    <section class="card" aria-label="Ketimpangan">
      <div class="card-head"><div><h3>Ketimpangan: Gini Ratio</h3><p class="card-sub">Semakin kecil, semakin merata pengeluarannya.</p></div></div>
      ${dataTable(giniRows, 'Periode', 'Gini Ratio')}
      <p class="fact">Gini Ratio turun dari 0,375 (Maret 2025) menjadi 0,363 (September
      2025). Ketimpangan perkotaan 0,383 lebih tinggi dari perdesaan 0,295.</p>
      ${sourceLine('BPS, Profil Kemiskinan, September 2025')}
    </section>
  </div>`;
}

export function regionsView() {
  const provRows = PROVINCES.rows.map((p, i) => `<tr>
      <td>${i + 1}</td><th scope="row">${p.name}</th>
      <td class="num">${p.pop.toFixed(2).replace('.', ',')}</td>
      <td class="num">${p.density.toLocaleString('id-ID')}</td>
    </tr>`).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Daerah</p>
    <h1>Daerah: Jawa menampung 55 dari 100 orang</h1>
    <p class="lede">Dari 281,60 juta penduduk pada 2024, 55,93% tinggal di Jawa — pulau
    seluas 6,9% wilayah Indonesia. DKI Jakarta adalah provinsi terpadat:
    16.165 jiwa per km².</p>
  </section>
  <section class="card" aria-label="Provinsi berpenduduk terbanyak">
    <div class="card-head">
      <div><h3>Sepuluh provinsi berpenduduk terbanyak, 2024</h3><p class="card-sub">Tiga provinsi di Jawa saja sudah 130 juta jiwa — 46,2% penduduk nasional.</p></div>
      <label class="search">Cari provinsi
        <input type="search" id="prov-search" placeholder="mis. Sumatera Utara" autocomplete="off">
      </label>
    </div>
    <div class="table-wrap"><table class="data" id="prov-table">
      <thead><tr>
        <th scope="col">#</th>
        <th scope="col"><button type="button" data-action="sort-prov" data-key="name">Provinsi</button></th>
        <th scope="col"><button type="button" data-action="sort-prov" data-key="pop">Penduduk (juta jiwa)</button></th>
        <th scope="col"><button type="button" data-action="sort-prov" data-key="density">Kepadatan (jiwa/km²)</button></th>
      </tr></thead>
      <tbody>${provRows}</tbody>
    </table></div>
    <p class="fact" id="prov-count">Menampilkan 10 dari 10 provinsi. Total penduduk nasional 2024: 281,60 juta jiwa.</p>
    ${sourceLine(`${PROVINCES.source}. ${PROVINCES.densitySource}`)}
  </section>
  <section class="card" aria-label="Kepadatan di Jawa">
    <div class="card-head"><div><h3>Kepadatan tertinggi ada di Jawa</h3><p class="card-sub">Kepadatan penduduk enam provinsi di Jawa, jiwa per km², 2024.</p></div></div>
    ${hbarChart([
      { label: 'DKI Jakarta', value: 16165 },
      { label: 'Jawa Barat', value: 1359 },
      { label: 'Banten', value: 1329 },
      { label: 'DI Yogyakarta', value: 1193 },
      { label: 'Jawa Tengah', value: 1104 },
      { label: 'Jawa Timur', value: 870 },
    ], { label: 'Kepadatan penduduk di Jawa', unit: '', labelWidth: 150 })}
    <p class="fact">DKI Jakarta 16.165 jiwa/km² — lebih dari 11 kali Jawa Barat. Di luar
    Jawa, kepadatan umumnya di bawah 300 jiwa/km².</p>
    ${sourceLine('BPS, 2024')}
  </section>`;
}

export function methodsView() {
  return `
  <section class="page-head">
    <p class="eyebrow">Tentang situs ini</p>
    <h1>Metodologi &amp; sumber data</h1>
    <p class="lede">DataNusa menyajikan ulang angka-angka publik Badan Pusat Statistik
    (BPS) agar mudah dijelajahi. Situs ini independen dan tidak berafiliasi
    dengan BPS maupun pemerintah.</p>
  </section>
  <div class="grid-2">
    <section class="card" aria-label="Sumber data">
      <div class="card-head"><div><h3>Dari mana angkanya?</h3><p class="card-sub">Setiap angka di situs ini merujuk pada satu rilis BPS.</p></div></div>
      <ul class="bullets">
        <li><strong>Penduduk:</strong> Sensus Penduduk 2010 &amp; 2020, SUPAS 2015 &amp; 2025, proyeksi pertengahan tahun 2025.</li>
        <li><strong>Ekonomi:</strong> Berita Resmi Statistik Pertumbuhan Ekonomi, 5 Februari 2025 dan 5 Februari 2026; Pendapatan Nasional Indonesia 2021–2025.</li>
        <li><strong>Harga:</strong> Berita Resmi Statistik Inflasi, 3 November 2025; Analisis Inflasi Bank Indonesia, Oktober 2025.</li>
        <li><strong>Ketenagakerjaan:</strong> Berita Resmi Statistik Keadaan Ketenagakerjaan Indonesia; Laporan Bulanan Data Sosial Ekonomi, Oktober 2025.</li>
        <li><strong>Kemiskinan:</strong> Profil Kemiskinan, 25 Juli 2025; rilis September 2025.</li>
        <li><strong>IPM:</strong> Indeks Pembangunan Manusia 2024, BPS.</li>
      </ul>
      <p class="fact">Angka-angka disalin apa adanya dari rilis di atas dan dibulatkan
      hanya untuk tampilan. Bila sebuah angka diperbarui BPS, halaman ini
      ikut diperbarui pada rilis berikutnya.</p>
    </section>
    <section class="card" aria-label="Definisi">
      <div class="card-head"><div><h3>Apa arti istilahnya?</h3><p class="card-sub">Definisi singkat menurut BPS.</p></div></div>
      <dl class="defs">
        <div><dt>PDB</dt><dd>Nilai tambah seluruh barang dan jasa yang dihasilkan dalam setahun. Pertumbuhan dihitung atas dasar harga konstan (c-to-c).</dd></div>
        <div><dt>IHK &amp; inflasi</dt><dd>Indeks Harga Konsumen mengukur perubahan harga barang dan jasa. Inflasi y-on-y membandingkan bulan ini dengan bulan yang sama tahun lalu.</dd></div>
        <div><dt>TPT</dt><dd>Tingkat Pengangguran Terbuka: penganggur dibagi angkatan kerja, dalam persen.</dd></div>
        <div><dt>Garis kemiskinan</dt><dd>Pengeluaran minimum per kapita per bulan untuk memenuhi kebutuhan dasar. Maret 2025: Rp609.160.</dd></div>
        <div><dt>Gini Ratio</dt><dd>Ukuran ketimpangan 0 sampai 1; 0 berarti pengeluaran semua orang sama.</dd></div>
        <div><dt>IPM</dt><dd>Indeks Pembangunan Manusia: gabungan umur harapan hidup, pendidikan, dan pengeluaran per kapita. Di atas 70 berarti kategori tinggi.</dd></div>
      </dl>
    </section>
  </div>
  <section class="card" aria-label="Unduh data">
    <div class="card-head"><div><h3>Unduh datanya</h3><p class="card-sub">Seluruh angka kunci situs ini dalam satu berkas CSV.</p></div></div>
    <p class="fact">Berkas <strong>data.csv</strong> berisi indikator, nilai, satuan, periode,
    dan sumber — siap dibuka di spreadsheet apa pun.</p>
    <p><a class="btn" href="data.csv" download>Unduh data.csv</a>
    <button type="button" class="btn ghost" data-action="copy-cite">Salin sitasi situs ini</button></p>
    <p class="fact" id="cite-out" aria-live="polite"></p>
    ${sourceLine('Data diperbarui 26 November 2026. Periksa rilis terbaru di bps.go.id.')}
  </section>`;
}

export function notFoundView() {
  return `
  <section class="page-head">
    <p class="eyebrow">Halaman tidak ditemukan</p>
    <h1>Halaman ini belum ada datanya</h1>
    <p class="lede">Tautan yang Anda buka tidak mengarah ke halaman DataNusa. Silakan
    kembali ke beranda atau pilih salah satu topik di bawah.</p>
    <p><a class="btn" href="#/">Kembali ke beranda</a></p>
  </section>`;
}
