import { type FC } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CountdownSection from '../components/CountdownSection';
import FeaturedExhibitors from '../components/FeaturedExhibitors';
import LatestNews from '../components/LatestNews';
import Sponsors from '../components/Sponsors';
import ExpoStats from '../components/ExpoStats';
import LatestUpdates from '../components/LatestUpdates';

const HomePage: FC = () => {
  return (
    <div>
      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <ExpoStats />
      <Sponsors />
      <LatestUpdates />
      <LatestNews />
      <FeaturedExhibitors />
    </div>
  );
};

export default HomePage;
