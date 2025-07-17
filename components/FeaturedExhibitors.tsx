
import { useState, useEffect, type FC, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Exhibitor } from '../types';
import { FeaturedExhibitorSkeleton } from './skeletons';
import ErrorDisplay from './ErrorDisplay';

const FeaturedExhibitors: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const [featured, setFeatured] = useState<Exhibitor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await cms.getFeaturedExhibitors();
            setFeatured(data);
        } catch (err) {
            console.error("Failed to fetch featured exhibitors:", err);
            logError(err, { component: 'FeaturedExhibitors', message: 'Failed to fetch data' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-6 ${isDv ? 'thaana' : ''}`}>
                        {t('featuredExhibitorsTitle')}
                    </h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
                        {Array.from({ length: 4 }).map((_, i) => (
                           <FeaturedExhibitorSkeleton key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="max-w-4xl mx-auto mb-12">
                        <ErrorDisplay message={error} onRetry={fetchData} />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
                            {featured.map(exhibitor => (
                                <div key={exhibitor.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700/50 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2">
                                    <img 
                                        src={exhibitor.logo} 
                                        alt={`${exhibitor.name} logo`} 
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4 border-4 border-gray-200 dark:border-gray-600"
                                        loading="lazy"
                                    />
                                    <h3 className="text-base md:text-lg font-bold text-center text-gray-800 dark:text-gray-100">{exhibitor.name}</h3>
                                </div>
                            ))}
                        </div>
                        
                        <div className="text-center">
                            <Link 
                                to="/exhibitors" 
                                className={`inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors duration-300 ${isDv ? 'thaana' : ''}`}
                            >
                                {t('viewAllExhibitors')}
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default FeaturedExhibitors;
