import Papa from 'papaparse';
import { normalizeText, normalizeDeclive, depthSortKey, decliveSortKey } from './normalize';
import type {
  RawRow,
  ProcessedData,
  FreqItem,
  CombinationItem,
} from '../types/data';

type ParsedRecord = Record<string, string>;

function freqMap(
  rows: RawRow[],
  key: keyof RawRow
): FreqItem[] {
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
    const key = [r.unidade, r.soloEmbra, r.matOrigem, r.declive, String(r.declivAula), r.drenagem, r.textura, r.legenda].join('||');
    if (!map[key]) {
      map[key] = {
        unidade: r.unidade,
        solo: r.soloEmbra,
        matOrigem: r.matOrigem,
        declive: r.declive,
        declivAula: r.declivAula,
        drenagem: r.drenagem,
        textura: r.textura,
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
    area: parseFloat(String(r['area (m2)']).replace(',', '.')),
    unidade: normalizeText(r['UNIDADE'] ?? ''),
    soloEmbra: normalizeText(r['SOLO_EMBRA'] ?? ''),
    matOrigem: normalizeText(r['MAT_ORIGEM'] ?? ''),
    declive: normalizeDeclive(r['DECLIVE'] ?? ''),
    drenagem: normalizeText(r['DRENAGEM'] ?? ''),
    textura: normalizeText(r['TEXTURA'] ?? ''),
    profundSo: normalizeText(r['PROFUND_SO'] ?? ''),
    legenda: normalizeText(r['LEGENDA'] ?? ''),
    ibgeN1: normalizeText(r['IBGE_N1'] ?? ''),
    ibgeN2: normalizeText(r['IBGE_N2'] ?? ''),
    declivAula: r['DECLIVIDADE_AULA'] ? parseInt(r['DECLIVIDADE_AULA'], 10) : null,
  })).filter(r => !isNaN(r.area) && r.area > 0);

  const totalArea = rows.reduce((s, r) => s + r.area, 0);

  return {
    rows,
    totalRows: rows.length,
    totalArea,
    byUnidade: freqMap(rows, 'unidade'),
    bySolo: freqMap(rows, 'soloEmbra'),
    byMatOrigem: freqMap(rows, 'matOrigem'),
    byDeclive: freqMap(rows, 'declive').sort((a, b) => decliveSortKey(a.name) - decliveSortKey(b.name)),
    byDrenagem: freqMap(rows, 'drenagem'),
    byTextura: freqMap(rows, 'textura'),
    byProfundSo: freqMap(rows, 'profundSo').sort((a, b) => depthSortKey(a.name) - depthSortKey(b.name)),
    byLegenda: freqMap(rows, 'legenda'),
    byIbgeN1: freqMap(rows, 'ibgeN1'),
    byIbgeN2: freqMap(rows, 'ibgeN2'),
    topCombinations: topCombinations(rows),
    soloByLegenda: [],
    materiaByDeclive: [],
  };
}
