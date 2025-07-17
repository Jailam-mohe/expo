
import { useState, useEffect, type FC, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useParams, Link, Navigate } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Session, Speaker } from '../types';
import ClockIcon from '../components/icons/ClockIcon';
import LocationIcon from '../components/icons/LocationIcon';
import UserGroupIcon from '../components/icons/UserGroupIcon';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';
import VideoCameraIcon from '../components/icons/VideoCameraIcon';
import DownloadIcon from '../components/icons/DownloadIcon';
import { SessionDetailSkeleton } from '../components/skeletons';
import ErrorDisplay from '../components/ErrorDisplay';


const SessionDetailPage: FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const id = parseInt(sessionId || '');

    const [session, setSession] = useState<Session | null>(null);
    const [sessionSpeakers, setSessionSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!id) {
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const sessionData = await cms.getSessionById(id);
            if (sessionData) {
                const speakersData = await cms.getSpeakersByIds(sessionData.speakerIds);
                setSession(sessionData);
                setSessionSpeakers(speakersData);
            } else {
                setSession(null);
            }
        } catch (err) {
            console.error("Failed to fetch session details:", err);
            logError(err, { component: 'SessionDetailPage', sessionId: id, message: 'Failed to fetch session or speakers' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [id, t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) {
        return <SessionDetailSkeleton />;
    }

    if (error) {
        return (
             <div className="bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ErrorDisplay message={error} onRetry={fetchData} />
                </div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/schedule" replace />;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 md:p-10">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                             <p className={`text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wide ${isDv ? 'thaana' : ''}`}>{session.type}</p>
                            <h1 className={`text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 ${isDv ? 'thaana' : ''}`}>
                                {session.title[language]}
                            </h1>
                             <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-300 mt-4 space-y-2 sm:space-y-0 sm:space-x-6">
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="w-5 h-5" />
                                    <span>{t('day' + session.day.slice(-1))} | {session.time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <LocationIcon className="w-5 h-5" />
                                    <span>{session.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
                             <p className={`${isDv ? 'thaana' : ''} text-lg`}>
                                {session.description[language]}
                            </p>
                        </div>
                        
                        {/* Post-event Content */}
                        {(session.videoUrl || session.slidesUrl) && (
                           <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-8">
                                {session.videoUrl && (
                                    <div>
                                        <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-3 ${isDv ? 'thaana justify-end flex-row-reverse' : ''}`}>
                                            <VideoCameraIcon className="w-7 h-7" />
                                            <span>{t('sessionDetailPage.watchRecording')}</span>
                                        </h2>
                                        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                                            <iframe
                                                className="w-full h-full"
                                                src={session.videoUrl}
                                                title={`Recording of ${session.title[language]}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                                {session.slidesUrl && (
                                    <div>
                                         <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-3 ${isDv ? 'thaana justify-end flex-row-reverse' : ''}`}>
                                            <DownloadIcon className="w-7 h-7" />
                                            <span>{t('sessionDetailPage.resources')}</span>
                                        </h2>
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className={`flex-grow ${isDv ? 'sm:text-right' : ''}`}>
                                                <h3 className={`font-semibold text-gray-800 dark:text-gray-100 ${isDv ? 'thaana' : ''}`}>{t('sessionDetailPage.downloadSlides')}</h3>
                                                {session.slidesFileType && session.slidesFileSize && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                                                        {session.slidesFileType} &mdash; {session.slidesFileSize}
                                                    </p>
                                                )}
                                            </div>
                                            <a 
                                                href={session.slidesUrl} 
                                                download
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={`flex w-full sm:w-auto items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-cyan-700 transition-colors duration-300 ${isDv ? 'thaana flex-row-reverse' : ''}`}
                                            >
                                                <DownloadIcon className="w-5 h-5" />
                                                <span>{t('resourcesPage.download')}</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                           </div>
                        )}

                        {sessionSpeakers.length > 0 && (
                            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-3 ${isDv ? 'thaana justify-end flex-row-reverse' : ''}`}>
                                    <UserGroupIcon className="w-7 h-7" />
                                    <span>{t('sessionDetailPage.speakers')}</span>
                                </h2>
                                <div className="space-y-6">
                                    {sessionSpeakers.map(speaker => (
                                        <div key={speaker.id} className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                            <img
                                                src={speaker.photo}
                                                alt={speaker.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{speaker.name}</h3>
                                                <p className={`text-sm text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{speaker.title[language]}</p>
                                            </div>
                                            <Link
                                                to={`/speakers/${speaker.id}`}
                                                className={`flex items-center space-x-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-200 transition-colors ${isDv ? 'thaana flex-row-reverse' : ''}`}
                                            >
                                                <span>{t('sessionDetailPage.viewSpeakerProfile')}</span>
                                                <ArrowRightIcon className={`w-4 h-4 ${isDv ? 'transform rotate-180' : ''}`} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionDetailPage;
