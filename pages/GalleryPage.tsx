
import { useState, useEffect, type FC, type KeyboardEvent, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { GalleryImage } from '../types';
import { GalleryImageSkeleton } from '../components/skeletons';
import ErrorDisplay from '../components/ErrorDisplay';

const GalleryPage: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);
    
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await cms.getGalleryImages();
            setImages(data);
        } catch (err) {
            console.error("Failed to fetch gallery images:", err);
            logError(err, { component: 'GalleryPage', message: 'Failed to fetch data' });
            setError(t('forms.dataFetchError'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openModal = (image: GalleryImage) => {
        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
        previouslyFocusedElement.current?.focus();
    };

    useEffect(() => {
        const handleEsc = (event: globalThis.KeyboardEvent) => {
           if (event.key === 'Escape') {
            closeModal();
           }
        };
        if (selectedImage) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedImage]);

    // Focus trapping for modal
    useEffect(() => {
        if (selectedImage && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll<HTMLElement>('button');
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            firstElement.focus();

            const handleTabKeyPress = (e: globalThis.KeyboardEvent) => {
                if (e.key === 'Tab') {
                    // With only one button, trap focus on it
                    e.preventDefault();
                }
            };
            
            const modal = modalRef.current;
            modal.addEventListener('keydown', handleTabKeyPress);

            return () => {
                modal.removeEventListener('keydown', handleTabKeyPress);
            };
        }
    }, [selectedImage]);

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>, image: GalleryImage) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(image);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('galleryPage.title')}</h1>
                    <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isDv ? 'thaana' : ''}`}>
                        {t('galleryPage.text')}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <GalleryImageSkeleton key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <ErrorDisplay message={error} onRetry={fetchData} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="group cursor-pointer overflow-hidden rounded-lg shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-cyan-500 dark:focus-visible:ring-offset-gray-900"
                                onClick={() => openModal(image)}
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyPress(e, image)}
                                role="button"
                                aria-label={`View image: ${image.alt[language]}`}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt[language]}
                                    className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in-up" 
                    onClick={closeModal}
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="gallery-modal-description"
                >
                    <div 
                        ref={modalRef}
                        className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] flex flex-col" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage.src.replace('w=800', 'w=1920')} // Load higher res for modal
                            alt={selectedImage.alt[language]} 
                            className="max-w-full max-h-[calc(90vh-100px)] object-contain"
                            loading="lazy"
                        />
                        <p id="gallery-modal-description" className={`mt-4 text-center text-gray-800 dark:text-gray-200 ${isDv ? 'thaana' : ''}`}>{selectedImage.alt[language]}</p>
                        <button
                            onClick={closeModal}
                            className="absolute -top-3 -right-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            aria-label="Close image view"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
