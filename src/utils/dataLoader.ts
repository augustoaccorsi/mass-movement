import Papa from 'papaparse';
import { normalizeText, declivAulaLabel } from './normalize';
import type {
  RawRow,
  ProcessedData,
  FreqItem,
  CombinationItem,
} from '../types/data';

type ParsedRecord = Record<string, string>;

function freqMap(rows: RawRow[], key: keyof RawRow): FreqItem[] {
  const counts: Record<string, { count: number; area: number }> = {};
  const totalArea = rows.reduce((s, r) => s + r.area, 0);

  for (const r of rows) {
    const v = String(r[key]);
    if (!counts[v]) counts[v] = { count: 0, area: 0 };
    counts[v].count++;
    counts[v].area += r.area;
  }

  return Object.entries(counts)
    .map(([name, { count, area }]) => ({
      name,
      count,
      pct: (count / rows.length) * 100,
      area,
      areaPct: (area / totalArea) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

function topCombinations(rows: RawRow[], top = 15): CombinationItem[] {
  const map: Record<string, CombinationItem> = {};
  for (const r of rows) {
    const key = [r.unidade, r.soloEmbra, r.matOrigem, String(r.declivAula), r.legenda].join('||');
    if (!map[key]) {
      map[key] = {
        unidade: r.unidade,
        solo: r.soloEmbra,
        matOrigem: r.matOrigem,
        declivAula: r.declivAula,
        legenda: r.legenda,
        count: 0,
        pct: 0,
        area: 0,
      };
    }
    map[key].count++;
    map[key].area += r.area;
  }
  const total = rows.length;
  return Object.values(map)
    .map(c => ({ ...c, pct: (c.count / total) * 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, top);
}

export async function loadData(): Promise<ProcessedData> {
  const resp = await fetch('/data/data.csv');
  if (!resp.ok) throw new Error(`Failed to load data: ${resp.status}`);
  const text = await resp.text();

  const result = Papa.parse<ParsedRecord>(text, {
    delimiter: ';',
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
  });

  const rows: RawRow[] = result.data.map((r: ParsedRecord) => ({
    area: parseFloat(String(r['area']).replace(',', '.')),
    unidade: normalizeText(r['UNIDADE'] ?? ''),
    soloEmbra: normalizeText(r['SOLO_EMBRA'] ?? ''),
    matOrigem: normalizeText(r['MAT_ORIGEM'] ?? ''),
    legenda: normalizeText(r['LEGENDA'] ?? ''),
    declivAula: declivAulaLabel(r['Declividade (calculada em aula)'] ? parseInt(r['Declividade (calculada em aula)'], 10) : null),
  })).filter(r => !isNaN(r.area) && r.area > 0);

  const allCombos = new Set(
    rows.map(r => [r.unidade, r.soloEmbra, r.matOrigem, r.declivAula, r.legenda].join('||'))
  ).size;

  return {
    rows,
    totalRows: rows.length,
    totalArea: rows.reduce((s, r) => s + r.area, 0),
    totalUniqueCombinations: allCombos,
    byUnidade: freqMap(rows, 'unidade'),
    bySolo: freqMap(rows, 'soloEmbra'),
    byMatOrigem: freqMap(rows, 'matOrigem'),
    byLegenda: freqMap(rows, 'legenda'),
    byDeclivAula: freqMap(rows, 'declivAula').sort((a, b) => {
      const order = ['< 6%', '6 - 12%', '12 - 20%', '20 - 30%', '> 30%'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    }),
    topCombinations: topCombinations(rows),
  };
}
