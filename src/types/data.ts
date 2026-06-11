export interface RawRow {
  area: number;
  unidade: string;
  soloEmbra: string;
  matOrigem: string;
  legenda: string;
  declivAula: string;
}

export interface ProcessedData {
  rows: RawRow[];
  totalRows: number;
  totalArea: number;
  totalUniqueCombinations: number;
  byUnidade: FreqItem[];
  bySolo: FreqItem[];
  byMatOrigem: FreqItem[];
  byLegenda: FreqItem[];
  byDeclivAula: FreqItem[];
  topCombinations: CombinationItem[];
  crossSoloByUnidade: CrossItem[];
  crossLegendaByDecliv: CrossItem[];
}

export interface FreqItem {
  name: string;
  count: number;
  pct: number;
  area: number;
  areaPct: number;
}

export interface CombinationItem {
  unidade: string;
  solo: string;
  matOrigem: string;
  declivAula: string;
  legenda: string;
  count: number;
  pct: number;
  area: number;
}

export interface CrossItem {
  name: string;
  [key: string]: string | number;
}
