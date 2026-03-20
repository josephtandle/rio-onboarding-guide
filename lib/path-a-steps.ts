import type { StepData } from "./types";

export const pathASteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Check Your Business Account on Facebook",
    estimatedTime: "1-2 min",
    actions: [
      { label: "Go to business.facebook.com (open in your browser, not the Facebook app)" },
      { label: "Log in with your Facebook account" },
      { label: "Look at the top left. Does it show a business name?" },
    ],
    tellMeMore:
      "business.facebook.com is where Meta manages business accounts. It is different from your personal Facebook. Log in with the same Facebook account you use every day.",
    branch: {
      question: "Do you see a business name at the top left?",
      options: [
        { label: "Yes, I have a Business Portfolio", action: "skip-step-1b" },
        { label: "No, I need to create one", action: "show-step-1b" },
      ],
    },
    screenshotPlaceholder: "Meta Business Manager dashboard with business name highlighted at top left",
  },
  {
    id: "step-1b",
    number: 2,
    title: "Create Your Business Account",
    estimatedTime: "5-10 min",
    actions: [
      { label: "Go to business.facebook.com/overview" },
      { label: 'Click "Create Account"' },
      { label: "Enter your legal business name (exactly as registered)" },
      { label: "Enter your name and business email address" },
      { label: "Follow the prompts: enter business address and phone" },
      { label: "Check your email. Meta will send a confirmation. Click the link." },
    ],
    tellMeMore:
      "Use your legal business name — the same name on your business registration documents. This is not your trading name or nickname.",
    warningCallout:
      "Agency clients: Use your own business account — not your agency's. An agency-owned account will block the setup.",
    screenshotPlaceholder: "New Meta Business Manager dashboard with business name at top left",
  },
  {
    id: "step-2",
    number: 3,
    title: "Confirm You Are an Admin",
    estimatedTime: "1 min",
    actions: [
      { label: "In Meta Business Manager, click Settings (gear icon, bottom left)" },
      { label: "Click Business Settings, then People" },
      { label: "Find your name. Confirm it says Admin." },
    ],
    tellMeMore:
      "Only Admins can connect WhatsApp to Rio. If you are not an Admin, ask the person who created the business account on Facebook to add you as Admin under Settings then People.",
    branch: {
      question: "What does your role say?",
      options: [
        { label: "Admin", action: "skip-step-1b" },
        { label: "Employee / No access", action: "skip-step-1b" },
      ],
    },
    screenshotPlaceholder: "Business Settings > People page showing Admin role",
  },
  {
    id: "step-3",
    number: 4,
    title: "Check Your Website",
    estimatedTime: "2 min",
    actions: [
      { label: "Open your business website" },
      { label: "Make sure it loads with HTTPS (you will see a padlock icon in the browser bar)" },
      { label: "Make sure your business name is visible (header, footer, or About page)" },
      { label: "Make sure your address and phone number are on the site" },
      { label: "Make sure the name you want for WhatsApp is visible somewhere on the site" },
    ],
    warningCallout:
      "A missing or incomplete website is the most common reason Meta blocks account setup. Fix any missing details before continuing.",
    tellMeMore:
      "Meta checks your website when they review your account. Your WhatsApp display name must match what is on your site. If your site has an SSL certificate (HTTPS), that is the padlock symbol.",
  },
  {
    id: "step-4",
    number: 5,
    title: "Start the Connection in Rio",
    estimatedTime: "1 min",
    actions: [
      { label: 'Log in to Rio and click "Connect WhatsApp"', href: "https://www.joinrio.app/login" },
      { label: "A popup window from Facebook will appear. Do not close it or block it." },
      { label: "If no popup appears: check that your browser is not blocking popups for Rio" },
    ],
    whatYouShouldSee: "A Facebook login screen inside the popup window.",
    tellMeMore:
      "Popup blockers can prevent this from opening. Look for a notification in your browser's address bar. Click it and choose 'Allow popups from Rio.'",
    screenshotPlaceholder: "Facebook login popup window from Rio",
    customContent: "facebook-login-placeholder",
  },
  {
    id: "step-5",
    number: 6,
    title: "Log In to Facebook",
    estimatedTime: "1 min",
    actions: [
      { label: "Enter your Facebook email and password in the popup" },
      { label: "Complete any verification step if prompted" },
      { label: "Click Continue" },
    ],
    whatYouShouldSee: "A screen asking you to choose or create a business account.",
  },
  {
    id: "step-6",
    number: 7,
    title: "Select Your Business Account",
    estimatedTime: "2 min",
    actions: [
      { label: "If your business account appears in the list, select it and click Continue" },
      { label: 'If no business account appears, click "Create a new business portfolio" and enter your business name' },
    ],
    tellMeMore:
      "Use the same business account you checked in Step 1. Do not create a duplicate.",
  },
  {
    id: "step-7",
    number: 8,
    title: "Create Your WhatsApp Business Account",
    estimatedTime: "3 min",
    actions: [
      { label: 'Click "Create a new WhatsApp Business Account"' },
      { label: "Enter your WhatsApp Business Account name (your legal business name)" },
      { label: "Choose your business category" },
      { label: "Enter your display name. This is what customers see next to your number." },
    ],
    warningCallout:
      "Your display name must match a name on your website. Common rejections: too generic like 'Business', includes 'WhatsApp', or does not match your site.",
    tellMeMore:
      "Your display name is what customers will see when you message them. Meta reviews it and can take minutes or days. Your number works while they review it.",
  },
  {
    id: "step-8",
    number: 9,
    title: "Add Your Phone Number",
    estimatedTime: "2 min",
    actions: [
      { label: "Type your phone number. Start with your country code." },
      { label: "Choose how to receive your code: SMS (text message) or Voice call" },
      { label: "Make sure you have your phone nearby right now" },
      { label: "Click Send Code" },
    ],
    tellMeMore:
      "Your country code is the number before your local number. Indonesia: +62. US: +1. Example: +62 812 3456 7890.",
    warningCallout:
      "If this number is on the WhatsApp personal app right now, you must delete it from WhatsApp before it can be verified here.",
    commonErrors: [
      {
        title: "I am not receiving the code",
        description:
          "Try voice call instead of SMS. OTP codes expire in a few minutes. Make sure no call-blocking app is active.",
      },
      {
        title: "The number is already in use",
        description:
          "This number may be registered to another WhatsApp API provider. Go back to triage and select 'Yes' to the second question.",
      },
    ],
  },
  {
    id: "step-9",
    number: 10,
    title: "Enter Your Verification Code",
    estimatedTime: "2 min",
    actions: [
      { label: "Check your phone for the text message or call from Meta" },
      { label: "Type the 6-digit code in the popup" },
      { label: "Click Verify" },
    ],
    tellMeMore:
      "The code expires in a few minutes. If you do not receive it within 2 minutes, go back and try requesting via voice call instead.",
    commonErrors: [
      {
        title: "Code expired",
        description: "Click 'Resend' and choose Voice call this time.",
      },
      {
        title: "Invalid code",
        description:
          "Make sure you copied all 6 digits. Do not include spaces.",
      },
    ],
  },
  {
    id: "step-10",
    number: 11,
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
