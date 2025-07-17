
import { useState, useEffect, type FC, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Update, UpdateStatus } from '../types';
import { UpdatesTableSkeleton } from './skeletons';
import ErrorDisplay from './ErrorDisplay';

const LatestUpdates: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const [updates, setUpdates] = useState<Update[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await cms.getUpdates();
            setUpdates(data);
        } catch (err) {
            console.error("Failed to fetch latest updates:", err);
            logError(err, { component: 'LatestUpdates', message: 'Failed to fetch data' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getStatusBadgeClass = (status: UpdateStatus) => {
        switch (status) {
            case UpdateStatus.NEW:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case UpdateStatus.IN_PROGRESS:
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
            case UpdateStatus.COMPLETED:
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(isDv ? 'dv-MV' : 'en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 ${isDv ? 'thaana' : ''}`}>
                        {t('latestUpdatesTitle')}
                    </h2>
                </div>

                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {isLoading ? (
                        <div className="p-4">
                            <UpdatesTableSkeleton />
                        </div>
                    ) : error ? (
                        <div className="p-4">
                             <ErrorDisplay message={error} onRetry={fetchData} />
                        </div>
                    ) : (
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
                                    <tr>
                                        <th scope="col" className="py-3 px-6">{t('updatesTable.date')}</th>
                                        <th scope="col" className="py-3 px-6">{t('updatesTable.type')}</th>
                                        <th scope="col" className="py-3 px-6">{t('updatesTable.title')}</th>
                                        <th scope="col" className="py-3 px-6">{t('updatesTable.category')}</th>
                                        <th scope="col" className="py-3 px-6 text-center">{t('updatesTable.status')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {updates.map((update, index) => (
                                        <tr key={update.id} className="bg-white dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/70 border-b dark:border-gray-700 transition-colors duration-200">
                                            <td className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                {formatDate(update.date)}
                                            </td>
                                            <td className={`py-4 px-6 ${isDv ? 'thaana' : ''}`}>
                                                {t(`updateTypes.${update.type}`)}
                                            </td>
                                            <td className={`py-4 px-6 font-semibold text-gray-800 dark:text-gray-200 ${isDv ? 'thaana' : ''}`}>
                                                {update.title[language]}
                                            </td>
                                            <td className={`py-4 px-6 ${isDv ? 'thaana' : ''}`}>
                                                <span className="bg-gray-200 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 px-2 py-1 text-xs rounded font-medium">
                                                    {t(`updateCategories.${update.category}`)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(update.status)} ${isDv ? 'thaana' : ''}`}>
                                                    {t(`updateStatus.${update.status}`)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LatestUpdates;
