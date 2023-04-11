// https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
const shuffleBtn = document.querySelector("#new-deck");
const drawBtn = document.querySelector("#draw");
const deckHolder = document.querySelector("#remaining-card");

let deckId;
let computerScore = 0;
let playerScore = 0;

shuffleBtn.addEventListener("click", handleClick);
drawBtn.addEventListener("click", drawCards);

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((deck) => (deckId = deck.deck_id));
  draw.disabled = false;

  if (deckId) {
    shuffleBtn.classList.add("hidden");
    drawBtn.classList.remove("hidden");
    deckHolder.classList.remove("hidden");
  }
}
function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderCards(data);
    });
}
function renderCards(data) {
  document.getElementById("computer-card").src = `${data.cards[0].image}`;
  document.getElementById("player-card").src = `${data.cards[1].image}`;
  deckHolder.textContent = "Remaining cards: " + data.remaining;
  higherScore(data.cards[0].value, data.cards[1].value);
  if (data.remaining === 0) {
    checkWinner(playerScore, computerScore);
  }
}

function higherScore(card1, card2) {
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  if (cards.indexOf(card1) > cards.indexOf(card2)) {
    console.log("computerWon");
    document.getElementById("computer-score").textContent =
      "Computer: " + ++computerScore;
  } else if (cards.indexOf(card1) < cards.indexOf(card2)) {
    console.log("playerWon");
    document.getElementById("player-score").textContent =
      "Player: " + ++playerScore;
  } else if (cards.indexOf(card1) === cards.indexOf(card2)) {
  }
}

function checkWinner(playerScore, computerScore) {
  if (playerScore === computerScore) {
    deckHolder.textContent = "Draw";
    console.log("draw");
  } else if (playerScore > computerScore) {
    deckHolder.textContent = "Player Win!";
    console.log("playerWonnered");
  } else {
    deckHolder.textContent = "Computer Win!";
    console.log("computerWonnered");
  }
}
