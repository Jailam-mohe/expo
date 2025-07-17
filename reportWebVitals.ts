
import { logPerformance } from './services/loggingService';

const reportWebVitals = () => {
  try {
    const report = (metric: { name: string; value: number; delta: number; id: string; }) => {
      logPerformance(metric);
    };

    if (typeof PerformanceObserver === 'undefined') {
        console.warn('PerformanceObserver is not supported in this browser.');
        return;
    }

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const metric = {
          name: entry.name,
          value: (entry as any).value,
          delta: (entry as any).value, // Simplified for this example
          id: `v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`,
        };
        report(metric);
      }
    });

    // Observe Core Web Vitals
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    observer.observe({ type: 'first-input', buffered: true });
    observer.observe({ type: 'layout-shift', buffered: true });
    
  } catch (e) {
    console.error("Could not initialize performance observer:", e);
  }
};

export default reportWebVitals;
