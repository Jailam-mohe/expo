import { createContext, useState, useContext, useEffect, useCallback, useMemo, type ReactNode, type FC } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
        const savedLanguage = window.localStorage.getItem('dhaalan-lang');
        return (savedLanguage as Language) || Language.EN;
    } catch (error) {
        console.warn('Could not read language from localStorage', error);
        return Language.EN;
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('dhaalan-lang', language);
        if (language === Language.DV) {
            document.documentElement.lang = 'dv';
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
    } catch (error) {
        console.warn('Could not save language to localStorage', error);
    }
  }, [language]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations[Language.EN];
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }
    return result || key;
  }, [language]);
  
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};