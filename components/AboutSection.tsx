import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutSection: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className={`text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 ${isDv ? 'thaana' : ''}`}>
          {t('aboutTitle')}
        </h2>
        <p className={`text-lg leading-relaxed ${isDv ? 'thaana' : ''}`}>
          {t('aboutText')}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
