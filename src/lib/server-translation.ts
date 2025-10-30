import { headers, cookies } from 'next/headers';
import { languages, defaultLanguage, type Language } from '~/languages';

async function detectLanguageFromHeaders(): Promise<Language> {
  try {
    const hdrs = await headers();
    const acceptLang = hdrs.get('accept-language') || '';
    if (acceptLang.toLowerCase().includes('tr')) return 'tr';
    return 'en';
  } catch {
    return defaultLanguage;
  }
}

export async function getServerTranslation() {
  let lang: Language = defaultLanguage;

  try {
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get('lang')?.value as Language | undefined;
    if (cookieLang && cookieLang in languages) {
      lang = cookieLang;
    } else {
      lang = await detectLanguageFromHeaders();
    }
  } catch {
    lang = await detectLanguageFromHeaders();
  }

  const t = languages[lang];
  return { t, language: lang };
}