# Design history

## Purpose
A page that documents prototype iterations: version, dates, changes, rationale and status.
It is a supporting prototype page, not part of an end-user service journey.

## Installation
Copy `design-history.html` to `app/views/design-history.html` and adapt its Back link.
For the extra-wide table layout copy the relevant rules from `styles/sass/application.scss`
into your Kit Sass file. Search for `extra-page-width-1400`, `html-unbranded-fill-page`
and the optional one-fifth-width class. Copy only the rules you need.

## Customise
- Replace `[DATE]`, `[CONTENT]`, statuses and version labels.
- Replace `href="#"` version links with real version index URLs.
- Add/remove rows to fit your design history.
- Keep project and participant information appropriate for the audience.

The example is deliberately generic and does not rely on other templates.
