export type QACheckStatus = 'not-tested' | 'pass' | 'fail' | 'running' | 'n/a';

export enum QASection {
    PAGES = 'Page Loading',
    LINKS = 'Link Integrity',
    FORMS = 'Form Submission',
    FILTERS = 'Filter & Search Functionality',
    RESPONSIVE = 'Responsiveness & Mobile Layout',
    ACCESSIBILITY = 'Accessibility (A11y)',
    CONTENT = 'Content & Data',
}

export interface QAChecklistItem {
    id: string;
    section: QASection;
    description: string;
    manualTest?: string;
    automated?: boolean;
    status: QACheckStatus;
    details?: string;
}

export const QAChecklist: QAChecklistItem[] = [
    // Page Loading
    { id: 'page-home', section: QASection.PAGES, description: 'Home Page loads without errors.', manualTest: 'Navigate to the homepage.', status: 'not-tested' },
    { id: 'page-exhibitors', section: QASection.PAGES, description: 'Exhibitors Page loads without errors.', manualTest: 'Navigate to /exhibitors.', status: 'not-tested' },
    { id: 'page-opportunities', section: QASection.PAGES, description: 'Opportunities Page loads without errors.', manualTest: 'Navigate to /opportunities.', status: 'not-tested' },
    { id: 'page-schedule', section: QASection.PAGES, description: 'Schedule Page loads without errors.', manualTest: 'Navigate to /schedule.', status: 'not-tested' },
    { id: 'page-speakers', section: QASection.PAGES, description: 'Speakers Page loads without errors.', manualTest: 'Navigate to /speakers.', status: 'not-tested' },
    { id: 'page-venue', section: QASection.PAGES, description: 'Venue Page loads without errors.', manualTest: 'Navigate to /venue.', status: 'not-tested' },
    { id: 'page-news', section: QASection.PAGES, description: 'News Page loads without errors.', manualTest: 'Navigate to /news.', status: 'not-tested' },
    { id: 'page-gallery', section: QASection.PAGES, description: 'Gallery Page loads without errors.', manualTest: 'Navigate to /gallery.', status: 'not-tested' },
    { id: 'page-resources', section: QASection.PAGES, description: 'Resources Page loads without errors.', manualTest: 'Navigate to /resources.', status: 'not-tested' },
    { id: 'page-register', section: QASection.PAGES, description: 'Register Page loads without errors.', manualTest: 'Navigate to /register.', status: 'not-tested' },
    { id: 'page-exhibit', section: QASection.PAGES, description: 'Exhibit Page loads without errors.', manualTest: 'Navigate to /exhibit.', status: 'not-tested' },
    { id: 'page-notfound', section: QASection.PAGES, description: '404 Not Found page loads for invalid routes.', manualTest: 'Navigate to a non-existent route like /asdf.', status: 'not-tested' },

    // Link Integrity
    { id: 'links-header', section: QASection.LINKS, description: 'All header navigation links work correctly.', manualTest: 'Click every link and dropdown link in the main header. Verify they go to the correct page.', status: 'not-tested' },
    { id: 'links-footer', section: QASection.LINKS, description: 'All footer links work correctly.', manualTest: 'Click every link in the footer. Verify they go to the correct page or external site.', status: 'not-tested' },
    { id: 'links-ctas', section: QASection.LINKS, description: 'All "Call to Action" buttons link correctly.', manualTest: 'Check "Register Now", "Exhibit with Us", "View All Exhibitors", etc., on the homepage and other pages.', status: 'not-tested' },
    { id: 'links-automated', section: QASection.LINKS, description: 'All links have valid href attributes.', manualTest: 'This is an automated check. Click "Run Automated Checks" to verify no links point to "#" or are empty.', automated: true, status: 'not-tested' },
    
    // Form Submission
    { id: 'form-register', section: QASection.FORMS, description: 'Registration form submits correctly with valid data.', manualTest: 'Go to /register. Fill out the form with valid data and submit. Check for success message.', status: 'not-tested' },
    { id: 'form-register-fail', section: QASection.FORMS, description: 'Registration form shows validation errors for invalid data.', manualTest: 'Go to /register. Submit with empty fields or an invalid email. Check for error messages.', status: 'not-tested' },
    { id: 'form-exhibit', section: QASection.FORMS, description: 'Exhibitor Interest form submits correctly.', manualTest: 'Go to /exhibit. Fill out the form and submit. Check for success message.', status: 'not-tested' },
    { id: 'form-ai-guide', section: QASection.FORMS, description: 'AI Guide chat input submits messages.', manualTest: 'Open the AI Guide widget and send a message. Verify it appears in the chat history and the model responds.', status: 'not-tested' },

    // Filter & Search
    { id: 'filter-exhibitors', section: QASection.FILTERS, description: 'Exhibitors page filters by zone and search term.', manualTest: 'Go to /exhibitors. Test the search input and the zone dropdown. Verify the results are filtered correctly.', status: 'not-tested' },
    { id: 'filter-opportunities', section: QASection.FILTERS, description: 'Opportunities page filters by type, zone, and search.', manualTest: 'Go to /opportunities. Test all filters in the sidebar. Verify results.', status: 'not-tested' },
    { id: 'filter-schedule', section: QASection.FILTERS, description: 'Schedule page filters by session type.', manualTest: 'Go to /schedule. Use the "Filter by Type" dropdown and check if the schedule updates.', status: 'not-tested' },
    { id: 'filter-resources', section: QASection.FILTERS, description: 'Resources page filters by category.', manualTest: 'Go to /resources. Click each category in the sidebar and verify the list updates.', status: 'not-tested' },
    { id: 'search-overlay', section: QASection.FILTERS, description: 'Header search overlay functions correctly.', manualTest: 'Click the search icon in the header. Test typing a query and submitting. Test clicking a suggestion.', status: 'not-tested' },

    // Responsiveness
    { id: 'responsive-mobile', section: QASection.RESPONSIVE, description: 'All pages render correctly on mobile screens.', manualTest: 'Using browser dev tools, check each page in a mobile viewport (e.g., 375px width). Verify no content overflows and the layout is usable.', status: 'not-tested' },
    { id: 'responsive-tablet', section: QASection.RESPONSIVE, description: 'All pages render correctly on tablet screens.', manualTest: 'Using browser dev tools, check each page in a tablet viewport (e.g., 768px width).', status: 'not-tested' },
    { id: 'responsive-header', section: QASection.RESPONSIVE, description: 'Header collapses to a hamburger menu on mobile.', manualTest: 'Shrink viewport width. Verify the hamburger menu appears and is functional.', status: 'not-tested' },

    // Accessibility
    { id: 'a11y-alt-tags', section: QASection.ACCESSIBILITY, description: 'All images have descriptive alt tags.', automated: true, manualTest: 'This is an automated check. Manually spot-check key images like speaker photos and news articles as well.', status: 'not-tested' },
    { id: 'a11y-keyboard-nav', section: QASection.ACCESSIBILITY, description: 'The site is fully navigable using only a keyboard.', manualTest: 'Use the Tab key to navigate through all pages. Ensure all interactive elements (links, buttons, forms) are focusable and there are visible focus states (outlines).', status: 'not-tested' },
    { id: 'a11y-labels', section: QASection.ACCESSIBILITY, description: 'All form inputs have associated labels.', automated: true, manualTest: 'This is an automated check. Manually verify on Register and Exhibit pages.', status: 'not-tested' },
    { id: 'a11y-screen-reader', section: QASection.ACCESSIBILITY, description: 'Content is logical and readable by a screen reader.', manualTest: 'Use a screen reader (e.g., NVDA, VoiceOver) to navigate the homepage. Check if headings, links, and content make sense.', status: 'not-tested' },

    // Content
    { id: 'content-language-toggle', section: QASection.CONTENT, description: 'Language switcher correctly toggles between English and Dhivehi.', manualTest: 'On any page, click the language switcher. Verify all text content updates to the selected language.', status: 'not-tested' },
    { id: 'content-dark-mode', section: QASection.CONTENT, description: 'Theme switcher correctly toggles between light and dark modes.', manualTest: 'On any page, click the theme switcher. Verify all components adapt to the new theme.', status: 'not-tested' },
    { id: 'content-placeholders', section: QASection.CONTENT, description: 'No placeholder text or data is visible.', manualTest: 'Scan all pages for "Lorem Ipsum", placeholder images, or dummy data (e.g., names, dates).', status: 'not-tested' },
];
