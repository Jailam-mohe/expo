import { useState, type FC } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, NavLink, useLocation } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../context/ThemeContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import CalendarIcon from './icons/CalendarIcon';
import LocationIcon from './icons/LocationIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import Dropdown from './Dropdown';
import SearchIcon from './icons/SearchIcon';
import SearchOverlay from './SearchOverlay';

const ThemeToggle: FC = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    );
};

const SearchToggle: FC<{ onToggle: () => void }> = ({ onToggle }) => {
    return (
      <button
        onClick={onToggle}
        className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        aria-label="Open search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    );
};


const Header: FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isDv = language === 'dv';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
      isActive
        ? 'bg-cyan-500 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    } ${language === 'dv' ? 'thaana' : ''}`;
  
  const navButtonClass = (isActive: boolean) =>
    `py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
      isActive
        ? 'bg-cyan-500 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    } ${language === 'dv' ? 'thaana' : ''}`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block py-2 px-4 text-base font-medium transition-colors duration-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
    isActive
      ? 'bg-cyan-500 text-white'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
  } ${language === 'dv' ? 'thaana' : ''}`;
  
  const registerButtonClass = `py-2 px-4 rounded-md text-sm font-bold transition-colors duration-300 bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${language === 'dv' ? 'thaana' : ''}`;
  
  const mobileRegisterButtonClass = `block w-full text-center py-2 px-4 text-base font-bold transition-colors duration-300 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`;

  const exhibitButtonClass = `py-2 px-4 rounded-md text-sm font-bold transition-colors duration-300 bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${language === 'dv' ? 'thaana' : ''}`;
  
  const mobileExhibitButtonClass = `block w-full text-center py-2 px-4 text-base font-bold transition-colors duration-300 rounded-md bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500`;

  const dropdownLinkClass = `block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full rounded-md focus:outline-none focus-visible:bg-cyan-100 dark:focus-visible:bg-cyan-800 ${isDv ? 'thaana text-right' : 'text-left'}`;

  const isExhibitorsActive = location.pathname.startsWith('/exhibitors') || location.pathname.startsWith('/venue');
  const isScheduleActive = location.pathname.startsWith('/schedule') || location.pathname.startsWith('/speakers');

  return (
    <>
      <header className="sticky top-0 z-40">
        {/* Top Utility Bar */}
        <div className="bg-gray-100 dark:bg-gray-800 hidden md:block">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center text-xs text-gray-700 dark:text-gray-300">
                <div className={`flex items-center gap-x-4 ${isDv ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {isDv ? "ނޮވެމްބަރ 6-8، 2025" : "November 6-8, 2025"}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <LocationIcon className="w-4 h-4 text-gray-500" />
                        <span className={`${isDv ? 'thaana' : ''}`}>{t('heroLocation')}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <SearchToggle onToggle={() => setIsSearchOpen(true)} />
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0 flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md">
                    <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">Dhaalan'25</span>
                  </Link>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                  <NavLink to="/" end className={navLinkClass}>{t('navHome')}</NavLink>
                  
                  {/* Exhibitors Dropdown */}
                  <Dropdown
                      menuAriaLabel={t('navExhibitors')}
                      trigger={(isOpen) => (
                          <button className={navButtonClass(isExhibitorsActive)}>
                              {t('navExhibitors')}
                              <ChevronDownIcon className={`w-4 h-4 ${isDv ? 'mr-1' : 'ml-1'} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                      )}
                  >
                      <Link to="/exhibitors" className={dropdownLinkClass} role="menuitem">{t('navSubAllExhibitors')}</Link>
                      <Link to="/venue" className={dropdownLinkClass} role="menuitem">{t('navSubByZone')}</Link>
                  </Dropdown>

                  <NavLink to="/opportunities" className={navLinkClass}>{t('navOpportunities')}</NavLink>

                  {/* Schedule Dropdown */}
                  <Dropdown
                      menuAriaLabel={t('navSchedule')}
                      trigger={(isOpen) => (
                          <button className={navButtonClass(isScheduleActive)}>
                              {t('navSchedule')}
                              <ChevronDownIcon className={`w-4 h-4 ${isDv ? 'mr-1' : 'ml-1'} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                      )}
                  >
                      <Link to="/schedule" className={dropdownLinkClass} role="menuitem">{t('navSubEventSchedule')}</Link>
                      <Link to="/speakers" className={dropdownLinkClass} role="menuitem">{t('navSubSpeakers')}</Link>
                      <Link to="/schedule?type=Workshop" className={dropdownLinkClass} role="menuitem">{t('navSubWorkshops')}</Link>
                  </Dropdown>

                  <NavLink to="/news" className={navLinkClass}>{t('navNews')}</NavLink>
                  <NavLink to="/gallery" className={navLinkClass}>{t('navGallery')}</NavLink>
                  <NavLink to="/resources" className={navLinkClass}>{t('navResources')}</NavLink>
                  <Link to="/exhibit" className={exhibitButtonClass}>{t('navExhibitWithUs')}</Link>
                  <Link to="/register" className={registerButtonClass}>{t('navRegister')}</Link>
              </div>
              <div className="md:hidden flex items-center">
                  <SearchToggle onToggle={() => setIsSearchOpen(true)} />
                  <LanguageSwitcher />
                  <ThemeToggle />
                  <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="ml-1 inline-flex items-center justify-center p-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  >
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      )}
                  </svg>
                  </button>
              </div>
              </div>
          </nav>
          {isOpen && (
              <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navHome')}</NavLink>
                  <NavLink to="/exhibitors" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navExhibitors')}</NavLink>
                  <NavLink to="/opportunities" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navOpportunities')}</NavLink>
                  <NavLink to="/schedule" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navSchedule')}</NavLink>
                  <NavLink to="/speakers" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navSpeakers')}</NavLink>
                  <NavLink to="/venue" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navVenue')}</NavLink>
                  <NavLink to="/news" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navNews')}</NavLink>
                  <NavLink to="/gallery" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navGallery')}</NavLink>
                  <NavLink to="/resources" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>{t('navResources')}</NavLink>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link to="/exhibit" className={`${mobileExhibitButtonClass} ${isDv ? 'thaana' : ''}`} onClick={() => setIsOpen(false)}>{t('navExhibitWithUs')}</Link>
                  <Link to="/register" className={`${mobileRegisterButtonClass} ${isDv ? 'thaana' : ''}`} onClick={() => setIsOpen(false)}>{t('navRegister')}</Link>
              </div>
              </div>
          )}
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;