import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import BriefcaseIcon from './icons/BriefcaseIcon';
import OfficeBuildingIcon from './icons/OfficeBuildingIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';

const ExpoStats: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';

    const statsData = [
        {
            icon: <OfficeBuildingIcon className="w-12 h-12 text-cyan-500" />,
            titleKey: "stats.exhibitors.title",
            stats: [
                { value: "150+", labelKey: "stats.exhibitors.companies" },
                { value: "12", labelKey: "stats.exhibitors.sectors" },
                { value: "25+", labelKey: "stats.exhibitors.international" },
            ]
        },
        {
            icon: <BriefcaseIcon className="w-12 h-12 text-cyan-500" />,
            titleKey: "stats.opportunities.title",
            stats: [
                { value: "500+", labelKey: "stats.opportunities.jobs" },
                { value: "200+", labelKey: "stats.opportunities.internships" },
                { value: "50+", labelKey: "stats.opportunities.apprenticeships" },
            ]
        },
        {
            icon: <UserGroupIcon className="w-12 h-12 text-cyan-500" />,
            titleKey: "stats.attendees.title",
            stats: [
                { value: "10,000+", labelKey: "stats.attendees.visitors" },
                { value: "5,000+", labelKey: "stats.attendees.students" },
                { value: "50+", labelKey: "stats.attendees.schools" },
            ]
        },
        {
            icon: <MicrophoneIcon className="w-12 h-12 text-cyan-500" />,
            titleKey: "stats.sessions.title",
            stats: [
                { value: "50+", labelKey: "stats.sessions.sessions" },
                { value: "30+", labelKey: "stats.sessions.speakers" },
                { value: "10+", labelKey: "stats.sessions.workshops" },
            ]
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-12 ${isDv ? 'thaana' : ''}`}>
                       {t('expoByTheNumbers')}
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center">
                            <div className="mb-4">
                                {item.icon}
                            </div>
                            <h3 className={`text-2xl font-bold text-gray-800 dark:text-white mb-6 ${isDv ? 'thaana' : ''}`}>
                                {t(item.titleKey)}
                            </h3>
                            <div className="space-y-4 text-left w-full">
                                {item.stats.map((stat, statIndex) => (
                                    <div key={statIndex} className={`flex items-baseline justify-between border-b border-gray-200 dark:border-gray-700 pb-2 ${isDv ? 'flex-row-reverse' : ''}`}>
                                        <p className={`text-base text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
                                            {t(stat.labelKey)}
                                        </p>
                                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpoStats;