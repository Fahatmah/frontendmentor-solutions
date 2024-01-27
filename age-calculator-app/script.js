const form = document.querySelector('.age-calculator-container')
let formInputs = document.querySelectorAll('.input input')
let daysOutput = document.getElementById('days')
let monthsOutput = document.getElementById('months')
let yearsOutput = document.getElementById('years')

const dayRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/
const monthRegex = /^(0?[1-9]|1[0-2])$/
const currentYear = new Date().getFullYear()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  validateForm()
})

const validateForm = () => {
  let inputs = formValues()

  let dayValue = inputs[0]
  let monthValue = inputs[1]
  let yearValue = inputs[2]

  removeErrorMessages()
  removeErrorStyles()

  if (dayValue === '' && monthValue === '' && yearValue === '') {
    errorRequiredFieldsMessage()
  } else {
    // days validation
    if (!dayRegex.test(dayValue)) {
      addErrorStyles()
      addErrorMessages('day', 'Must be a valid day')
    }
    // months validation
    if (!monthRegex.test(monthValue)) {
      addErrorStyles()
      addErrorMessages('month', 'Must be a valid month')
    } else {
      let maxDaysInMonth = new Date(yearValue, monthValue, 0).getDate()
      if (parseInt(dayValue, 10) > maxDaysInMonth) {
        addErrorStyles()
        addErrorMessages('day', 'Must be a valid day')
      }
    }
    // years validation
    if (
      isNaN(parseInt(yearValue, 10)) ||
      parseInt(yearValue, 10) > currentYear
    ) {
      addErrorStyles()
      addErrorMessages('year', 'Must be a valid year')
    } else {
      calculateTimeElapsed(dayValue, monthValue, yearValue)
      removeErrorMessages()
      removeErrorStyles()
    }
  }
}

const errorRequiredFieldsMessage = () => {
  formInputs.forEach((inp) => {
    addErrorStyles()

    let errorMessageSpan = createErrorMessageSpan('This field is required')
    inp.insertAdjacentElement('afterend', errorMessageSpan)
    emptyValues()
  })
}

const createErrorMessageSpan = (errorMessage) => {
  let errorMessageSpan = document.createElement('span')
  errorMessageSpan.classList.add('error-message')
  errorMessageSpan.textContent = `${errorMessage}`

  return errorMessageSpan
}

const addErrorMessages = (field, errorMessage) => {
  let input = document.getElementById(field)
  let errorMessageSpan = createErrorMessageSpan(errorMessage)
  input.insertAdjacentElement('afterend', errorMessageSpan)
  emptyValues()
}

const removeErrorMessages = () => {
  formInputs.forEach((inp) => {
    let errorMessageSpan = inp.nextElementSibling
    if (
      errorMessageSpan &&
      errorMessageSpan.classList.contains('error-message')
    )
      errorMessageSpan.remove()
  })
}

const addErrorStyles = () => {
  formInputs.forEach((inp) => {
    let label = inp.previousElementSibling
    inp.classList.add('error')
    label.classList.add('error')
  })
}

const removeErrorStyles = () => {
  formInputs.forEach((inp) => {
    let label = inp.previousElementSibling

    inp.classList.remove('error')
    label.classList.remove('error')
  })
}

const emptyValues = () => {
  daysOutput.textContent = '--'
  monthsOutput.textContent = '--'
  yearsOutput.textContent = '--'
}

const formValues = () => {
  let values = []
  formInputs.forEach((inp) => {
    values.push(inp.value)
  })

  return values
}

const calculateTimeElapsed = (birthday, birthmonth, birthYear) => {
  if (birthday !== '' || birthmonth !== '') {
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()

    // get age
    let elapsedYears = currentYear - birthYear

    // get start of the year
    let startOfYear = new Date(currentYear, 0, 1)

    // get the time difference
    let timeDiff = currentDate - startOfYear

    let elapsedDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    let elapsedMonths = Math.floor(elapsedDays / 30)

    daysOutput.textContent = elapsedDays
    monthsOutput.textContent = elapsedMonths
    yearsOutput.textContent = elapsedYears
  } else {
    removeErrorStyles()
    addErrorStyles()
    addErrorMessages('day', 'Must be a valid day')
    addErrorMessages('month', 'Must be a valid month')
  }
}

// error
// proceeds to calculate even if you dont input value in the month or day
