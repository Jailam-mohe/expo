
import { useState, useEffect, type FC, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { NewsArticle, Update, ImportantInfo, UpdateType, UpdateStatus } from '../types';
import { NewsArticleCardSkeleton } from '../components/skeletons';
import MegaphoneIcon from '../components/icons/MegaphoneIcon';
import InformationCircleIcon from '../components/icons/InformationCircleIcon';
import ErrorDisplay from '../components/ErrorDisplay';

type Tab = 'latestNews' | 'announcements' | 'importantInfo';

const NewsPage: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';

    const [activeTab, setActiveTab] = useState<Tab>('latestNews');
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [announcements, setAnnouncements] = useState<Update[]>([]);
    const [importantInfo, setImportantInfo] = useState<ImportantInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [newsData, updatesData, infoData] = await Promise.all([
                cms.getNews(),
                cms.getUpdates(),
                cms.getImportantInfo()
            ]);
            const sortedUpdates = [...updatesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setNews(newsData);
            setAnnouncements(sortedUpdates.filter(u => u.type === UpdateType.ANNOUNCEMENT));
            setImportantInfo(infoData);
        } catch (err) {
            console.error("Failed to fetch news page data:", err);
            logError(err, { component: 'NewsPage', message: 'Failed to fetch data' });
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
            case UpdateStatus.NEW: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case UpdateStatus.IN_PROGRESS: return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
            case UpdateStatus.COMPLETED: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const renderTab = (tabKey: Tab, label: string) => (
        <button
            onClick={() => setActiveTab(tabKey)}
            className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${isDv ? 'thaana' : ''} ${activeTab === tabKey ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            role="tab"
            aria-selected={activeTab === tabKey}
        >
            {label}
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'latestNews':
                return (
                    <div className="space-y-8">
                        {news.map(article => (
                            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden md:flex transform hover:scale-105 transition-transform duration-300 ease-out">
                                <div className="md:w-1/3">
                                    <img src={article.image} alt={article.alt[language]} className="w-full h-48 md:h-full object-cover" loading="lazy" />
                                </div>
                                <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(article.date).toLocaleDateString(language === 'dv' ? 'dv-MV' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-3 ${isDv ? 'thaana' : ''}`}>
                                        {article.title[language]}
                                    </h2>
                                    <p className={`text-gray-700 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
                                        {article.excerpt[language]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'announcements':
                return (
                     <div className="space-y-4">
                        {announcements.map(ann => (
                            <div key={ann.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-cyan-500 flex items-start gap-4">
                               <MegaphoneIcon className="w-8 h-8 text-cyan-500 flex-shrink-0 mt-1"/>
                                <div className="flex-grow">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                         <h2 className={`text-xl font-bold text-gray-900 dark:text-white ${isDv ? 'thaana' : ''}`}>{ann.title[language]}</h2>
                                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 flex-shrink-0">{new Date(ann.date).toLocaleDateString(language === 'dv' ? 'dv-MV' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div className="mt-2">
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(ann.status)} ${isDv ? 'thaana' : ''}`}>
                                            {t(`updateStatus.${ann.status}`)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'importantInfo':
                return (
                    <div className="space-y-6">
                        {importantInfo.map(info => (
                           <div key={info.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-amber-500">
                               <div className="flex items-center gap-4 mb-4">
                                   <InformationCircleIcon className="w-8 h-8 text-amber-500 flex-shrink-0"/>
                                   <h2 className={`text-2xl font-bold text-gray-900 dark:text-white ${isDv ? 'thaana' : ''}`}>{info.title[language]}</h2>
                               </div>
                               <div className={`prose dark:prose-invert max-w-none markdown-content ${isDv ? 'thaana' : ''}`}>
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {info.content[language]}
                                  </ReactMarkdown>
                               </div>
                           </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('newsPage.title')}</h1>
                    <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isDv ? 'thaana' : ''}`}>
                        {t('newsPage.text')}
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    {isLoading ? (
                        <div className="space-y-8">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <NewsArticleCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <ErrorDisplay message={error} onRetry={fetchData} />
                    ) : (
                        <>
                            <div className="flex border-b-4 border-cyan-600 mb-8 overflow-x-auto" role="tablist" aria-label="News and Information">
                                {renderTab('latestNews', t('newsPage.tabLatestNews'))}
                                {renderTab('announcements', t('newsPage.tabAnnouncements'))}
                                {renderTab('importantInfo', t('newsPage.tabImportantInfo'))}
                            </div>
                            <div role="tabpanel">
                                {renderContent()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
