'use strict'

/**
 * Reusable routing examples for the GOV.UK Prototype Kit.
 *
 * Illustrative patterns, not a complete service. See README.md before reuse.
 * Copy this file to app/route-examples.js and register it from app/routes.js.
 * All routes are namespaced under /route-examples to minimise conflicts.
 *
 * The Kit automatically stores named form inputs in req.session.data.
 * Here, req.body is used for validation of the CURRENT submission so that
 * an older session answer cannot accidentally validate an empty form.
 */
module.exports = function (router) {
  const BASE = '/route-examples'
  const path = (suffix) => `${BASE}/${suffix}`

  // Fictional sample data. Replace with your own public or synthetic fixture.
  const records = [
    { id: 'loc-1', name: 'Example centre A', type: 'Centre', area: 'North' },
    { id: 'loc-2', name: 'Example centre B', type: 'Centre', area: 'South' },
    { id: 'loc-3', name: 'Example office C', type: 'Office', area: 'North' },
    { id: 'loc-4', name: 'Example office D', type: 'Office', area: 'South' },
    { id: 'loc-5', name: 'Example centre E', type: 'Centre', area: 'North' }
  ]
  const allowedTypes = ['Centre', 'Office']

  function sessionData (req) {
    // In the Kit, req.session.data is normally available. Creating it here
    // also makes the examples straightforward to test in isolation.
    req.session.data = req.session.data || {}
    return req.session.data
  }

  // 01. GET: render a page and pass query parameters to its Nunjucks template.
  router.get(path('start'), (req, res) => {
    res.render('route-examples/start', {
      message: req.query.message || null
    })
  })

  // 02. GET: show a validation state after a redirect from a POST handler.
  router.get(path('question'), (req, res) => {
    res.render('route-examples/question', {
      hasError: req.query.error === 'required',
      answer: sessionData(req).exampleAnswer || ''
    })
  })

  // 03. POST: validate a radio answer, store state and branch to the next page.
  // The form should submit to /route-examples/question-answer with name="example-answer".
  router.post(path('question-answer'), (req, res) => {
    const answer = String(req.body?.['example-answer'] || '')
    if (!['yes', 'no'].includes(answer)) {
      return res.redirect(path('question') + '?error=required')
    }

    const data = sessionData(req)
    data.exampleAnswer = answer

    // A previous Yes may have collected details. They are no longer relevant
    // if the person changes the answer to No.
    if (answer === 'no') {
      delete data.exampleDetail
      return res.redirect(path('summary'))
    }
    return res.redirect(path('details'))
  })

  // 04. GET: prepopulate a field on a revisit or from a Change link.
  router.get(path('details'), (req, res) => {
    res.render('route-examples/details', {
      hasError: req.query.error === 'required',
      detail: sessionData(req).exampleDetail || '',
      // The destination is chosen by our code, not an arbitrary URL.
      editing: req.query.edit === 'true'
    })
  })

  // 05. POST: validate a text field and support normal and CYA edit journeys.
  // Include a hidden input named "return-to" with value "summary" on edit.
  router.post(path('details-answer'), (req, res) => {
    const detail = String(req.body?.['example-detail'] || '').trim()
    const isEditing = req.body?.['return-to'] === 'summary'

    if (!detail) {
      const query = isEditing ? '?error=required&edit=true' : '?error=required'
      return res.redirect(path('details') + query)
    }

    sessionData(req).exampleDetail = detail
    return res.redirect(path('summary'))
  })

  // 06. GET: Check Your Answers supplied from session data.
  // Use <a href="/route-examples/details?edit=true">Change</a> in this view.
  router.get(path('summary'), (req, res) => {
    const data = sessionData(req)
    res.render('route-examples/summary', {
      answer: data.exampleAnswer || null,
      detail: data.exampleAnswer === 'yes' ? (data.exampleDetail || null) : null,
      selectedRecord: data.exampleSelectedRecord || null
    })
  })

  // 07. POST: set up a fictional research scenario, reset dependent state and
  // pick an entry point. Different scenarios need different next pages.
  router.post(path('set-scenario'), (req, res) => {
    const scenario = String(req.body?.scenario || '')
    if (!['single-record', 'multiple-records'].includes(scenario)) {
      return res.redirect(path('start') + '?message=choose-scenario')
    }

    const data = sessionData(req)
    delete data.exampleSelectedRecord
    delete data.exampleDetail
    delete data.exampleAnswer
    data.exampleScenario = scenario

    return res.redirect(scenario === 'single-record'
      ? path('choose-record')
      : path('results'))
  })

  // 08. GET: show options from a simple data fixture.
  router.get(path('choose-record'), (req, res) => {
    res.render('route-examples/choose-record', {
      records,
      hasError: req.query.error === 'choose-one'
    })
  })

  // 09. POST: look up a selected ID, validate it and store useful fields.
  router.post(path('choose-record-answer'), (req, res) => {
    const id = String(req.body?.['record-id'] || '')
    const selectedRecord = records.find((record) => record.id === id)
    if (!selectedRecord) {
      return res.redirect(path('choose-record') + '?error=choose-one')
    }

    sessionData(req).exampleSelectedRecord = {
      id: selectedRecord.id,
      name: selectedRecord.name,
      type: selectedRecord.type
    }
    return res.redirect(path('summary'))
  })

  // 10. GET: server-side search, optional filtering and pagination.
  // A GET form works without JavaScript, for example:
  // <form method="get" action="/route-examples/results"> ... </form>
  router.get(path('results'), (req, res) => {
    const search = String(req.query.search || '').trim().slice(0, 100)
    const type = allowedTypes.includes(req.query.type) ? req.query.type : ''
    const requestedPage = Number.parseInt(req.query.page, 10) || 1
    const pageSize = 2

    const filtered = records.filter((record) => {
      const matchesSearch = !search || record.name.toLowerCase().includes(search.toLowerCase())
      const matchesType = !type || record.type === type
      return matchesSearch && matchesType
    })

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const page = Math.max(1, Math.min(requestedPage, totalPages))
    const start = (page - 1) * pageSize
    const results = filtered.slice(start, start + pageSize)

    // Keep search/filter values in pagination links (and URL encode them).
    const pageHref = (number) => path('results') + '?' + new URLSearchParams({
      search,
      type,
      page: String(number)
    }).toString()

    res.render('route-examples/results', {
      records: results,
      search,
      type,
      page,
      totalPages,
      resultCount: filtered.length,
      previousHref: page > 1 ? pageHref(page - 1) : null,
      nextHref: page < totalPages ? pageHref(page + 1) : null
    })
  })

  // 11. POST: redirect-after-POST for a filter form, including a clear action.
  // Forms can use GET directly; this is an alternative POST example.
  router.post(path('update-filters'), (req, res) => {
    if (req.body?.action === 'clear') {
      return res.redirect(path('results'))
    }
    const search = String(req.body?.search || '').trim().slice(0, 100)
    const type = allowedTypes.includes(req.body?.type) ? req.body.type : ''
    const query = new URLSearchParams({ search, type, page: '1' })
    return res.redirect(path('results') + '?' + query.toString())
  })

  // 12. GET: transform tabular data into chart-ready series, using only
  // illustrative data. No ONS, Highcharts or other package is required here.
  // This endpoint returns JSON for inspection; it does NOT draw a chart.
  router.get(path('chart-data'), (req, res) => {
    const sourceRows = [
      { period: '2025-01', centre: 12, office: 17 },
      { period: '2025-02', centre: 15, office: null },
      { period: '2025-03', centre: 19, office: 16 }
    ]
    const numeric = (value) => {
      if (value === null || value === '' || value === undefined) return null
      const result = Number(value)
      return Number.isFinite(result) ? result : null
    }

    const rows = sourceRows.slice().sort((a, b) => a.period.localeCompare(b.period))
    const categories = rows.map((row) => row.period)
    const series = [
      { name: 'Example centre', data: rows.map((row) => numeric(row.centre)) },
      { name: 'Example office', data: rows.map((row) => numeric(row.office)) }
    ]

    return res.json({
      categories,
      series,
      // Reuse the same source values in an accessible data table alongside
      // any graphical presentation. Do not claim a chart alone is accessible.
      tableRows: rows,
      description: 'Example monthly figures for two fictional locations.'
    })
  })

  // 13. GET: query-param-dependent service information with a safe back link.
  // Never redirect to an arbitrary user-supplied `back` URL.
  router.get(path('information'), (req, res) => {
    const back = req.query.back === 'summary' ? path('summary') : path('start')
    res.render('route-examples/information', { backHref: back })
  })

  // 14. GET: show a fictional service-unavailable state (not a live outage).
  router.get(path('service-unavailable'), (req, res) => {
    res.render('route-examples/service-unavailable', {
      hideFooterLinks: req.query.hideFooterLinks === 'true'
    })
  })

  // 15. POST: clear only the example's own session data, not the Kit's entire
  // session (which might contain another journey's answers).
  router.post(path('reset'), (req, res) => {
    const data = sessionData(req)
    for (const key of ['exampleAnswer', 'exampleDetail', 'exampleScenario', 'exampleSelectedRecord']) {
      delete data[key]
    }
    return res.redirect(path('start'))
  })
}
