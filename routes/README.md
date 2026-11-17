# GOV.UK Prototype Kit route examples

Two complementary code catalogues showing Express `GET` and `POST` route patterns. These are **not** complete applications: most referenced `res.render` templates need to be created in your own Kit.

## Which file should I use?

| File | Approach | Good for | Sample route prefix |
| --- | --- | --- | --- |
| [`explicit-examples.js`](explicit-examples.js) | One straightforward handler per demonstration; direct `if` / `else` and `req.session.data`; version variable | Copy/paste one block and adapt it quickly | `/v1/...` (change the `version` variable) |
| [`consolidated-examples.js`](consolidated-examples.js) | Shared helpers, named constants, fewer repeated operations, bounded example data | Learning more structured routing approaches | `/route-examples/...` |

**These are alternatives, not two pieces of a single workflow.** Copy only what you need; do not install both wholesale unless you understand the registered paths and their required views.

## Installing a specific example

1. Open the chosen `.js` file and find a technique by its numbered comment.
2. Copy that `router.get(...)` or `router.post(...)` block into your existing **`app/routes.js`**, within the router's registration scope.
3. If you choose a block from `consolidated-examples.js`, also copy any shared constants/helpers it references, such as `path`, `sessionData`, `records` or `allowedTypes`. Alternatively replace them with direct strings and your own values.
4. Create the matching Nunjucks page under `app/views/` for any `res.render(...)` call, and make sure the submitted form uses matching `method`, `action` and `name` values.
5. Test the normal path, an invalid submission, Back, Change and session reset behaviour in your own Kit.

For a complete catalogue import, both files export `module.exports = function (router)`. Place your chosen file alongside `app/routes.js` and register it **once** with, for example:

```js
require('./route-examples')(router)
```

where `route-examples.js` is a copy of **one chosen edition**. Do not overwrite the Kit's original router, which may have other configuration and conventions.

## Explicit examples

The versioned file is deliberately close to traditional GOV.UK Prototype Kit route code and keeps direct handlers. It includes demonstrations of:

- rendering pages and returning query parameters
- validating radio and text inputs
- session-data defaults and conditional research entry points
- selection of fictional data records
- search/filter behaviour and no-JavaScript submissions
- clearing/setting filter state
- mapping data to a simple chart series
- redirects to alternate pages and error states

The source was reduced and generalised from longer historical examples. The fictional `v1` pages and sample form fields are **not bundled**. In particular, don't confuse the example's `Sign-in example` option with a real GOV.UK One Login authentication implementation.

## Consolidated examples

The consolidated file contains **15 route demonstrations**, registered under `/route-examples`. Its handlers use the current POST body for validation rather than relying on stale answers previously stored in the session.

| Example | Method/path | Main technique |
| --- | --- | --- |
| 01–03 | `GET start`, `GET question`, `POST question-answer` | Render, error state, conditional routing |
| 04–06 | `GET details`, `POST details-answer`, `GET summary` | Prefill, validation, Check Your Answers |
| 07 | `POST set-scenario` | Choose a test scenario and entry point |
| 08–09 | `GET choose-record`, `POST choose-record-answer` | Validate and look up a fictional record |
| 10–11 | `GET results`, `POST update-filters` | Filter, paginate, clear/search |
| 12 | `GET chart-data` | JSON data transformation; no chart UI supplied |
| 13–15 | `GET information`, `GET service-unavailable`, `POST reset` | Allowed destinations, flags, session reset |

The path prefix for each is `/route-examples/`. Except for `chart-data` and POST redirects, create matching pages under `app/views/route-examples/` before running the full catalogue.

### Minimal radio question view for consolidated example

Save as `app/views/route-examples/question.html`:

```njk
{% extends "layouts/main.html" %}
{% block pageTitle %}Example question – GOV.UK Prototype Kit{% endblock %}
{% block content %}
  {% if hasError %}
    {{ govukErrorSummary({
      titleText: "There is a problem",
      errorList: [{ text: "Select yes or no", href: "#example-answer" }]
    }) }}
    {% set radioError = { text: "Select yes or no" } %}
  {% endif %}
  <form method="post" action="/route-examples/question-answer" novalidate>
    {{ govukRadios({
      name: "example-answer",
      fieldset: { legend: {
        text: "Do you need to provide more details?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true
      } },
      errorMessage: radioError,
      items: [
        { value: "yes", text: "Yes", checked: answer == "yes" },
        { value: "no", text: "No", checked: answer == "no" }
      ]
    }) }}
    {{ govukButton({ text: "Continue" }) }}
  </form>
{% endblock %}
```

Form inputs referenced elsewhere in this file include `example-detail`, `record-id`, `search`, `type`, `action` and `scenario`. Match the names to those in the relevant handlers. A GET filter form is usually simpler where no server mutation is needed.

## Dependencies and limitations

- Express-style `router` provided by an existing GOV.UK Prototype Kit instance; session-data middleware required for session examples.
- No extra npm package required for the route code itself. Chart examples transform data but do not supply a chart renderer or accessibility-ready data visualisation.
- File imports and sample data are fictional. Not suitable for real authentication, payments, production authorisation or personal-data processing.
- Validate allowable inputs, escape user-provided output and clear session data between participants as appropriate.
- Route behaviour depends on how your Kit version handles automatic data storage. Avoid conflicting duplicate handlers and fields.
- Syntax validation of the examples does not substitute for a working Kit and browser test.

Official guidance: [Create routes](https://prototype-kit.service.gov.uk/create-routes/), [Pass data](https://prototype-kit.service.gov.uk/pass-data/), [Session data](https://prototype-kit.service.gov.uk/session/).
