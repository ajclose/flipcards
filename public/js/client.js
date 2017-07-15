function fetchDecks() {
  deckContainer.textContent = ''
  fetch('/api/decks', {
    credentials: 'include'
  })
  .then(function(res) {
    return res.json()
  })
  .then(function(json) {
    for (var i = 0; i < json.length; i++) {
      const deck = json[i]
      const html = `
      <div class="deck" id="${deck._id}">
      <h3>${deck.topic}</h3>
      </div>
      `

      deckContainer.insertAdjacentHTML('beforeend', html)
    }

    const decks = document.querySelectorAll(".deck")
    for (var i = 0; i < decks.length; i++) {
      const deck = decks[i]
      deck.addEventListener("click", function(event) {
        const deckId = deck.id
        fetchDeck(deckId)
      })
      }
  })
}


function fetchDeck(id) {
  deckContainer.textContent = ''
  fetch(`/api/decks/${id}`, {
    credentials: 'include'
})
.then(function(res) {
  return res.json()
})
.then(function(json) {
  for (var i = 0; i < json.cards.length; i++) {
    const card = json.cards[i]

    const html = `
    <div class="card" id="${card._id}">
    <h3>${card.question}</h3>
    </div>
    `

    deckContainer.insertAdjacentHTML('beforeend', html)
  }
})
}


const deckContainer = document.querySelector('.decks')
if (deckContainer) {
  fetchDecks()
}
