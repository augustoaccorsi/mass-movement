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
  // replace broken sequences
  out = out.replace(/Regol¡tico/g, 'Regolítico');
  out = out.replace(/h£mico/g, 'húmico');
  out = out.replace(/t¡pic/g, 'típic');
  out = out.replace(/alum¡nico/g, 'alumínico');
  out = out.replace(/aluminofrrico/g, 'aluminoférrico');
  out = out.replace(/mdia/g, 'média');
  out = out.replace(/Varzea/g, 'Várzea');
  // generic map pass
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
