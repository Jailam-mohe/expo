
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Resource, ResourceCategory, ResourceType } from '../types';
import { ResourceItemSkeleton } from '../components/skeletons';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import ArchiveIcon from '../components/icons/ArchiveIcon';
import DownloadIcon from '../components/icons/DownloadIcon';
import ErrorDisplay from '../components/ErrorDisplay';

const ResourcesPage: React.FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';

    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const categories = Object.values(ResourceCategory);
    const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>(categories[0]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await cms.getResources();
            setResources(data);
        } catch (err) {
            console.error("Failed to fetch resources:", err);
            logError(err, { component: 'ResourcesPage', message: 'Failed to fetch data' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredResources = useMemo(() => {
        if(isLoading || error) return [];
        return resources.filter(r => r.category === selectedCategory);
    }, [resources, selectedCategory, isLoading, error]);

    const getFileIcon = (type: ResourceType) => {
        const iconClass = "w-10 h-10 text-cyan-600 dark:text-cyan-400";
        switch (type) {
            case ResourceType.PDF:
            case ResourceType.DOCX:
                return <DocumentTextIcon className={iconClass} />;
            case ResourceType.ZIP:
                return <ArchiveIcon className={iconClass} />;
            default:
                return <DocumentTextIcon className={iconClass} />;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('resourcesPage.title')}</h1>
                    <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isDv ? 'thaana' : ''}`}>
                        {t('resourcesPage.text')}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className={`md:w-1/4 lg:w-1/5 ${isDv ? 'md:order-2' : ''}`}>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg sticky top-24">
                            <h3 className={`text-lg font-bold mb-4 px-2 ${isDv ? 'thaana text-right' : ''}`}>{t('resourcesPage.categories')}</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        disabled={isLoading || !!error}
                                        className={`w-full text-left p-3 rounded-md transition-colors duration-200 text-sm font-medium flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${isDv ? 'thaana text-right flex-row-reverse' : ''} ${selectedCategory === category
                                                ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        {t(`resourcesPage.resourceCategories.${category}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={`flex-grow ${isDv ? 'md:order-1' : ''}`}>
                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <ResourceItemSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <ErrorDisplay message={error} onRetry={fetchData} />
                        ) : filteredResources.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {filteredResources.map(resource => (
                                    <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transform hover:-translate-y-1 transition-transform duration-300 flex flex-col sm:flex-row items-center gap-5">
                                        <div className="flex-shrink-0">{getFileIcon(resource.type)}</div>
                                        <div className={`flex-grow ${isDv ? 'text-right' : ''}`}>
                                            <h4 className={`text-lg font-bold text-gray-900 dark:text-white ${isDv ? 'thaana' : ''}`}>{resource.title[language]}</h4>
                                            <p className={`mt-1 text-sm text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>{resource.description[language]}</p>
                                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono">{resource.type} &mdash; {resource.fileSize}</p>
                                        </div>
                                        <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                                            <a
                                                href={resource.fileUrl}
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
                                ))}
                            </div>
                        ) : (
                            <div className={`text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg ${isDv ? 'thaana' : ''}`}>
                                <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-400" />
                                <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">{t('resourcesPage.noResourcesFound')}</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
