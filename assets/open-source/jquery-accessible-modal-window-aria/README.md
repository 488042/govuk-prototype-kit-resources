# jQuery accessible modal window (modified example)

Source: https://github.com/nico3333fr/jquery-accessible-modal-window-aria

Original author: Nicolas Hoffmann. Original MIT licence retained in `LICENSE`.
The copy in this repository includes modifications for older GOV.UK-prototype styles.

This is **optional legacy code**, not automatically installed by any template. The pages-index template includes an example `js-modal` trigger for Design concept A. It requires jQuery,
matching styles from `styles/sass/application.scss`, and an accessible modal trigger.
It has **not** been tested with the current GOV.UK Prototype Kit, browser/assistive technology combinations,
or WCAG 2.2. Use an approved current dialog pattern where possible.

To use it with the supplied pages index, copy this folder under `app/assets/open-source/` and load the script from `/public/open-source/jquery-accessible-modal-window-aria/jquery-accessible-modal-window-aria.js`. Ensure jQuery is already loaded and compile the relevant Sass modal rules. Alternatively put the script under `app/assets/javascripts/` and adjust its URL. Review focus trapping, Escape and focus restoration before research.
