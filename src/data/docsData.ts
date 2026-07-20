export interface DocFAQ {
  q: string;
  a: string;
}

export interface RelatedPage {
  id: string;
  title: string;
}

export interface ScreenshotPlan {
  filename: string;
  alt: string;
  caption: string;
}

export interface DocPageUseCase {
  scenario: string;
  benefit: string;
}

export interface DocStep {
  title: string;
  badge?: string;
  badgeColor?: string; // bg-blue-50 text-blue-600, etc.
  desc: string;
  details?: string[];
  iconName?: string; // lucide icon name string
}

export interface DocPage {
  id: string;
  title: string;
  description: string;
  section: 'OVERVIEW' | 'SETUP' | 'MESSAGING' | 'ACCOUNT' | 'SUPPORT' | 'WORKFLOW';
  subsection?: string;
  readingTime: string;
  purpose: string; // 1. What is this?
  whyItMatters: string; // 2. Why is it important?
  prerequisites?: string[]; // 3. What do I need before I begin?
  steps?: string[] | DocStep[]; // 4. How do I use it?
  expectAfter?: string; // 5. What should I expect afterwards?
  
  // Custom interactive/visual widgets triggers
  hasIntegrationFlow?: boolean;
  hasModuleEcosystem?: boolean;
  hasProblemsSolved?: boolean;
  hasTargetPersonas?: boolean;
  hasFirstSMSChecklist?: boolean;
  hasTicketForm?: boolean;

  // 6. Common questions / tips
  tips?: string[];
  notes?: string[];
  warnings?: string[];
  commonIssues?: string[];
  faqs?: DocFAQ[];

  // 7. Where should I go next?
  nextPageCTA?: { title: string; desc: string; id: string };

  screenshots?: ScreenshotPlan[];
  relatedPages?: RelatedPage[];
  capabilities?: string[];
  useCases?: DocPageUseCase[];
}

export const defaultSmsReminder =
  'After installation, NOLA SMS Pro transmits messages using the default sender mask NOLASMSPro until an approved custom Sender ID is active. Sending requires available SMS credits. A standard local SMS is limited to 160 characters per credit segment, with longer or special-character messages drawing multiple credits. Verify status logs in Message History after dispatch.';

export const sidebarStructure = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'what-is-nola-sms-pro', title: 'What is NOLA SMS Pro?' },
      { id: 'how-nola-sms-pro-works', title: 'How NOLA SMS Pro Works' },
      { id: 'core-features', title: 'Core Features' }
    ]
  },
  {
    title: 'SETUP',
    items: [
      { id: 'install-nola-sms-pro', title: 'Install NOLA SMS Pro' },
      { id: 'create-or-sign-in', title: 'Create or Sign In' },
      { id: 'connect-highlevel', title: 'Connect HighLevel' },
      { id: 'dashboard-overview', title: 'Dashboard Overview' },
      { id: 'send-your-first-sms', title: 'Send Your First SMS' }
    ]
  },
  {
    title: 'MESSAGING',
    items: [
      { id: 'contacts', title: 'Contacts' },
      { id: 'compose-sms', title: 'Compose SMS' },
      { id: 'message-templates', title: 'Message Templates' },
      { id: 'sender-ids', title: 'Sender IDs' },
      { id: 'message-history', title: 'Message History' }
    ]
  },
  {
    title: 'WORKFLOW',
    items: [
      { id: 'automation', title: 'Automation' },
      { id: 'ghl-conversation', title: 'GHL Conversation' }
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      { id: 'sms-credits', title: 'SMS Credits' },
      { id: 'settings', title: 'Settings' }
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      { id: 'troubleshooting', title: 'Troubleshooting' },
      { id: 'support-help', title: 'Support & Help' },
      { id: 'faq', title: 'Frequently Asked Questions' }
    ]
  }
];

