
// A simple logging service for error and performance monitoring.
// In a real-world application, this would integrate with a service like Sentry, Datadog, or LogRocket.

interface LogPayload {
    level: 'error' | 'info' | 'performance';
    message: string;
    timestamp: string;
    stack?: string;
    context?: Record<string, any>;
    url: string;
    userAgent: string;
}

const sendLog = (payload: Omit<LogPayload, 'timestamp' | 'url' | 'userAgent'>) => {
    const logData: LogPayload = {
        ...payload,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
    };

    // In a real app, you would send this to your logging backend:
    // fetch('/api/logs', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(logData),
    // }).catch(console.error);
    
    // For this example, we'll just log to the console.
    switch (payload.level) {
        case 'error':
            console.error('[Logging Service]', logData);
            break;
        case 'performance':
            console.log('[Performance Metric]', logData);
            break;
        default:
            console.log('[Logging Service]', logData);
    }
};

export const logError = (error: any, context: Record<string, any> = {}) => {
    let message = 'An unknown error occurred';
    if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    }
    
    sendLog({
        level: 'error',
        message,
        stack: error instanceof Error ? error.stack : undefined,
        context: {
            ...context,
            errorDetails: JSON.stringify(error, Object.getOwnPropertyNames(error))
        },
    });
};

export const logPerformance = (metric: { name: string; value: number; delta: number; id: string; }) => {
    sendLog({
        level: 'performance',
        message: `Web Vital: ${metric.name}`,
        context: { metric },
    });
};

export const initLogging = () => {
    // Catch unhandled exceptions
    window.onerror = (message, source, lineno, colno, error) => {
        logError(error || message, { source, lineno, colno });
        return true; // Prevents the default browser console error reporting
    };

    // Catch unhandled promise rejections
    window.onunhandledrejection = (event: PromiseRejectionEvent) => {
        logError(event.reason, { promiseRejection: true });
    };

    console.log("Error and performance logging service initialized.");
};
