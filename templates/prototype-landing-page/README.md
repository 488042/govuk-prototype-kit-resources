# Prototype landing page

## Purpose
An editable entry page for a GOV.UK Prototype Kit project: project identity, latest version,
prototype links and design-history navigation.

## Files and installation
Copy `index.html` to `app/views/index.html` (or adapt its content into an existing landing page).
It extends `layouts/main.html`, which must exist in the target Kit. GOV.UK Frontend styles come from the Kit.

## Make it your own
- Change `pageName`, version labels, descriptive content and status tags.
- Replace `href="#"` with actual page paths before using it for research.
- Change the three `option value` paths to your prototype version indexes.
- The version selector navigates on change: consider a separate submit button in user-facing contexts.

## Notes
Intended as prototype administration, not a public service page. Requires no extra assets.
Source: original reusable prototype work, generalised for this repository.
