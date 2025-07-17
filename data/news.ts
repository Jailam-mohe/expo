import { Language, NewsArticle } from '../types';

export const newsData: NewsArticle[] = [
  {
    id: 1,
    date: '2024-10-15',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4b248f?q=80&w=1920',
    alt: {
      [Language.EN]: 'Team collaborating in a modern office, working on laptops.',
      [Language.DV]: 'ޒަމާނީ އޮފީހެއްގައި ޓީމެއް ލެޕްޓޮޕްތަކުގައި މަސައްކަތްކުރަނީ',
    },
    title: {
      [Language.EN]: 'Dhaalan 2025 Website Officially Launched!',
      [Language.DV]: 'ދާލަން 2025 ގެ ވެބްސައިޓް ރަސްމީކޮށް އިފްތިތާޙްކޮށްފި!',
    },
    excerpt: {
      [Language.EN]: 'We are thrilled to launch the official digital home for the Dhaalan 2025 Expo. Explore, register, and stay updated with all event news.',
      [Language.DV]: 'ދާލަން 2025 އެކްސްޕޯގެ ރަސްމީ ޑިޖިޓަލް ހޯމް އިފްތިތާޙްކުރުމަކީ އަޅުގަނޑުމެންނަށް ލިބޭ ވަރަށް ބޮޑު އުފަލެކެވެ. އިވެންޓްގެ ހުރިހާ ޚަބަރަކުން އަޕްޑޭޓްވެ، ރަޖިސްޓްރީކޮށް، ހޯއްދަވާ.',
    },
  },
  {
    id: 2,
    date: '2024-10-01',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920',
    alt: {
      [Language.EN]: 'Diverse group of partners in a meeting, finalizing an agreement.',
      [Language.DV]: 'ބައްދަލުވުމެއްގައި ތަފާތު ޕާޓްނަރުންތަކެއް އެއްބަސްވުމެއް ފައިނަލްކުރަނީ',
    },
    title: {
      [Language.EN]: 'Key Partners Join for Dhaalan 2025',
      [Language.DV]: 'ދާލަން 2025 އަށް މުހިއްމު ޕާޓްނަރުންތަކެއް ގުޅިއްޖެ',
    },
    excerpt: {
      [Language.EN]: 'Leading organizations in tech and education have officially partnered with us to make Dhaalan 2025 a landmark event for youth development.',
      [Language.DV]: 'ޒުވާނުންގެ ތަރައްޤީއަށް ދާލަން 2025 އަކީ މުހިއްމު އިވެންޓަކަށް ހެދުމަށްޓަކައި ޓެކްނޮލޮޖީއާއި ތަޢުލީމުގެ ދާއިރާގެ առաջատար މުއައްސަސާތަކުން އަޅުގަނޑުމެންނާ ރަސްމީކޮށް ބައިވެރިވެއްޖެ.',
    },
  },
   {
    id: 3,
    date: '2024-09-20',
    image: 'https://images.unsplash.com/photo-1600880292210-85938c827363?q=80&w=1920',
    alt: {
      [Language.EN]: 'A friendly volunteer assisting an attendee at an event registration desk.',
      [Language.DV]: 'އިވެންޓެއްގެ ރަޖިސްޓްރޭޝަން ޑެސްކެއްގައި ހިތްހެޔޮ ވޮލަންޓިއަރަކު ބައިވެރިއަކަށް އެހީވަނީ',
    },
    title: {
      [Language.EN]: 'Volunteer Registration Now Open',
      [Language.DV]: 'ވޮލަންޓިއަރުންގެ ގޮތުގައި ރަޖިސްޓްރީ ކުރުމުގެ ފުރުސަތު ހުޅުވާލައިފި',
    },
    excerpt: {
      [Language.EN]: 'Be a part of the team that brings Dhaalan 2025 to life. We are now accepting applications for volunteers. Gain experience and make a difference!',
      [Language.DV]: 'ދާލަން 2025 އަށް ދިރުން ގެނެސްދޭ ޓީމުގެ ބައެއްގެ ގޮތުގައި ބައިވެރިވެލައްވާ. ވޮލަންޓިއަރުންގެ ގޮތުގައި ބައިވެރިވުމުގެ ފުރުސަތު މިހާރު ހުޅުވާލާފައިވާ ވާހަކަ ދަންނަވަމެވެ. ތަޖުރިބާ ހޯދައި، ތަފާތެއް ދައްކާލައްވާ!',
    },
  },
];
