const togglePrice = document.getElementById('togglePrice')
const prices = document.querySelectorAll('.price')
const circle = togglePrice.querySelector('.circle')
let isMonthly = true

togglePrice.addEventListener('click', togglePricing)

function togglePricing() {
  for (let i = 0; i < prices.length; i++) {
    const value = Object.keys(annually[i])[0]
    if (isMonthly) {
      circle.classList.add('toggled')
      prices[i].innerText = `$${annually[i][value]}`
    } else {
      prices[i].innerText = `$${monthly[i][value]}`
      circle.classList.remove('toggled')
    }
  }
  isMonthly = !isMonthly
}

let monthly = [
  {
    basic: 19.99,
  },
  {
    professional: 24.99,
  },
  {
    master: 39.99,
  },
]

let annually = [
  {
    basic: 199.99,
  },
  {
    professional: 249.99,
  },
  {
    master: 399.99,
  },
]
