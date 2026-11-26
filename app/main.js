// DataNusa — router dan kontrol situs.
//
//   #/              beranda
//   #/penduduk      penduduk dan sebaran daerah
//   #/ekonomi       PDB, sektor, dan perdagangan
//   #/harga         inflasi dan harga konsumen
//   #/kerja         pengangguran
//   #/kemiskinan    kemiskinan, ketimpangan, dan IPM
//   #/daerah        provinsi dan kepadatan
//   #/metodologi    sumber, definisi, dan unduhan data
//
// window.__shotReady bernilai false selama halaman dirender dan true
// sesudahnya, supaya skrip tangkapan layar tahu kapan memotret.

import { homeView, populationView, economyView, pricesView, laborView, welfareView, regionsView, methodsView, notFoundView } from './views.js';
import { PROVINCES } from './data.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav a')];

const ROUTES = {
  '': { view: homeView, title: 'DataNusa — Statistik Indonesia' },
  penduduk: { view: populationView, title: 'Penduduk — DataNusa' },
  ekonomi: { view: economyView, title: 'Ekonomi — DataNusa' },
  harga: { view: pricesView, title: 'Harga & Inflasi — DataNusa' },
  kerja: { view: laborView, title: 'Ketenagakerjaan — DataNusa' },
  kemiskinan: { view: welfareView, title: 'Kemiskinan & IPM — DataNusa' },
  daerah: { view: regionsView, title: 'Daerah — DataNusa' },
  metodologi: { view: methodsView, title: 'Metodologi — DataNusa' },
};

// Keadaan tabel provinsi: kunci urut, arah, dan kata kunci saring.
const provState = { key: 'pop', dir: -1, query: '' };

function provRows() {
  const q = provState.query.trim().toLowerCase();
  let rows = PROVINCES.rows.map((p, i) => ({ ...p, rank: i + 1 }));
  if (q) rows = rows.filter((p) => p.name.toLowerCase().includes(q));
  const key = provState.key;
  rows.sort((a, b) => {
    const diff = key === 'name' ? a.name.localeCompare(b.name, 'id') : a[key] - b[key];
    return diff * provState.dir;
  });
  return rows;
}

function renderProvTable() {
  const table = document.getElementById('prov-table');
  const count = document.getElementById('prov-count');
  if (!table) return;
  const rows = provRows();
  table.querySelector('tbody').innerHTML = rows
    .map((p) => `<tr><td>${p.rank}</td><th scope="row">${p.name}</th>
      <td class="num">${p.pop.toFixed(2).replace('.', ',')}</td>
      <td class="num">${p.density.toLocaleString('id-ID')}</td></tr>`)
    .join('') || '<tr><td colspan="4">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>';
  if (count) {
    count.textContent = `Menampilkan ${rows.length} dari 10 provinsi. Total penduduk nasional 2024: 281,60 juta jiwa.`;
  }
}

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#\/?/, '').split('/')[0];
  const hit = ROUTES[route] ?? null;
  document.title = hit ? hit.title : 'Halaman tidak ditemukan — DataNusa';
  app.innerHTML = hit ? hit.view() : notFoundView();
  for (const a of navLinks) {
    const href = a.getAttribute('href') ?? '';
    const key = href.replace(/^#\/?/, '');
    a.classList.toggle('active', key === route);
    if (key === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  provState.query = '';
  renderProvTable();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Pengalih Grafik/Tabel dan pengurut tabel provinsi.
document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  if (action === 'show-chart' || action === 'show-table') {
    const id = btn.dataset.target;
    const chart = document.getElementById(`${id}-chart`);
    const table = document.getElementById(`${id}-table`);
    if (!chart || !table) return;
    const showChart = action === 'show-chart';
    chart.hidden = !showChart;
    table.hidden = showChart;
    const group = btn.parentElement;
    for (const b of group.querySelectorAll('.seg-btn')) {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    }
  } else if (action === 'sort-prov') {
    const key = btn.dataset.key;
    if (provState.key === key) provState.dir *= -1;
    else {
      provState.key = key;
      provState.dir = key === 'name' ? 1 : -1;
    }
    renderProvTable();
  } else if (action === 'copy-cite') {
    const text = 'DataNusa — Statistik Indonesia. Data: Badan Pusat Statistik (BPS), diakses 26 November 2026.';
    const out = document.getElementById('cite-out');
    const done = () => {
      if (out) out.textContent = 'Sitasi disalin: ' + text;
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  }
});

// Saringan tabel provinsi saat mengetik.
document.addEventListener('input', (event) => {
  if (event.target.id === 'prov-search') {
    provState.query = event.target.value;
    renderProvTable();
  }
});

window.addEventListener('hashchange', render);
render();
