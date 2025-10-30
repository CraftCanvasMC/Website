import { en } from './en';
import { tr } from './tr';

export const languages = {
  en,
  tr,
} as const;

export type Language = keyof typeof languages;
export type TranslationKeys = typeof en;

export const defaultLanguage: Language = 'en';

export const languageNames = {
  en: 'English',
  tr: 'Turkish',
} as const;