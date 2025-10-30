'use client';

import { useEffect, useState } from 'react';
import { languages, Language, defaultLanguage, TranslationKeys } from '~/languages';

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function detectClientLanguage(): Language {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language?.toLowerCase() || navigator.languages?.[0]?.toLowerCase() || 'en';
    if (lang.startsWith('tr')) return 'tr';
  }
  return defaultLanguage;
}

export function useTranslation(): { t: TranslationKeys; language: Language } {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const cookieLang = readCookie('lang');
    if (cookieLang === 'tr' || cookieLang === 'en') {
      setLanguage(cookieLang as Language);
    } else {
      setLanguage(detectClientLanguage());
    }
  }, []);

  const t = languages[language];
  return { t, language };
}