export const docsData: DocPage[] = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'An embedded SMS communication platform operating natively within your HighLevel sub-account.',
    section: 'OVERVIEW',
    readingTime: '2 min read',
    purpose: 'NOLA SMS Pro is a native communication portal built directly inside your HighLevel workspace. This user guide acts as a guided setup journey, designed to take you from installation to sending your first customer text message.',
    whyItMatters: 'Reaching customer mobiles directly from your CRM keeps conversation logs aligned, ensures faster support replies, and secures customer databases by eliminating manual list exports.',
    prerequisites: [
      'An active HighLevel sub-account.',
      'Administrator level permissions to authorize applications in the HighLevel Marketplace.'
    ],
    steps: [
      'Locate NOLA SMS Pro in the HighLevel Marketplace.',
      'Connect it to your specific sub-account location.',
      'Register your admin owner profile for billing and settings configuration.',
      'Verify credit levels and start sending branded SMS directly next to client CRM profiles.'
    ],
    expectAfter: 'You will have a unified SMS dashboard fully integrated inside your HighLevel sub-account, ready to configure compliance masks and message customer bases in the Philippines.',
    relatedPages: [
      { id: 'what-is-nola-sms-pro', title: 'What is NOLA SMS Pro?' },
      { id: 'install-nola-sms-pro', title: 'Install NOLA SMS Pro' }
    ],
    nextPageCTA: {
      title: 'What is NOLA SMS Pro?',
      desc: 'Understand the business benefits and setup outcomes of NOLA SMS Pro.',
      id: 'what-is-nola-sms-pro'
    },
    screenshots: [
      {
        filename: '/images/docs/welcome-nola-inside-highlevel.png',
        alt: 'NOLA SMS Pro embedded in HighLevel sub-account menu.',
        caption: 'Find and access NOLA SMS Pro directly inside your sub-account navigation panel.'
      }
    ]
  },
  {
    id: 'what-is-nola-sms-pro',
    title: 'What is NOLA SMS Pro?',
    description: 'A native communication portal built to facilitate text messaging with Philippine mobile subscribers.',
    section: 'OVERVIEW',
    readingTime: '2 min read',
    purpose: 'NOLA SMS Pro centralizes contacts lookup, custom copywriting, template storage, credit refills, and carrier logs inside your HighLevel workspace.',
    whyItMatters: 'Traditional external texting systems cause "tab fatigue" and risk contact data exposure. NOLA SMS Pro replaces these fragmented tools with a secure, embedded outbox right next to your CRM database.',
    prerequisites: [
      'HighLevel sub-account location access.',
      'Philippine-based customer contacts with mobile numbers.'
    ],
    steps: [
      'Access the app natively via the HighLevel sub-account menu.',
      'Avoid duplicate typing by searching contact files synced in real-time.',
      'Ensure standard, professional replies by loading pre-saved templates.',
      'Brand your messages using verified custom Sender IDs registered with local networks.'
    ],
    expectAfter: 'Your support, sales, and marketing teams will communicate directly with mobile leads without transferring files, leaving tabs open, or copying numbers.',
    hasProblemsSolved: true,
    hasTargetPersonas: true,
    relatedPages: [
      { id: 'how-nola-sms-pro-works', title: 'How NOLA SMS Pro Works' }
    ],
    nextPageCTA: {
      title: 'How NOLA SMS Pro Works',
      desc: 'Learn about the carrier routing and credit system behind our dashboard.',
      id: 'how-nola-sms-pro-works'
    }
  },
  {
    id: 'how-nola-sms-pro-works',
    title: 'How NOLA SMS Pro Works',
    description: 'Bridges your CRM workspace directly to Philippine telco networks via a secure carrier gateway.',
    section: 'OVERVIEW',
    readingTime: '3 min read',
    purpose: 'NOLA SMS Pro connects your sub-account directly to local networks (Globe, Smart, DITO) in the Philippines, delivering messages reliably at localized rates.',
    whyItMatters: 'Direct local gateway routing ensures fast delivery speeds and compliance with carrier-level spam filters, preventing message blocks.',
    prerequisites: [
      'Active SMS credits in your NOLA SMS Pro billing workspace.',
      'Customer phone numbers using local 11-digit formatting (09XXXXXXXXX).'
    ],
    steps: [
      'Pick a contact: The app reads details from your synced HighLevel directory.',
      'Format copy: You type a custom message or select a saved standard template.',
      'Apply identity: You select a sender mask (default NOLASMSPro or your approved Sender ID).',
      'Debit credits: The system verifies text segment lengths and deducts credits.',
      'Deliver & Log: Outbound carriers route the block and report live status codes back to your History logs.'
    ],
    expectAfter: 'You will understand the pathway of a text message from the Compose panel, through our local gateways, to the subscriber\'s hand.',
    hasIntegrationFlow: true,
    hasModuleEcosystem: true,
    relatedPages: [
      { id: 'core-features', title: 'Core Features' }
    ],
    nextPageCTA: {
      title: 'Core Features',
      desc: 'Explore the functional modules of the NOLA SMS Pro workspace.',
      id: 'core-features'
    }
  },
  {
    id: 'core-features',
    title: 'Core Features',
    description: 'The six functional pillars designed to run a secure, branded SMS outreach program.',
    section: 'OVERVIEW',
    readingTime: '2 min read',
    purpose: 'NOLA SMS Pro is built on six functional modules: Contacts, Compose, Templates, Sender IDs, Credits, and Settings.',
    whyItMatters: 'By grouping features into standard, focused modules, operators can verify client records, load approved templates, check sending history, and request top-ups in seconds.',
    prerequisites: [
      'Basic familiarity with NOLA SMS Pro navigation shortcuts.'
    ],
    steps: [
      'Contacts: Look up or add mobile customer records.',
      'Compose: Type texts, review credit segments, and dispatch SMS.',
      'Templates: Organize reusable, pre-written standard message blocks.',
      'Sender IDs: Manage custom brand headers to replace raw sender numbers.',
      'Credits: Monitor available gateway credits and request refills.',
      'Settings: Configure profiles, notification levels, and sub-account integrations.'
    ],
    expectAfter: 'You will recognize the primary modules in your sidebar and know where to configure each feature.',
    relatedPages: [
      { id: 'install-nola-sms-pro', title: 'Install NOLA SMS Pro' }
    ],
    nextPageCTA: {
      title: 'Install NOLA SMS Pro',
      desc: 'Deploy the app to your HighLevel sub-account to activate the system.',
      id: 'install-nola-sms-pro'
    }
  },
  {
    id: 'install-nola-sms-pro',
    title: 'Install NOLA SMS Pro',
    description: 'Deploy NOLA SMS Pro from the Marketplace to your HighLevel sub-account.',
    section: 'SETUP',
    readingTime: '3 min read',
    purpose: 'Authorize GoHighLevel to integrate with the NOLA platform so the app can send text messages and synchronize your contact database.',
    whyItMatters: 'Establishing a direct marketplace integration secures communication pathways and enables instant bi-directional database synchronization without manual exporting.',
    prerequisites: [
      'Administrator-level access to your GoHighLevel Agency Account.',
      'The specific sub-account (location) name where the app should be installed.'
    ],
    steps: [
      'Log in to GoHighLevel.',
      'In the sidebar, select Agency View.',
      'Open the Marketplace and search for NOLA SMS Pro.',
      'Click Install.',
      'Select the designated sub-account/location you want to use.',
      'Review the requested permissions (contacts, messages, location details), then click Allow & Install.'
    ],
    expectAfter: 'After completing the installation steps, GoHighLevel will establish the connection and automatically redirect you to the account setup screen.',
    nextPageCTA: {
      title: 'Create or Sign In',
      desc: 'Register your owner profile to access settings, credits, and logs.',
      id: 'create-or-sign-in'
    },
    relatedPages: [
      { id: 'overview', title: 'Overview' },
      { id: 'create-or-sign-in', title: 'Create or Sign In' }
    ]
  },
  {
    id: 'create-or-sign-in',
    title: 'Create or Sign In',
    description: 'Register your owner profile to access settings, credits, and logs.',
    section: 'SETUP',
    readingTime: '2 min read',
    purpose: 'Map each installed sub-account/location in GHL to a registered owner profile in NOLA SMS Pro to secure data and track credit balances.',
    whyItMatters: 'Registering or signing in with the canonical owner profile ensures credit balances are correctly tracked and data is secured at the location level.',
    prerequisites: [
      'A valid business email address.',
      'A contact mobile number.'
    ],
    steps: [
      'Once redirected to the registration page, enter your Full Name, Email Address, Phone Number, and Password.',
      'Click Create Account to map your user account as the canonical owner of this location.',
      'Or, if NOLA SMS Pro was previously set up, navigate to the Sign In screen, enter existing owner credentials, and click Sign In.'
    ],
    expectAfter: 'Once you complete registration or sign in, your location mapping is verified and the setup wizard proceeds to the connection confirmation step.',
    nextPageCTA: {
      title: 'Connect HighLevel',
      desc: 'Verify the active integration status between your CRM and NOLA SMS Pro.',
      id: 'connect-highlevel'
    },
    relatedPages: [
      { id: 'install-nola-sms-pro', title: 'Install NOLA SMS Pro' },
      { id: 'connect-highlevel', title: 'Connect HighLevel' }
    ]
  },
  {
    id: 'connect-highlevel',
    title: 'Connect HighLevel',
    description: 'Verify the active integration status between your CRM and NOLA SMS Pro.',
    section: 'SETUP',
    readingTime: '2 min read',
    purpose: 'Verify that NOLA SMS Pro is successfully connected to your GoHighLevel sub-account by confirming location identifiers and contact synchronization.',
    whyItMatters: 'Ensuring locations and contacts sync correctly is key to message formatting and delivery.',
    prerequisites: [
      'Completed Marketplace installation.',
      'Active owner profile login.'
    ],
    steps: [
      'Open NOLA SMS Pro from your GoHighLevel left navigation sidebar.',
      'Click Settings in the NOLA SMS Pro menu.',
      'Scroll to the profile details and confirm the correct Location Name and Location ID are displayed.',
      'Navigate to the Contacts section in NOLA SMS Pro.',
      'Verify that customer contacts from your GoHighLevel sub-account have been successfully synchronized.',
      'Return to Settings and confirm the connection badge displays API Connected. If it shows Disconnected, click Connect API to re-authorize the integration.'
    ],
    expectAfter: 'Your location identity, owner profile, and GoHighLevel contact database are successfully synchronized and ready for standard messaging operations.',
    nextPageCTA: {
      title: 'Dashboard Overview',
      desc: 'Learn the primary tabs and control modules in NOLA SMS Pro.',
      id: 'dashboard-overview'
    },
    relatedPages: [
      { id: 'create-or-sign-in', title: 'Create or Sign In' },
      { id: 'dashboard-overview', title: 'Dashboard Overview' }
    ]
  },
  {
    id: 'dashboard-overview',
    title: 'Dashboard Overview',
    description: 'Learn the primary tabs and control modules in NOLA SMS Pro.',
    section: 'SETUP',
    readingTime: '3 min read',
    purpose: 'Understand the layout of your workspace, monitor essential operational alerts, and navigate each menu panel to run your messaging campaigns.',
    whyItMatters: 'Standardizing operators to dashboard controls reduces UI confusion.',
    prerequisites: [
      'Successfully completed the Marketplace installation and connected your GoHighLevel account.'
    ],
    steps: [
      'Home: View credits, messaging statistics, credit alerts, and compose/topup shortcuts.',
      'Contacts: Browse, search, filter GHL contacts, create numbers using local formatting, and load chat views.',
      'Compose SMS: Draft messages with character/credit estimation, and load templates.',
      'Templates: Create reusable message snippets and folder structures.',
      'Message History: Track delivery statuses (Sending, Sent, Failed) and credits costs.',
      'Settings: Request custom Sender IDs, set alert limits, and buy credits packages.'
    ],
    expectAfter: 'With a clear understanding of the dashboard highlights and menu functionalities, you can confidently manage contacts, templates, SMS credits, and outbound messaging from the NOLA SMS Pro workspace.',
    nextPageCTA: {
      title: 'Send Your First SMS',
      desc: 'A pre-flight workflow mapping the journey of a text message from composition to delivery.',
      id: 'send-your-first-sms'
    },
    relatedPages: [
      { id: 'connect-highlevel', title: 'Connect HighLevel' },
      { id: 'send-your-first-sms', title: 'Send Your First SMS' }
    ]
  },
  {
    id: 'send-your-first-sms',
    title: 'Send Your First SMS',
    description: 'A pre-flight workflow mapping the journey of a text message from composition to delivery.',
    section: 'SETUP',
    readingTime: '2 min read',
    purpose: 'Verify that you can successfully send an SMS and confirm that it is received on the recipient\'s mobile device.',
    whyItMatters: 'Completing a test send verifies credit debiting, carrier delivery channels, and contact syncing prior to live campaigns.',
    prerequisites: [
      'Available SMS credits (new accounts receive 10 free trial credits upon registration).',
      'A test contact with a valid Philippine mobile number formatted as 09XXXXXXXXX.'
    ],
    steps: [
      {
        iconName: 'UserCheck',
        title: 'Access Contact List',
        badge: 'SELECT RECIPIENT',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Select your test contact from the contacts directory.',
        details: [
          'Locate your own Philippine mobile number for first-flight tests.',
          'Click the chat bubble icon to load the composition panel.'
        ]
      },
      {
        iconName: 'MessageSquare',
        title: 'Draft Test Message',
        badge: 'GSM-7 TEXT',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Type a natural test message in the composer outbox.',
        details: [
          'Avoid repetitive spam words like "test message" or "testing".',
          'Use: "Hi, this is a delivery check from NOLA SMS Pro. No reply is required."'
        ]
      },
      {
        iconName: 'Send',
        title: 'Dispatch & Review Logs',
        badge: 'DELIVERY LOGS',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Click Send and track live status codes inside history logs.',
        details: [
          'Check outbox to confirm state shifts: Sending -> Sent.',
          'Verify that your SMS credits wallet reflects segment deductions.'
        ]
      }
    ],
    expectAfter: 'Once your test SMS is successfully received and the message status shows Delivered, your setup is complete and you are ready to begin normal messaging operations.',
    nextPageCTA: {
      title: 'Contacts',
      desc: 'Search and manage contact records synchronized directly from HighLevel.',
      id: 'contacts'
    },
    relatedPages: [
      { id: 'dashboard-overview', title: 'Dashboard Overview' },
      { id: 'contacts', title: 'Contacts' }
    ]
  },
  {
    id: 'contacts',
    title: 'Contacts',
    description: 'Search and manage contact records synchronized directly from HighLevel.',
    section: 'MESSAGING',
    readingTime: '3 min read',
    purpose: 'The Contacts panel displays a real-time list of customer records synced directly from your HighLevel sub-account location. This allows you to select recipients instantly without manual database exports.',
    whyItMatters: 'Using real-time synced contacts avoids duplicate data entry, reduces error risk, and maintains a single source of truth across both HighLevel and NOLA SMS Pro.',
    prerequisites: [
      'An active HighLevel location connection with sync permissions.',
      'Customer records populated in your HighLevel CRM with mobile numbers.'
    ],
    steps: [
      {
        iconName: 'Search',
        title: 'Lookup Contacts',
        badge: 'LOOKUP & FILTER',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Find existing CRM contacts dynamically using the real-time query interface.',
        details: [
          'Search field matches contact name, email, or local Philippine number.',
          'Filters contacts instantaneously on input to prevent database lag.',
          'Shows active CRM tags so support teams see client attributes directly.'
        ]
      },
      {
        iconName: 'PlusCircle',
        title: 'Add New Contacts',
        badge: 'CREATE RECORD',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Add new clients directly to your sub-account with local validation guidelines.',
        details: [
          'Requires first name, last name, and valid mobile number.',
          'Auto-validates Philippine prefixes (e.g. 09XXXXXXXXX) on save.',
          'Instantly syncs the contact record back to GoHighLevel CRM database.'
        ]
      },
      {
        iconName: 'UserCheck',
        title: 'Verify Status Maps',
        badge: 'REAL-TIME SYNC',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Ensure contact connectivity metrics are accurate before composition.',
        details: [
          'Retrieve active token credentials status from location settings.',
          'Review offline sync indicators if GHL CRM API experiences carrier latency.'
        ]
      }
    ],
    expectAfter: 'You can quickly select contacts, view their details, and launch the composer to send a message immediately.',
    tips: [
      'Contacts are synced automatically in the background using the active location ID.',
      'Delete or modify a contact inside GoHighLevel to see updates synced to your NOLA contact index.'
    ],
    warnings: [
      'Ensure the GHL marketplace scopes include contacts.readonly for real-time contact retrieval.',
      'Numbers with invalid formatting (e.g. including hyphens or country codes) might fail validation rules.'
    ],
    screenshots: [
      {
        filename: '/images/docs/contacts-list.png',
        alt: 'Real-time HighLevel synced contacts list.',
        caption: 'Search and review contacts synchronized from your active HighLevel location ID.'
      },
      {
        filename: '/images/docs/contacts-add-contact.png',
        alt: 'Philippine mobile format validation check.',
        caption: 'Verify that recipient phone numbers follow local 11-digit formatting.'
      }
    ],
    relatedPages: [
      { id: 'compose-sms', title: 'Compose SMS' },
      { id: 'message-history', title: 'Message History' }
    ],
    nextPageCTA: {
      title: 'Compose SMS',
      desc: 'Learn how to compose, segment, and send SMS messages to your contacts.',
      id: 'compose-sms'
    }
  },
  {
    id: 'compose-sms',
    title: 'Compose SMS',
    description: 'Personalize, draft, and dispatch text messages to selected recipients.',
    section: 'MESSAGING',
    readingTime: '3 min read',
    purpose: 'The Compose console provides a comprehensive writing outbox where you can draft message bodies, select sending masks, insert template blocks, and review character counts before dispatching.',
    whyItMatters: 'Having a unified composer prevents tab fatigue and ensures clear overview of character segmentation costs, protecting your credit balance from unexpected deductions.',
    prerequisites: [
      'At least one recipient contact selected or entered.',
      'Available SMS credits in your account balance.',
      'An approved Sender ID or fallback system default NOLASMSPro.'
    ],
    steps: [
      {
        iconName: 'UserPlus',
        title: 'Select Recipient',
        badge: 'CONTACT LINK',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Pick a contact from your synced list or enter a destination number.',
        details: [
          'Click recipient selectors to search by name or GHL tag.',
          'Ensure target phone matches the local carrier format.'
        ]
      },
      {
        iconName: 'Shield',
        title: 'Choose Sender ID',
        badge: 'BRAND MASK',
        badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
        desc: 'Select your verified brand name identity to mask outgoing text blocks.',
        details: [
          'Dropdown shows approved custom Sender ID headers.',
          'Fallback default NOLASMSPro is always available.'
        ]
      },
      {
        iconName: 'FileText',
        title: 'Draft or Load Template',
        badge: 'COMPOSER COPY',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Type custom message copy or load a pre-saved templates library.',
        details: [
          'Select standard blueprints to load pre-written layout copies.',
          'Variables like {{contact.first_name}} resolve dynamically on dispatch.'
        ]
      },
      {
        iconName: 'Hash',
        title: 'Review Credits & Limits',
        badge: 'COST CALCULATOR',
        badgeColor: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
        desc: 'Calculate segment costs based on character limits before sending.',
        details: [
          'Monitors standard GSM-7 limits (160 characters per SMS credit).',
          'Emojis or special chars convert to Unicode (70 characters limit).',
          'Click Send to route the finalized SMS to domestic local networks.'
        ]
      }
    ],
    expectAfter: 'Your message will be sent to the carrier queue, credits will be deducted based on the calculated segment count, and transmission status will log in your outbox.',
    tips: [
      'A standard message segment allows up to 160 characters. Exceeding this limit will trigger multi-segment splits.',
      'Check the character counter closely to avoid accidental multi-credit charges.'
    ],
    warnings: [
      'Using special characters or emojis shifts the character encoding to Unicode, reducing the segment limit to 70 characters.',
      'Insufficient credit balance (below the required segments * recipients) will return a 402 error.'
    ],
    screenshots: [
      {
        filename: '/images/docs/credits-balance.png',
        alt: 'SMS credit segment rules calculator.',
        caption: 'Monitor character count limits and estimate segments before sending.'
      }
    ],
    relatedPages: [
      { id: 'message-templates', title: 'Message Templates' },
      { id: 'sender-ids', title: 'Sender IDs' }
    ],
    nextPageCTA: {
      title: 'Message Templates',
      desc: 'Save time by setting up reusable standard templates and tags.',
      id: 'message-templates'
    }
  },
  {
    id: 'message-templates',
    title: 'Message Templates',
    description: 'Save and reuse pre-written standard message blocks.',
    section: 'MESSAGING',
    readingTime: '2 min read',
    purpose: 'The Templates panel allows you to write, save, and manage reusable standard responses and notifications with dynamic placeholders for quick CRM integration.',
    whyItMatters: 'Using saved templates ensures spelling accuracy, maintains brand consistency, and drastically reduces response times for support teams.',
    prerequisites: [
      'Active location scope permissions to create and edit templates.',
      'Understanding of standard personalization tags (e.g. {{contact.first_name}}).'
    ],
    steps: [
      {
        iconName: 'FolderPlus',
        title: 'Initiate Template Creation',
        badge: 'NEW BLUEPRINT',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Navigate to templates directory and open the blueprint designer.',
        details: [
          'Click the "Create Template" button on the dashboard library.',
          'Select a category to sort notifications from campaign copy.'
        ]
      },
      {
        iconName: 'FileEdit',
        title: 'Draft Template Copy',
        badge: 'DYNAMIC TEXT',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Type the message body and insert custom CRM placeholders.',
        details: [
          'Use dynamic merge fields matching GHL contact database fields.',
          'Keep templates concise to stay within standard segment limits.'
        ]
      },
      {
        iconName: 'Save',
        title: 'Save & Register',
        badge: 'IMMEDIATE UPDATE',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Save template logs to location directory for immediate team use.',
        details: [
          'Review details to confirm dynamic parameters render correctly.',
          'Saved files instantly appear in Composer dropdown list.'
        ]
      }
    ],
    expectAfter: 'Your template is stored locally in the NOLA SMS DB, scoped to your specific location ID and ready for use in the outbox.',
    tips: [
      'Use descriptive naming conventions (e.g. "Booking Confirm", "Feedback Request") to help agents pick the correct file.',
      'Personalization tags are replaced dynamically in real-time when the template is loaded in the composer.'
    ],
    screenshots: [
      {
        filename: '/images/docs/templates-list.png',
        alt: 'Saved message templates library list.',
        caption: 'Access and select from your library of pre-written standard templates.'
      },
      {
        filename: '/images/docs/templates-create-template.png',
        alt: 'Template variables personalization preview.',
        caption: 'Incorporate dynamic placeholders that fill automatically based on contact details.'
      }
    ],
    relatedPages: [
      { id: 'compose-sms', title: 'Compose SMS' },
      { id: 'sender-ids', title: 'Sender IDs' }
    ],
    nextPageCTA: {
      title: 'Sender IDs',
      desc: 'Request custom alphanumeric headers to brand your outgoing text messages.',
      id: 'sender-ids'
    }
  },
  {
    id: 'sender-ids',
    title: 'Sender IDs',
    description: 'Request custom brand names to replace default sending numbers.',
    section: 'MESSAGING',
    readingTime: '3 min read',
    purpose: 'The Sender IDs module allows you to submit custom alphanumeric masks (up to 11 characters) that represent your business name to carriers, replacing generic gateway mobile numbers.',
    whyItMatters: 'Branded Sender IDs establish instant trust, eliminate recipient concerns about spam, and significantly improve open rates and campaign success.',
    prerequisites: [
      'A registered account with NOLA SMS Pro.',
      'Valid business registration or authorization documents matching your requested brand mask.'
    ],
    steps: [
      {
        iconName: 'HelpCircle',
        title: 'Review Brand Header Rules',
        badge: 'PRE-FLIGHT RULES',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Understand carrier guidelines for registering custom branded masks.',
        details: [
          'Requested masks must match business names or registered trademarks.',
          'Standard masks support 3 to 11 alphanumeric characters.'
        ]
      },
      {
        iconName: 'PlusCircle',
        title: 'Initiate ID Request',
        badge: 'REGISTRY DISPATCH',
        badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
        desc: 'Open the Sender IDs panel and click "Request Sender ID".',
        details: [
          'Type the requested alphanumeric mask exactly as it should appear.',
          'Upload business licenses, SEC certifications, or authority letters.'
        ]
      },
      {
        iconName: 'ShieldCheck',
        title: 'Track Activation Status',
        badge: 'APPROVAL STAGES',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Monitor approval logs updated as networks register your brand header.',
        details: [
          'Status is marked as Pending (under carrier review), Approved, or Rejected.',
          'Once approved, masks automatically populate the outbox Composer dropdown.'
        ]
      }
    ],
    expectAfter: 'Once approved by local networks, the Sender ID is saved to your location integrations and becomes selectable in the Compose panel.',
    tips: [
      'Custom sender approvals are strictly regulated by local carriers (Globe, Smart, DITO) to prevent spoofing.',
      'Keep your brand masks short and direct to fit within the 11-character carrier constraint.'
    ],
    warnings: [
      'Sending with a custom Sender ID deducts from your paid credits and does not qualify for free system credits.',
      'Incorrect credentials or unmatching registration papers will result in rejection of the sender ID request.'
    ],
    screenshots: [
      {
        filename: '/images/docs/sender-id-default.png',
        alt: 'Approved and pending custom Sender ID registry.',
        caption: 'Verify active registration and default masks in your Sender ID dashboard.'
      },
      {
        filename: '/images/docs/sender-id-comparison.png',
        alt: 'Branded vs anonymous SMS mockup comparison.',
        caption: 'Deliver branded messages directly to lockscreens, building immediate trust.'
      }
    ],
    relatedPages: [
      { id: 'compose-sms', title: 'Compose SMS' },
      { id: 'message-history', title: 'Message History' }
    ],
    nextPageCTA: {
      title: 'Message History',
      desc: 'Learn how to monitor status logs and delivery codes for all sent SMS.',
      id: 'message-history'
    }
  },
  {
    id: 'message-history',
    title: 'Message History',
    description: 'Audit and track delivery statuses for sent messages.',
    section: 'MESSAGING',
    readingTime: '3 min read',
    purpose: 'The Message History panel details every SMS dispatched, showcasing timestamps, recipient numbers, sender identities, content previews, and real-time carrier delivery status codes.',
    whyItMatters: 'Monitoring logs ensures transparency on delivery failures, helps you manage credit usage patterns, and allows you to audit campaign performance.',
    prerequisites: [
      'Outbound or inbound messages processed by your location.'
    ],
    steps: [
      {
        iconName: 'List',
        title: 'Navigate Outbox Logs',
        badge: 'AUDIT LEDGER',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Open the Message History workspace to inspect past text campaigns.',
        details: [
          'Review chronological lists of sent texts with timestamps.',
          'Examine credits consumed and destination numbers at a glance.'
        ]
      },
      {
        iconName: 'Filter',
        title: 'Apply Search Filters',
        badge: 'QUERY ISOLATION',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Isolate specific messages using advanced table search fields.',
        details: [
          'Filter by date ranges, target numbers, or delivery statuses.',
          'Query text body strings to verify copy compliance logs.'
        ]
      },
      {
        iconName: 'RefreshCw',
        title: 'Track Carrier Status Receipts',
        badge: 'SYNC UPDATE',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Observe updates updated via background synchronization workers.',
        details: [
          'Pending status updates automatically query domestic gateways.',
          'Expose carrier error codes for troubleshooting failed dispatches.'
        ]
      }
    ],
    expectAfter: 'You will have complete audit trails of all messaging traffic, including specific error codes returned by local gateways for failed dispatches.',
    tips: [
      'Filter history by "Failed" to clean up inactive numbers from your HighLevel CRM lists.',
      'A background status sync cron queries carrier networks every 5 minutes to update pending/queued statuses.'
    ],
    screenshots: [
      {
        filename: '/images/docs/message-history-list.png',
        alt: 'Chronological outbox message history log.',
        caption: 'Track receipt states, identities, and credit costs for each SMS dispatched.'
      }
    ],
    relatedPages: [
      { id: 'compose-sms', title: 'Compose SMS' },
      { id: 'sms-credits', title: 'SMS Credits' }
    ],
    nextPageCTA: {
      title: 'SMS Credits',
      desc: 'Understand how credits are deducted and how to request top-ups.',
      id: 'sms-credits'
    }
  },
  {
    id: 'sms-credits',
    title: 'SMS Credits',
    description: 'Monitor credit balances, transaction logs, and top up requests.',
    section: 'ACCOUNT',
    readingTime: '3 min read',
    purpose: 'Monitor your available SMS credits, review credit transaction history, and purchase additional credit packages.',
    whyItMatters: 'Maintaining an active credit balance prevents message delivery failures and ensures uninterrupted customer communication.',
    prerequisites: [
      'Active owner account login is required to access billing and credits settings.'
    ],
    steps: [
      {
        iconName: 'Wallet',
        title: 'Check Active Balance',
        badge: 'CREDITS BALANCE',
        badgeColor: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
        desc: 'Monitor available SMS credits from the top dashboard banner.',
        details: [
          'Displays active balance, credits consumed today, and monthly totals.',
          'Keeps transaction logs synchronized across sub-account ledgers.'
        ]
      },
      {
        iconName: 'ShoppingBag',
        title: 'Select Refill Packages',
        badge: 'BILLING PACKAGES',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Select from custom packages (10, 500, 1100, 2750, 6000 credits).',
        details: [
          'Click Checkout to launch secure Stripe billing payments.',
          'Purchase package top-ups dynamically to replenish your wallet.'
        ]
      },
      {
        iconName: 'History',
        title: 'Audit Ledger Logs',
        badge: 'LEDGER LOGS',
        badgeColor: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
        desc: 'Inspect ledger logs showing credits used for outreach campaigns.',
        details: [
          'Lists Timestamp, credit adjustment amount, and description.',
          'Filters entries by transaction date range or campaign ID.'
        ]
      }
    ],
    expectAfter: 'Your updated SMS credit balance will be reflected on the dashboard and transaction ledgers, ready for message composition.',
    nextPageCTA: {
      title: 'Settings',
      desc: 'Configure user profiles, notification alert thresholds, and defaults.',
      id: 'settings'
    }
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Manage user profiles, location connections, sending defaults, and notification preferences.',
    section: 'ACCOUNT',
    readingTime: '3 min read',
    purpose: 'Manage your administrator profile, verify connected GoHighLevel locations, and configure notification alerts.',
    whyItMatters: 'Ensuring your location mappings and threshold configurations are set correctly secures account access and gives warning alerts before credits run out.',
    prerequisites: [
      'Administrator level permissions for the GoHighLevel location sub-account.'
    ],
    steps: [
      {
        iconName: 'User',
        title: 'Manage Profile Details',
        badge: 'ADMIN PROFILE',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Update administrative credentials and default sending preferences.',
        details: [
          'Modify user login email, name, and account password parameters.',
          'Verify OTP tokens for password updates to secure access.'
        ]
      },
      {
        iconName: 'MapPin',
        title: 'Verify Location Details',
        badge: 'GHL MAPPING',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Confirm connected HighLevel sub-account location configurations.',
        details: [
          'Review active company scopes, location ID mapping, and status.',
          'Check marketplace connection tokens mapping sub-accounts.'
        ]
      },
      {
        iconName: 'Bell',
        title: 'Configure Alerts Threshold',
        badge: 'ALERT NOTIF',
        badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
        desc: 'Set notification thresholds to receive warning emails.',
        details: [
          'Alerts trigger when credits drop below your custom target limit.',
          'Verify profile email is active to receive campaign warnings.'
        ]
      }
    ],
    expectAfter: 'Your administrator profile settings, connected location keys, and default sending masks will be updated and secured.',
    nextPageCTA: {
      title: 'Troubleshooting',
      desc: 'Diagnose and resolve common setup, billing, and carrier issues.',
      id: 'troubleshooting'
    }
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Diagnose and resolve common setup, billing, and carrier issues.',
    section: 'SUPPORT',
    readingTime: '4 min read',
    purpose: 'Identify, diagnose, and resolve common API connection, billing checkout, and message delivery failures.',
    whyItMatters: 'Quickly resolving setup or routing blockages prevents campaign down-time and restores sync flows.',
    prerequisites: [
      'An active NOLA SMS Pro dashboard session or access to the screen displaying the reported error is required.'
    ],
    steps: [
      {
        iconName: 'MapPin',
        title: 'Location Sync Resolution',
        badge: 'SYNC REPAIR',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Fix "Location Not Detected" errors within GoHighLevel sub-account dashboards.',
        details: [
          'Confirm that NOLA custom menu parameters are set correctly.',
          'Select "Pass contact/user info as query parameters" inside Custom Menu Settings.',
          'Reload the browser page to refresh sub-account scopes mapping.'
        ]
      },
      {
        iconName: 'AlertCircle',
        title: 'Message Delivery Audit',
        badge: 'OUTBOX REPAIR',
        badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
        desc: 'Diagnose message delays, network bounces, and credit wallet blocks.',
        details: [
          'Check SMS Credits balance card on dashboard to confirm positive credits.',
          'Verify numbers format: must follow local PH 11-digit system.',
          'Avoid spam filters by removing repetitive test phrases from draft copies.'
        ]
      },
      {
        iconName: 'RefreshCw',
        title: 'Re-Authorize Connection',
        badge: 'OAUTH HANDSHAKE',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Refresh authorization tokens when sub-account credentials expire.',
        details: [
          'Click the Reconnect GHL API button on the connection alert dialog.',
          'Log in to GoHighLevel with sub-account admin credentials.',
          'Choose the correct location ID mapping and approve requested permissions.'
        ]
      }
    ],
    expectAfter: 'Connection issues are resolved, contact database synchronization resumes, and SMS delivery services are restored.',
    nextPageCTA: {
      title: 'Support & Help',
      desc: 'Create support tickets and track ticket status logs.',
      id: 'support-help'
    }
  },
  {
    id: 'support-help',
    title: 'Support & Help',
    description: 'Create support tickets and check ticket status logs.',
    section: 'SUPPORT',
    readingTime: '3 min read',
    purpose: 'Submit support tickets for help with credit billing, custom Sender ID configurations, or integration issues.',
    whyItMatters: 'Direct access to support engineers ensures complex carrier problems or transaction issues are resolved quickly.',
    prerequisites: [
      'Active owner login is required to access the ticketing console.'
    ],
    steps: [
      {
        iconName: 'HelpCircle',
        title: 'Open Help Panel',
        badge: 'SUPPORT HELP',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Open the support console directly inside NOLA SMS Pro sidebar.',
        details: [
          'Click Create Support Ticket on the ticketing panel.'
        ]
      },
      {
        iconName: 'ListCollapse',
        title: 'Select Ticket Category',
        badge: 'BILLING & SETUP',
        badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
        desc: 'Sort help requests by credits billing, Sender ID, or setups.',
        details: [
          'Helps support engineers route tickets to appropriate developers.'
        ]
      },
      {
        iconName: 'FileText',
        title: 'Provide Diagnostics',
        badge: 'AUDIT DETAILS',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Enter detailed descriptions of your error or billing concern.',
        details: [
          'Always include recipient phone numbers and carrier status codes.',
          'Attach diagnostics screenshot files for setup or oauth errors.'
        ]
      },
      {
        iconName: 'CheckSquare',
        title: 'Submit & Track Tickets',
        badge: 'REAL-TIME LEDGER',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Submit the help request and track update logs on your dashboard.',
        details: [
          'Responses are sent directly to your administrative profile email.'
        ]
      }
    ],
    expectAfter: 'Your ticket is saved in the support queue and dispatched to our engineers; responses log directly to your dashboard.',
    notes: [
      'When reporting a message delivery failure, always include the destination phone number, timestamp of dispatch, and the exact carrier error code.'
    ],
    hasTicketForm: true,
    nextPageCTA: {
      title: 'Frequently Asked Questions',
      desc: 'Quick reference answers for billing, credits, and formatting.',
      id: 'faq'
    }
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description: 'Quick reference answers for billing, credits, and formatting.',
    section: 'SUPPORT',
    readingTime: '3 min read',
    purpose: 'Find quick reference answers to common questions about character segment billing, carrier masks, and sub-account setups.',
    whyItMatters: 'Instant self-service answers resolve layout or routing queries without waiting for ticket support.',
    steps: [
      'Read Frequently Asked Questions: Search the categorised list of accordion panels below to find instant answers.',
      'Submit ticket support: If your question is not resolved, click Support & Help to contact development teams directly.'
    ],
    expectAfter: 'Common questions regarding message segment billing, alphanumeric sender ID registration times, and trial credit limits are answered.',
    faqs: [
      {
        q: 'How do character limits and SMS credit deductions work?',
        a: 'A standard SMS contains up to 160 characters. Messages containing emojis, special characters, or non-standard characters reduce the available character count per segment. When a message exceeds the supported limit, it is automatically split into multiple SMS segments, consuming additional SMS credits for each recipient.'
      },
      {
        q: 'Can recipients reply to my messages?',
        a: 'NOLA SMS Pro sends messages using alphanumeric sender identities such as NOLASMSPro or approved custom Sender IDs. Because these sender identities support one-way outbound messaging, recipients cannot reply directly. To verify delivery, confirm that the SMS was received on the recipient\'s mobile device.'
      },
      {
        q: 'How long does Custom Sender ID approval take?',
        a: 'Custom Sender IDs require approval from participating telecommunications providers. The standard review process typically takes 5–7 business days, depending on carrier verification.'
      },
      {
        q: 'Can I set up multiple GoHighLevel sub-accounts?',
        a: 'Yes. NOLA SMS Pro supports multiple GoHighLevel locations. Each sub-account must be installed separately through the GoHighLevel Marketplace and configured independently.'
      },
      {
        q: 'How do trial SMS credits work?',
        a: 'Each newly registered location receives 10 free trial SMS credits. These credits can be used for initial testing. After the trial credits are exhausted, additional SMS credits must be purchased before sending more messages.'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Trigger outbound text messages automatically using GoHighLevel custom workflow actions.',
    section: 'WORKFLOW',
    readingTime: '3 min read',
    purpose: 'Integrate NOLA SMS Pro sending capabilities into GoHighLevel workflows to trigger instant SMS confirmations, billing alerts, or marketing dispatches automatically based on CRM events.',
    whyItMatters: 'Automating messages eliminates manual outbox typing, ensures sub-second response times to client inquiries, and handles bulk communications dynamically using lead triggers.',
    prerequisites: [
      'Administrator permissions in the GoHighLevel location dashboard.',
      'Completed app installation and active API connection badge in Settings.',
      'Positive SMS credits balance in your wallet.'
    ],
    steps: [
      {
        iconName: 'Settings',
        title: 'Open GHL Workflows',
        badge: 'WORKFLOW ENGINE',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Access your GoHighLevel dashboard and open the automation tab.',
        details: [
          'Click Workflows in the automation menu.',
          'Create a new workflow by selecting "Start from scratch".'
        ]
      },
      {
        iconName: 'Zap',
        title: 'Define Trigger Event',
        badge: 'LEAD ACTION',
        badgeColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
        desc: 'Choose the starting CRM trigger node to initiate the workflow.',
        details: [
          'Map actions to booking submissions, CRM stage changes, or tags.',
          'Verify active trigger filters capture correct target contacts.'
        ]
      },
      {
        iconName: 'PlusCircle',
        title: 'Insert NOLA Custom Action',
        badge: 'WEBHOOK ACTION',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Click the "+" node in the builder and select NOLA SMS Pro.',
        details: [
          'Map recipient number dynamically using {{contact.phone}}.',
          'Choose your approved custom Sender ID from the identity list.',
          'Type your personalized message layout body.'
        ]
      },
      {
        iconName: 'Play',
        title: 'Publish & Test',
        badge: 'LIVE DISPATCH',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Toggle workflow state to Published and run a test lead contact.',
        details: [
          'Confirm SMS segment costs debit successfully from wallet.',
          'Track live receipt status codes inside NOLA Message History.'
        ]
      }
    ],
    expectAfter: 'Outbound SMS notifications will execute automatically in the background whenever contacts enter your GoHighLevel trigger node.',
    nextPageCTA: {
      title: 'GHL Conversation',
      desc: 'Learn how SMS logs synchronize back into native Conversations.',
      id: 'ghl-conversation'
    },
    relatedPages: [
      { id: 'ghl-conversation', title: 'GHL Conversation' },
      { id: 'compose-sms', title: 'Compose SMS' }
    ]
  },
  {
    id: 'ghl-conversation',
    title: 'GHL Conversation',
    description: 'Sync and manage customer text logs directly inside GoHighLevel\'s native conversations tab.',
    section: 'WORKFLOW',
    readingTime: '3 min read',
    purpose: 'Bridge outbound and inbound messages sent via NOLA SMS Pro into the GoHighLevel native conversations timeline for a unified client contact log.',
    whyItMatters: 'Having a single, complete timeline of all phone calls, emails, and SMS prevents team members from sending duplicate messages and ensures sales history is fully preserved inside the GHL customer profile.',
    prerequisites: [
      'Completed Marketplace installation with the required database read/write permissions.',
      'Real-time API connection showing Active status.'
    ],
    steps: [
      {
        iconName: 'ShieldAlert',
        title: 'Review Sync Scopes',
        badge: 'OAUTH SCOPES',
        badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        desc: 'Verify that GHL Marketplace installation scopes include conversations permissions.',
        details: [
          'Requires both conversations.readonly and conversations.write scopes.',
          'Locks or updates sync hooks dynamically upon sub-account changes.'
        ]
      },
      {
        iconName: 'MessageSquare',
        title: 'Dispatch Messaging Traffic',
        badge: 'TEST CONVERSATION',
        badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        desc: 'Send an SMS from either NOLA outbox Composer, Contacts list, or triggers.',
        details: [
          'Verify message delivers to Semaphore gateway successfully.'
        ]
      },
      {
        iconName: 'History',
        title: 'Audit GHL Sync Timeline',
        badge: 'NATIVE ALIGNMENT',
        badgeColor: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        desc: 'Navigate to GHL native Conversations tab to confirm the SMS matches customer profile.',
        details: [
          'Text segments append dynamically inside the GHL contact stream.',
          'Responses are fully synced to allow unified CRM communications.'
        ]
      }
    ],
    expectAfter: 'Outgoing and incoming carrier message statuses are dynamically synced between the NOLA SMS database and your native HighLevel conversation view.',
    nextPageCTA: {
      title: 'SMS Credits',
      desc: 'Understand how credits are deducted and how to request top-ups.',
      id: 'sms-credits'
    },
    relatedPages: [
      { id: 'automation', title: 'Automation' },
      { id: 'message-history', title: 'Message History' }
    ]
  }
];

export function getDocPageById(id: string): DocPage | undefined {
  return docsData.find((p) => p.id === id);
}

export function getNextAndPrevPages(id: string) {
  const flatItems: { id: string; title: string }[] = [{ id: 'overview', title: 'Overview' }];
  sidebarStructure.forEach((sec) => {
    sec.items.forEach((item) => {
      flatItems.push({ id: item.id, title: item.title });
    });
  });

  const currentIndex = flatItems.findIndex((item) => item.id === id);
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const next = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return { prev, next };
}
