import { useState, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LocationIcon from '../components/icons/LocationIcon';
import ExpoMap from '../components/ExpoMap';
import { Zone } from '../types';


const VenuePage: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null);
  const [clickedZone, setClickedZone] = useState<Zone | null>(null);

  const displayedZone = clickedZone || hoveredZone;
  const zones = Object.values(Zone);

  const handleZoneClick = (zone: Zone) => {
    setClickedZone(prev => (prev === zone ? null : zone));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('venueTitle')}</h1>
        </div>

        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Map Section */}
                <div className="lg:w-2/3">
                    <div className="flex items-center mb-4">
                      <LocationIcon className="h-7 w-7 text-cyan-500" />
                      <h2 className={`ml-3 text-2xl font-bold text-gray-900 dark:text-white ${isDv ? 'thaana' : ''}`}>{t('venueLocation')}</h2>
                    </div>
                    <p className={`mb-4 text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>{t('venueText')}</p>
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
                        <ExpoMap clickedZone={clickedZone} setHoveredZone={setHoveredZone} onZoneClick={handleZoneClick} />
                    </div>
                     <p className={`mt-2 text-sm text-center text-gray-500 dark:text-gray-400 lg:hidden ${isDv ? 'thaana' : ''}`}>
                        {t('clickZoneInstruction')}
                    </p>
                </div>
                {/* Zone Info Section */}
                <div className="lg:w-1/3">
                    <div className="h-full bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                        <h3 className={`text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 text-center ${isDv ? 'thaana' : ''}`}>
                            {displayedZone ? t(`zones.${displayedZone}`) : t('venueZoneListTitle')}
                        </h3>
                        <div className={`text-gray-700 dark:text-gray-300 ${isDv ? 'thaana' : ''} mb-4 min-h-[6rem]`}>
                            {displayedZone ? (
                                <p className="text-center">{t(`zoneDescriptions.${displayedZone}`)}</p>
                            ) : (
                                <p className="italic text-center">{t('clickZoneInstruction')}</p>
                            )}
                        </div>
                        <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                            {zones.map(zone => (
                                <button
                                    key={zone}
                                    onMouseEnter={() => setHoveredZone(zone)}
                                    onMouseLeave={() => setHoveredZone(null)}
                                    onClick={() => handleZoneClick(zone)}
                                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-offset-gray-800 ${isDv ? 'thaana text-right' : ''} ${clickedZone === zone ? 'bg-cyan-600 text-white font-semibold' : 'hover:bg-cyan-100 dark:hover:bg-cyan-900/50'}`}
                                >
                                    {t(`zones.${zone}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <a 
                    href="https://www.google.com/maps/place/Central+Park/@4.215584,73.542866,17z" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-block bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 ${isDv ? 'thaana' : ''}`}
                >
                    {t('venueViewOnMap')}
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenuePage;