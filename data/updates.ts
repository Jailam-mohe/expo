import { Language, Update, UpdateType, UpdateCategory, UpdateStatus } from '../types';

export const updates: Update[] = [
  {
    id: 1,
    date: '2025-10-20',
    type: UpdateType.ANNOUNCEMENT,
    title: {
      [Language.EN]: 'Registration Deadline Extended to November 1st',
      [Language.DV]: 'ރަޖިސްޓްރީ ކުރުމުގެ ސުންގަޑި ނޮވެމްބަރު 1 އަށް އިތުރުކޮށްފި',
    },
    category: UpdateCategory.REGISTRATION,
    status: UpdateStatus.NEW,
  },
  {
    id: 2,
    date: '2025-10-18',
    type: UpdateType.UPDATE,
    title: {
      [Language.EN]: 'New Speakers Added from the Tech Sector',
      [Language.DV]: 'ޓެކް ދާއިރާއިން އައު ސްޕީކަރުން އިތުރުކުރެވިއްޖެ',
    },
    category: UpdateCategory.SPEAKERS,
    status: UpdateStatus.COMPLETED,
  },
    {
    id: 6,
    date: '2025-10-17',
    type: UpdateType.ANNOUNCEMENT,
    title: {
      [Language.EN]: 'Shuttle Bus Schedule Now Available',
      [Language.DV]: 'ޝަޓްލް ބަސް ޝެޑިއުލް މިހާރު ލިބެން އެބަހުރި',
    },
    category: UpdateCategory.VENUE,
    status: UpdateStatus.NEW,
  },
  {
    id: 3,
    date: '2025-10-15',
    type: UpdateType.UPDATE,
    title: {
      [Language.EN]: 'Exhibitor Booth Layout Finalized and Sent',
      [Language.DV]: 'އެގްޒިބިޓަރުންގެ ބޫތްތަކުގެ ލޭއައުޓް ފައިނަލްކޮށް ފޮނުވައިފި',
    },
    category: UpdateCategory.EXHIBITORS,
    status: UpdateStatus.COMPLETED,
  },
  {
    id: 7,
    date: '2025-10-14',
    type: UpdateType.ANNOUNCEMENT,
    title: {
      [Language.EN]: 'Special Student Discount on Food & Culinary Zone',
      [Language.DV]: 'ފުޑް އެންޑް ކަލިނަރީ ޒޯނުން ދަރިވަރުންނަށް ޚާއްޞަ ޑިސްކައުންޓެއް',
    },
    category: UpdateCategory.GENERAL,
    status: UpdateStatus.NEW,
  },
  {
    id: 4,
    date: '2025-10-12',
    type: UpdateType.SCHEDULE_CHANGE,
    title: {
      [Language.EN]: 'Volunteer Training Schedule Published',
      [Language.DV]: 'ވޮލަންޓިއަރުންގެ ތަމްރީނު ޝެޑިއުލް ޝާއިޢުކޮށްފި',
    },
    category: UpdateCategory.GENERAL,
    status: UpdateStatus.IN_PROGRESS,
  },
  {
    id: 5,
    date: '2025-10-10',
    type: UpdateType.UPDATE,
    title: {
      [Language.EN]: 'AI Guide Feature Enhanced with New Capabilities',
      [Language.DV]: 'އޭއައި ގައިޑްގެ ފީޗަރ އައު ކެޕޭބިލިޓީތަކާއެކު އިތުރަށް മെച്ചപ്പെടുത്തിފި',
    },
    category: UpdateCategory.GENERAL,
    status: UpdateStatus.COMPLETED,
  },
];