# Styles

These files are **optional references**, not a drop-in global stylesheet.
- `sass/application.scss` contains shared and legacy GOV.UK Prototype Kit Sass utilities.
- `sass/settings.scss`, `sass/_overrides.scss` are optional project settings; check Kit version.
- `css/styles.css` is a larger, historically accumulated collection of independent styles.
  Its selectors were renamed to generic names where they referenced former projects.
  Not every selector has an included HTML example; **do not assume unused rules are safe to delete**.
- `css/print.css` contains a print example. Adjust before using across a service.

Only copy the rules a particular example needs into your Kit's `app/assets/sass/application.scss`,
or add a separate partial/import. GOV.UK Frontend is not replaced by these rules.

**Compatibility:** Sass mixins such as `govuk-media-query` require GOV.UK Frontend's Sass
context. The large stylesheet has not been tested or proven free of historical baggage.
Before publishing or distributing it as a finished component, manually review provenance,
responsiveness, accessibility and current usage.
