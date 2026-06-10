import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';

const STORAGE_KEY = 'mm-lang';

function getSavedLang(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? 'pt-BR';
  } catch {
    return 'pt-BR';
  }
}

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    en: { translation: en },
  },
  lng: getSavedLang(),
  fallbackLng: 'pt-BR',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng: string) => {
  try { localStorage.setItem(STORAGE_KEY, lng); } catch { /* quota */ }
});

export default i18n;
