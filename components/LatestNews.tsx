
import React, { useState, useEffect, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { NewsArticle } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { LatestNewsCardSkeleton } from './skeletons';
import ErrorDisplay from './ErrorDisplay';

const LatestNews: React.FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';
  const [latestArticles, setLatestArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const data = await cms.getNews(2); // Fetch only 2 latest articles
        setLatestArticles(data);
    } catch (err) {
        console.error("Failed to fetch latest news:", err);
        logError(err, { component: 'LatestNews', message: 'Failed to fetch data' });
        setError(t('forms.dataFetchError'));
    } finally {
        setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 ${isDv ? 'thaana' : ''}`}>
            {t('latestNewsTitle')}
          </h2>
        </div>
        
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                <LatestNewsCardSkeleton />
                <LatestNewsCardSkeleton />
            </div>
        ) : error ? (
            <div className="max-w-5xl mx-auto mb-12">
                <ErrorDisplay message={error} onRetry={fetchData} />
            </div>
        ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                {latestArticles.map(article => (
                    <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                    <img src={article.image} alt={article.alt[language]} className="w-full h-48 object-cover" loading="lazy"/>
                    <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(article.date).toLocaleDateString(language === 'dv' ? 'dv-MV' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 flex-grow ${isDv ? 'thaana' : ''}`}>
                        {article.title[language]}
                        </h3>
                        <p className={`text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
                        {article.excerpt[language]}
                        </p>
                    </div>
                    </div>
                ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/news"
                        className={`inline-flex items-center gap-3 bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors duration-300 ${isDv ? 'thaana' : ''}`}
                    >
                        <span>{t('viewAllNews')}</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
            </>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
