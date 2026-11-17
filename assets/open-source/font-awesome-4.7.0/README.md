# Font Awesome 4.7.0 (optional legacy icon library)

This folder **includes** the Font Awesome **4.7.0** distribution: `css/`, `fonts/`, `less/` and `scss/`, together with a historical upstream note (`HELP-US-OUT.txt`). It is an optional third-party dependency, not part of the GOV.UK Design System.

The [pages index template](../../../templates/pages-index/README.md) uses Font Awesome icon classes (`fa-envelope`, `fa-comment` and `fa-file-text`) to distinguish email, SMS and letter examples.

## Install in the GOV.UK Prototype Kit

1. Copy this entire `font-awesome-4.7.0/` folder to `app/assets/open-source/font-awesome-4.7.0/` in your Kit. Keep `css/` and `fonts/` next to one another because the CSS uses relative `../fonts/` URLs.
2. Add a stylesheet reference to your template or layout, for example:

   ```html
   <link rel="stylesheet" href="/public/open-source/font-awesome-4.7.0/css/font-awesome.min.css">
   ```

3. Use icon markup such as `<i class="fa fa-envelope" aria-hidden="true"></i>`, with an accompanying visible or screen-reader label when the icon conveys information.
4. Test the font URLs and icons in your installed Kit. This collection is not an npm package and does not automatically install dependencies.

## Source and licences

Font Awesome 4.7.0 is by **Dave Gandy** (2016). See the [official version 4 licensing page](https://fontawesome.com/v4/license/):

- Font files in `fonts/`: **SIL Open Font License 1.1** (see [`OFL-1.1.txt`](OFL-1.1.txt) and bundled copyright notice).
- CSS, LESS and Sass source: **MIT** (see [`MIT.txt`](MIT.txt)).
- Upstream documentation: **CC BY 3.0** (see the [licence](https://creativecommons.org/licenses/by/3.0/) and retain attribution where appropriate).

The repository's root MIT licence **does not replace** these third-party terms. Font Awesome is historical software; do not assume its icons meet your service's current design or accessibility requirements. Brand marks remain subject to their respective owners' rights.
