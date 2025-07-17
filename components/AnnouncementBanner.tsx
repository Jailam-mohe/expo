
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Announcement } from '../types';
import CloseIcon from './icons/CloseIcon';

const AnnouncementBanner: React.FC = () => {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        cms.getAnnouncements().then(setAnnouncements).catch(err => {
            console.error("Failed to fetch announcements:", err);
            logError(err, { component: 'AnnouncementBanner', message: 'Failed to fetch announcements' });
            // This is a non-critical component, so we just log the error and don't render the banner.
        });
    }, []);

    useEffect(() => {
        if (announcements.length <= 1) return;

        const intervalId = setInterval(() => {
            setAnimationKey(prev => prev + 1); // Trigger re-animation by changing key
            setCurrentIndex(prevIndex => (prevIndex + 1) % announcements.length);
        }, 5000); // Change announcement every 5 seconds

        return () => clearInterval(intervalId);
    }, [announcements.length]);

    if (announcements.length === 0 || !isVisible) {
        return null;
    }

    const currentAnnouncement = announcements[currentIndex];

    return (
        <div 
             className={`bg-cyan-600 text-white relative z-50 overflow-hidden transition-all duration-500 ease-in-out ${isVisible ? 'max-h-12' : 'max-h-0'}`}
             role="region"
             aria-label="Announcements"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
                <div className="flex-grow text-center relative h-full flex items-center justify-center">
                    <div
                        key={animationKey}
                        className="animate-slide-in-down-short"
                        style={{animationDuration: '0.5s'}}
                        aria-live="polite"
                    >
                        <p className={language === 'dv' ? 'thaana text-sm font-medium' : 'text-sm font-medium'}>
                           {currentAnnouncement.text[language]}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute p-2 rounded-full hover:bg-white/20 transition-colors"
                    style={language === 'dv' ? { left: '8px' } : { right: '8px' }}
                    aria-label="Dismiss announcement"
                >
                    <CloseIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
