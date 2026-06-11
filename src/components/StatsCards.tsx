import { useTranslation } from 'react-i18next';
import type { ProcessedData } from '../types/data';

function fmt(n: number) {
  return n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

interface CardProps { label: string; value: string; sub: string; long?: boolean; }

function Card({ label, value, sub, long }: CardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
      <div className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
        {label}
      </div>
      <div
        title={value}
        className={[
          'font-extrabold text-blue-600 dark:text-blue-400 leading-tight truncate',
          long ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl',
        ].join(' ')}
      >
        {value}
      </div>
      <div className="text-[0.65rem] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{sub}</div>
    </div>
  );
}

interface Props { data: ProcessedData; }

export function StatsCards({ data }: Props) {
  const { t } = useTranslation();
  const hectares = (data.totalArea / 10000).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  const uniqueCombos = new Set(
    data.rows.map(r =>
      [r.unidade, r.soloEmbra, r.matOrigem, r.declive, r.drenagem, r.textura, r.legenda].join('|')
    )
  ).size;

  const dominantSoil = data.bySolo[0]?.name ?? '—';
  const dominantCover = data.byLegenda[0]?.name ?? '—';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 my-6">
      <Card label={t('stats.totalOccurrences')} value={fmt(data.totalRows)} sub="registros geoespaciais" />
      <Card label={t('stats.totalArea')} value={hectares} sub={t('stats.hectares')} />
      <Card label={t('stats.uniqueCombinations')} value={String(uniqueCombos)} sub={t('stats.ofVariables')} />
      <Card
        label={t('stats.dominantSoil')}
        value={dominantSoil}
        sub={`${data.bySolo[0]?.pct.toFixed(1)}% das ocorrências`}
        long
      />
      <Card
        label={t('stats.dominantCover')}
        value={dominantCover}
        sub={`${data.byLegenda[0]?.pct.toFixed(1)}% das ocorrências`}
        long
      />
    </div>
  );
}
