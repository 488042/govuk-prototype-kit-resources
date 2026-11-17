// Route examples for GOV.UK Prototype Kit app/routes.js.
// Paste these into the existing routes file where `router` is defined.
// Copy config.html and next.html to app/views/example/.
router.get('/example/config', function (req, res) {
  res.render('example/config', { version: 'Example' })
})

// Example of reading session data, conditional state and a redirect after POST.
router.post('/example/config', function (req, res) {
  const data = req.session.data || {}
  const userType = data.userType
  const entryPoint = data.entryPoint
  const numberOfApplications = userType === 'User 4' ? null : data.numberOfApplications

  // Use a single named example state rather than copying client-specific data flags.
  data.exampleScenario = {
    userType: userType,
    entryPoint: entryPoint,
    numberOfApplications: numberOfApplications,
    showSingleApplication: numberOfApplications === '1',
    searchRequired: numberOfApplications === '11 or more (select an application with search and pagination)'
  }

  // Demonstrate branching without pointing at non-existent pages.
  // Replace these example destinations with your own start/sign-in/dashboard routes.
  const destination = entryPoint === 'Start page on GOV.UK' ? 'start'
    : entryPoint === 'GOV.UK One Login' ? 'sign-in'
    : 'dashboard'
  res.redirect('/example/next?entry=' + encodeURIComponent(destination))
})

router.get('/example/next', function (req, res) {
  res.render('example/next', {
    scenario: (req.session.data || {}).exampleScenario || {},
    entry: req.query.entry || 'dashboard'
  })
})
