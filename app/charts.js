// DataNusa — grafik SVG buatan tangan (tanpa library).
// Setiap grafik mengembalikan string SVG yang bisa disisipkan ke halaman,
// lengkap dengan label sumbu, garis bantu, dan nilai di tiap titik/batang
// agar tetap terbaca saat tampil kecil di tangkapan layar.

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = norm < 1.5 ? mag : norm < 3.5 ? 2 * mag : norm < 7.5 ? 5 * mag : 10 * mag;
  const start = Math.floor(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step * 0.001; v += step) ticks.push(v);
  return ticks;
}

function fmtTick(v) {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(Math.abs(v) < 10 ? 1 : 0).replace('.', ',');
}

// Grafik garis dengan titik dan label nilai.
export function lineChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 300;
  const padL = opts.padLeft ?? 52;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const color = opts.color ?? '#0b6e5d';
  const unit = opts.unit ?? '';
  const values = points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (opts.min !== undefined) min = opts.min;
  if (opts.max !== undefined) max = opts.max;
  const pad = (max - min) * 0.12 || 1;
  min -= pad;
  max += pad;
  const x = (i) => padL + (i * (w - padL - padR)) / Math.max(points.length - 1, 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const ticks = niceTicks(min, max, 4);
  let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.label ?? 'Grafik garis')}">`;
  s += `<rect x="0" y="0" width="${w}" height="${h}" fill="none"/>`;
  for (const t of ticks) {
    const ty = y(t);
    s += `<line x1="${padL}" y1="${ty}" x2="${w - padR}" y2="${ty}" stroke="#e3e8e3" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${ty + 4}" text-anchor="end" font-size="12" fill="#5c6b62">${fmtTick(t)}${unit}</text>`;
  }
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<path d="${line}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    const cx = x(i);
    const cy = y(p.value);
    const above = i % 2 === 0 || i === points.length - 1;
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`;
    s += `<text x="${cx.toFixed(1)}" y="${(above ? cy - 10 : cy + 20).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#10231f">${fmtTick(p.value)}${unit}</text>`;
    s += `<text x="${cx.toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="#5c6b62">${esc(p.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Grafik batang tegak dengan label nilai di atas tiap batang.
export function barChart(bars, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 300;
  const padL = 52;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const color = opts.color ?? '#0b6e5d';
  const unit = opts.unit ?? '';
  const values = bars.map((b) => b.value);
  const max = (opts.max ?? Math.max(...values)) * 1.12;
  const min = Math.min(0, ...(opts.min !== undefined ? [opts.min] : [0]));
  const bw = (w - padL - padR) / bars.length;
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const ticks = niceTicks(min, max, 4);
  let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.label ?? 'Grafik batang')}">`;
  for (const t of ticks) {
    const ty = y(t);
    s += `<line x1="${padL}" y1="${ty}" x2="${w - padR}" y2="${ty}" stroke="#e3e8e3" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${ty + 4}" text-anchor="end" font-size="12" fill="#5c6b62">${fmtTick(t)}${unit}</text>`;
  }
  bars.forEach((b, i) => {
    const bx = padL + i * bw + bw * 0.18;
    const bwid = bw * 0.64;
    const by = y(Math.max(b.value, 0));
    const bh = y(0) - by;
    const fill = b.color ?? color;
    s += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bwid.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="4" fill="${fill}"/>`;
    s += `<text x="${(bx + bwid / 2).toFixed(1)}" y="${(by - 8).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#10231f">${fmtTick(b.value)}${unit}</text>`;
    s += `<text x="${(bx + bwid / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="#5c6b62">${esc(b.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// Grafik batang horizontal dengan nama di kiri dan nilai di kanan.
export function hbarChart(rows, opts = {}) {
  const rowH = opts.rowHeight ?? 44;
  const labelW = opts.labelWidth ?? 210;
  const w = opts.width ?? 640;
  const h = rowH * rows.length + 16;
  const max = Math.max(...rows.map((r) => r.value)) * 1.08;
  const color = opts.color ?? '#0b6e5d';
  const unit = opts.unit ?? '';
  let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.label ?? 'Grafik batang horizontal')}">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - 64) * r.value) / max;
    s += `<text x="0" y="${y + 19}" font-size="13" fill="#10231f">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y + 4}" width="${Math.max(bw, 2).toFixed(1)}" height="22" rx="4" fill="${r.color ?? color}"/>`;
    s += `<text x="${(labelW + bw + 8).toFixed(1)}" y="${y + 21}" font-size="13" font-weight="700" fill="#10231f">${fmtTick(r.value)}${unit}</text>`;
  });
  s += '</svg>';
  return s;
}

// Tabel HTML dari pasangan label–nilai (dipakai tombol "Lihat sebagai tabel").
export function dataTable(rows, headA, headB) {
  const body = rows
    .map((r) => `<tr><th scope="row">${esc(r.label)}</th><td>${esc(r.value)}</td></tr>`)
    .join('');
  return `<table class="mini"><thead><tr><th scope="col">${esc(headA)}</th><th scope="col">${esc(headB)}</th></tr></thead><tbody>${body}</tbody></table>`;
}
