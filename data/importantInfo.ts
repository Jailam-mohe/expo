import { Language, ImportantInfo } from '../types';

export const importantInfoData: ImportantInfo[] = [
  {
    id: 1,
    title: {
      [Language.EN]: 'Health & Safety Guidelines',
      [Language.DV]: 'ޞިއްޙަތާއި ސަލާމަތީގެ އިރުޝާދު',
    },
    content: {
      [Language.EN]: `
Your health and safety are our top priority. Please adhere to the following guidelines:
- **Hand Hygiene:** Hand sanitizing stations are available throughout the expo. Please use them frequently.
- **Stay Home if Unwell:** If you are feeling unwell or have any symptoms, please stay home to protect others.
- **First Aid:** A dedicated first aid station is located near the Entertainment Zone.`,
      [Language.DV]: `
ތިބާގެ ޞިއްޙަތާއި ސަލާމަތަކީ އަޅުގަނޑުމެންގެ އެންމެ މުހިއްމު ಆದ್ಯතාවයකි. ದಯವಿಟ್ಟು ތިރީގައިވާ އިރުޝާދުތަކަށް پابند වන්න:
- **އަތް ސާފުކުރުން:** އެކްސްޕޯގެ އެކި ހިސާބުތަކުގައި އަތް ސާފުކުރާ ސްޓޭޝަންތައް ހުންނާނެއެވެ. އަވަސް އަވަހަށް ބޭނުންކުރައްވާ.
- **ބަލިނަމަ ގޭގައި މަޑުކުރައްވާ:** ތިބާއަށް സുഖമില്ലാത്തކަމަށް զգացվումނަމަ ނުވަތަ އެއްވެސް އަލާމާތެއް ހުރިނަމަ، އަނެކުން ރައްކާތެރިކުރުމަށްޓަކައި ގޭގައި މަޑުކުރައްވާ.
- **ފުރަތަމަ އެހީ:** ފުރަތަމަ އެހީ ދިނުމަށް ޚާއްޞަ ސްޓޭޝަނެއް އެންޓަރޓެއިންމަންޓް ޒޯން ކައިރީގައި ހުންނާނެއެވެ.`,
    },
  },
  {
    id: 2,
    title: {
      [Language.EN]: 'Venue Access & Parking',
      [Language.DV]: 'ވެނޫއަށް ވަނުމާއި ޕާކިންގ',
    },
    content: {
      [Language.EN]: `
- **Entry:** Please have your registration QR code ready for scanning at the entrance.
- **Public Transport:** We encourage attendees to use public transport. A free shuttle service will run from the Hulhumale' Ferry Terminal every 30 minutes.
- **Parking:** Limited parking is available on a first-come, first-served basis. Please follow the directions of the parking attendants.`,
      [Language.DV]: `
- **ވަނުން:** ވަދެވަޑައިގަންނަވާއިރު ސްކޭން ކުރުމަށްޓަކައި ތިބާގެ ރަޖިސްޓްރޭޝަން QR ކޯޑް ތައްޔާރުކޮށްފައި ބެހެއްޓެވުން އެދެމެވެ.
- **ޢާންމު ދަތުރުފަތުރު:** ބައިވެރިން ޢާންމު ދަތުރުފަތުރުގެ ޚިދުމަތް ބޭނުންކުރުމަށް ހިތްވަރުދެމެވެ. ހުޅުމާލެ ފެރީ ޓަރމިނަލުން ކޮންމެ 30 މިނެޓަކުން ހިލޭ ޝަޓްލް ޚިދުމަތެއް ދެވޭނެއެވެ.
- **ޕާކިންގ:** ޕާކްކުރުމުގެ ޖާގަ සීමිත බැවින්، ފުރަތަމަ އަންނަ ފަރާތްތަކަށް އިސްކަންދެވޭނެއެވެ. ದಯವಿಟ್ಟು ޕާކިންގ އެޓެންޑެންޓުންގެ އިރުޝާދުތަކާ އެއްގޮތަށް ޢަމަލުކުރައްވާ.`,
    },
  },
  {
    id: 3,
    title: {
      [Language.EN]: 'Accessibility Information',
      [Language.DV]: 'އެކްސެސިބިލިޓީ މަޢުލޫމާތު',
    },
    content: {
      [Language.EN]: `
Dhaalan 2025 is committed to being an inclusive event.
- **Wheelchair Access:** All expo zones and stages are wheelchair accessible.
- **Prayer Rooms:** Separate prayer rooms for men and women are available on-site.
- **Assistance:** If you require any special assistance, please visit the Information Desk near the main entrance.`,
      [Language.DV]: `
ދާލަން 2025 އަކީ ހުރިހާ ފަރާތްތަކަށް ހުޅުވާލެވިފައިވާ އިވެންޓަކަށް ހެދުމަށް އަޅުގަނޑުމެން پابەندވަމެވެ.
- **ዊልቸር އެކްސެސް:** ހުރިހާ އެކްސްޕޯ ޒޯންތަކާއި ސްޓޭޖްތަކަކީ ዊልቸርގައި ދެވޭނެ ތަންތަނެވެ.
- **ނަމާދު ކޮޓަރި:** ފިރިހެނުންނާއި އަންހެނުންނަށް ޚާއްޞަ ވަކި ނަމާދު ކޮޓަރިތައް ތައްޔާރުކުރެވިފައި ހުންނާނެއެވެ.
- **އެހީތެރިކަން:** ތިބާއަށް އެއްވެސް ޚާއްޞަ އެހީއެއް ބޭނުންފުޅުވާނަމަ، މައި ދޮރටුව ކައިރީގައިވާ މަޢުލޫމާތު ޑެސްކަށް ޒިޔާރަތްކުރައްވާ.`,
    },
  },
];
