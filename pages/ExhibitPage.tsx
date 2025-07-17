import { useState, type FC, type ChangeEvent, type FormEvent } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;
import { useLanguage } from '../context/LanguageContext';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

interface FormErrors {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
}

const ExhibitPage: FC = () => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';

    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiError, setApiError] = useState<string>('');

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.companyName.trim()) newErrors.companyName = t('exhibitPage.errorRequired');
        if (!formData.contactPerson.trim()) newErrors.contactPerson = t('exhibitPage.errorRequired');
        if (!formData.phone.trim()) newErrors.phone = t('exhibitPage.errorRequired');
        if (!formData.email.trim()) {
            newErrors.email = t('exhibitPage.errorRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('exhibitPage.errorInvalidEmail');
        }
        return newErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        if (apiError) {
            setApiError('');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setApiError('');
        setIsSubmitting(true);

        // Simulate API call for lead generation
        // In a real application, you would make a fetch/axios call to your backend here to handle the form submission and send a notification email.
        // For example:
        // try {
        //   const response = await fetch('/api/exhibit-interest', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        //   });
        //   if (!response.ok) throw new Error('Network response was not ok.');
        //   setIsSuccess(true);
        // } catch (error) {
        //   setApiError(t('forms.errorAPI'));
        // } finally {
        //   setIsSubmitting(false);
        // }
        setTimeout(() => {
            if (formData.email.endsWith('fail.com')) {
                setApiError(t('forms.errorAPI'));
                setIsSubmitting(false);
            } else {
                setIsSubmitting(false);
                setIsSuccess(true);
                console.log("Exhibitor Interest Form Submitted:", formData);
            }
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="text-center max-w-lg bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl animate-fade-in-up">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isDv ? 'thaana' : ''}`}>
                        {t('exhibitPage.successTitle')}
                    </h1>
                    <p className={`text-gray-600 dark:text-gray-300 mb-6 ${isDv ? 'thaana' : ''}`}>
                        {t('exhibitPage.successMessage')}
                    </p>
                    <Link
                        to="/"
                        className={`inline-block bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors duration-300 ${isDv ? 'thaana' : ''}`}
                    >
                        {t('exhibitPage.backToHome')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className={`text-4xl md:text-5xl font-extrabold text-teal-600 dark:text-teal-400 ${isDv ? 'thaana' : ''}`}>
                    {t('exhibitPage.title')}
                </h1>
                <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 ${isDv ? 'thaana' : ''}`}>
                    {t('exhibitPage.subtitle')}
                </p>
            </div>

            <div className="mt-12 max-w-lg mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className={`p-6 sm:p-8 ${isDv ? 'thaana' : ''}`}>
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                            {t('exhibitPage.formTitle')}
                        </h2>
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('exhibitPage.companyNameLabel')}</label>
                                <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} placeholder={t('exhibitPage.companyNamePlaceholder')} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:bg-gray-700 dark:text-white ${errors.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                                {errors.companyName && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.companyName}</p>}
                            </div>
                            <div>
                                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('exhibitPage.contactPersonLabel')}</label>
                                <input type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder={t('exhibitPage.contactPersonPlaceholder')} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:bg-gray-700 dark:text-white ${errors.contactPerson ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                                {errors.contactPerson && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.contactPerson}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('exhibitPage.emailLabel')}</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder={t('exhibitPage.emailPlaceholder')} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('exhibitPage.phoneLabel')}</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder={t('exhibitPage.phonePlaceholder')} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:bg-gray-700 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                                {errors.phone && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('exhibitPage.messageLabel')}</label>
                                <textarea name="message" id="message" value={formData.message} onChange={handleChange} placeholder={t('exhibitPage.messagePlaceholder')} rows={4} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"></textarea>
                            </div>
                            
                            {apiError && (
                                <div className="p-3 my-2 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-900/30 dark:text-red-300" role="alert">
                                    {apiError}
                                </div>
                            )}

                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                                    {isSubmitting ? t('exhibitPage.submittingButton') : t('exhibitPage.submitButton')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExhibitPage;