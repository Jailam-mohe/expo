import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage: React.FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';

    return (
        <div className="min-h-[60vh] flex items-center justify-center text-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl font-extrabold text-cyan-600 dark:text-cyan-400">404</h1>
                <h2 className={`mt-4 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white ${isDv ? 'thaana' : ''}`}>
                    {t('notFound.title')}
                </h2>
                <p className={`mt-2 text-lg text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
                    {t('notFound.message')}
                </p>
                <Link
                    to="/"
                    className={`mt-8 inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors duration-300 ${isDv ? 'thaana' : ''}`}
                >
                    {t('notFound.goHome')}
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
