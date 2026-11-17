# Scenario configuration / research entry point

## Purpose
Use a single page to choose a fictional user type, entry point and sample record count before a branching prototype. The example includes a dynamic client-side radio group, a POST route for storing session data and a simple results page.

## Files and installation

1. Copy `config.html` and `next.html` to `app/views/example/`.
2. Copy `scenario-config.js` to `app/assets/javascripts/scenario-config.js`.
3. Copy only the route handlers from the local `routes.js` into the existing `app/routes.js` (where the Kit's `router` is already defined). Do not replace the Kit's whole router file.
4. Visit `/example/config`. Submit with Continue to see `/example/next` showing your selected scenario.

`config.html` loads `/public/javascripts/scenario-config.js`. It does not require jQuery.

## Client-side behaviour

- Changing the user type immediately hides or shows the record-count radios, **without submitting the form**.
- Inapplicable answers are disabled, and a valid existing selection is preserved where possible. When the selected option is no longer valid, the script chooses a suitable default.
- If JavaScript is unavailable, the page can still submit; the server chooses a suitable example scenario based on the submitted values. **Adapt and strengthen POST validation before real user research.**

## Customisation and limitations

- Replace `User 1`–`User 4`, entry-point labels, the fictional record count options and `/example/next` with your research scenario.
- Keep `config.html`, the script's selectors/values and POST-handling values in sync.
- The server route is an illustration of derived session data and redirecting, not real sign-in or identity verification.
- This example does **not** yet fully restore server-side selections after every browser reload; do not assume client-side preservation is persistent session-state restoration.
- No end-to-end Kit or assistive-technology testing has been completed for this repository snapshot.
