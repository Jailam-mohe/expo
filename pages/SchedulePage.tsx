
import { useState, useEffect, useMemo, type FC, type ChangeEvent, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useSearchParams } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Session, Speaker } from '../types';
import ClockIcon from '../components/icons/ClockIcon';
import UserIcon from '../components/icons/UserIcon';
import UserGroupIcon from '../components/icons/UserGroupIcon';
import { ScheduleItemSkeleton } from '../components/skeletons';
import ErrorDisplay from '../components/ErrorDisplay';

const SchedulePage: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState('day1');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const sessionTypes: Session['type'][] = ['Keynote', 'Workshop', 'Panel', 'Networking', 'Ceremony'];

  useEffect(() => {
    setSelectedType(searchParams.get('type') || '');
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const [sessionsData, speakersData] = await Promise.all([
            cms.getSessions(),
            cms.getSpeakers()
        ]);
        setSessions(sessionsData);
        setSpeakers(speakersData);
    } catch (err) {
        console.error("Failed to fetch schedule data:", err);
        logError(err, { component: 'SchedulePage', message: 'Failed to fetch sessions or speakers' });
        setError(t('forms.dataFetchError'));
    } finally {
        setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const scheduleData = useMemo(() => {
    const filterAndSort = (day: 'day1' | 'day2' | 'day3') => {
        return sessions
            .filter(s => s.day === day)
            .filter(s => selectedType ? s.type === selectedType : true)
            .sort((a,b) => a.time.localeCompare(b.time));
    };
    return {
        day1: filterAndSort('day1'),
        day2: filterAndSort('day2'),
        day3: filterAndSort('day3'),
    };
  }, [sessions, selectedType]);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSelectedType(newType);
    const newParams = new URLSearchParams(searchParams);
    if (newType) {
      newParams.set('type', newType);
    } else {
      newParams.delete('type');
    }
    setSearchParams(newParams, { replace: true });
  };


  const getSessionSpeakers = (speakerIds: number[]) => {
    return speakers.filter(s => speakerIds.includes(s.id));
  };
  
  const getSessionIcon = (type: string, speakerCount: number) => {
    if (type === 'Panel') {
        return <UserGroupIcon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />;
    }
    if (speakerCount > 0) {
        return <UserIcon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />;
    }
    return null;
  };

  const renderTab = (dayKey: string, dayLabel: string) => (
    <button
      onClick={() => setActiveTab(dayKey)}
      className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 flex-shrink-0 ${isDv ? 'thaana' : ''} ${
        activeTab === dayKey
          ? 'bg-cyan-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
      disabled={isLoading || !!error}
    >
      {dayLabel}
    </button>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('scheduleTitle')}</h1>
          <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isDv ? 'thaana' : ''}`}>
            {t('scheduleText')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
           <div className={`mb-6 flex ${isDv ? 'justify-end' : 'justify-start'}`}>
              <div className="w-full md:w-1/3">
                  <label htmlFor="type-filter" className={`block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 ${isDv ? 'thaana' : ''}`}>{t('schedulePage.filterByType')}</label>
                  <select
                      id="type-filter"
                      value={selectedType}
                      onChange={handleTypeChange}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`}
                      aria-label={t('schedulePage.filterByType')}
                      disabled={isLoading || !!error}
                  >
                      <option value="">{t('schedulePage.allTypes')}</option>
                      {sessionTypes.map(type => (
                          <option key={type} value={type} className={isDv ? 'thaana' : ''}>
                            {t(`schedulePage.sessionTypes.${type}`)}
                          </option>
                      ))}
                  </select>
              </div>
          </div>

          <div className="flex border-b-4 border-cyan-600 overflow-x-auto">
            {renderTab('day1', t('day1'))}
            {renderTab('day2', t('day2'))}
            {renderTab('day3', t('day3'))}
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6 rounded-b-lg shadow-inner min-h-[30rem]">
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <ScheduleItemSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <ErrorDisplay message={error} onRetry={fetchData} />
            ) : (
                <div className="space-y-4">
                    {scheduleData[activeTab as keyof typeof scheduleData].length > 0 ? 
                      scheduleData[activeTab as keyof typeof scheduleData].map((item) => {
                          const sessionSpeakers = getSessionSpeakers(item.speakerIds);
                          const Icon = getSessionIcon(item.type, sessionSpeakers.length);
                          return (
                              <Link 
                                  to={`/schedule/${item.id}`} 
                                  key={item.id} 
                                  className="block bg-white dark:bg-gray-800/50 rounded-lg p-4 flex items-start space-x-4 transition-all duration-300 hover:shadow-md hover:scale-105 border-l-4 border-cyan-500 dark:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-offset-gray-900"
                              >
                                  <ClockIcon className={`w-8 h-8 text-cyan-500 dark:text-cyan-400 mt-1 flex-shrink-0 ${isDv ? 'ml-4' : 'mr-4'}`} />
                                  <div className={`flex-grow ${isDv ? 'text-right' : 'text-left'}`}>
                                      <p className="font-bold text-cyan-600 dark:text-cyan-400 text-lg">{item.time}</p>
                                      <p className={`text-gray-800 dark:text-gray-200 text-xl font-semibold mt-1 ${isDv ? 'thaana' : ''}`}>{item.title[language]}</p>
                                      {sessionSpeakers.length > 0 && (
                                          <div className={`flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300 ${isDv ? 'justify-end' : ''}`}>
                                              {Icon}
                                              <span className="text-sm">{sessionSpeakers.map(s => s.name).join(', ')}</span>
                                          </div>
                                      )}
                                  </div>
                              </Link>
                          )
                      }) : (
                        <div className={`text-center py-16 text-gray-500 dark:text-gray-400 ${isDv ? 'thaana' : ''}`}>
                           <p className="text-xl">No sessions found for this day and filter.</p>
                        </div>
                      )
                    }
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
