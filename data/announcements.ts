import { Language } from '../types';
import { Announcement } from '../types';


export const announcements: Announcement[] = [
  {
    id: 1,
    text: {
      [Language.EN]: 'Early bird registration extended to November 5th!',
      [Language.DV]: 'އާލީ ބާރޑް ރަޖިސްޓްރޭޝަން ނޮވެމްބަރ 5 އަށް އިތުރުކޮށްފި!',
    }
  },
  {
    id: 2,
    text: {
      [Language.EN]: 'New tech companies just joined our exhibitor list. Check them out!',
      [Language.DV]: 'އައު ޓެކް ކުންފުނިތަކެއް އަޅުގަނޑުމެންގެ އެގްޒިބިޓަރުންގެ ލިސްޓަށް އިތުރުވެއްޖެ. ބައްލަވާލައްވާ!',
    }
  },
   {
    id: 3,
    text: {
      [Language.EN]: 'Workshop on "AI for Business" now has limited seats available.',
      [Language.DV]: '"އޭއައި ފޯ ބިޒްނަސް" ވޯކްޝޮޕްގެ މަދު ގޮނޑިކޮޅެއް މިހާރު ލިބެން އެބަހުއްޓެވެ.',
    }
  }
];
