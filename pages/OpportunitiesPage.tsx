
import { useState, useMemo, useEffect, type FC, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useSearchParams, Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { OpportunityType, Zone, Opportunity, Exhibitor } from '../types';
import LocationIcon from '../components/icons/LocationIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import TagIcon from '../components/icons/TagIcon';
import { OpportunityCardSkeleton } from '../components/skeletons';
import RefreshIcon from '../components/icons/RefreshIcon';
import ErrorDisplay from '../components/ErrorDisplay';

const OpportunitiesPage: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';
  const [searchParams] = useSearchParams();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedZone, setSelectedZone] = useState('');

  useEffect(() => {
    const queryFromUrl = searchParams.get('exhibitor') || searchParams.get('search');
    if (queryFromUrl) {
      setSearchTerm(queryFromUrl);
    }
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const [oppsData, exhibitorsData] = await Promise.all([
            cms.getOpportunities(),
            cms.getExhibitors()
        ]);
        setOpportunities(oppsData);
        setExhibitors(exhibitorsData);
    } catch (err) {
        console.error("Failed to fetch opportunities page data:", err);
        logError(err, { component: 'OpportunitiesPage', message: 'Failed to fetch opportunities or exhibitors' });
        setError(t('forms.dataFetchError'));
    } finally {
        setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const opportunityTypes = Object.values(OpportunityType);
  const zones = Object.values(Zone);

  const exhibitorLogos = useMemo(() => 
    new Map(exhibitors.map(ex => [ex.name, ex.logo])), 
  [exhibitors]);

  const filteredOpportunities = useMemo(() => {
    if (isLoading || error) return [];
    return opportunities.filter(op => {
      const searchMatch = searchTerm === '' ||
        op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.exhibitorName.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = selectedType === '' || op.type === selectedType;
      const zoneMatch = selectedZone === '' || op.zone === selectedZone;
      return searchMatch && typeMatch && zoneMatch;
    });
  }, [searchTerm, selectedType, selectedZone, opportunities, isLoading, error]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedZone('');
  };
  
  const ApplyButton: FC<{ op: Opportunity; isMobile?: boolean }> = ({ op, isMobile }) => {
    const canApply = op.url && op.url !== '#';
    const baseClasses = `font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${isDv ? 'thaana' : ''}`;
    const mobileClasses = isMobile ? 'sm:hidden mt-4 block w-full text-center' : 'hidden sm:inline-block';
    
    if (canApply) {
        return (
            <a href={op.url} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${mobileClasses} bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-offset-gray-800`}>
                {t('opportunitiesPage.applyNow')}
            </a>
        );
    }

    return (
        <button disabled className={`${baseClasses} ${mobileClasses} bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed`}>
            {t('opportunitiesPage.applyNow')}
        </button>
    );
  };
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('opportunitiesPage.title')}</h1>
          <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isDv ? 'thaana' : ''}`}>
            {t('opportunitiesPage.text')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`md:w-1/4 lg:w-1/5 ${isDv ? 'md:order-2' : ''}`}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg sticky top-24">
              <h3 className={`text-xl font-bold mb-4 ${isDv ? 'thaana' : ''}`}>{t('filterByZone')}</h3>
              <div className="space-y-4">
                 <div>
                  <label htmlFor="search-term" className="sr-only">{t('opportunitiesPage.searchPlaceholder')}</label>
                  <input
                    id="search-term"
                    type="text"
                    placeholder={t('opportunitiesPage.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`}
                    disabled={isLoading || !!error}
                  />
                </div>
                <div>
                    <label htmlFor="type-filter" className={`block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 ${isDv ? 'thaana' : ''}`}>{t('opportunitiesPage.filterByType')}</label>
                    <select
                        id="type-filter"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`}
                        disabled={isLoading || !!error}
                    >
                        <option value="">{t('opportunitiesPage.allTypes')}</option>
                        {opportunityTypes.map(type => (
                            <option key={type} value={type} className={isDv ? 'thaana' : ''}>{t(`opportunityTypes.${type}`)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="zone-filter" className={`block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 ${isDv ? 'thaana' : ''}`}>{t('filterByZone')}</label>
                    <select
                        id="zone-filter"
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`}
                        disabled={isLoading || !!error}
                    >
                        <option value="">{t('allZones')}</option>
                        {zones.map(zone => (
                            <option key={zone} value={zone} className={isDv ? 'thaana' : ''}>{t(`zones.${zone}`)}</option>
                        ))}
                    </select>
                </div>
              </div>
              <button 
                  onClick={handleClearFilters}
                  className={`mt-6 w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-offset-gray-800 ${isDv ? 'thaana' : ''}`}
                  disabled={isLoading || !!error}
              >
                  <RefreshIcon className="w-5 h-5" />
                  <span>{t('clearFilters')}</span>
              </button>
            </div>
          </aside>

          {/* Opportunities List */}
          <main className={`flex-grow ${isDv ? 'md:order-1' : ''}`}>
            {isLoading ? (
                <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <OpportunityCardSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <ErrorDisplay message={error} onRetry={fetchData} />
            ) : filteredOpportunities.length > 0 ? (
                <div className="space-y-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {filteredOpportunities.length} {t('opportunitiesPage.resultsFound')}
                    </p>
                    {filteredOpportunities.map(op => (
                        <div key={op.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <Link to={`/opportunities?exhibitor=${encodeURIComponent(op.exhibitorName)}`} className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-full">
                                        <img src={exhibitorLogos.get(op.exhibitorName) || 'https://picsum.photos/seed/placeholder/200'} alt={`${op.exhibitorName} logo`} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" loading="lazy"/>
                                    </Link>
                                    <div className="flex-grow">
                                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${isDv ? 'thaana' : ''}`}>{op.title}</h3>
                                        <Link to={`/opportunities?exhibitor=${encodeURIComponent(op.exhibitorName)}`} className="text-md text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md">{op.exhibitorName}</Link>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            <LocationIcon className="w-4 h-4" />
                                            <span>{op.location}</span>
                                        </div>
                                    </div>
                                    <ApplyButton op={op} />
                                </div>
                                <p className={`mt-4 text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>{op.description}</p>
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 text-sm font-medium">
                                        <BriefcaseIcon className="w-4 h-4" />
                                        <span className={isDv ? 'thaana' : ''}>{t(`opportunityTypes.${op.type}`)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-sm font-medium">
                                        <TagIcon className="w-4 h-4" />
                                        <span className={isDv ? 'thaana' : ''}>{t(`zones.${op.zone}`)}</span>
                                    </div>
                                </div>
                                <ApplyButton op={op} isMobile={true} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg ${isDv ? 'thaana' : ''}`}>
                    <BriefcaseIcon className="w-16 h-16 mx-auto text-gray-400" />
                    <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">{t('opportunitiesPage.noOpportunitiesFound')}</p>
                    <button
                        onClick={handleClearFilters}
                        className={`mt-6 inline-flex items-center gap-2 bg-cyan-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${isDv ? 'thaana' : ''}`}
                    >
                        <RefreshIcon className="w-5 h-5" />
                        <span>{t('clearFilters')}</span>
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
