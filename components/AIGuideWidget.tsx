
import { useState, useEffect, useRef, type FC, type FormEvent, type KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../context/LanguageContext';
import { createChatSession } from '../services/geminiService';
import { logError } from '../services/loggingService';
import { Chat } from '@google/genai';
import RefreshIcon from './icons/RefreshIcon';
import CloseIcon from './icons/CloseIcon';


interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface AIGuideWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

const BotIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3m6-6h3m-3 6h3m-3-12h3m-2.938 10.062A8.003 8.003 0 0112 21a8.003 8.003 0 01-7.062-4.938M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

const UserIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const PaperPlaneIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

const TypingIndicator: FC = () => (
    <div className="flex items-center space-x-1.5">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

const suggestionChips = [
    { en: 'What is the event schedule?', dv: 'އިވެންޓް ޝެޑިއުލް އަކީ ކޮބާ؟' },
    { en: 'List some exhibitors.', dv: 'އެގްޒިބިޓަރުންގެ ލިސްޓެއް ދީބަލަ.' },
    { en: 'Give me a tip for my CV.', dv: 'ސީވީ އަށްޓަކައި އެހީއެއް ދީބަލަ.' },
];

const AIGuideWidget: FC<AIGuideWidgetProps> = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const isDv = language === 'dv';
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    const startNewChat = () => {
        try {
            const session = createChatSession();
            setChatSession(session);
            setMessages([{ role: 'model', text: t('aiGuideWelcome') }]);
            setShowSuggestions(true);
        } catch(error) {
            console.error("Failed to re-initialize chat session:", error);
            logError(error, { component: 'AIGuideWidget', message: 'Failed to initialize chat' });
            setMessages([{ role: 'model', text: t('aiGuideUnavailable') }]);
        }
    };

    // Reset chat on language change. This also handles the initial setup.
    useEffect(() => {
        startNewChat();
    }, [language]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Handle open/close for focus management and body scroll
    useEffect(() => {
        if (isOpen) {
          previouslyFocusedElement.current = document.activeElement as HTMLElement;
          setTimeout(() => inputRef.current?.focus(), 100);
          document.body.style.overflow = 'hidden';
        } else {
          if (previouslyFocusedElement.current) {
            previouslyFocusedElement.current.focus();
          }
          document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Focus trapping and keyboard shortcuts
    useEffect(() => {
        if (isOpen && widgetRef.current) {
            const focusableElements = Array.from(
                widgetRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.hasAttribute('disabled'));

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            const handleKeyDown = (e: globalThis.KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }

                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };
            
            const widget = widgetRef.current;
            widget.addEventListener('keydown', handleKeyDown);

            return () => {
                widget.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, isLoading, messages]); // Rerun when focusable elements might change

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || !chatSession || isLoading) return;
        
        setShowSuggestions(false);
        const userMessage: ChatMessage = { role: 'user', text: messageText };
        setMessages((prev) => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const stream = await chatSession.sendMessageStream({ message: messageText });
            
            let modelResponse = '';
            setMessages((prev) => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                modelResponse += chunkText;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            logError(error, { component: 'AIGuideWidget', message: 'Error sending message to Gemini' });
            const errorMsg: ChatMessage = { role: 'model', text: t('aiGuideError') };
            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if(lastMsg.role === 'model' && lastMsg.text === ''){
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = errorMsg;
                    return newMessages;
                }
                return [...prev, errorMsg];
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        sendMessage(userInput);
    };

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    return (
        <div 
            ref={widgetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-widget-title"
            className={`fixed bottom-4 ${isDv ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} z-50 w-[calc(100%-2rem)] sm:w-full max-w-sm h-full max-h-[70vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                <h2 id="ai-widget-title" className={`text-lg font-bold text-cyan-600 dark:text-cyan-400 ${isDv ? 'thaana' : ''}`}>{t('aiGuideTitle')}</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={startNewChat}
                        className={`flex items-center gap-2 py-1.5 px-3 text-xs rounded-full bg-cyan-100/50 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDv ? 'thaana' : ''}`}
                        aria-label={t('newChat')}
                    >
                        <RefreshIcon className="w-4 h-4" />
                        {!isDv && <span>{t('newChat')}</span>}
                    </button>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
                        aria-label="Close AI Guide"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div role="log" aria-live="polite" className="flex-grow p-4 md:p-6 space-y-6 overflow-y-auto">
                {messages.map((msg, index) => {
                    const isUser = msg.role === 'user';
                    const bubbleClasses = isUser
                        ? `bg-blue-500 text-white prose-invert ${isDv ? 'rounded-bl-none' : 'rounded-br-none'}`
                        : `bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 ${isDv ? 'rounded-br-none' : 'rounded-bl-none'}`;
                    
                    return (
                        <div key={index} className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                            {isUser && isDv && (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><UserIcon /></div>
                            )}
                            {!isUser && !isDv &&(
                                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0"><BotIcon /></div>
                            )}
                            <div
                            className={`max-w-xs md:max-w-sm px-4 py-3 rounded-xl prose dark:prose-invert prose-p:my-0 prose-ul:my-2 prose-ol:my-2 ${bubbleClasses} ${isDv ? 'thaana' : ''}`}
                            >
                                <div className="markdown-content">
                                    {msg.text === '' && msg.role === 'model' ? (
                                        <div role="status" className="flex items-center">
                                            <TypingIndicator />
                                            <span className="sr-only">{t('aiGuideTyping')}</span>
                                        </div>
                                    ) : (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                            {isUser && !isDv && (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><UserIcon /></div>
                            )}
                            {!isUser && isDv &&(
                                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0"><BotIcon /></div>
                            )}
                        </div>
                    );
                })}
                {showSuggestions && messages.length > 0 && messages[0]?.text === t('aiGuideWelcome') && (
                    <div className={`flex gap-2 flex-wrap ${isDv ? 'justify-end' : 'justify-start'}`}>
                        {suggestionChips.map((chip, i) => (
                            <button key={i} onClick={() => handleSuggestionClick(isDv ? chip.dv : chip.en)} className={`py-1.5 px-3 text-sm rounded-full bg-cyan-100/50 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDv ? 'thaana' : ''}`}>{isDv ? chip.dv : chip.en}</button>
                        ))}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-xl flex-shrink-0">
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-3">
                    <input ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={t('aiGuidePlaceholder')} className={`flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${isDv ? 'thaana' : ''}`} disabled={isLoading} aria-label={t('aiGuidePlaceholder')} />
                    <button type="submit" className="bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex-shrink-0" disabled={isLoading || !userInput.trim()} aria-label="Send message">
                        <PaperPlaneIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIGuideWidget;
