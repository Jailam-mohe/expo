
import { useState, useEffect, type FC } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route } = ReactRouterDOM;
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { initLogging } from './services/loggingService';
import GoogleAnalytics from './components/GoogleAnalytics';
import AnnouncementBanner from './components/AnnouncementBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExhibitorsPage from './pages/ExhibitorsPage';
import SchedulePage from './pages/SchedulePage';
import VenuePage from './pages/VenuePage';
import AIGuideWidget from './components/AIGuideWidget';
import RegisterPage from './pages/RegisterPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import ExhibitPage from './pages/ExhibitPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import SpeakersPage from './pages/SpeakersPage';
import SpeakerDetailPage from './pages/SpeakerDetailPage';
import SessionDetailPage from './pages/SessionDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import QuickActionsSidebar from './components/QuickActionsSidebar';
import NotFoundPage from './pages/NotFoundPage';
import AdminQAChecklistPage from './pages/AdminQAChecklistPage';

const App: FC = () => {
  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);

  useEffect(() => {
    // Initialize global error and performance logging
    initLogging();
  }, []);


  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <GoogleAnalytics />
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <AnnouncementBanner />
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exhibitors" element={<ExhibitorsPage />} />
                <Route path="/opportunities" element={<OpportunitiesPage />} />
                <Route path="/schedule/:sessionId" element={<SessionDetailPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/speakers/:speakerId" element={<SpeakerDetailPage />} />
                <Route path="/speakers" element={<SpeakersPage />} />
                <Route path="/venue" element={<VenuePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/exhibit" element={<ExhibitPage />} />
                <Route path="/admin/qa" element={<AdminQAChecklistPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <QuickActionsSidebar onAIGuideToggle={() => setIsAIGuideOpen(prev => !prev)} />
            <AIGuideWidget isOpen={isAIGuideOpen} onClose={() => setIsAIGuideOpen(false)} />
            <Footer />
          </div>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
