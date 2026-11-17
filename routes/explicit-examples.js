/**
 * GOV.UK Prototype Kit — routing examples (familiar / original-style edition)
 *
 * Adapted from a longer historical prototype routes file. Each block illustrates
 * a different GET or POST routing technique while keeping the straightforward
 * router.get / router.post / req.session.data / res.redirect style.
 *
 * These examples are NOT a complete running service. The corresponding Nunjucks
 * views and form fields must exist before their routes can be used. See README.md.
 *
 * Choose individual examples; do not paste this entire catalogue into a live
 * prototype unless you intend to create every referenced page.
 */

module.exports = function(router) {

  var version = 'v1'; // Change this to the version folder used by your prototype.

  /*****
   * 01. General prototype pages (not part of the service)
   * A simple GET: render a page and pass data into its Nunjucks template.
   *****/

  router.get('/' + version + '/' + 'config', function (req, res) {
    res.render(version + '/config', {
      'version': version.substring(1)
    })
  })

  /*****
   * 02. Configuration form: use session data and route to different start points
   * Similar to the original multi-scenario config, with fictional options.
   *****/

  router.post('/' + version + '/' + 'config-validation', function (req, res) {

    var userType = req.session.data['userType']
    var entryPoint = req.session.data['entryPoint']
    var numberOfRecords = req.session.data['numberOfRecords']

    // Set starting values for a research scenario.
    if (userType == 'Reviewer') {
      req.session.data['selectedOrganisationName'] = 'Example Organisation'
      req.session.data['records'] = '1'
      req.session.data['postAuthenticationURL'] = 'home'
    }
    else {

      if (numberOfRecords == '1') {
        req.session.data['selectedOrganisationName'] = 'Example Organisation'
        req.session.data['records'] = '1'
        req.session.data['postAuthenticationURL'] = 'home'
      }
      else if (numberOfRecords == '2 to 10') {
        req.session.data['selectedOrganisationName'] = ''
        req.session.data['records'] = ''
        req.session.data['postAuthenticationURL'] = 'select-record?searchRequired=false&paginationRequired=false'
      }
      else {
        req.session.data['selectedOrganisationName'] = ''
        req.session.data['records'] = ''
        req.session.data['postAuthenticationURL'] = 'select-record?searchRequired=true&paginationRequired=true&page1=true'
      }
    }

    // Send the researcher to the chosen entry point.
    if (entryPoint == 'Start page') {
      res.redirect('/' + version + '/start')
    }
    else if (entryPoint == 'Sign-in example') {
      // Illustrative sign-in journey, not a real authentication integration.
      res.redirect('/' + version + '/sign-in/start')
    }
    else {
      res.redirect('/' + version + '/signed-in/' + req.session.data['postAuthenticationURL'])
    }

  })

  /*****
   * 03. Question page with a query-string error flag
   * Original structure retained: GET renders error; POST decides next page.
   *****/

  router.get('/' + version + '/' + 'choose-contact-method', function (req, res) {
    res.render(version + '/choose-contact-method', {
      'error': req.query.error
    })
  })

  router.post('/' + version + '/' + 'choose-contact-method-validation', function (req, res) {

    var contactMethod = req.body['contactMethod']

    if (contactMethod == 'Email') {
      req.session.data['contactMethod'] = contactMethod
      res.redirect('/' + version + '/enter-email')
    }
    else if (contactMethod == 'Telephone') {
      req.session.data['contactMethod'] = contactMethod
      res.redirect('/' + version + '/enter-telephone')
    }
    else {
      // No answer selected — return to the question with an error.
      res.redirect('/' + version + '/choose-contact-method?error=true')
    }

  })

  /*****
   * 04. Routing based on an earlier answer saved in the session
   * A separate POST illustrating conditional logic between pages.
   *****/

  router.post('/' + version + '/' + 'check-details-validation', function (req, res) {

    var hasAdditionalDetails = req.session.data['hasAdditionalDetails']

    if (hasAdditionalDetails == 'Yes') {
      res.redirect('/' + version + '/additional-details')
    }
    else {
      res.redirect('/' + version + '/check-your-answers')
    }

  })

  /*****
   * 05. Pass several query-string parameters to a Nunjucks view
   * Useful for search, errors and simple prototype pagination states.
   *****/

  router.get('/' + version + '/' + 'signed-in/select-record', function (req, res) {
    res.render(version + '/signed-in/select-record', {
      'error': req.query.error,
      'searchRequired': req.query.searchRequired,
      'paginationRequired': req.query.paginationRequired,
      'page1': req.query.page1,
      'page2': req.query.page2,
      'searchRecord': req.query.searchRecord
    })
  })

  /*****
   * 06. Non-JavaScript search form (GET): validate a query parameter
   * Use a form with method="get" and action="/v1/signed-in/search-record".
   *****/

  router.get('/' + version + '/' + 'signed-in/search-record', function (req, res) {

    var searchRecord = req.query['searchRecord']

    if (!searchRecord || searchRecord.trim() == '') {
      res.redirect('/' + version + '/signed-in/select-record?searchRequired=true&error=true')
    }
    else {
      req.session.data['searchRecord'] = searchRecord
      res.redirect('/' + version + '/signed-in/select-record?searchRequired=true&paginationRequired=true&page1=true')
    }

  })

  /*****
   * 07. Validate a radio selection and look up related data from a list
   * Sample entries are fictional. Replace this list with approved demo JSON.
   *****/

  router.post('/' + version + '/' + 'signed-in/select-record-validation', function (req, res) {

    var recordId = req.body['recordId']

    if (recordId == undefined || recordId == '') {
      res.redirect('/' + version + '/signed-in/select-record?error=true')
    }
    else {

      var exampleRecords = [
        { ID: 1, 'Name': 'Example Organisation', 'Area': 'Example Area' },
        { ID: 2, 'Name': 'Sample Centre', 'Area': 'Sample Area' }
      ]

      var selectedRecord = exampleRecords.find(r => r.ID === Number(recordId))

      if (!selectedRecord) {
        res.redirect('/' + version + '/signed-in/select-record?error=true')
      }
      else {
        req.session.data['selectedRecord'] = selectedRecord
        req.session.data['selectedRecordName'] = selectedRecord['Name']
        req.session.data['selectedRecordArea'] = selectedRecord['Area']

        res.redirect('/' + version + '/signed-in/home?justSignedIn=false')
      }
    }

  })

  /*****
   * 08. Preserve search/pagination state when selection fails
   * Distinct from example 07 because the error URL retains active filters.
   *****/

  router.post('/' + version + '/' + 'signed-in/select-record-search-validation', function (req, res) {

    var searchRequired = req.session.data['searchRequired']
    var paginationRequired = req.session.data['paginationRequired']
    var recordId = req.body['recordId']
    var searchRequiredURL = ''
    var paginationRequiredURL = ''

    if (searchRequired == 'true') {
      searchRequiredURL = '&searchRequired=true'
    }
    if (paginationRequired == 'true') {
      paginationRequiredURL = '&paginationRequired=true&page1=true'
    }

    if (recordId == undefined || recordId == '') {
      res.redirect('/' + version + '/signed-in/select-record?error=true' + searchRequiredURL + paginationRequiredURL)
    }
    else {
      req.session.data['selectedRecordId'] = recordId
      res.redirect('/' + version + '/signed-in/home')
    }

  })

  /*****
   * 09. A GET page with several rendering options and session values
   *****/

  router.get('/' + version + '/' + 'signed-in/data', function (req, res) {
    res.render(version + '/signed-in/data', {
      'filterApplied': req.query.filterApplied,
      'selectedRecordName': req.session.data['selectedRecordName'],
      'sessionTimeoutJs': req.query.sessionTimeoutJs,
      'sessionTimeoutNonJs': req.query.sessionTimeoutNonJs
    })
  })

  /*****
   * 10. One filter: ignore the default, redirect to a result anchor
   * This mirrors the basic data-update-filters route from the source.
   *****/

  router.post('/' + version + '/' + 'signed-in/data-update-filters', function (req, res) {

    var selectedArea = req.session.data['selectedArea']

    if (selectedArea == 'All areas') {
      selectedArea = undefined
    }

    if (selectedArea) {
      res.redirect('/' + version + '/signed-in/data?filterApplied=Yes#results')
    }
    else {
      res.redirect('/' + version + '/signed-in/data?filterApplied=#results')
    }

  })

  /*****
   * 11. More than one filter: keep the original familiar if/else approach
   *****/

  router.post('/' + version + '/' + 'signed-in/data-update-multiple-filters', function (req, res) {

    var selectedArea = req.session.data['selectedArea']
    var selectedYear = req.session.data['selectedYear']

    if (selectedArea == 'All areas') {
      selectedArea = undefined
    }
    if (selectedYear == 'All years') {
      selectedYear = undefined
    }

    if (selectedArea || selectedYear) {
      res.redirect('/' + version + '/signed-in/data?filterApplied=Yes#results')
    }
    else {
      res.redirect('/' + version + '/signed-in/data?filterApplied=#results')
    }

  })

  /*****
   * 12. Prepare simple chart series from example data in a GET
   * Follows the original chart route's map / Number / JSON.stringify style.
   * Requires an appropriate chart renderer in the corresponding view.
   *****/

  router.get('/' + version + '/' + 'signed-in/example-chart', function (req, res) {

    // Fictional figures, solely to illustrate transforming data for a chart.
    var rows = [
      { 'Year': '2024', 'Example Area': 12, 'Comparison Area': 10 },
      { 'Year': '2025', 'Example Area': 15, 'Comparison Area': 13 },
      { 'Year': '2026', 'Example Area': 18, 'Comparison Area': 14 }
    ]

    var categories = rows.map(r => String(r['Year']))
    var areas = ['Example Area', 'Comparison Area']
    var series = areas.map(area => ({
      name: area,
      data: rows.map(r => {
        var number = Number(r[area])
        return Number.isFinite(number) ? number : null
      }),
      marker: { enabled: false }
    }))

    var chartConfig = {
      chart: { type: 'line' },
      legend: { enabled: true },
      xAxis: { categories: categories, type: 'category' },
      yAxis: { title: { text: 'Example value' } },
      series: series
    }

    res.render(version + '/signed-in/example-chart', {
      'tableRows': rows,
      'highchartsConfig': JSON.stringify(chartConfig)
    })

  })

  /*****
   * 13. A simple footer page that accepts a contextual backlink
   * Use only trusted, known destinations when rendering that backlink.
   *****/

  router.get('/' + version + '/' + 'footer/terms-of-use', function (req, res) {
    res.render(version + '/footer/terms-of-use', {
      'backLink': req.query.backLink
    })
  })

  /*****
   * 14. A service/system page with a query-string display flag
   *****/

  router.get('/' + version + '/' + 'system/service-unavailable', function (req, res) {
    res.render(version + '/system/service-unavailable', {
      'hideFooterLinks': req.query.hideFooterLinks
    })
  })

}
