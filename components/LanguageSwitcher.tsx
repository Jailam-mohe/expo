import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

const LanguageSwitcher: FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.DV : Language.EN);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className="px-3 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label={`Switch to ${language === Language.EN ? 'Dhivehi' : 'English'}`}
      >
        {language === Language.EN ? (
          <span className="thaana">ދވ</span>
        ) : (
          'EN'
        )}
      </button>
    </div>
  );
};

export default LanguageSwitcher;