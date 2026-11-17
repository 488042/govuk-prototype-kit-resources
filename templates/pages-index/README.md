# Pages index / journey catalogue

## Purpose

An editable index of a prototype's journeys, alternate states, communications and supporting design concepts. Useful for demonstrations, design reviews and versioned research prototypes.

This resource preserves its original detailed nested-list design. `href="#"` is intentional for **illustrative destinations**: replace those links with real routes in your own prototype when pages are available.

## Install

1. Copy `pages.html` to `app/views/[your-version]/pages.html` (for example `app/views/v1/pages.html`).
2. Set the `version` and `serviceName` values in your Kit or adapt the template to your own variables.
3. Copy only the page-specific Sass you need (including `heading-override`, the modal rules and any relevant layout overrides) from [`styles/sass/application.scss`](../../styles/sass/application.scss) into your Kit's Sass build.
4. Replace example `#` links with working destinations where appropriate.

## Icons and optional modal

This template **retains** Font Awesome icons for email, SMS and letter entries, and a `js-modal` trigger on **Design concept A**. The two asset URLs in `pageScripts` assume you copy:

- `assets/open-source/font-awesome-4.7.0/` to `app/assets/open-source/font-awesome-4.7.0/` (CSS and `fonts/` must keep their relative structure)
- `assets/open-source/jquery-accessible-modal-window-aria/jquery-accessible-modal-window-aria.js` to `app/assets/open-source/jquery-accessible-modal-window-aria/jquery-accessible-modal-window-aria.js`

In the Kit, those files should then be available at `/public/open-source/...`. The modal script also **requires jQuery to be loaded first** and styling from `styles/sass/application.scss`. If your Kit does not already provide jQuery, you must arrange an approved way to load it before this script, or omit the modal behaviour and its trigger when adapting the page. Neither dependency is automatically installed by copying the template. Read the [Font Awesome](../../assets/open-source/font-awesome-4.7.0/README.md) and [modal](../../assets/open-source/jquery-accessible-modal-window-aria/README.md) documentation before use.

## GOV.UK One Login reference

The detailed One Login section is a **historical illustrative journey outline**, not a current or interactive One Login prototype. All its journey links use `href="#"`, because **no One Login HTML screens are distributed** with this repository. The links to official guidance in the explanatory paragraph remain active. See the [documentation-only One Login README](../gov-uk/one-login/README.md) for up-to-date sources and how eligible service teams can request access.

## Notes

The Back link uses browser history so the same page can be reached from different places; consider a fallback for direct visits. This is a prototype administration/reference page, not a production service journey. Test the template, fonts, modal interactions and keyboard behaviour in your target Kit before relying on them in research.
