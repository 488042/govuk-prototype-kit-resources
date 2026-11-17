// Optional enhancement for the scenario configuration example.
// Copy to app/assets/javascripts/scenario-config.js.
// Does not require jQuery. The server must still validate the submitted values.
document.addEventListener('DOMContentLoaded', function () {
  const userChoices = document.getElementById('userTypeRadios')
  const applicationChoices = document.getElementById('numberOfApplicationsChoices')
  if (!userChoices || !applicationChoices) return

  const radios = Array.from(applicationChoices.querySelectorAll('input[type="radio"]'))
  const byId = (id) => document.getElementById(id)

  function refresh() {
    const selected = userChoices.querySelector('input[name="userType"]:checked')
    const type = selected ? selected.value : ''
    const show = type !== 'User 4'
    applicationChoices.hidden = !show
    const one = byId('number_of_applications_1')
    const middle = byId('number_of_applications_2')
    const many = byId('number_of_applications_3')
    if (!one || !middle || !many) return

    middle.disabled = !show
    one.disabled = !show || !(type === 'User 1' || type === 'User 2')
    many.disabled = type === 'User 1' || type === 'User 2' || type === 'User 4'
    // Keep a previously chosen value if it is still allowed for this user type.
    // Disabled or hidden answers must not be submitted accidentally.
    radios.forEach((radio) => {
      if (!show) radio.checked = false
      radio.disabled = !show || radio.disabled
    })
    if (show) {
      const validChecked = radios.some((radio) => radio.checked && !radio.disabled)
      if (!validChecked) {
        radios.forEach((radio) => { radio.checked = false })
        if (type === 'User 1' || type === 'User 2') middle.checked = true
        else many.checked = true
      }
    }
  }
  userChoices.addEventListener('change', refresh)
  refresh()
})
