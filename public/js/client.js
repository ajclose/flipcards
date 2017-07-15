function fetchDecks() {
  document.querySelector('.decks').textContent = ''
  fetch('/api/decks', {
    credentials: 'include'
  })
  .then(function(res) {
    return res.json
  })
  .then(function(json) {
    for (var i = 0; i < json.length; i++) {
      const deck = json[i]
      const html = `
      <h3>${deck.topic}</h3>
      `

      document.querySelector('.decks').insertAdjacentHTML('beforeend', html)
    }
  })
}

const deckContainer = document.querySelector('.decks')
if (deckContainer) {
  fetchDecks()
}
