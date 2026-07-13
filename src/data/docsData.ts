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

export interface DocPage {
  id: string;
  title: string;
  description: string;
  section: 'INTRODUCTION' | 'Getting Started' | 'Using NOLA SMS Pro' | 'Troubleshooting' | 'FAQ' | 'Support';
  subsection?: string;
  readingTime: string;
  purpose: string;
  steps?: string[];
  tips?: string[];
  notes?: string[];
  warnings?: string[];
  commonIssues?: string[];
  faqs?: DocFAQ[];
  relatedPages?: RelatedPage[];
  screenshots?: ScreenshotPlan[];
  hasFirstSMSChecklist?: boolean;
  hasTicketForm?: boolean;
}

export const defaultSmsReminder =
  'After installation, NOLA SMS Pro sends SMS using the default sender NOLASMSPro unless you select an approved custom Sender ID. Messages require available SMS credits. A normal 160-character SMS usually uses 1 credit, and longer messages may use more. Send one natural test message first, then check Message History for the status.';

export const sidebarStructure = [
  {
    title: 'INTRODUCTION',
    items: [
      { id: 'welcome', title: 'Welcome to NOLA SMS Pro' },
      { id: 'welcome-overview', title: 'Overview' },
      { id: 'welcome-about', title: 'About NOLA SMS Pro' },
      { id: 'welcome-why', title: 'Why Use NOLA SMS Pro' }
    ]
  },
  {
    title: 'Getting Started',
    items: [
      { id: 'marketplace-install', title: 'Install NOLA SMS Pro' },
      { id: 'account-access', title: 'Create or Sign In' },
      { id: 'dashboard-overview', title: 'Dashboard Overview' },
      { id: 'first-sms-checklist', title: 'Send Your First SMS' }
    ]
  },
  {
    title: 'Using NOLA SMS Pro',
    items: [
      { id: 'contacts', title: 'Contacts' },
      { id: 'templates', title: 'Templates' },
      { id: 'sender-id', title: 'Sender IDs' },
      { id: 'sms-credits', title: 'SMS Credits' },
      { id: 'message-history', title: 'Message History' },
      { id: 'settings', title: 'Settings' }
    ]
  },
  {
    title: 'Troubleshooting',
    items: [
      { id: 'troubleshooting', title: 'Troubleshooting' }
    ]
  },
  {
    title: 'Frequently Asked Questions',
    items: [
      { id: 'faq', title: 'FAQ' }
    ]
  },
];

