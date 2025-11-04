import { writable, derived, get } from 'svelte/store';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'pt' | 'ru';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [lang: string]: Translation;
}

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const STORAGE_KEY = 'language-preference';

function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANGUAGES.some(l => l.code === stored)) {
    return stored as Language;
  }
  
  const browserLang = navigator.language.split('-')[0];
  const found = LANGUAGES.find(l => l.code === browserLang);
  return found ? (found.code as Language) : 'en';
}

export const currentLanguage = writable<Language>(
  typeof window !== 'undefined' ? getBrowserLanguage() : 'en'
);

const translations = writable<Translations>({});

export async function loadTranslations(lang: Language) {
  try {
    const module = await import(`./translations/${lang}.ts`);
    translations.update(t => ({
      ...t,
      [lang]: module.default,
    }));
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
  }
}

export function setLanguage(lang: Language) {
  currentLanguage.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
  }
  loadTranslations(lang);
}

function getNestedTranslation(obj: Translation, path: string): string {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }
  
  return typeof current === 'string' ? current : path;
}

export const t = derived(
  [currentLanguage, translations],
  ([$currentLanguage, $translations]) => {
    return (key: string, fallback?: string): string => {
      const langTranslations = $translations[$currentLanguage];
      if (!langTranslations) {
        return fallback || key;
      }
      
      const translation = getNestedTranslation(langTranslations, key);
      return translation === key ? (fallback || key) : translation;
    };
  }
);

export async function initI18n() {
  const lang = getBrowserLanguage();
  await loadTranslations(lang);
  currentLanguage.set(lang);
}
