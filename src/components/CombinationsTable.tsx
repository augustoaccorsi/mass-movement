import { useTranslation } from 'react-i18next';
import type { CombinationItem } from '../types/data';

function truncate(s: string, n = 30) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

export function CombinationsTable({ combinations }: { combinations: CombinationItem[] }) {
  const { t } = useTranslation();
  const max = combinations[0]?.count ?? 1;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {[
              t('table.rank'), t('table.unit'), t('table.soil'), t('table.origin'),
              t('table.slope'), t('table.drainage'), t('table.texture'), t('table.cover'),
              t('table.count'), t('table.pct'),
            ].map(h => (
              <th key={h} className="text-left text-[0.68rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-2.5 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {combinations.map((c, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-3 py-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[0.65rem] font-bold">
                  {i + 1}
                </span>
              </td>
              <td className="px-3 py-2">
                <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold text-[0.68rem]">
                  {c.unidade}
                </span>
              </td>
              <td className="px-3 py-2 text-slate-700 dark:text-slate-300" title={c.solo}>{truncate(c.solo, 32)}</td>
              <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.matOrigem}</td>
              <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.declive}</td>
              <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.drenagem}</td>
              <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.textura}</td>
              <td className="px-3 py-2 text-slate-700 dark:text-slate-300" title={c.legenda}>{truncate(c.legenda, 26)}</td>
              <td className="px-3 py-2 font-bold text-slate-800 dark:text-slate-200">
                {c.count.toLocaleString('pt-BR')}
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 rounded-full bg-blue-500 dark:bg-blue-400 min-w-1" style={{ width: `${(c.count / max) * 72}px` }} />
                  <span className="text-slate-600 dark:text-slate-400">{c.pct.toFixed(1)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
