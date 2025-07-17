import { type FC } from 'react';
import XCircleIcon from './icons/XCircleIcon';
import RefreshIcon from './icons/RefreshIcon';
import { useLanguage } from '../context/LanguageContext';

interface ErrorDisplayProps {
    message: string;
    onRetry?: () => void;
}

const ErrorDisplay: FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    return (
        <div className={`text-center py-16 px-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 ${isDv ? 'thaana' : ''}`} role="alert">
            <XCircleIcon className="w-16 h-16 mx-auto text-red-400 dark:text-red-500" />
            <h2 className="mt-4 text-2xl font-semibold text-red-800 dark:text-red-200">Error</h2>
            <p className="mt-2 text-red-600 dark:text-red-300">{message}</p>
            {onRetry && (
                 <button
                    onClick={onRetry}
                    className={`mt-6 inline-flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${isDv ? 'thaana' : ''}`}
                >
                    <RefreshIcon className="w-5 h-5" />
                    <span>{t('forms.retry')}</span>
                </button>
            )}
        </div>
    );
}

export default ErrorDisplay;
