export interface RawRow {
  area: number;
  unidade: string;
  soloEmbra: string;
  matOrigem: string;
  declive: string;
  drenagem: string;
  textura: string;
  profundSo: string;
  legenda: string;
  ibgeN1: string;
  ibgeN2: string;
  declivAula: number | null;
}

export interface ProcessedData {
  rows: RawRow[];
  totalRows: number;
  totalArea: number;
  byUnidade: FreqItem[];
  bySolo: FreqItem[];
  byMatOrigem: FreqItem[];
  byDeclive: FreqItem[];
  byDrenagem: FreqItem[];
  byTextura: FreqItem[];
  byProfundSo: FreqItem[];
  byLegenda: FreqItem[];
  byIbgeN1: FreqItem[];
  byIbgeN2: FreqItem[];
  topCombinations: CombinationItem[];
  soloByLegenda: CrossItem[];
  materiaByDeclive: CrossItem[];
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
  declive: string;
  drenagem: string;
  textura: string;
  legenda: string;
  count: number;
  pct: number;
  area: number;
}

export interface CrossItem {
  name: string;
  [key: string]: string | number;
}
