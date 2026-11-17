# Out-of-service communications

## Purpose
Illustrate an email, letter or SMS notification *inside* a GOV.UK Prototype Kit demo.
These are prototype preview pages, **not** production-ready GOV.UK Notify templates.

## Files
- `email/user-management/`: account-access communication
- `email/system-notifications/`: generic reviewer addition and approval notifications
- `sms/`: account creation, sign-in and password-reset examples
- `letter/`: fictional service registration letter
- `styles.css`: shared visual presentation rules for the communication previews

## Installation
Copy the HTML example(s) to `app/views/[your-version]/communications/...` and include
`styles.css` in `app/assets/css/communications.css`, then reference that stylesheet
in your layout using `/public/css/communications.css`.
Adapt links and paths to match your prototype. Templates extend the unbranded Kit layout.

## Customisation and safety
- Replace `{{serviceName}}`, `[EMAIL ADDRESS]`, `[EXAMPLE CODE]` and all placeholders.
- The examples are fictionalised. Do not use genuine personal contact details or credentials.
- The letter's original embedded branding image was intentionally removed pending
  clarification of reuse rights; insert an authorised brand asset if required.
- Test print, mobile presentation and assistive-technology behaviour before research.

Inspired by the general communication patterns of GOV.UK Notify; no claim is made
that these are official Notify templates or validated by the Notify team.
