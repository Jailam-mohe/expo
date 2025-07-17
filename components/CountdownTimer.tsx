import { useState, useEffect, type FC } from 'react';
import { EVENT_DATE } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const CountdownTimer: FC = () => {
  const { t, language } = useLanguage();

  const calculateTimeLeft = () => {
    const difference = +new Date(EVENT_DATE) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds },
  ];

  return (
    <div className="text-center">
      <h2 className={`text-3xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'dv' ? 'thaana' : ''}`}>
        {t('countdownTitle')}
      </h2>
      <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8">
        {timerComponents.map((component, i) => (
          <div key={i} className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg w-20 h-24 sm:w-24 sm:h-28 flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-cyan-600 dark:text-cyan-300">
              {component.value.toString().padStart(2, '0')}
            </div>
            <div className={`text-sm sm:text-base text-gray-700 dark:text-gray-200 uppercase tracking-wider ${language === 'dv' ? 'thaana' : ''}`}>
              {component.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;