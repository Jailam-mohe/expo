
export enum Language {
  EN = 'en',
  DV = 'dv',
}

export enum Zone {
  CAREER_HUB = 'Career Hub Zone',
  EDUCATION_PROVIDER = 'Education Provider Zone',
  SKILLS_EXPERIENCE = 'Skills Experience Zone',
  INNOVATION_STARTUP = 'Innovation & Startup Zone',
  ENTERTAINMENT = 'Entertainment Zone',
  FOOD_CULINARY = 'Food & Culinary Zone',
}

export enum AttendeeRole {
  STUDENT = 'Student',
  PROFESSIONAL = 'Working Professional',
  JOB_SEEKER = 'Job Seeker',
  EDUCATOR = 'Educator',
  ENTREPRENEUR = 'Entrepreneur',
  OTHER = 'Other'
}

export enum SponsorTier {
  MAIN = 'Main',
  GOLD = 'Gold',
  SILVER = 'Silver',
  BRONZE = 'Bronze',
}

export enum OpportunityType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  INTERNSHIP = 'Internship',
  APPRENTICESHIP = 'Apprenticeship',
}

export enum UpdateType {
  ANNOUNCEMENT = 'Announcement',
  UPDATE = 'Update',
  SCHEDULE_CHANGE = 'Schedule Change',
}

export enum UpdateCategory {
  GENERAL = 'General',
  SPEAKERS = 'Speakers',
  EXHIBITORS = 'Exhibitors',
  REGISTRATION = 'Registration',
  VENUE = 'Venue',
}

export enum UpdateStatus {
  NEW = 'New',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export enum ResourceCategory {
  EVENT_GUIDES = 'Event Guides',
  CAREER_RESOURCES = 'Career Resources',
  INDUSTRY_REPORTS = 'Industry Reports',
  MEDIA_KIT = 'Media Kit',
}

export enum ResourceType {
    PDF = 'PDF',
    DOCX = 'DOCX',
    ZIP = 'ZIP',
}

export interface Resource {
  id: number;
  category: ResourceCategory;
  type: ResourceType;
  title: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  description: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  fileUrl: string;
  fileSize: string;
}

export interface Update {
  id: number;
  date: string;
  type: UpdateType;
  title: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  category: UpdateCategory;
  status: UpdateStatus;
}


export interface Speaker {
  id: number;
  name: string;
  photo: string;
  title: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  bio: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  socials?: {
    linkedin?: string;
    twitter?: string;
  }
}

export interface Session {
  id: number;
  day: 'day1' | 'day2' | 'day3';
  time: string;
  location: string;
  title: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  description: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  type: 'Keynote' | 'Workshop' | 'Panel' | 'Networking' | 'Ceremony';
  speakerIds: number[];
  videoUrl?: string;
  slidesUrl?: string;
  slidesFileType?: ResourceType;
  slidesFileSize?: string;
}

export interface Opportunity {
  id: number;
  title: string;
  exhibitorName: string;
  type: OpportunityType;
  zone: Zone; 
  location: string;
  description: string;
  url: string; 
}

export interface Exhibitor {
  name: string;
  logo: string;
  zone: Zone;
}

export interface Sponsor {
  name: string;
  logo: string;
  tier: SponsorTier;
  website: string;
}

export type TranslationContent = {
  [key: string]: string | string[] | { [key: string]: string | string[] | { [key: string]: string | { [key: string]: string } } };
};

export type Translations = {
  [Language.EN]: TranslationContent;
  [Language.DV]: TranslationContent;
};

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface NewsArticle {
  id: number;
  date: string;
  image: string;
  alt: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  title: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  excerpt: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
}

export interface Announcement {
  id: number;
  text: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: {
        [Language.EN]: string;
        [Language.DV]: string;
    };
}

export interface ImportantInfo {
  id: number;
  title: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
  content: {
    [Language.EN]: string;
    [Language.DV]: string;
  };
}