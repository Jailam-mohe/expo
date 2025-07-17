
import { useState, useEffect, type FC, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Speaker } from '../types';
import { SpeakerCardSkeleton } from '../components/skeletons';
import ErrorDisplay from '../components/ErrorDisplay';

const SpeakersPage: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await cms.getSpeakers();
            setSpeakers(data);
        } catch (err) {
            console.error("Failed to fetch speakers:", err);
            logError(err, { component: 'SpeakersPage', message: 'Failed to fetch data' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('speakersPage.title')}</h1>
                    <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isDv ? 'thaana' : ''}`}>
                        {t('speakersPage.text')}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SpeakerCardSkeleton key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <ErrorDisplay message={error} onRetry={fetchData} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {speakers.map(speaker => (
                            <Link 
                                to={`/speakers/${speaker.id}`}
                                key={speaker.id} 
                                className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="relative pt-[100%]">
                                    <img src={speaker.photo} alt={speaker.name} className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{speaker.name}</h3>
                                    <p className={`text-sm text-cyan-600 dark:text-cyan-400 font-medium mt-1 ${isDv ? 'thaana' : ''}`}>
                                        {speaker.title[language]}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeakersPage;
