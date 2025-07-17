import { type FC } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import LocationIcon from './icons/LocationIcon';
import PhoneIcon from './icons/PhoneIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const Footer: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const linkClass = `hover:text-cyan-400 transition-colors duration-300 ${isDv ? 'thaana' : ''}`;
    const socialLinkClass = "text-gray-400 hover:text-cyan-400 transition-colors duration-300";

    const socialLinks = [
        { name: 'Facebook', href: 'https://facebook.com/dhaalanexpo', icon: <FacebookIcon className="w-6 h-6" /> },
        { name: 'Twitter', href: 'https://twitter.com/dhaalanexpo', icon: <TwitterIcon className="w-6 h-6" /> },
        { name: 'Instagram', href: 'https://instagram.com/dhaalanexpo', icon: <InstagramIcon className="w-6 h-6" /> },
        { name: 'LinkedIn', href: 'https://linkedin.com/company/dhaalanexpo', icon: <LinkedInIcon className="w-6 h-6" /> },
    ];

  return (
    <footer className="bg-gray-800 text-gray-300 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: About */}
            <div className={`${isDv ? 'lg:text-right' : 'lg:text-left'}`}>
                <h3 className={`text-base font-semibold text-white uppercase tracking-wider mb-4 ${isDv ? 'thaana' : ''}`}>{t("footer.aboutTitle")}</h3>
                <p className={`text-sm ${isDv ? 'thaana' : ''}`}>{t('footerTheme')}</p>
            </div>
            {/* Column 2: Quick Links */}
            <div className={`${isDv ? 'lg:text-right' : 'lg:text-left'}`}>
                 <h3 className={`text-base font-semibold text-white uppercase tracking-wider mb-4 ${isDv ? 'thaana' : ''}`}>{t('footer.linksTitle')}</h3>
                 <ul className="space-y-2 text-sm">
                    <li><Link to="/" className={linkClass}>{t('navHome')}</Link></li>
                    <li><Link to="/exhibitors" className={linkClass}>{t('navExhibitors')}</Link></li>
                    <li><Link to="/schedule" className={linkClass}>{t('navSchedule')}</Link></li>
                    <li><Link to="/opportunities" className={linkClass}>{t('navOpportunities')}</Link></li>
                    <li><Link to="/news" className={linkClass}>{t('navNews')}</Link></li>
                 </ul>
            </div>
             {/* Column 3: Resources */}
            <div className={`${isDv ? 'lg:text-right' : 'lg:text-left'}`}>
                 <h3 className={`text-base font-semibold text-white uppercase tracking-wider mb-4 ${isDv ? 'thaana' : ''}`}>{t('footer.resourcesTitle')}</h3>
                 <ul className="space-y-2 text-sm">
                    <li><Link to="/resources" className={linkClass}>{t('footer.resourceGuide')}</Link></li>
                    <li><Link to="/resources" className={linkClass}>{t('footer.resourceMedia')}</Link></li>
                    <li><Link to="/register" className={linkClass}>{t('navRegister')}</Link></li>
                    <li><Link to="/exhibit" className={linkClass}>{t('navExhibitWithUs')}</Link></li>
                 </ul>
            </div>
            {/* Column 4: Contact & Social */}
            <div className={`${isDv ? 'lg:text-right' : 'lg:text-left'}`}>
                <h3 className={`text-base font-semibold text-white uppercase tracking-wider mb-4 ${isDv ? 'thaana' : ''}`}>{t('footer.contactTitle')}</h3>
                <ul className="space-y-2 text-sm">
                    <li className={`flex items-start gap-3 ${isDv ? 'flex-row-reverse' : ''}`}>
                        <LocationIcon className="w-5 h-5 mt-1 text-cyan-400 flex-shrink-0" />
                        <span className={isDv ? 'thaana' : ''}>{t('footer.contactAddress')}</span>
                    </li>
                    <li className={`flex items-start gap-3 ${isDv ? 'flex-row-reverse' : ''}`}>
                         <EnvelopeIcon className="w-5 h-5 mt-1 text-cyan-400 flex-shrink-0" />
                         <a href={`mailto:${t('footer.contactEmail')}`} className="hover:text-cyan-400 transition-colors">{t('footer.contactEmail')}</a>
                    </li>
                     <li className={`flex items-start gap-3 ${isDv ? 'flex-row-reverse' : ''}`}>
                         <PhoneIcon className="w-5 h-5 mt-1 text-cyan-400 flex-shrink-0" />
                         <a href={`tel:${t('footer.contactPhone')}`} className="hover:text-cyan-400 transition-colors">{t('footer.contactPhone')}</a>
                    </li>
                </ul>
                <h4 className={`text-sm font-semibold text-white uppercase tracking-wider mt-6 mb-3 ${isDv ? 'thaana' : ''}`}>{t('footer.socialTitle')}</h4>
                <div className={`flex space-x-4 ${isDv ? 'justify-end' : 'justify-start'}`}>
                    {socialLinks.map(social => {
                        const hasLink = social.href && social.href !== '#';
                        if (hasLink) {
                            return (
                                <a key={social.name} href={social.href} className={socialLinkClass} aria-label={social.name} target="_blank" rel="noopener noreferrer">
                                    {social.icon}
                                </a>
                            );
                        }
                        return (
                            <span key={social.name} className="text-gray-500 dark:text-gray-600 cursor-not-allowed" aria-label={social.name}>
                                {social.icon}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
            <p className={`mb-2 ${isDv ? 'thaana' : ''}`}>{t('footer.organizedBy')}</p>
            <p className={`${isDv ? 'thaana' : ''}`}>
                &copy; {new Date().getFullYear()} Dhaalan Expo. {t('footerRights')}
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;