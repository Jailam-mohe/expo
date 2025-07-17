import { Language, Resource, ResourceCategory, ResourceType } from '../types';

export const resources: Resource[] = [
  {
    id: 1,
    category: ResourceCategory.EVENT_GUIDES,
    type: ResourceType.PDF,
    title: {
      [Language.EN]: 'Dhaalan 2025 Full Event Schedule',
      [Language.DV]: 'ދާލަން 2025 ފުރިހަމަ އިވެންޓް ޝެޑިއުލް',
    },
    description: {
      [Language.EN]: 'The complete three-day schedule with all sessions, workshops, and locations. Plan your visit!',
      [Language.DV]: 'ތިން ދުވަހުގެ ފުރިހަމަ ޝެޑިއުލް، ހުރިހާ ސެޝަންތަކާއި ވޯކްޝޮޕްތަކާއި، އަދި ތަންތަނާއެކު. ތިބާގެ ޒިޔާރަތް ރާވާލައްވާ!',
    },
    fileUrl: '/assets/sample-document.pdf',
    fileSize: '1.2 MB',
  },
  {
    id: 2,
    category: ResourceCategory.EVENT_GUIDES,
    type: ResourceType.PDF,
    title: {
      [Language.EN]: 'Expo Venue Map & Exhibitor Directory',
      [Language.DV]: 'އެކްސްޕޯ ވެニュー މެޕް އަދި އެގްޒިބިޓަރުންގެ ޑައިރެކްޓަރީ',
    },
    description: {
      [Language.EN]: 'Navigate the expo with ease using our detailed venue map and a complete list of exhibitors by zone.',
      [Language.DV]: 'އަޅުގަނޑުމެންގެ ތަފްޞީލީ ވެニュー މެޕާއި ޒޯންތަކުން އެގްޒިބިޓަރުންގެ ފުރިހަމަ ލިސްޓް ބޭނުންކޮށްގެން ފަސޭހައިން އެކްސްޕޯ ތެރޭގައި ހަރަކާތްތެރިވެލައްވާ.',
    },
    fileUrl: '/assets/sample-document.pdf',
    fileSize: '2.5 MB',
  },
  {
    id: 3,
    category: ResourceCategory.CAREER_RESOURCES,
    type: ResourceType.DOCX,
    title: {
      [Language.EN]: 'Modern CV Template',
      [Language.DV]: 'ޒަމާނީ ސީވީ ޓެމްޕްލޭޓް',
    },
    description: {
      [Language.EN]: 'A professionally designed CV template optimized for Applicant Tracking Systems (ATS).',
      [Language.DV]: 'އެޕްލިކަންޓް ޓްރެކިންގ ސިސްޓަމް (އޭޓީއެސް) އަށް ޚާއްޞަކޮށް ފަރުމާކުރެވިފައިވާ ޕްރޮފެޝަނަލް ސީވީ ޓެމްޕްލޭޓެއް.',
    },
    fileUrl: '/assets/sample-document.docx',
    fileSize: '150 KB',
  },
  {
    id: 4,
    category: ResourceCategory.CAREER_RESOURCES,
    type: ResourceType.PDF,
    title: {
      [Language.EN]: 'Interview Preparation Checklist',
      [Language.DV]: 'އިންޓަވިއުއަށް ތައްޔާރުވުމުގެ ޗެކްލިސްޓް',
    },
    description: {
      [Language.EN]: 'A comprehensive checklist to help you prepare for job interviews and make a great impression.',
      [Language.DV]: 'ވަޒީފާގެ އިންޓަވިއުތަކަށް ތައްޔާރުވެ، ރަނގަޅު შთაბეჭდილება ދިނުމަށް އެހީތެރިވެދޭނެ ފުރިހަމަ ޗެކްލިސްޓެއް.',
    },
    fileUrl: '/assets/sample-document.pdf',
    fileSize: '450 KB',
  },
  {
    id: 5,
    category: ResourceCategory.INDUSTRY_REPORTS,
    type: ResourceType.PDF,
    title: {
      [Language.EN]: 'Maldives Digital Economy Outlook 2025',
      [Language.DV]: 'ދިވެހިރާއްޖޭގެ ޑިޖިޓަލް އިޤްތިޞާދުގެ މަންޒަރު 2025',
    },
    description: {
      [Language.EN]: 'An in-depth report on the trends, challenges, and opportunities within the Maldivian digital landscape.',
      [Language.DV]: 'ދިވެހި ޑިޖިޓަލް މާހައުލުގެ ޓްރެންޑްތަކާއި، ގޮންޖެހުންތަކާއި، އަދި ފުރުޞަތުތަކާ ބެހޭ ފުން ރިޕޯޓެއް.',
    },
    fileUrl: '/assets/sample-document.pdf',
    fileSize: '5.8 MB',
  },
  {
    id: 6,
    category: ResourceCategory.MEDIA_KIT,
    type: ResourceType.ZIP,
    title: {
      [Language.EN]: 'Dhaalan 2025 Brand Assets & Logos',
      [Language.DV]: 'ދާލަން 2025 ގެ ބްރޭންޑް އެސެޓްތަކާއި ލޯގޯތައް',
    },
    description: {
      [Language.EN]: 'Official logos, color palettes, and brand guidelines for media partners and exhibitors.',
      [Language.DV]: 'މީޑިއާ ޕާޓްނަރުންނާއި އެގްޒިބިޓަރުންނަށް ޚާއްޞަ ރަސްމީ ލޯގޯތަކާއި، ކުލަތަކާއި، އަދި ބްރޭންޑް ގައިޑްލައިންތައް.',
    },
    fileUrl: '/assets/sample-archive.zip',
    fileSize: '10.3 MB',
  },
];
