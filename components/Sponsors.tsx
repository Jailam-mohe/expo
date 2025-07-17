
import { useState, useEffect, type FC, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as cms from '../services/cmsService';
import { logError } from '../services/loggingService';
import { Sponsor, SponsorTier } from '../types';
import { SponsorTierSkeleton } from './skeletons';
import ErrorDisplay from './ErrorDisplay';

const Sponsors: FC = () => {
  const { t, language } = useLanguage();
  const isDv = language === 'dv';
  const [sponsorsByTier, setSponsorsByTier] = useState<{tier: SponsorTier, sponsors: Sponsor[]}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const allSponsors = await cms.getSponsors();
      const tiers: SponsorTier[] = [SponsorTier.MAIN, SponsorTier.GOLD, SponsorTier.SILVER, SponsorTier.BRONZE];
      const groupedSponsors = tiers.map(tier => ({
        tier,
        sponsors: allSponsors.filter(s => s.tier === tier)
      })).filter(group => group.sponsors.length > 0);
      setSponsorsByTier(groupedSponsors);
    } catch (err) {
      console.error("Failed to fetch sponsors:", err);
      logError(err, { component: 'Sponsors', message: 'Failed to fetch data' });
      setError(t('forms.dataFetchError'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tierStyles = {
    [SponsorTier.MAIN]: {
      grid: 'grid-cols-1 max-w-md mx-auto',
      title: 'text-cyan-500 dark:text-cyan-400 font-extrabold',
    },
    [SponsorTier.GOLD]: {
      grid: 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto',
      title: 'text-amber-500 dark:text-amber-400',
    },
    [SponsorTier.SILVER]: {
      grid: 'grid-cols-2 sm:grid-cols-3 max-w-4xl mx-auto',
      title: 'text-slate-500 dark:text-slate-400',
    },
    [SponsorTier.BRONZE]: {
      grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-5xl mx-auto',
      title: 'text-orange-500 dark:text-orange-400',
    }
  };

  const SponsorItem: FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
    const isClickable = sponsor.website && sponsor.website !== '#';
    
    const Wrapper = isClickable ? 'a' : 'div';
    
    const wrapperProps: any = {
      className: `flex flex-col items-center justify-start p-6 bg-white dark:bg-gray-700/50 rounded-xl shadow-lg transition-all duration-300 ${isClickable ? 'group hover:-translate-y-2 hover:shadow-cyan-500/10' : 'cursor-default'}`,
    };

    if (isClickable) {
      wrapperProps.href = sponsor.website;
      wrapperProps.target = "_blank";
      wrapperProps.rel = "noopener noreferrer";
      wrapperProps['aria-label'] = `Visit ${sponsor.name}`;
    }

    return (
      <Wrapper {...wrapperProps}>
        <div className="flex-grow flex items-center justify-center w-full h-28 mb-4">
          <img 
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className={`max-h-full max-w-full object-contain filter grayscale transition-all duration-300 ${isClickable ? 'group-hover:grayscale-0' : ''}`}
            loading="lazy"
          />
        </div>
        <h4 className="text-base font-bold text-center text-gray-800 dark:text-gray-100">{sponsor.name}</h4>
      </Wrapper>
    );
  };


  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 ${isDv ? 'thaana' : ''}`}>
            {t('sponsorsTitle')}
          </h2>
          <p className={`text-lg leading-relaxed text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
              {t('sponsorsText')}
          </p>
        </div>
        
        {isLoading ? (
            <div className="space-y-16">
                <SponsorTierSkeleton tier="MAIN" count={1} />
                <SponsorTierSkeleton tier="GOLD" count={2} />
                <SponsorTierSkeleton tier="SILVER" count={3} />
            </div>
        ) : error ? (
            <ErrorDisplay message={error} onRetry={fetchData} />
        ) : (
            <div className="space-y-16">
            {sponsorsByTier.map(({ tier, sponsors: tierSponsors }) => (
                <div key={tier}>
                <h3 className={`text-2xl font-bold text-center mb-8 uppercase tracking-wider ${tierStyles[tier].title} ${isDv ? 'thaana' : ''}`}>
                    {t(`sponsors.${tier.toLowerCase()}`)}
                </h3>
                <div className={`grid gap-6 md:gap-8 items-stretch ${tierStyles[tier].grid}`}>
                    {tierSponsors.map(sponsor => (
                      <SponsorItem key={sponsor.name} sponsor={sponsor} />
                    ))}
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default Sponsors;
