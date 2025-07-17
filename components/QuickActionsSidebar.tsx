

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import PencilSquareIcon from './icons/PencilSquareIcon';
import DownloadIcon from './icons/DownloadIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';
import SparklesIcon from './icons/SparklesIcon';

interface QuickActionsSidebarProps {
    onAIGuideToggle: () => void;
}

const QuickActionButton: React.FC<{
    href?: string;
    download?: boolean;
    onClick?: () => void;
    ariaLabel: string;
    tooltip: string;
    children: React.ReactNode;
}> = ({ href, download, onClick, ariaLabel, tooltip, children }) => {
    const { language } = useLanguage();
    const isDv = language === 'dv';

    const commonProps = {
        className: "group relative flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600 text-white transition-all duration-300 hover:bg-cyan-500 md:hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
        'aria-label': ariaLabel,
    };
    
    const tooltipElement = (
         <div
            className={`hidden md:block pointer-events-none absolute top-1/2 -translate-y-1/2 ${isDv ? 'left-full ml-3' : 'right-full mr-3'} z-20 w-max origin-center scale-90 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 ${isDv ? 'thaana' : ''}`}
            role="tooltip"
        >
            {tooltip}
        </div>
    );

    if (href) {
        if (download) {
            return (
                <a href={href} download target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {children}
                    {tooltipElement}
                </a>
            );
        }
        return (
            <Link to={href} {...commonProps}>
                {children}
                {tooltipElement}
            </Link>
        );
    }
    
    return (
        <button type="button" onClick={onClick} {...commonProps}>
            {children}
            {tooltipElement}
        </button>
    );
};


const QuickActionsSidebar: React.FC<QuickActionsSidebarProps> = ({ onAIGuideToggle }) => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    
    const guideUrl = '/assets/sample-document.pdf'; // Main event guide

    return (
        <div className={`fixed z-50 bg-cyan-600/80 dark:bg-cyan-700/80 shadow-lg backdrop-blur-sm 
            md:top-1/2 md:-translate-y-1/2 ${isDv ? 'md:left-0 md:rounded-r-lg' : 'md:right-0 md:rounded-l-lg'}
            bottom-0 left-0 right-0 py-1 px-2
            md:py-2 md:px-2 md:bottom-auto md:left-auto md:right-auto md:w-auto`}>
            <div className="flex justify-around items-center max-w-sm mx-auto md:flex-col md:space-y-2 md:mx-0">
                <QuickActionButton 
                    href="/register"
                    ariaLabel={t('quickActions.register')}
                    tooltip={t('quickActions.register')}
                >
                    <PencilSquareIcon className="h-7 w-7" />
                </QuickActionButton>
                
                <QuickActionButton 
                    href={guideUrl}
                    download
                    ariaLabel={t('quickActions.downloadGuide')}
                    tooltip={t('quickActions.downloadGuide')}
                >
                    <DownloadIcon className="h-7 w-7" />
                </QuickActionButton>

                <QuickActionButton 
                    href="mailto:support@dhaalan.mv"
                    ariaLabel={t('quickActions.contactSupport')}
                    tooltip={t('quickActions.contactSupport')}
                >
                    <QuestionMarkCircleIcon className="h-7 w-7" />
                </QuickActionButton>

                <QuickActionButton 
                    onClick={onAIGuideToggle}
                    ariaLabel={t('quickActions.aiGuide')}
                    tooltip={t('quickActions.aiGuide')}
                >
                    <SparklesIcon className="h-7 w-7" />
                </QuickActionButton>
            </div>
        </div>
    );
};

export default QuickActionsSidebar;