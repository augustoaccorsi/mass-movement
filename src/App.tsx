import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

import { useLocalStorage } from './hooks/useLocalStorage';
import { loadData } from './utils/dataLoader';
import type { ProcessedData } from './types/data';
import { useState } from 'react';

import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { CombinationsTable } from './components/CombinationsTable';
import {
  UnidadeSection,
  SoilSection,
  LandCoverSection,
  TerrainSection,
  GeologySection,
  DrainageSection,
} from './components/Sections';

type Theme = 'light' | 'dark';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function App() {
  const { t } = useTranslation();

  // Persist theme; null means "follow system"
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme | null>('mm-theme', null);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const theme: Theme = storedTheme ?? systemTheme;

  // Apply dark class to <html> and base bg/text on body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.className = theme === 'dark'
      ? 'bg-slate-950 text-slate-100'
      : 'bg-slate-100 text-slate-900';
  }, [theme]);

  // Track system theme changes (only active when user hasn't overridden)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent): void =>
      setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setStoredTheme(prev => {
      const current = prev ?? systemTheme;
      return current === 'dark' ? 'light' : 'dark';
    });
  }, [setStoredTheme, systemTheme]);

  const [data, setData] = useState<ProcessedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData()
      .then(setData)
      .catch(e => setError(String(e)));
  }, []);

  if (error) {
    return (
      <>
        <Header theme={theme} onToggle={toggleTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-slate-500 dark:text-slate-400">
            <span className="text-4xl">⚠️</span>
            <p>{t('error')}</p>
            <code className="text-xs text-red-500 dark:text-red-400">{error}</code>
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header theme={theme} onToggle={toggleTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-slate-500 dark:text-slate-400">
            <div className="spinner" />
            <p>{t('loading')}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header theme={theme} onToggle={toggleTheme} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <StatsCards data={data} />

        <div className="my-6 sm:my-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="block w-1 h-5 rounded bg-blue-600 dark:bg-blue-400 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
              {t('sections.combinations')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {t('sections.combinationsSubtitle')}
          </p>
          <CombinationsTable combinations={data.topCombinations} totalRows={data.totalRows} />
        </div>

        <UnidadeSection data={data} />
        <SoilSection data={data} />
        <LandCoverSection data={data} />
        <TerrainSection data={data} />
        <GeologySection data={data} />
        <DrainageSection data={data} />
      </div>
    </>
  );
}
