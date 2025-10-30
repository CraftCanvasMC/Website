'use client';

import { ChevronDown, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Language, languageNames } from '~/languages';

interface LanguageSelectorProps {
  currentLanguage: Language;
}

export function LanguageSelector({ currentLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language: Language) => {
    setIsOpen(false);
    // Set language cookie and reload to reflect translations
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `lang=${language};path=/;max-age=${oneYear};samesite=lax`;
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
        aria-label="Select language"
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{languageNames[currentLanguage]}</span>
        <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-neutral-900/95 backdrop-blur-sm border border-white/10 rounded-md shadow-lg z-50">
          <div className="py-1">
            {Object.entries(languageNames).map(([lang, name]) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang as Language)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  currentLanguage === lang
                    ? 'bg-white/10 text-white'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}