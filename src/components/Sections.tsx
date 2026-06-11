import { useTranslation } from 'react-i18next';
import type { ProcessedData } from '../types/data';
import { HorizontalBarChart, DonutChart, StackedBarChart } from './Charts';

interface Props { data: ProcessedData; }

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="block w-1 h-5 rounded bg-[#5c6e2e] dark:bg-[#8a9a4b] shrink-0" />
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
        <ChartCard title={`${t('charts.legend')} — ${t('charts.areaPct')}`}>
          <DonutChart data={data.byLegenda} />
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
        <ChartCard title={`${t('charts.origin')} — ${t('charts.frequency')}`}>
          <HorizontalBarChart data={data.byMatOrigem} dataKey="count" label={t('charts.occurrences')} colorOffset={1} />
        </ChartCard>
        <ChartCard title={`${t('charts.origin')} — ${t('charts.areaPct')}`}>
          <DonutChart data={data.byMatOrigem} />
        </ChartCard>
      </div>
    </div>
  );
}

export function DeclivAulaSection({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.slopeAula')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={`${t('charts.slopeAula')} — ${t('charts.frequency')}`}>
          <HorizontalBarChart data={data.byDeclivAula} dataKey="count" label={t('charts.occurrences')} colorOffset={6} />
        </ChartCard>
        <ChartCard title={`${t('charts.slopeAula')} — ${t('charts.areaPct')}`}>
          <DonutChart data={data.byDeclivAula} />
        </ChartCard>
      </div>
    </div>
  );
}

export function CrossSection({ data }: Props) {
  const { t } = useTranslation();

  const soloKeys = [...new Set(data.crossSoloByUnidade.flatMap(r => Object.keys(r).filter(k => k !== 'name')))];
  const legendaKeys = [...new Set(data.crossLegendaByDecliv.flatMap(r => Object.keys(r).filter(k => k !== 'name')))];

  return (
    <div className="my-6 sm:my-8">
      <SectionTitle>{t('sections.crossAnalysis')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title={t('charts.soloByUnidade')}>
          <StackedBarChart data={data.crossSoloByUnidade} keys={soloKeys} />
        </ChartCard>
        <ChartCard title={t('charts.legendaByDecliv')}>
          <StackedBarChart data={data.crossLegendaByDecliv} keys={legendaKeys} />
        </ChartCard>
      </div>
    </div>
  );
}
