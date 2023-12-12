const articles = document.querySelector('.articles')
const firstArticle = document.querySelector('.articles .article:first-of-type')

const answer = firstArticle.querySelector('.answer')
const minusIcon = firstArticle.querySelector('.question img')

answer.classList.toggle('show-answer')
minusIcon.src = 'assets/images/icon-minus.svg'

articles.addEventListener('click', (e) => {
  const question = e.target.closest('.question')

  if (question) {
    const article = question.closest('.article')
    const answer = article.querySelector('.answer')
    const minusIcon = question.querySelector('img')

    answer.classList.toggle('show-answer')
    minusIcon.src = answer.classList.contains('show-answer')
      ? 'assets/images/icon-minus.svg'
      : 'assets/images/icon-plus.svg'
  }
})
