
import { useState, useEffect, type FC, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useParams, Link, Navigate } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Speaker, Session } from '../types';
import ClockIcon from '../components/icons/ClockIcon';
import LocationIcon from '../components/icons/LocationIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import { SpeakerDetailSkeleton } from '../components/skeletons';
import ErrorDisplay from '../components/ErrorDisplay';

const SpeakerDetailPage: FC = () => {
    const { speakerId } = useParams<{ speakerId: string }>();
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const id = parseInt(speakerId || '');

    const [speaker, setSpeaker] = useState<Speaker | null>(null);
    const [speakerSessions, setSpeakerSessions] = useState<Session[]>([]);
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
            const [speakerData, sessionsData] = await Promise.all([
                cms.getSpeakerById(id),
                cms.getSessionsBySpeakerId(id)
            ]);
            setSpeaker(speakerData ?? null);
            setSpeakerSessions(sessionsData);
        } catch (err) {
            console.error("Failed to fetch speaker details:", err);
            logError(err, { component: 'SpeakerDetailPage', speakerId: id, message: 'Failed to fetch speaker or sessions' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [id, t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) {
        return <SpeakerDetailSkeleton />;
    }

    if (error) {
        return (
             <div className="bg-gray-100 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ErrorDisplay message={error} onRetry={fetchData} />
                </div>
            </div>
        );
    }

    if (!speaker) {
        return <Navigate to="/speakers" replace />;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                            <img
                                src={speaker.photo}
                                alt={speaker.name}
                                className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
                                loading="lazy"
                            />
                            <h1 className="text-3xl font-bold mt-4 text-center text-gray-900 dark:text-white">{speaker.name}</h1>
                            <p className={`text-center text-cyan-600 dark:text-cyan-400 mt-1 ${isDv ? 'thaana' : ''}`}>
                                {speaker.title[language]}
                            </p>
                            {speaker.socials && (
                                <div className="flex space-x-4 mt-4">
                                    {speaker.socials.linkedin && speaker.socials.linkedin !== '#' && (
                                        <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400">
                                            <LinkedInIcon className="w-6 h-6" />
                                        </a>
                                    )}
                                     {speaker.socials.twitter && speaker.socials.twitter !== '#' && (
                                        <a href={speaker.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400">
                                            <TwitterIcon className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/3 p-6 md:p-8">
                            <div className="mb-8">
                                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-3 ${isDv ? 'thaana' : ''}`}>
                                    {t('speakerDetailPage.biography')}
                                </h2>
                                <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isDv ? 'thaana' : ''}`}>
                                    {speaker.bio[language]}
                                </p>
                            </div>

                            <div>
                                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 ${isDv ? 'thaana' : ''}`}>
                                    {t('speakerDetailPage.sessionsBySpeaker')}
                                </h2>
                                <div className="space-y-4">
                                    {speakerSessions.length > 0 ? speakerSessions.map(session => (
                                        <Link
                                            to={`/schedule/${session.id}`}
                                            key={session.id}
                                            className="block p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-l-4 border-cyan-500"
                                        >
                                            <h3 className={`font-semibold text-lg text-gray-800 dark:text-gray-100 ${isDv ? 'thaana' : ''}`}>{session.title[language]}</h3>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2 space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <ClockIcon className="w-4 h-4" />
                                                    <span>{t('day' + session.day.slice(-1))} | {session.time}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <LocationIcon className="w-4 h-4" />
                                                    <span>{session.location}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    )) : (
                                        <p className={`text-gray-500 dark:text-gray-400 ${isDv ? 'thaana' : ''}`}>No sessions scheduled for this speaker.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakerDetailPage;
