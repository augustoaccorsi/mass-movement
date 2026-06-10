import { useTranslation } from 'react-i18next';
import type { ProcessedData } from '../types/data';
import { HorizontalBarChart, DonutChart } from './Charts';

interface Props { data: ProcessedData; }

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="block w-1 h-5 rounded bg-blue-600 dark:bg-blue-400 shrink-0" />
      <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">{children}</h2>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
      <h3 className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function UnidadeSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.unidade')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={`${t('charts.unit')} — ${t('charts.frequency')}`}>
          <HorizontalBarChart data={data.byUnidade} dataKey="count" label={t('charts.occurrences')} colorOffset={3} />
        </ChartCard>
        <ChartCard title={`${t('charts.unit')} — ${t('charts.areaPct')}`}>
          <DonutChart data={data.byUnidade} />
        </ChartCard>
      </div>
    </div>
  );
}

export function SoilSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.soilTypes')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={`${t('charts.soil')} — ${t('charts.frequency')}`}>
          <HorizontalBarChart data={data.bySolo} dataKey="count" label={t('charts.occurrences')} />
        </ChartCard>
        <ChartCard title={`${t('charts.soil')} — ${t('charts.areaPct')}`}>
          <DonutChart data={data.bySolo} />
        </ChartCard>
      </div>
    </div>
  );
}

export function LandCoverSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.landCover')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={`${t('charts.legend')} — ${t('charts.frequency')}`}>
          <HorizontalBarChart data={data.byLegenda} dataKey="count" label={t('charts.occurrences')} colorOffset={2} />
        </ChartCard>
        <ChartCard title={t('charts.ibgeN1')}>
          <HorizontalBarChart data={data.byIbgeN1} dataKey="count" label={t('charts.occurrences')} maxItems={6} colorOffset={4} />
        </ChartCard>
      </div>
    </div>
  );
}

export function TerrainSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.terrain')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={t('charts.slope')}>
          <HorizontalBarChart data={data.byDeclive} dataKey="count" label={t('charts.occurrences')} maxItems={10} colorOffset={6} />
        </ChartCard>
        <ChartCard title={t('charts.drainage')}>
          <HorizontalBarChart data={data.byDrenagem} dataKey="count" label={t('charts.occurrences')} maxItems={6} colorOffset={9} />
        </ChartCard>
      </div>
    </div>
  );
}

export function GeologySection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.geology')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={t('charts.origin')}>
          <HorizontalBarChart data={data.byMatOrigem} dataKey="count" label={t('charts.occurrences')} colorOffset={1} />
        </ChartCard>
        <ChartCard title={t('charts.texture')}>
          <HorizontalBarChart data={data.byTextura} dataKey="count" label={t('charts.occurrences')} colorOffset={7} />
        </ChartCard>
      </div>
    </div>
  );
}

export function DrainageSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.drainage')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={t('charts.depth')}>
          <HorizontalBarChart data={data.byProfundSo} dataKey="count" label={t('charts.occurrences')} colorOffset={5} />
        </ChartCard>
        <ChartCard title={t('charts.ibgeN2')}>
          <HorizontalBarChart data={data.byIbgeN2} dataKey="count" label={t('charts.occurrences')} maxItems={8} colorOffset={11} />
        </ChartCard>
      </div>
    </div>
  );
}
