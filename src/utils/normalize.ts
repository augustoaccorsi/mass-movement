/** Fix broken latin-1 characters in strings encoded as ISO-8859-1 read as UTF-8 */
const CHAR_MAP: Record<string, string> = {
  '¡': 'á',
  '£': 'ú',
  'â': 'â',
  'ã': 'ã',
  'é': 'é',
  'ê': 'ê',
  'í': 'í',
  'ó': 'ó',
  'ô': 'ô',
  'õ': 'õ',
  'ú': 'ú',
  'ü': 'ü',
  'ç': 'ç',
  'à': 'à',
  'fr': 'ér', // aluminofrrico → aluminoférrico
};

export function normalizeText(s: string): string {
  let out = s.trim();
  out = out.replace(/Regol¡tico/g, 'Regolítico');
  out = out.replace(/h£mico/g, 'húmico');
  out = out.replace(/lptico/g, 'léptico');   // #1 fix: lptico → léptico
  out = out.replace(/t¡pic/g, 'típic');
  out = out.replace(/alum¡nico/g, 'alumínico');
  out = out.replace(/aluminofrrico/g, 'aluminoférrico');
  out = out.replace(/mdia/g, 'média');
  out = out.replace(/Varzea/g, 'Várzea');
  Object.entries(CHAR_MAP).forEach(([bad, good]) => {
    out = out.split(bad).join(good);
  });
  return out;
}

/** Append % unit to declive range values like "5 a 8" → "5% a 8%" */
export function normalizeDeclive(s: string): string {
  const base = normalizeText(s);
  return base.replace(/(\d+)\s*a\s*(\d+)/, '$1% a $2%');
}

/** Sort order for PROFUND_SO depth classes — #2 fix */
const DEPTH_ORDER: Record<string, number> = {
  '<50':  1,
  '<150': 2,
  '>250': 3,
};

export function depthSortKey(s: string): number {
  return DEPTH_ORDER[s.trim()] ?? 99;
}

/** Map DECLIVIDADE_AULA numeric code to slope range label */
const DECLIV_AULA_MAP: Record<number, string> = {
  1: '< 6%',
  2: '6 - 12%',
  3: '12 - 20%',
  4: '20 - 30%',
  5: '> 30%',
};

export function declivAulaLabel(code: number | null): string {
  if (code === null) return '—';
  return DECLIV_AULA_MAP[code] ?? String(code);
}
