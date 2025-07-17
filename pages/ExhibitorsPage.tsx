
import { useState, useEffect, type FC, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Zone, Exhibitor, Opportunity } from '../types';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useSearchParams } = ReactRouterDOM;
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import { ExhibitorCardSkeleton } from '../components/skeletons';
import OfficeBuildingIcon from '../components/icons/OfficeBuildingIcon';
import RefreshIcon from '../components/icons/RefreshIcon';
import ErrorDisplay from '../components/ErrorDisplay';

const ExhibitorsPage: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';
  const [searchParams] = useSearchParams();

  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('');

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
        setSearchTerm(query);
    }
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const [exhibitorsData, opportunitiesData] = await Promise.all([
            cms.getExhibitors(),
            cms.getOpportunities()
        ]);
        setExhibitors(exhibitorsData);
        setOpportunities(opportunitiesData);
    } catch (err) {
        console.error("Failed to fetch exhibitors page data:", err);
        logError(err, { component: 'ExhibitorsPage', message: 'Failed to fetch exhibitors or opportunities' });
        setError(t('forms.dataFetchError'));
    } finally {
        setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const zones = Object.values(Zone);

  const filteredExhibitors = exhibitors.filter(exhibitor => {
    const nameMatches = exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const zoneMatches = selectedZone ? exhibitor.zone === selectedZone : true;
    return nameMatches && zoneMatches;
  });
  
  const getOpportunityCount = (exhibitorName: string) => {
    return opportunities.filter(op => op.exhibitorName === exhibitorName).length;
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedZone('');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('exhibitorsTitle')}</h1>
          <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isDv ? 'thaana' : ''}`}>
            {t('exhibitorsText')}
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className={`flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto ${isDv ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-grow">
                <input 
                    type="text"
                    placeholder={t('searchExhibitors')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`}
                    disabled={isLoading || !!error}
                />
            </div>
            <div className="w-full md:w-1/3">
                 <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`}
                    aria-label={t('filterByZone')}
                    disabled={isLoading || !!error}
                 >
                    <option value="">{t('allZones')}</option>
                    {zones.map(zone => (
                        <option key={zone} value={zone} className={isDv ? 'thaana' : ''}>
                          {t(`zones.${zone}`)}
                        </option>
                    ))}
                 </select>
            </div>
        </div>

        {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ExhibitorCardSkeleton key={i} />
                ))}
            </div>
        ) : error ? (
            <ErrorDisplay message={error} onRetry={fetchData} />
        ) : filteredExhibitors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredExhibitors.map((exhibitor) => {
                const opportunityCount = getOpportunityCount(exhibitor.name);
                return (
                    <div key={exhibitor.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
                        <div className="p-6 flex flex-col items-center text-center flex-grow">
                            <img src={exhibitor.logo} alt={`${exhibitor.name} logo`} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200 dark:border-gray-700" loading="lazy"/>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exhibitor.name}</h3>
                            {opportunityCount > 0 && (
                                <Link 
                                    to={`/opportunities?exhibitor=${encodeURIComponent(exhibitor.name)}`}
                                    className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold py-1 px-3 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDv ? 'thaana' : ''}`}
                                >
                                    <BriefcaseIcon className="w-4 h-4" />
                                    {opportunityCount} {t('opportunitiesAvailable')}
                                </Link>
                            )}
                        </div>
                        <div className={`p-2 bg-gray-100 dark:bg-gray-700 text-center ${isDv ? 'thaana' : ''}`}>
                            <p className="text-sm text-cyan-600 dark:text-cyan-300 font-semibold">{t(`zones.${exhibitor.zone}`)}</p>
                        </div>
                    </div>
                )
            })}
            </div>
        ) : (
            <div className="text-center py-16">
                <OfficeBuildingIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                <h2 className={`mt-4 text-2xl font-semibold text-gray-800 dark:text-white ${isDv ? 'thaana' : ''}`}>{t('noExhibitorsFound')}</h2>
                <p className={`mt-2 text-gray-600 dark:text-gray-400 ${isDv ? 'thaana' : ''}`}>{t('noExhibitorsFoundDescription')}</p>
                <button
                    onClick={handleClearFilters}
                    className={`mt-6 inline-flex items-center gap-2 bg-cyan-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${isDv ? 'thaana' : ''}`}
                >
                    <RefreshIcon className="w-5 h-5" />
                    <span>{t('clearFilters')}</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitorsPage;
