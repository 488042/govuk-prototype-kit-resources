# Statuses and workflow states

## Purpose
Show status labels, what each state means, and which data conditions display it.
This is a reference page for designers and stakeholders, rather than a production status engine.

## Installation
Copy `statuses.html` into `app/views/[your-version]/statuses.html`.
It uses standard GOV.UK tables and tags from GOV.UK Frontend, with no extra local CSS required.
The previous duplicate `application.scss` has been removed; optional shared prototype styling
lives in `styles/sass/application.scss`.

## Customise
Replace the four `STATE` examples, data-mapping placeholders and `version`/`serviceName` variables.
The Back link uses `window.history.back()`; for a directly bookmarked page, supply an ordinary fallback.
Validate state colours and status wording against your actual service semantics.
