import { useTranslation } from 'react-i18next';
import type { CombinationItem } from '../types/data';

interface Props {
  top: CombinationItem;
  totalRows: number;
}

export function TopCombinationCard({ top, totalRows }: Props) {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-[#4a5c28] to-[#2e3d18] dark:from-[#3d4f1e] dark:to-[#1e2a0e] rounded-xl p-5 shadow-md text-white mb-6">
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -right-2 -bottom-6 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8b882]">
            {t('highlight.label')}
          </span>
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
            #{1}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[top.unidade, top.solo, top.matOrigem, top.declivAula, top.legenda].map((v, i) => (
            <span key={i} className="inline-block px-2.5 py-1 rounded-lg bg-white/15 text-xs font-semibold">
              {v}
            </span>
          ))}
        </div>

        <div className="flex items-end gap-6">
          <div>
            <div className="text-4xl font-extrabold leading-none">
              {top.pct.toFixed(1)}%
            </div>
            <div className="text-[#c8b882] text-xs mt-1">{t('highlight.ofTotal')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold leading-none">
              {top.count.toLocaleString('pt-BR')}
            </div>
            <div className="text-[#c8b882] text-xs mt-1">
              {t('highlight.of')} {totalRows.toLocaleString('pt-BR')} {t('highlight.occurrences')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
