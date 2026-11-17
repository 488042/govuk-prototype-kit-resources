# GOV.UK Prototype Kit resources

A small, independently maintained collection of reusable **prototype-supporting pages, route examples, styles and scripts** for people building with the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/).

The aim is practical reuse: copy a clearly described example into your own Kit instead of rebuilding it from scratch. This is **not** an official GOV.UK, GDS or DWP resource, a production application, or an npm package.

## Find a resource

| Resource | Purpose | Instructions |
| --- | --- | --- |
| [Prototype landing page](templates/prototype-landing-page/README.md) | Version links, research notes, prototype entry | README |
| [Design history](templates/design-history/README.md) | Track iterations and decisions | README |
| [Pages index](templates/pages-index/README.md) | Navigate screens, variations and supporting journeys | README |
| [Scenario configuration](templates/scenario-configuration/README.md) | Configure a research scenario and session state | README |
| [Statuses](templates/statuses/README.md) | Illustrative state glossary | README |
| [Communications](templates/communications/README.md) | Fictional email, letter and SMS previews | README |
| [Routing examples](routes/README.md) | Explicit and consolidated GET/POST patterns | README |
| [Styles](styles/README.md) | Optional Sass and CSS utilities | README |
| [Scripts](scripts/README.md) | Supporting browser scripts | README |
| [Third-party assets](assets/README.md) | Optional upstream dependencies and licensing | README |
| [GOV.UK One Login journey reference](templates/gov-uk/one-login/README.md) | Historical journey outline only; no source pages included | README |

## Choose a routing style

There are **two equivalent learning resources**, not two modules you need to install:

- **[`routes/explicit-examples.js`](routes/explicit-examples.js)** — familiar `router.get` / `router.post` handlers, one example at a time, direct `if` / `else` and versioned `/v1/...` paths. A convenient starting point for designers who want to copy and modify a block.
- **[`routes/consolidated-examples.js`](routes/consolidated-examples.js)** — more organised, namespaced `/route-examples/...` paths with shared helpers and structured data. Useful when exploring ways to reduce repetitive code.

Both use the Kit's existing Express router and **require associated views/forms for most examples**. Read [routes/README.md](routes/README.md) before copying. Do **not** register both complete files indiscriminately or replace your Kit's existing `app/routes.js`.

## How to use a template

1. Start from an approved GOV.UK Prototype Kit and check its version.
2. Open the README alongside the resource. Copy **only the files and dependencies you need**.
3. Put Nunjucks pages under `app/views/`, assets under the appropriate `app/assets/` folder and route handlers into the Kit's existing route registration.
4. Replace fictional content, dummy destinations and version-specific assumptions.
5. Run the actual Kit and test navigation, validation, keyboard behaviour and accessibility before user research.

This collection contains **examples**, not an automatically runnable project. Copying a page alone does not provide its routes, session state or dependencies.

## Provenance, licensing and publication

- The repo's MIT licence covers the maintainer's original contributions **only where the maintainer owns the rights**. Other material may have separate licences or copyright requirements.
- **The historical GOV.UK One Login HTML pages are deliberately excluded from this distribution** because the original prototype is access-controlled and public redistribution rights were not established. The pages index retains an illustrative list of states, but links are placeholders. See [the bundle README](templates/gov-uk/one-login/README.md) and official One Login prototype guidance.
- Read the README for each resource, including installation limitations and the original licences of bundled third-party files.
- Do not commit personal data, credentials, confidential project details or previous-client material without permission.

## Contributions

Contributions are welcome after checking provenance, licensing and usefulness. Each addition should have a concise README, list of files to copy, expected Kit paths, dependencies, examples of inputs and known limitations. Changes should be tested in a Kit and preferably submitted through a reviewable pull request.

This repository can also be consumed by AI coding tools. Agents should read the resource README and target project's rules before attempting integration; examples are not authoritative service policy.
