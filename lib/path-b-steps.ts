import type { StepData } from "./types";

export const pathBSteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Open Rio's Setup Link",
    estimatedTime: "1 min",
    actions: [
      { label: 'Log in to Rio and click "Connect WhatsApp"', href: "https://www.joinrio.app/login" },
      { label: "A popup window from Facebook will open. Do not close it." },
      { label: "Log in with your Facebook account in the popup." },
    ],
    whatYouShouldSee: "A Facebook login screen inside the popup window.",
    tellMeMore:
      "Popup blockers may prevent this from opening. Look for a notification in your browser's address bar and choose 'Allow popups from Rio.'",
  },
  {
    id: "step-2",
    number: 2,
    title: "Select Your Business Portfolio",
    estimatedTime: "1 min",
    actions: [
      { label: 'Click the "Business portfolio" dropdown.' },
      {
        label:
          "Select an existing portfolio, or choose 'Create a Business portfolio' if you don't have one yet.",
      },
      { label: 'Click "Continue".' },
    ],
    screenshotSrc: "/screenshot-embedded-signup-portfolio-pick-existing.png",
    screenshotPlaceholder:
      "Meta embedded signup — Business portfolio dropdown showing list of portfolios",
    tellMeMore:
      "Your Business Portfolio is how Meta groups your business assets. If you have multiple businesses, pick the one that owns the phone number you're connecting. You can create a new one here if needed (no advance setup required).",
  },
  {
    id: "step-3",
    number: 3,
    title: "Select 'Create a WhatsApp Business account'",
    estimatedTime: "1 min",
    actions: [
      { label: 'Click the "WhatsApp Business account" dropdown.' },
      { label: 'Select "Create a WhatsApp Business account".' },
      { label: 'Click "Continue".' },
    ],
    screenshotSrc: "/screenshot-embedded-signup-waba-create-new.png",
    screenshotPlaceholder:
      "Meta embedded signup — WhatsApp Business account dropdown with Create option selected",
    tellMeMore:
      "This converts a regular phone number into a WhatsApp Business number. If your number is currently on the WhatsApp personal app, you will need to remove it from the app before this step.",
  },
  {
    id: "step-4",
    number: 4,
    title: "Enter Business Information",
    estimatedTime: "3 min",
    actions: [
      { label: "Enter your legal business name in the Name field." },
      { label: "Select the category that best describes your business." },
      { label: "Enter your website URL." },
      { label: "Set your time zone." },
      { label: 'Click "Next".' },
    ],
    screenshotSrc: "/screenshot-embedded-signup-business-info.png",
    screenshotPlaceholder:
      "Meta embedded signup — Enter business information for new assets form",
    warningCallout:
      "Your business name must match the name on your website. A mismatch is the most common reason Meta rejects the setup.",
    tellMeMore:
      "Country is pre-filled and cannot be changed here. The website you enter will be checked by Meta during their review, so make sure it loads correctly and displays your business name.",
  },
  {
    id: "step-5",
    number: 5,
    title: "Choose 'Add a New Number'",
    estimatedTime: "30 sec",
    actions: [
      { label: 'Select "Add a new number".' },
      { label: 'Click "Next".' },
    ],
    screenshotSrc: "/screenshot-embedded-signup-add-number-method.png",
    screenshotPlaceholder:
      "Meta embedded signup — Add your WhatsApp phone number screen showing two options",
    tellMeMore:
      '"Use a display name only" sends messages without a real phone number (recipients only see a name). Always choose "Add a new number" so customers can actually reach you by phone.',
  },
  {
    id: "step-6",
    number: 6,
    title: "Enter Phone Number and Display Name",
    estimatedTime: "3 min",
    actions: [
      { label: "Select your country code and enter your phone number." },
      { label: "Enter your WhatsApp Business display name." },
      { label: "Choose your verification method: Text message (default) or Phone call." },
      { label: 'Click "Next".' },
    ],
    screenshotSrc: "/screenshot-embedded-signup-phone-number-form.png",
    screenshotPlaceholder:
      "Meta embedded signup — phone number and display name form",
    warningCallout:
      "Your display name must match your company name exactly. No unnecessary punctuation, emojis, or trademark symbols (e.g. ™ or ®). Meta will reject names that don't follow their guidelines.",
    tellMeMore:
      "Choose Phone call if your number is a landline: landlines cannot receive SMS codes. Text message works for all standard mobile numbers.",
    commonErrors: [
      {
        branchId: "B6.I",
        title: "This phone number is already registered to a WhatsApp account",
        description:
          "To continue, you must migrate this phone number or disconnect it from the existing WhatsApp account. Then return to this page and try again. It can take up to 3 minutes for the number to refresh.",
        screenshotSrc: "/screenshot-error-number-already-registered-whatsapp.png",
        isDeadEnd: true,
        deadEndNote: "I will update with recommended fixes for this error.",
      },
    ],
  },
  {
    id: "step-7",
    number: 7,
    title: "Enter Your Verification Code",
    estimatedTime: "2 min",
    actions: [
      { label: "Check your phone for the 6-digit code from Meta." },
      { label: "Enter the code in the popup." },
      { label: 'Click "Verify".' },
    ],
    commonErrors: [
      {
        title: "Code expired",
        description: 'Click "Resend" and choose Voice call this time.',
      },
      {
        title: "Invalid code",
        description: "Copy all 6 digits exactly. Do not include spaces.",
      },
    ],
  },
  {
    id: "step-8",
    number: 8,
    title: "You're Connected!",
    estimatedTime: "",
    actions: [],
    successState: {
      title: "Your WhatsApp number is now connected to Rio.",
      bullets: [
        "Your display name is being reviewed by Meta. This can take a few minutes to a few days. Your number works while they review it.",
        "To send first messages to customers, you will need to set up message templates in Rio.",
      ],
      ctaLabel: "Go to Rio Dashboard",
      ctaHref: "https://app.joinrio.app",
    },
  },
];
