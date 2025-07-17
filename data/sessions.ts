import { Session, Language, ResourceType } from '../types';

export const sessions: Session[] = [
  // Day 1
  {
    id: 1,
    day: 'day1',
    time: '09:00 - 10:00',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Grand Opening Ceremony',
      [Language.DV]: 'ފެށުމުގެ ރަސްމިއްޔާތު',
    },
    description: {
      [Language.EN]: 'Join us for the official opening of Dhaalan 2025, featuring remarks from government officials and event organizers. A celebration of innovation and opportunity.',
      [Language.DV]: 'ދާލަން 2025 ރަސްމީކޮށް ހުޅުވުމުގެ ރަސްމިއްޔާތުގައި ބައިވެރިވެވަޑައިގަންނަވާ. މި ރަސްމިއްޔާތުގައި ސަރުކާރުގެ އިސްވެރިންނާއި އިވެންޓް އިންތިޒާމުކުރާ ފަރާތްތަކުން ވާހަކަފުޅު ދައްކަވާނެ. މިއީ އީޖާދާއި ފުރުޞަތުތަކުގެ އުފާފާޅުކުރުމެކެވެ.',
    },
    type: 'Ceremony',
    speakerIds: [],
  },
  {
    id: 2,
    day: 'day1',
    time: '10:30 - 11:30',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Keynote: Charting the Digital Future of Maldivian Careers',
      [Language.DV]: 'ޚާއްޞަ ވާހަކަ: ދިވެހި ވަޒީފާތަކުގެ ޑިޖިޓަލް މުސްތަޤްބަލް ބައްޓަންކުރުން',
    },
    description: {
      [Language.EN]: 'A keynote address by Aishath Adnan, CEO of Innovate Maldives. Discover the upcoming trends in the digital job market and learn how to position yourself for success in the new economy.',
      [Language.DV]: 'އިންނޮވޭޓް މޯލްޑިވްސްގެ ސީއީއޯ، ޢާއިޝަތު ޢަދުނާންގެ ޚާއްޞަ ވާހަކަފުޅެކެވެ. ޑިޖިޓަލް ވަޒީފާގެ ބާޒާރުގައި ކުރިއަށް އޮތް ޓްރެންޑްތައް ހޯއްދަވައި، އައު އިޤްތިޞާދުގައި ކާމިޔާބީއަށް ތައްޔާރުވާނެ ގޮތް އުނގެނިވަޑައިގަންނަވާ.',
    },
    type: 'Keynote',
    speakerIds: [1],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    slidesUrl: '/assets/sample-presentation.pdf',
    slidesFileType: ResourceType.PDF,
    slidesFileSize: '3.1 MB',
  },
  {
    id: 3,
    day: 'day1',
    time: '13:00 - 14:30',
    location: 'Workshop Room A',
    title: {
      [Language.EN]: 'Workshop: Crafting a CV for the Digital Age',
      [Language.DV]: 'ވާރކްޝޮޕް: ޑިޖިޓަލް ޒަމާނަށް ސީވީއެއް ތައްޔާރުކުރުން',
    },
    description: {
      [Language.EN]: 'Led by Dr. Hassan Ali, this interactive workshop will guide you through creating a standout CV that grabs the attention of modern recruiters. Learn about applicant tracking systems (ATS), keyword optimization, and showcasing digital skills effectively.',
      [Language.DV]: 'ޑރ. ޙަސަން ޢަލީ ހުށަހަޅުއްވައިދެއްވާ މި އިންޓަރެކްޓިވް ވާރކްޝޮޕްގައި، ޒަމާނީ ރިކްރޫޓަރުންގެ ސަމާލުކަން ހޯދާނެ ފަދަ ސީވީއެއް ތައްޔާރުކުރާނެ ގޮތް ދަސްކޮށްދެއްވާނެއެވެ. އެޕްލިކަންޓް ޓްރެކިންގ ސިސްޓަމް (އޭޓީއެސް)، ކީވޯޑް އޮޕްޓިމައިޒޭޝަން، އަދި ޑިޖިޓަލް ހުނަރުތައް ފުރިހަމައަށް ދައްކާނެ ގޮތް އުނގެނިވަޑައިގަންނަވާ.',
    },
    type: 'Workshop',
    speakerIds: [2],
  },
  {
    id: 4,
    day: 'day1',
    time: '15:00 - 16:30',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Panel: The Future of Tech in Maldives',
      [Language.DV]: 'ޕެނަލް: ދިވެހިރާއްޖޭގެ ޓެކްނޮލޮޖީގެ މުސްތަޤްބަލް',
    },
    description: {
      [Language.EN]: 'A discussion with leading entrepreneurs and HR directors on the challenges and opportunities in the Maldivian tech industry. Panelists include Fathimath Shehenaz (Founder, Loopcraft) and Ahmed Ziyad (HR Director, BML).',
      [Language.DV]: 'ދިވެހި ޓެކް ދާއިރާގައި ހުރި ގޮންޖެހުންތަކާއި ފުރުޞަތުތަކާ ބެހޭގޮތުން առաջատար ވިޔަފާރިވެރިންނާއި އެޗްއާރް ޑިރެކްޓަރުންނާအတူ ބާއްވާ މަޝްވަރާއެކެވެ. ޕެނަލިސްޓުންގެ ތެރޭގައި ފާތިމަތު ޝެހެނާޒް (ފައުންޑަރ، ލޫޕްކްރާފްޓް) އަދި އަޙްމަދު ޒިޔާދު (އެޗްއާރް ޑިރެކްޓަރ، ބީއެމްއެލް) ހިމެނިވަޑައިގަންނަވައެވެ.',
    },
    type: 'Panel',
    speakerIds: [3, 4],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  // Day 2
  {
    id: 11,
    day: 'day2',
    time: '09:00 - 10:00',
    location: 'Workshop Room A',
    title: {
      [Language.EN]: 'Workshop: LinkedIn Masterclass: Building Your Professional Brand',
      [Language.DV]: 'ވާރކްޝޮޕް: ލިންކްޑްއިން މާސްޓަރކްލާސް: ތިބާގެ ޕްރޮފެޝަނަލް ބްރޭންޑް ބިނާކުރުން',
    },
    description: {
      [Language.EN]: 'HR Director Ahmed Ziyad shares expert tips on creating a powerful LinkedIn profile that attracts recruiters and opportunities. Learn to optimize every section of your profile.',
      [Language.DV]: 'އެޗްއާރް ޑިރެކްޓަރ އަޙްމަދު ޒިޔާދު، ރެކްރޫޓަރުންނާއި ފުރުޞަތުތައް ଆକର୍ଷିତކުރާނެފަދަ ބާރުގަދަ ލިންކްޑްއިން ޕްރޮފައިލެއް އުފެއްދުމުގެ މާހިރު ލަފާތައް ހިއްސާކުރައްވާނެ. ތިބާގެ ޕްރޮފައިލްގެ ކޮންމެ ބައެއް އޮޕްޓިމައިޒްކުރާނެ ގޮތް ދަސްކުރައްވާ.',
    },
    type: 'Workshop',
    speakerIds: [4],
  },
  {
    id: 7,
    day: 'day2',
    time: '10:00 - 11:30',
    location: 'Workshop Room B',
    title: {
      [Language.EN]: 'Workshop: From Idea to MVP',
      [Language.DV]: 'ވާރކްޝޮޕް: ޚިޔާލަކުން MVP އަކަށް',
    },
    description: {
      [Language.EN]: 'Join Fathimath Shehenaz, founder of Loopcraft, as she walks you through the essential steps of turning a business idea into a Minimum Viable Product. Learn about market research, prototyping, and getting early feedback.',
      [Language.DV]: 'ލޫޕްކްރާފްޓްގެ ފައުންޑަރ، ފާތިމަތު ޝެހެނާޒްއާއެކު، ވިޔަފާރީގެ ޚިޔާލެއް މިނިމަމް ވައިބަލް ޕްރޮޑަކްޓަކަށް (MVP) ބަދަލުކުރުމުގެ މުހިއްމު މަރުޙަލާތައް ދަސްކުރައްވާ. މާކެޓް ރިސާޗް، ޕްރޮޓޯޓައިޕިންގ، އަދި އަވަހަށް ފީޑްބެކް ހޯދުމާ ބެހޭގޮތުން އުނގެނިވަޑައިގަންނަވާ.',
    },
    type: 'Workshop',
    speakerIds: [3],
  },
    {
    id: 12,
    day: 'day2',
    time: '11:45 - 13:00',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Panel: Sustainable Tourism in the Digital Age',
      [Language.DV]: 'ޕެނަލް: ޑިޖިޓަލް ޒަމާނުގައި ދެމެހެއްޓެނިވި ފަތުރުވެރިކަން',
    },
    description: {
      [Language.EN]: 'Explore how technology can promote sustainability in the Maldives\' most vital industry. A discussion with Aishath Adnan (Innovate Maldives) and Dr. Hassan Ali (MNU).',
      [Language.DV]: 'ދިވެހިރާއްޖޭގެ އެންމެ މުހިއްމު ދާއިރާގައި ޓެކްނޮލޮޖީން ދެމެހެއްޓެނިވިކަން ކުރިއެރުවිය හැකි ආකාරය ބައްލަވާލައްވާ. ޢާއިޝަތު ޢަދުނާން (އިންނޮވޭޓް މޯލްޑިވްސް) އަދި ޑރ. ޙަސަން ޢަލީ (އެމް.އެން.ޔޫ) އާ އެކު މަޝްވަރާއެއް.',
    },
    type: 'Panel',
    speakerIds: [1, 2],
  },
  {
    id: 8,
    day: 'day2',
    time: '14:00 - 15:30',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Panel: Bridging the Gap Between Education and Industry',
      [Language.DV]: 'ޕެނަލް: ތަޢުލީމާއި އިންޑަސްޓްރީއާ ދެމެދު އޮންނަ ފަރަގު ފޫބެއްދުން',
    },
    description: {
      [Language.EN]: 'A critical discussion on how educational institutions and companies can collaborate to create a skilled workforce. Featuring Aishath Adnan (Innovate Maldives) and Dr. Hassan Ali (MNU).',
      [Language.DV]: 'ހުނަރުވެރި މަސައްކަތްތެރި ޖީލެއް އުފެއްދުމަށް ތަޢުލީމީ މުއައްސަސާތަކާއި ކުންފުނިތަކަށް އެކުގައި މަސައްކަތްކުރެވިދާނެ ގޮތްތަކާ ބެހޭ މުހިއްމު މަޝްވަރާއެކެވެ. ބައިވެރިވެވަޑައިގަންނަވާނީ ޢާއިޝަތު ޢަދުނާން (އިންނޮވޭޓް މޯލްޑިވްސް) އަދި ޑރ. ޙަސަން ޢަލީ (އެމް.އެން.ޔޫ).',
    },
    type: 'Panel',
    speakerIds: [1, 2],
  },
  {
    id: 5,
    day: 'day2',
    time: '16:00 - 17:00',
    location: 'Networking Lounge',
    title: {
      [Language.EN]: 'Tech Innovators Networking Session',
      [Language.DV]: 'ޓެކް އިންނޮވޭޓަރުންގެ ނެޓްވޯކިންގ ސެޝަން',
    },
    description: {
      [Language.EN]: 'An exclusive opportunity for aspiring tech professionals and students to connect with speakers, exhibitors, and industry leaders from the Innovation & Startup Zone.',
      [Language.DV]: 'ޓެކް ދާއިރާއަށް ޝައުޤުވެރިވާ ފަރާތްތަކަށާއި ދަރިވަރުންނަށް، ވާހަކަ ދައްކަވާނެ ފަރާތްތަކާއި، އެގްޒިބިޓަރުންނާއި، އަދި އިނޮވޭޝަން އެންޑް ސްޓާޓަޕް ޒޯންގެ ދާއިރާގެ ލީޑަރުންނާ ގުޅިލުމަށް ލިބޭ ޚާއްޞަ ފުރުޞަތެކެވެ.',
    },
    type: 'Networking',
    speakerIds: [],
  },
  // Day 3
   {
    id: 13,
    day: 'day3',
    time: '09:30 - 10:45',
    location: 'Workshop Room B',
    title: {
      [Language.EN]: 'Workshop: Intro to UI/UX Design Principles',
      [Language.DV]: 'ވާރކްޝޮޕް: ޔޫއައި/ޔޫއެކްސް ޑިޒައިންގެ އަސާސްތަކުގެ ތަޢާރަފެއް',
    },
    description: {
      [Language.EN]: 'Learn the fundamentals of user-centric design with Fathimath Shehenaz. This session covers core concepts of UI/UX, from wireframing to user journey mapping.',
      [Language.DV]: 'ފާތިމަތު ޝެހެނާޒްއާއެކު ޔޫޒަރ-ސެންޓްރިކް ޑިޒައިންގެ އަސާސްތައް ދަސްކުރައްވާ. މި ސެޝަންގައި ވައިރފްރޭމިންގއިން ފެށިގެން ޔޫޒަރ ޖާރނީ މެޕިންގއާ ހަމައަށް ޔޫއައި/ޔޫއެކްސްގެ މައިގަނޑު ކޮންސެޕްޓްތައް ހިމެނޭނެއެވެ.',
    },
    type: 'Workshop',
    speakerIds: [3],
  },
  {
    id: 9,
    day: 'day3',
    time: '11:00 - 12:30',
    location: 'Workshop Room A',
    title: {
      [Language.EN]: 'Workshop: Modern Interview Techniques',
      [Language.DV]: 'ވާރކްޝޮޕް: ޒަމާނީ އިންޓަވިއު ޓެކްނީކްތައް',
    },
    description: {
      [Language.EN]: 'Ahmed Ziyad (HR Director, BML) shares insights into what recruiters look for in interviews. Practice answering common questions and learn about behavioral interview techniques.',
      [Language.DV]: 'އަޙްމަދު ޒިޔާދު (އެޗްއާރް ޑިރެކްޓަރ، ބީއެމްއެލް) އިންޓަވިއުތަކުގައި ރިކްރޫޓަރުން ބަލާ ކަންކަމާ ބެހޭގޮތުން މަޢުލޫމާތު ހިއްސާކުރައްވާނެއެވެ. އާންމު ސުވާލުތަކަށް ޖަވާބު ދިނުމަށް പരിശീലനം ලබා، ބިހޭވިއަރަލް އިންޓަވިއު ޓެކްނީކްތައް ދަސްކުރައްވާ.',
    },
    type: 'Workshop',
    speakerIds: [4],
  },
  {
    id: 14,
    day: 'day3',
    time: '13:00 - 13:45',
    location: 'Networking Lounge',
    title: {
      [Language.EN]: 'Meet the Recruiters',
      [Language.DV]: 'ރެކްރޫޓަރުންނާ ބައްދަލުކުރުން',
    },
    description: {
      [Language.EN]: 'A dedicated networking session to connect directly with HR managers and recruiters from top companies in the Career Hub Zone. Bring your CV!',
      [Language.DV]: 'ކެރިއަރ ހަބް ޒޯންގެ ඉහළම ކުންފުނިތަކުގެ އެޗްއާރް މެނޭޖަރުންނާއި ރެކްރޫޓަރުންނާ ސީދާ ގުޅިލުމަށް ޚާއްޞަ ނެޓްވޯކިންގ ސެޝަނެކެވެ. ތިބާގެ ސީވީ ހިފައިގެން އަންނާށެވެ!',
    },
    type: 'Networking',
    speakerIds: [],
  },
  {
    id: 10,
    day: 'day3',
    time: '14:00 - 15:00',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Fireside Chat: The Entrepreneurial Journey',
      [Language.DV]: 'ފަޔަރސައިޑް ޗެޓް: ވިޔަފާރިވެރިކަމުގެ ދަތުރު',
    },
    description: {
      [Language.EN]: 'An intimate conversation with Fathimath Shehenaz about the highs and lows of starting and scaling a tech company in the Maldives. An inspiring session for aspiring entrepreneurs.',
      [Language.DV]: 'ދިވެހިރާއްޖޭގައި ޓެކް ކުންފުންޏެއް ފަށައި، ފުޅާކުރުމުގެ އުފާތަކާއި ދަތިތަކާ ބެހޭގޮތުން ފާތިމަތު ޝެހެނާޒްއާအတူ ބާއްވާ ގާތް ވާހަކަ ސެޝަނެކެވެ. ވިޔަފާރިވެރިންނަށް ވާން ބޭނުންވާ ފަރާތްތަކަށް އިލްހާމެއް ލިބިގެންދާނެ ސެޝަނެކެވެ.',
    },
    type: 'Panel',
    speakerIds: [3],
  },
  {
    id: 6,
    day: 'day3',
    time: '16:00 - 17:00',
    location: 'Main Stage',
    title: {
      [Language.EN]: 'Closing Remarks & Future Forward',
      [Language.DV]: 'ނިންމުމުގެ ރަސްމިއްޔާތު',
    },
    description: {
      [Language.EN]: 'A look back at the highlights of Dhaalan 2025 and a forward look into the future of youth development and digital innovation in the Maldives.',
      [Language.DV]: 'ދާލަން 2025 ގެ އެންމެ ފާހަގަކޮށްލެވޭ ވަގުތުކޮޅުތަކަށް އަލިއަޅުވާލުމާއި، ދިވެހިރާއްޖޭގެ ޒުވާނުންގެ ތަރައްޤީއާއި ޑިޖިޓަލް އީޖާދުގެ މުސްތަޤްބަލަށް ނަޒަރެއް ދިނުން.',
    },
    type: 'Ceremony',
    speakerIds: [],
  },
];