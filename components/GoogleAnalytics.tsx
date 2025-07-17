
import { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { useLocation } = ReactRouterDOM;

// Augment the window interface
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

const GoogleAnalytics = (): null => {
  const location = useLocation();

  useEffect(() => {
    // Only run in production and if the tracking ID is set
    if (process.env.NODE_ENV !== 'production' || !GA_TRACKING_ID) {
      if (process.env.NODE_ENV === 'production' && !GA_TRACKING_ID) {
        console.warn('Google Analytics tracking ID is not set.');
      }
      return;
    }

    // Check if script already exists
    if (document.getElementById('ga-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      // @ts-ignore
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });
    
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !GA_TRACKING_ID || !window.gtag) {
      return;
    }
    
    // Track page views on route change
    window.gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;
