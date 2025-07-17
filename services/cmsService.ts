import { announcements } from '../data/announcements';
import { exhibitors } from '../data/exhibitors';
import { galleryImages } from '../data/gallery';
import { newsData } from '../data/news';
import { opportunities } from '../data/opportunities';
import { resources } from '../data/resources';
import { sessions } from '../data/sessions';
import { speakers } from '../data/speakers';
import { sponsors } from '../data/sponsors';
import { updates } from '../data/updates';
import { importantInfoData } from '../data/importantInfo';
import { Announcement, Exhibitor, GalleryImage, NewsArticle, Opportunity, Resource, Session, Speaker, Sponsor, Update, ImportantInfo } from '../types';

const SIMULATED_DELAY = 800; // ms

// Helper to simulate network latency
const withDelay = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), SIMULATED_DELAY);
    });
};

// --- Announcements ---
export const getAnnouncements = async (): Promise<Announcement[]> => {
    return withDelay(announcements);
};

// --- Updates ---
export const getUpdates = async (): Promise<Update[]> => {
    return withDelay(updates);
};

// --- Exhibitors ---
export const getExhibitors = async (): Promise<Exhibitor[]> => {
    return withDelay(exhibitors);
};

export const getFeaturedExhibitors = async (): Promise<Exhibitor[]> => {
    const featuredNames = ["Bank of Maldives", "Dhiraagu", "Villa College", "The Maldives Waterman"];
    const featured = exhibitors.filter(e => featuredNames.includes(e.name));
    return withDelay(featured);
};

// --- Opportunities ---
export const getOpportunities = async (): Promise<Opportunity[]> => {
    return withDelay(opportunities);
};

// --- News ---
export const getNews = async (limit?: number): Promise<NewsArticle[]> => {
    const sortedNews = [...newsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const result = limit ? sortedNews.slice(0, limit) : sortedNews;
    return withDelay(result);
};

// --- Gallery ---
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
    return withDelay(galleryImages);
};

// --- Resources ---
export const getResources = async (): Promise<Resource[]> => {
    return withDelay(resources);
};

// --- Speakers ---
export const getSpeakers = async (): Promise<Speaker[]> => {
    return withDelay(speakers);
};

export const getSpeakerById = async (id: number): Promise<Speaker | undefined> => {
    const speaker = speakers.find(s => s.id === id);
    return withDelay(speaker);
};

export const getSpeakersByIds = async (ids: number[]): Promise<Speaker[]> => {
    const result = speakers.filter(s => ids.includes(s.id));
    return withDelay(result);
};

// --- Sessions ---
export const getSessions = async (): Promise<Session[]> => {
    return withDelay(sessions);
};

export const getSessionById = async (id: number): Promise<Session | undefined> => {
    const session = sessions.find(s => s.id === id);
    return withDelay(session);
};

export const getSessionsBySpeakerId = async (speakerId: number): Promise<Session[]> => {
    const speakerSessions = sessions.filter(s => s.speakerIds.includes(speakerId));
    return withDelay(speakerSessions);
};


// --- Sponsors ---
export const getSponsors = async (): Promise<Sponsor[]> => {
    return withDelay(sponsors);
};

// --- Important Info ---
export const getImportantInfo = async (): Promise<ImportantInfo[]> => {
    return withDelay(importantInfoData);
};