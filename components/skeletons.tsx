import React from 'react';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

export default Skeleton;

export const ExhibitorCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="p-6 flex flex-col items-center text-center flex-grow">
            <Skeleton className="w-24 h-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-3/4 rounded" />
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700">
            <Skeleton className="h-4 w-1/3 mx-auto rounded" />
        </div>
    </div>
);

export const FeaturedExhibitorSkeleton: React.FC = () => (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-700/50 rounded-xl shadow-md">
        <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4" />
        <Skeleton className="h-5 w-3/4 rounded" />
    </div>
);


export const OpportunityCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
            <div className="flex-grow">
                <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                <Skeleton className="h-4 w-1/2 mb-2 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
            </div>
        </div>
        <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-7 w-32 rounded-full" />
        </div>
    </div>
);


export const ScheduleItemSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 flex items-start space-x-4 border-l-4 border-gray-300 dark:border-gray-600">
        <Skeleton className="w-8 h-8 rounded mt-1 flex-shrink-0" />
        <div className="flex-grow">
            <Skeleton className="h-5 w-24 mb-3 rounded" />
            <Skeleton className="h-6 w-3/4 mb-4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
        </div>
    </div>
);

export const SpeakerCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center">
        <Skeleton className="pt-[100%] w-full" />
        <div className="p-4">
            <Skeleton className="h-6 w-3/4 mx-auto mb-2 rounded" />
            <Skeleton className="h-4 w-1/2 mx-auto rounded" />
        </div>
    </div>
);

export const SpeakerDetailSkeleton: React.FC = () => (
    <div className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="md:flex">
                    <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                        <Skeleton className="w-48 h-48 rounded-full" />
                        <Skeleton className="h-8 w-3/4 mt-4" />
                        <Skeleton className="h-5 w-1/2 mt-2" />
                        <div className="flex space-x-4 mt-4">
                           <Skeleton className="w-6 h-6 rounded" />
                           <Skeleton className="w-6 h-6 rounded" />
                        </div>
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                        <div className="mb-8">
                            <Skeleton className="h-7 w-1/3 mb-3" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-7 w-1/2 mb-4" />
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <Skeleton className="h-6 w-5/6" />
                                    <Skeleton className="h-4 w-3/4 mt-3" />
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <Skeleton className="h-6 w-5/6" />
                                    <Skeleton className="h-4 w-3/4 mt-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export const SessionDetailSkeleton: React.FC = () => (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="p-6 md:p-10">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-10 w-full mt-3" />
                        <Skeleton className="h-8 w-3/4 mt-2" />
                        <div className="flex items-center space-x-6 mt-4">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-5 w-1/3" />
                        </div>
                    </div>
                    <div className="space-y-2 mb-8">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6" />
                    </div>
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Skeleton className="h-7 w-1/3 mb-4" />
                        <div className="flex items-center space-x-4">
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <div className="flex-grow">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-4 w-1/3 mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export const NewsArticleCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/3">
           <Skeleton className="w-full h-48 md:h-full" />
        </div>
        <div className="p-6 md:p-8 md:w-2/3">
             <Skeleton className="h-4 w-1/3 mb-4 rounded" />
             <Skeleton className="h-7 w-full mb-3 rounded" />
             <Skeleton className="h-7 w-5/6 mb-4 rounded" />
             <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
             </div>
        </div>
    </div>
);

export const LatestNewsCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <Skeleton className="w-full h-48" />
        <div className="p-6 flex flex-col flex-grow">
            <Skeleton className="h-4 w-1/3 mb-4 rounded" />
            <Skeleton className="h-6 w-full mb-3 rounded" />
            <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
            </div>
        </div>
    </div>
);

export const GalleryImageSkeleton: React.FC = () => (
    <div className="overflow-hidden rounded-lg shadow-lg">
        <Skeleton className="w-full aspect-square" />
    </div>
);

export const ResourceItemSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-center gap-5">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-grow w-full">
            <Skeleton className="h-5 w-3/4 mb-3 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-3 w-1/3 mt-3 rounded" />
        </div>
        <Skeleton className="h-10 w-full sm:w-32 rounded-lg flex-shrink-0 mt-4 sm:mt-0" />
    </div>
);

export const SponsorTierSkeleton: React.FC<{ count: number; tier: 'MAIN' | 'GOLD' | 'SILVER' | 'BRONZE' }> = ({ count, tier }) => {
    const tierStyles = {
        'MAIN': { grid: 'grid-cols-1 max-w-md mx-auto', height: 'h-40' },
        'GOLD': { grid: 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto', height: 'h-32' },
        'SILVER': { grid: 'grid-cols-2 sm:grid-cols-3 max-w-4xl mx-auto', height: 'h-24' },
        'BRONZE': { grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-5xl mx-auto', height: 'h-20' },
    };
    
    return (
        <div>
            <Skeleton className="h-8 w-48 mx-auto mb-8" />
            <div className={`grid gap-6 md:gap-8 ${tierStyles[tier].grid}`}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg">
                        <Skeleton className={`w-full ${tierStyles[tier].height} mb-4`} />
                        <Skeleton className="h-5 w-3/4 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const UpdatesTableSkeleton: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-transparent bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6"><Skeleton className="h-4 w-20" /></th>
                        <th scope="col" className="py-3 px-6"><Skeleton className="h-4 w-16" /></th>
                        <th scope="col" className="py-3 px-6"><Skeleton className="h-4 w-full" /></th>
                        <th scope="col" className="py-3 px-6"><Skeleton className="h-4 w-24" /></th>
                        <th scope="col" className="py-3 px-6 text-center"><Skeleton className="h-4 w-20 mx-auto" /></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-700/50 border-b dark:border-gray-700">
                            <td className="py-4 px-6"><Skeleton className="h-5 w-24" /></td>
                            <td className="py-4 px-6"><Skeleton className="h-5 w-20" /></td>
                            <td className="py-4 px-6"><Skeleton className="h-5 w-full" /></td>
                            <td className="py-4 px-6"><Skeleton className="h-6 w-28 rounded-md" /></td>
                            <td className="py-4 px-6 text-center"><Skeleton className="h-7 w-24 rounded-full mx-auto" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
