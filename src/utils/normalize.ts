/** Map DECLIVIDADE_AULA numeric code to slope range label */
const DECLIV_AULA_MAP: Record<number, string> = {
  1: '< 6%',
  2: '6 - 12%',
  3: '12 - 20%',
  4: '20 - 30%',
  5: '> 30%',
};

export function normalizeText(s: string): string {
  return s.trim();
}

export function declivAulaLabel(code: number | null): string {
  if (code === null) return '—';
  return DECLIV_AULA_MAP[code] ?? String(code);
}
