import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface Props {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const LANGUAGES = [
  { code: 'pt-BR', label: 'PT', flag: '🇧🇷' },
  { code: 'en',   label: 'EN', flag: '🇺🇸' },
] as const;

export function Header({ theme, onToggle }: Props) {
  const { t, i18n: i18nInstance } = useTranslation();
  const currentLng = i18nInstance.language;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16 gap-3">

        <div className="flex flex-col min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-tight truncate">
            {t('header.title')}
          </h1>
          <span className="text-[0.65rem] sm:text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
            {t('header.subtitle')} · <span className="text-blue-600 dark:text-blue-400 font-medium">Daiana Rodrigues</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Language switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 gap-0.5">
            {LANGUAGES.map(({ code, label, flag }) => {
              const active = currentLng === code;
              return (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  title={label}
                  className={[
                    'flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer',
                    active
                      ? 'bg-slate-700 dark:bg-slate-600 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
                  ].join(' ')}
                >
                  <span>{flag}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Icon-only theme toggle */}
          <button
            onClick={onToggle}
            title={theme === 'dark' ? t('header.themeLight') : t('header.themeDark')}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
