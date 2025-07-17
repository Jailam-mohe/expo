import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SearchIcon from './icons/SearchIcon';
import CloseIcon from './icons/CloseIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const navigate = ReactRouterDOM.useNavigate();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            setTimeout(() => inputRef.current?.focus(), 100); // Timeout helps ensure focus is set after transition
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            previouslyFocusedElement.current?.focus();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Keyboard handlers (Escape and Tab trapping)
    useEffect(() => {
        if (!isOpen || !panelRef.current) return;

        const panel = panelRef.current;
        const focusableElements = Array.from(
            panel.querySelectorAll<HTMLElement>(
                'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => !el.hasAttribute('disabled'));
        
        if(focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        panel.addEventListener('keydown', handleKeyDown);
        return () => {
            panel.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/opportunities?search=${encodeURIComponent(query.trim())}`);
            onClose();
        }
    };

    const handleSuggestionClick = (path: string) => {
        navigate(path);
        onClose();
    };

    const suggestions = [
        { key: 'opportunities', path: '/opportunities' },
        { key: 'exhibitors', path: '/exhibitors' },
        { key: 'schedule', path: '/schedule' },
        { key: 'registration', path: '/register' },
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] transition-opacity duration-300 bg-gray-900/70 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
        >
            <div
                ref={panelRef}
                className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-transform duration-300 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
                style={{animationDuration: '300ms'}}
            >
                <div className="p-2">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            ref={inputRef}
                            type="search"
                            id="global-search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('search.placeholder')}
                            className={`block w-full rounded-lg border-transparent bg-gray-100 dark:bg-gray-700/50 py-4 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none sm:text-lg ${isDv ? 'thaana' : ''}`}
                        />
                    </form>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 id="search-dialog-title" className={`mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 ${isDv ? 'thaana' : ''}`}>{t('search.suggestionsTitle')}</h2>
                    <ul className="space-y-2">
                        {suggestions.map((s) => (
                            <li key={s.key}>
                                <button
                                    onClick={() => handleSuggestionClick(s.path)}
                                    className={`flex w-full items-center justify-between rounded-md p-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDv ? 'thaana flex-row-reverse' : ''}`}
                                >
                                    <span>{t(`search.suggestions.${s.key}`)}</span>
                                    <ArrowRightIcon className={`h-5 w-5 text-gray-400 ${isDv ? 'transform rotate-180' : ''}`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;