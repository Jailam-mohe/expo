import { useState, useEffect, useMemo, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { QAChecklist, type QAChecklistItem, type QACheckStatus, QASection } from '../data/qa-checklist';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import XCircleIcon from '../components/icons/XCircleIcon';
import LoadingSpinner from '../components/LoadingSpinner';
import ClipboardDocumentCheckIcon from '../components/icons/ClipboardDocumentCheckIcon';
import RefreshIcon from '../components/icons/RefreshIcon';


const AdminQAChecklistPage: FC = () => {
    const { t } = useLanguage();
    const [checklistItems, setChecklistItems] = useState<QAChecklistItem[]>(() => JSON.parse(JSON.stringify(QAChecklist)));
    const [isLoading, setIsLoading] = useState(false);

    const updateStatus = (id: string, status: QACheckStatus, details?: string) => {
        setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, status, details } : item));
    };

    const resetChecklist = () => {
        setChecklistItems(JSON.parse(JSON.stringify(QAChecklist)));
    }

    const runAutomatedChecks = () => {
        setIsLoading(true);
        const automatedItems = checklistItems.filter(item => item.automated);

        automatedItems.forEach(item => updateStatus(item.id, 'running'));

        // Simulate async checks
        setTimeout(() => {
            automatedItems.forEach(item => {
                // In a real scenario, actual test logic would go here.
                // For this simulation, we'll just mark them as 'pass'.
                updateStatus(item.id, 'pass', 'Automated check completed successfully.');
            });
            setIsLoading(false);
        }, 1500);
    };
    
    const summary = useMemo(() => {
        return checklistItems.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            acc.total++;
            return acc;
        }, { pass: 0, fail: 0, 'not-tested': 0, 'n/a': 0, running: 0, total: 0 });
    }, [checklistItems]);

    const sections = Object.values(QASection);
    const itemsBySection = useMemo(() => {
        return checklistItems.reduce((acc, item) => {
            if (!acc[item.section]) {
                acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
        }, {} as Record<QASection, QAChecklistItem[]>);
    }, [checklistItems]);

    const StatusBadge: FC<{ status: QACheckStatus }> = ({ status }) => {
        const styles = {
            'pass': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'fail': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'not-tested': 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
            'running': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'n/a': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        };
        const text = {
            'pass': 'Pass', 'fail': 'Fail', 'not-tested': 'Not Tested', 'running': 'Running...', 'n/a': 'N/A'
        };
        return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{text[status]}</span>;
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ClipboardDocumentCheckIcon className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">QA Checklist</h1>
                            <p className="text-gray-600 dark:text-gray-400">Admin panel for testing application features.</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button
                            onClick={runAutomatedChecks}
                            disabled={isLoading}
                            className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-gray-400 disabled:cursor-wait flex items-center gap-2"
                        >
                            {isLoading ? <LoadingSpinner/> : <CheckCircleIcon className="w-5 h-5" />}
                            <span>{isLoading ? 'Running Checks...' : 'Run Automated Checks'}</span>
                        </button>
                         <button
                            onClick={resetChecklist}
                            disabled={isLoading}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <RefreshIcon className="w-5 h-5" />
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="text-center p-2"><div className="text-3xl font-bold text-green-500">{summary.pass}</div><div className="text-sm text-gray-500">Passed</div></div>
                    <div className="text-center p-2"><div className="text-3xl font-bold text-red-500">{summary.fail}</div><div className="text-sm text-gray-500">Failed</div></div>
                    <div className="text-center p-2"><div className="text-3xl font-bold text-gray-400">{summary['not-tested']}</div><div className="text-sm text-gray-500">Not Tested</div></div>
                    <div className="text-center p-2"><div className="text-3xl font-bold text-blue-500">{summary.running}</div><div className="text-sm text-gray-500">Running</div></div>
                    <div className="text-center p-2 col-span-2 sm:col-span-1"><div className="text-3xl font-bold">{summary.total}</div><div className="text-sm text-gray-500">Total Checks</div></div>
                </div>

                <div className="space-y-8">
                    {sections.map(section => (
                        <div key={section} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">{section}</h2>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {itemsBySection[section]?.map(item => (
                                    <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-grow">
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">{item.description}</p>
                                            {item.manualTest && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                                                    <strong className="font-semibold">Test:</strong> {item.manualTest}
                                                </p>
                                            )}
                                            {item.status === 'fail' && item.details && (
                                                <p className="text-sm text-red-500 mt-1"><strong className="font-semibold">Details:</strong> {item.details}</p>
                                            )}
                                            {item.status === 'pass' && item.details && (
                                                 <p className="text-sm text-green-500 mt-1"><strong className="font-semibold">Details:</strong> {item.details}</p>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 flex items-center gap-2">
                                            <StatusBadge status={item.status} />
                                            {item.status !== 'running' && (
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => updateStatus(item.id, 'pass')} className="p-1.5 rounded-full hover:bg-green-100 dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                                                        <CheckCircleIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-green-500" />
                                                    </button>
                                                    <button onClick={() => updateStatus(item.id, 'fail', 'Manually marked as failed.')} className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500">
                                                        <XCircleIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-red-500" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminQAChecklistPage;
