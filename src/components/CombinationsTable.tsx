import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CombinationItem } from '../types/data';

function truncate(s: string, n = 30) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

interface Props {
  combinations: CombinationItem[];
  totalRows: number;
  totalUnique: number;
}

export function CombinationsTable({ combinations, totalRows, totalUnique }: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return combinations;
    const q = search.toLowerCase();
    return combinations.filter(c =>
      c.unidade.toLowerCase().includes(q) ||
      c.solo.toLowerCase().includes(q) ||
      c.matOrigem.toLowerCase().includes(q) ||
      c.declivAula.toLowerCase().includes(q) ||
      c.legenda.toLowerCase().includes(q)
    );
  }, [combinations, search]);

  const max = combinations[0]?.count ?? 1;
  const shownCount = filtered.reduce((s, c) => s + c.count, 0);
  const shownPct = ((shownCount / totalRows) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-3 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('table.search')}
            className="w-full pl-7 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <p className="text-[0.65rem] text-slate-400 dark:text-slate-500 sm:hidden ml-auto">
          ← deslize →
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10 bg-white dark:bg-slate-900">
            <tr className="border-b border-slate-200 dark:border-slate-700">
              {[
                t('table.rank'), t('table.unit'), t('table.soil'), t('table.origin'),
                t('table.slopeAula'), t('table.cover'), t('table.count'), t('table.pct'),
              ].map(h => (
                <th key={h} className="text-left text-[0.68rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-2.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-slate-400 dark:text-slate-500">
                  {t('table.noResults')}
                </td>
              </tr>
            ) : filtered.map((c, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-3 py-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[0.65rem] font-bold">
                    {combinations.indexOf(c) + 1}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold text-[0.68rem]">
                    {c.unidade}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-300" title={c.solo}>{truncate(c.solo, 32)}</td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.matOrigem}</td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{c.declivAula}</td>
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
          <tfoot>
            <tr className="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <td colSpan={6} className="px-3 py-2.5 text-[0.68rem] text-slate-500 dark:text-slate-400">
                {search ? `${filtered.length} resultado(s) — ` : `Top ${combinations.length} de ${totalUnique} combinações únicas — `}
              </td>
              <td className="px-3 py-2.5 font-bold text-slate-700 dark:text-slate-300">
                {shownCount.toLocaleString('pt-BR')}
              </td>
              <td className="px-3 py-2.5 font-bold text-slate-700 dark:text-slate-300">
                {shownPct}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
