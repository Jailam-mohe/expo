import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import CalendarIcon from './icons/CalendarIcon';
import LocationIcon from './icons/LocationIcon';

const HeroSection: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-white text-center p-4" 
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&blur=2&grayscale=0.5)` }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg opacity-0 animate-fade-in-up ${isDv ? 'thaana' : ''}`}>{t('heroTitle')}</h1>
        <p className={`mt-2 text-xl md:text-3xl font-medium text-cyan-300 drop-shadow-md opacity-0 animate-fade-in-up animation-delay-200 ${isDv ? 'thaana' : ''}`}>{t('heroSubtitle')}</p>
        <p className={`mt-4 max-w-2xl mx-auto text-lg md:text-xl font-normal text-gray-200 drop-shadow-md opacity-0 animate-fade-in-up animation-delay-400 ${isDv ? 'thaana' : ''}`}>{t('heroTheme')}</p>
        <div className="mt-8 space-y-4 md:space-y-0 md:space-x-8 flex flex-col md:flex-row items-center justify-center opacity-0 animate-fade-in-up" style={{animationDelay: '600ms'}}>
          <div className="flex items-center space-x-2 text-lg">
            <CalendarIcon className="w-6 h-6 text-cyan-300" />
            <span className={`${isDv ? 'thaana' : ''}`}>{t('heroDate')}</span>
          </div>
          <div className="flex items-center space-x-2 text-lg">
            <LocationIcon className="w-6 h-6 text-cyan-300" />
            <span className={`${isDv ? 'thaana' : ''}`}>{t('heroLocation')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