export const docsData: DocPage[] = [
  {
    id: 'welcome',
    title: 'Welcome to NOLA SMS Pro',
    description: 'Use NOLA SMS Pro inside your HighLevel sub-account to send SMS, manage contacts, and track message status.',
    section: 'INTRODUCTION',
    readingTime: '2 min read',
    purpose: 'NOLA SMS Pro brings SMS sending, HighLevel contacts, reusable templates, Sender IDs, credit management, message status, and account settings into your connected HighLevel sub-account.',
    steps: [
      'Send SMS from the connected HighLevel sub-account.',
      'Manage HighLevel contacts and reusable SMS templates.',
      'Use the default sender or an approved custom Sender ID.',
      'Track SMS credits, message status, notifications, and connected location settings.'
    ],
    notes: [
      'You do not need to download a separate desktop or mobile app.'
    ],
    screenshots: [
      {
        filename: '/images/docs/welcome-nola-inside-highlevel.png',
        alt: 'NOLA SMS Pro opened inside the HighLevel sub-account menu.',
        caption: 'NOLA SMS Pro runs inside your HighLevel sub-account after installation.'
      }
    ],
    relatedPages: [
      { id: 'marketplace-install', title: 'Install NOLA SMS Pro' },
      { id: 'first-sms-checklist', title: 'Send Your First SMS' }
    ]
  },
  {
    id: 'welcome-overview',
    title: 'Overview',
    description: 'Get an overview of NOLA SMS Pro features.',
    section: 'INTRODUCTION',
    readingTime: '1 min read',
    purpose: 'NOLA SMS Pro brings SMS sending, HighLevel contacts, reusable templates, Sender IDs, credit tracking, message history, and account settings into your connected HighLevel sub-account.',
    notes: [
      'You do not need to download a separate desktop or mobile app.'
    ]
  },
  {
    id: 'welcome-about',
    title: 'About NOLA SMS Pro',
    description: 'Learn about what NOLA SMS Pro is.',
    section: 'INTRODUCTION',
    readingTime: '1 min read',
    purpose: 'NOLA SMS Pro is a dedicated SMS messaging solution that integrates directly with your HighLevel sub-account, simplifying sending and tracking without leaving the platform.',
    notes: [
      'You do not need to download a separate desktop or mobile app.'
    ]
  },
  {
    id: 'welcome-why',
    title: 'Why Use NOLA SMS Pro',
    description: 'Discover why NOLA SMS Pro is the right choice.',
    section: 'INTRODUCTION',
    readingTime: '1 min read',
    purpose: 'Explore the key features that make NOLA SMS Pro the perfect SMS solution for your HighLevel workflow.',
    notes: [
      'You do not need to download a separate desktop or mobile app.'
    ]
  },
  {
    id: 'marketplace-install',
    title: 'Install NOLA SMS Pro',
    description: 'Install NOLA SMS Pro from the HighLevel Marketplace and connect the correct sub-account/location.',
    section: 'Getting Started',
    readingTime: '4 min read',
    purpose: 'Use this guide when you are installing NOLA SMS Pro for a HighLevel location for the first time.',
    steps: [
      'Log in to HighLevel.',
      'Open the Marketplace and search for NOLA SMS Pro.',
      'Open the NOLA SMS Pro listing and click Install.',
      'Select the sub-account/location where the app should be installed.',
      'Review the requested permissions for contacts, conversations, location details, and permission to connect the app.',
      'Click Allow & Install.',
      'Follow the redirect to create or sign in to the NOLA account.'
    ],
    notes: [
      'Only approve the install when the selected sub-account/location is correct.'
    ],
    warnings: [
      'If you close the browser window during setup, open NOLA SMS Pro from HighLevel again to continue.'
    ],
    screenshots: [
      {
        filename: '/images/docs/install-marketplace-listing.png',
        alt: 'NOLA SMS Pro Marketplace listing in HighLevel.',
        caption: 'Find NOLA SMS Pro in the HighLevel Marketplace.'
      },
      {
        filename: '/images/docs/install-select-subaccount.png',
        alt: 'HighLevel install screen for selecting a sub-account location.',
        caption: 'Select the sub-account/location where the app should be installed.'
      },
      {
        filename: '/images/docs/install-allow-permissions.png',
        alt: 'HighLevel permission review screen before installing NOLA SMS Pro.',
        caption: 'Review the install screen, then click Allow & Install.'
      }
    ],
    relatedPages: [
      { id: 'account-access', title: 'Create or Sign In' },
      { id: 'troubleshooting', title: 'Troubleshooting' }
    ]
  },
  {
    id: 'account-access',
    title: 'Create or Sign In to Your Account',
    description: 'Create the NOLA owner account for a new location, or sign in with the existing owner account.',
    section: 'Getting Started',
    readingTime: '3 min read',
    purpose: 'After installation, NOLA SMS Pro asks the location owner to create an account or sign in so the dashboard can open inside HighLevel.',
    steps: [
      'If the location is new, enter your name, email address, mobile number, and password.',
      'Review and accept the NOLA SMS Pro user agreement.',
      'Click Create Account to finish registration.',
      'If NOLA says the location is already registered, choose Sign In instead.',
      'Sign in with the existing owner email and password.',
      'When you open NOLA SMS Pro from HighLevel later, you may already be signed in.'
    ],
    tips: [
      'Use the owner email your team expects to manage credits, Sender IDs, and support requests.'
    ],
    warnings: [
      'Do not create a second account for a location that is already registered. Ask the existing owner to sign in or contact support.'
    ],
    screenshots: [
      {
        filename: '/images/docs/account-create-form.png',
        alt: 'NOLA SMS Pro account creation form after installation.',
        caption: 'New locations show the account creation form after installation.'
      },
      {
        filename: '/images/docs/account-sign-in-existing-owner.png',
        alt: 'NOLA SMS Pro sign-in screen for an existing location owner.',
        caption: 'Already registered locations ask the existing owner to sign in.'
      }
    ],
    relatedPages: [
      { id: 'dashboard-overview', title: 'Dashboard Overview' }
    ]
  },
  {
    id: 'dashboard-overview',
    title: 'Dashboard Overview',
    description: 'Understand the main dashboard areas and what each one is used for.',
    section: 'Getting Started',
    readingTime: '3 min read',
    purpose: 'Use the dashboard to confirm your location, check credits, send SMS, manage contacts, save templates, and review message status.',
    steps: [
      'Home shows your SMS credits, recent activity, alerts, and shortcuts.',
      'Compose lets you send individual or bulk SMS.',
      'Contacts lets you add contacts and search existing contacts.',
      'Templates stores reusable SMS messages.',
      'Message History shows Sending, Sent, and Failed statuses.',
      'Settings contains your profile, Sender IDs, notifications, credits, and connected location details.'
    ],
    tips: [
      'Before your first send, check Home for credits and open Settings to confirm the connected location.'
    ],
    screenshots: [
      {
        filename: '/images/docs/dashboard-overview-home.png',
        alt: 'NOLA SMS Pro dashboard home showing credits, activity, alerts, and navigation.',
        caption: 'The dashboard shows credits, recent activity, alerts, and shortcuts.'
      }
    ],
    relatedPages: [
      { id: 'first-sms-checklist', title: 'Send Your First SMS' },
      { id: 'settings', title: 'Settings' }
    ]
  },
  {
    id: 'first-sms-checklist',
    title: 'Send Your First SMS',
    description: 'Confirm the required setup items, send one natural message, and check Message History.',
    section: 'Getting Started',
    readingTime: '3 min read',
    purpose: 'Use this checklist for your first normal SMS send after installation.',
    hasFirstSMSChecklist: true,
    steps: [
      'Confirm the connected location is correct.',
      'Confirm SMS credits are available.',
      'Use NOLASMSPro for the first send.',
      'Add or select a contact with a valid 09XXXXXXXXX mobile number.',
      'Write one natural message instead of a single word like test.',
      'Click Send once.',
      'Open Message History and check the status.'
    ],
    notes: [
      defaultSmsReminder
    ],
    warnings: [
      'If the message fails or stays on Sending, do not click Send repeatedly. Check Message History first.'
    ],
    screenshots: [
      {
        filename: '/images/docs/compose-first-sms.png',
        alt: 'Compose screen with one natural SMS message ready to send.',
        caption: 'Compose one natural test message before sending live SMS.'
      },
      {
        filename: '/images/docs/compose-default-sender.png',
        alt: 'Compose sender field showing the default NOLASMSPro sender.',
        caption: 'Use the default NOLASMSPro sender for your first message.'
      },
      {
        filename: '/images/docs/message-history-sent-status.png',
        alt: 'Message History showing a Sent status after the first SMS.',
        caption: 'Check Message History after sending to confirm the status.'
      }
    ],
    relatedPages: [
      { id: 'contacts', title: 'Contacts' },
      { id: 'message-history', title: 'Message History' }
    ]
  },
  {
    id: 'contacts',
    title: 'Contacts',
    description: 'Add, search, and choose contacts for SMS sending.',
    section: 'Using NOLA SMS Pro',
    subsection: 'Contacts',
    readingTime: '3 min read',
    purpose: 'Contacts are the people available in the connected HighLevel location.',
    steps: [
      'Open Contacts from the NOLA SMS Pro menu.',
      'Search for an existing contact by name, email, or phone number.',
      'To add a contact, click Add Contact.',
      'Enter the contact name and a valid mobile number.',
      'For Philippine mobile numbers, use the 11-digit format starting with 09, such as 09171234567.',
      'Save the contact before sending SMS.'
    ],
    tips: [
      'Do not include spaces, hyphens, or +63 for local sends unless support tells you to use a different format.'
    ],
    warnings: [
      'Avoid duplicate contacts with the same phone number so the same person does not receive the same SMS twice.'
    ],
    screenshots: [
      {
        filename: '/images/docs/contacts-list.png',
        alt: 'Contacts list inside NOLA SMS Pro.',
        caption: 'Contacts show the people available in the connected location.'
      },
      {
        filename: '/images/docs/contacts-add-contact.png',
        alt: 'Add Contact form with mobile number field.',
        caption: 'Add a contact with a valid mobile number before sending a test SMS.'
      }
    ],
    relatedPages: [
      { id: 'first-sms-checklist', title: 'Send Your First SMS' },
      { id: 'message-history', title: 'Message History' }
    ]
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Save reusable SMS messages that can be inserted in Compose.',
    section: 'Using NOLA SMS Pro',
    subsection: 'Templates',
    readingTime: '3 min read',
    purpose: 'Templates help you reuse clear, natural SMS wording for common customer messages.',
    steps: [
      'Open Templates from the NOLA SMS Pro menu.',
      'Click Create Template.',
      'Enter a short template name.',
      'Write the message body using clear, natural wording.',
      'Save the template.',
      'Open Compose and insert the template when you are ready to send.'
    ],
    tips: [
      'Keep templates short and direct. Use wording that sounds like a real customer message.'
    ],
    screenshots: [
      {
        filename: '/images/docs/templates-list.png',
        alt: 'Templates list inside NOLA SMS Pro.',
        caption: 'Templates save reusable SMS messages.'
      },
      {
        filename: '/images/docs/templates-create-template.png',
        alt: 'Create Template form for writing a reusable SMS message.',
        caption: 'Create a short, natural message that can be inserted in Compose.'
      }
    ],
    relatedPages: [
      { id: 'first-sms-checklist', title: 'Send Your First SMS' },
      { id: 'contacts', title: 'Contacts' }
    ]
  },
  {
    id: 'sender-id',
    title: 'Sender IDs',
    description: 'Use the default sender right away, or request a custom Sender ID for approval.',
    section: 'Using NOLA SMS Pro',
    subsection: 'Sender IDs',
    readingTime: '3 min read',
    purpose: 'You can send with NOLASMSPro right away if credits are available. Custom Sender IDs must be requested and approved before they appear in Compose.',
    steps: [
      'For your first send, choose NOLASMSPro in Compose.',
      'To request a custom Sender ID, open Settings and go to Sender IDs.',
      'Click Request Custom Sender ID.',
      'Enter the Sender ID name, business purpose, and one sample message.',
      'Submit the request.',
      'Wait for the status to show Approved before using it in Compose.'
    ],
    notes: [
      defaultSmsReminder
    ],
    warnings: [
      'Pending or rejected Sender IDs cannot be selected when sending SMS.'
    ],
    screenshots: [
      {
        filename: '/images/docs/sender-id-default.png',
        alt: 'Sender ID screen showing NOLASMSPro as the default sender.',
        caption: 'The default sender is NOLASMSPro.'
      },
      {
        filename: '/images/docs/sender-id-request-form.png',
        alt: 'Custom Sender ID request form in NOLA SMS Pro.',
        caption: 'Custom Sender IDs can be requested from Settings.'
      },
      {
        filename: '/images/docs/sender-id-statuses.png',
        alt: 'Sender ID status list showing pending and approved statuses.',
        caption: 'Only approved Sender IDs can be selected when sending SMS.'
      }
    ],
    relatedPages: [
      { id: 'first-sms-checklist', title: 'Send Your First SMS' },
      { id: 'settings', title: 'Settings' }
    ]
  },
  {
    id: 'sms-credits',
    title: 'SMS Credits',
    description: 'Check your SMS credit balance, request more credits, and review credit history.',
    section: 'Using NOLA SMS Pro',
    subsection: 'SMS Credits',
    readingTime: '3 min read',
    purpose: 'SMS credits are required before messages can be sent.',
    steps: [
      'Check your credit balance on Home or in Settings.',
      'Before sending, confirm the balance is greater than zero.',
      'If your balance is low or zero, click Request Credits.',
      'Enter the number of credits you need and submit the request.',
      'If checkout is available, choose a credit package and complete checkout.',
      'Use credit history to review recent credit changes and SMS usage.'
    ],
    notes: [
      defaultSmsReminder
    ],
    tips: [
      'Set a low-balance notification so your team knows when to request more credits.'
    ],
    screenshots: [
      {
        filename: '/images/docs/credits-balance.png',
        alt: 'SMS credit balance inside NOLA SMS Pro.',
        caption: 'Check your available credits before sending SMS.'
      },
      {
        filename: '/images/docs/credits-request-form.png',
        alt: 'Request Credits form in NOLA SMS Pro.',
        caption: 'Request more credits if your balance is low or zero.'
      },
      {
        filename: '/images/docs/credits-history.png',
        alt: 'Credit history table showing recent credit changes.',
        caption: 'Credit history shows recent credit changes and SMS usage.'
      }
    ],
    relatedPages: [
      { id: 'first-sms-checklist', title: 'Send Your First SMS' },
      { id: 'message-history', title: 'Message History' }
    ]
  },
  {
    id: 'message-history',
    title: 'Message History',
    description: 'Check whether messages are Sending, Sent, or Failed.',
    section: 'Using NOLA SMS Pro',
    subsection: 'Message History',
    readingTime: '3 min read',
    purpose: 'Message History is where you confirm what happened after clicking Send.',
    steps: [
      'Open Message History from the NOLA SMS Pro menu.',
      'Find the message by recipient number, sender, or send time.',
      'Check the status: Sending, Sent, or Failed.',
      'If the status is Sending, wait a few minutes and refresh.',
      'If the status is Failed, open the message and check the failed reason if one is available.',
      'If you contact support, include a screenshot, recipient number, send time, message status, and visible error message.'
    ],
    warnings: [
      'Do not click Send repeatedly while a message is still Sending.'
    ],
    screenshots: [
      {
        filename: '/images/docs/message-history-list.png',
        alt: 'Message History list showing message statuses.',
        caption: 'Message History shows Sending, Sent, and Failed statuses.'
      },
      {
        filename: '/images/docs/message-history-failed-detail.png',
        alt: 'Failed message detail with available error information.',
        caption: 'Open failed messages to see the available error details.'
      }
    ],
    relatedPages: [
      { id: 'first-sms-checklist', title: 'Send Your First SMS' }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Review your profile, connected location details, notifications, Sender IDs, and credits.',
    section: 'Using NOLA SMS Pro',
    subsection: 'Settings',
    readingTime: '3 min read',
    purpose: 'Settings is where you confirm the account and location are correct before sending.',
    steps: [
      'Open Settings from the NOLA SMS Pro menu.',
      'Review your profile information.',
      'Check Connected Location and confirm it matches the HighLevel sub-account you installed.',
      'Open Sender IDs to review default and custom sender options.',
      'Open Credits to check your balance or request more credits.',
      'Open Notifications to manage low-balance and delivery alerts.'
    ],
    warnings: [
      'If the connected location details do not match your HighLevel sub-account, stop and contact support before sending SMS.'
    ],
    screenshots: [
      {
        filename: '/images/docs/settings-profile.png',
        alt: 'Profile settings in NOLA SMS Pro.',
        caption: 'Profile settings show the user information for the account.'
      },
      {
        filename: '/images/docs/settings-connected-location.png',
        alt: 'Connected Location settings in NOLA SMS Pro.',
        caption: 'Connected Location should match the HighLevel sub-account you installed.'
      },
      {
        filename: '/images/docs/settings-notifications.png',
        alt: 'Notification settings in NOLA SMS Pro.',
        caption: 'Notifications control alerts such as low balance and delivery updates.'
      }
    ],
    relatedPages: [
      { id: 'sender-id', title: 'Sender IDs' },
      { id: 'sms-credits', title: 'SMS Credits' }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fix common setup, credit, Sender ID, and sending issues.',
    section: 'Troubleshooting',
    readingTime: '5 min read',
    purpose: 'Use this page when something does not look right or a message does not send as expected.',
    steps: [
      'Find the issue that matches what you see on screen.',
      'Follow the next step listed for that issue.',
      'If the issue continues, contact support with a screenshot and the details requested on the Support page.'
    ],
    commonIssues: [
      'Wrong Location: You see a location name that is not yours. This means the app may be connected to the wrong HighLevel sub-account. Stop and contact support before sending.',
      'Zero Credits: You see a zero credit balance. This means SMS cannot be sent yet. Request credits or complete checkout if it is available.',
      'SMS Failed: You see Failed in Message History. This may mean the number, credits, Sender ID, or message content needs attention. Open the failed message and review the visible reason.',
      'Still Sending: You see Sending for several minutes. This may be a delayed status update. Wait, refresh Message History, and do not click Send again.',
      'Sender ID Pending: You see Pending next to a custom Sender ID. This means it is not approved yet. Use NOLASMSPro until the custom Sender ID is approved.',
      'Reconnect Required: You see a reconnect prompt. Follow the prompt once, confirm the correct location, and contact support if it returns.'
    ],
    tips: [
      'For SMS issues, capture the recipient number, send time, message status, and visible error message before contacting support.'
    ],
    screenshots: [
      {
        filename: '/images/docs/error-wrong-location.png',
        alt: 'Wrong connected location warning in NOLA SMS Pro.',
        caption: 'If the wrong location appears, stop and contact support before sending.'
      },
      {
        filename: '/images/docs/error-zero-credits.png',
        alt: 'Zero credits warning in NOLA SMS Pro.',
        caption: 'If credits are zero, request credits before sending SMS.'
      },
      {
        filename: '/images/docs/error-sms-failed.png',
        alt: 'Failed SMS status in Message History.',
        caption: 'If SMS fails, check the number, credits, Sender ID, and Message History.'
      },
      {
        filename: '/images/docs/error-reconnect-required.png',
        alt: 'Reconnect required prompt in NOLA SMS Pro.',
        caption: 'If reconnect is required, follow the reconnect prompt from the app.'
      }
    ],
    relatedPages: [
      { id: 'faq', title: 'FAQ' }
    ]
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description: 'Short answers to common NOLA SMS Pro questions.',
    section: 'FAQ',
    readingTime: '4 min read',
    purpose: 'Use these quick answers when you need a short explanation without reading a full guide.',
    faqs: [
      {
        q: 'Can I send right after installation?',
        a: 'Yes, if the correct location is connected and SMS credits are available. Use NOLASMSPro for your first send.'
      },
      {
        q: 'Why can I not send SMS?',
        a: 'The most common causes are zero credits, an invalid phone number, an unapproved Sender ID, or a failed connection. Check Settings, Credits, and Message History.'
      },
      {
        q: 'How many credits does one SMS use?',
        a: 'A normal 160-character SMS usually uses 1 credit. Longer messages or messages with special characters may use more.'
      },
      {
        q: 'Can I use my own Sender ID?',
        a: 'Yes. Request it from Settings, then wait until it is approved. Pending Sender IDs cannot be used in Compose.'
      },
      {
        q: 'What should I do if a message fails?',
        a: 'Open Message History, check the failed reason if available, and avoid clicking Send again until you understand the issue.'
      },
      {
        q: 'What information should I send to support?',
        a: 'Include a screenshot, HighLevel location name, recipient number, send time, message status, and visible error message.'
      }
    ],
    relatedPages: [
      { id: 'troubleshooting', title: 'Troubleshooting' }
    ]
  }
];

export function getDocPageById(id: string): DocPage | undefined {
  return docsData.find((p) => p.id === id);
}

export function getNextAndPrevPages(id: string) {
  const flatItems: { id: string; title: string }[] = [];
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
