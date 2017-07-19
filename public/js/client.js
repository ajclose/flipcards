function createDeck(deck) {
  return  `
  <div class="deck" id="${deck._id}">
  <h4>${deck.topic}</h4>
  </div>
  `
}

function createCard(card) {
  return `
  <div class="card" id="${card._id}">
  <h3>${card.question}</h3>
  </div>
  <div class="answer">
  Show answer
  </div>
  `
}

function fetchDecks() {
  deckContainer.textContent = ''

  const topicForm = `
  <form class="addTopic" action="/decks" method="post">
  <fieldset>
  <legend>Add Topic</legend>
  <label for="Topic">Topic</label>
  <input type="text" id="topic" name="topic" value="" placeholder="Enter Topic">
  <input type="submit" name="submit" value="Add Topic">
  </fieldset>
  </form>
  `
  deckContainer.insertAdjacentHTML('afterbegin', topicForm)
  fetch('/api/decks', {
    credentials: 'include'
  })
  .then(function(res) {
    return res.json()
  })
  .then(function(json) {

    const title = '<h3>Select a topic:</h3>'
    deckContainer.insertAdjacentHTML('beforeend', title)

    for (var i = 0; i < json.length; i++) {
      const deck = json[i]
      const html = createDeck(deck)
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
      const topicForm = document.querySelector("form.addTopic")
      if (topicForm) {
          topicForm.addEventListener("submit", function(event) {
            event.preventDefault()
            formData = {
              topic: document.querySelector("#topic").value
            }

            fetch("/api/decks", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(formData),
              headers: {
                "content-type": "application/json"
              }
            })
            .then(function(res) {
              return res.json()
            })
            .then(function(json) {
              fetchDecks()
            })
          })
      }
  })
}


function fetchDeck(id) {
  const deckid = id
  deckContainer.textContent = ''
  const cardForm =  `
    <form class="addCard" action="/api/decks/${id} method="post">
    <fieldset>
    <legend>Add question</legend>
    <label for="question">Question:</label>
    <input type="text" id="question" name="question" value="" placeholder="Enter Question">
    <label for="answer">Answer:</label>
    <input type="text" id="answer" name="answer" value="" placeholder="Enter Answer">
    <input type="submit" name="submit" value="Add Card">
    </fieldset>
    `
    deckContainer.insertAdjacentHTML('afterbegin', cardForm)
  fetch(`/api/decks/${id}`, {
    credentials: 'include'
})
.then(function(res) {
  return res.json()
})
.then(function(json) {
  for (var i = 0; i < json.cards.length; i++) {
    const card = json.cards[i]
    const html = createCard(card)
    deckContainer.insertAdjacentHTML('beforeend', html)
  }
  const answers = document.querySelectorAll('.answer')
    for (var j = 0; j < answers.length; j++) {
      answer = answers[j]
      const answerText = json.cards[j].answer
      answer.addEventListener("click", function(event) {
        event.target.innerHTML = answerText
      })
    }
    const cardForm = document.querySelector("form.addCard")
    if (cardForm) {
        cardForm.addEventListener("submit", function(event) {
          event.preventDefault()
          formData = {
            question: document.querySelector("#question").value,
            answer: document.querySelector("#answer").value
          }

          fetch(`/api/decks/${deckid}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
              "content-type": "application/json"
            }
          })
          .then(function(res) {
            return res.json()
          })
          .then(function(json) {
            fetchDeck(deckid)
          })
        })
      }
  })
}

const deckContainer = document.querySelector('.decks')
if (deckContainer) {
  fetchDecks()
}
