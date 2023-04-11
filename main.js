// https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
const shuffleBtn = document.querySelector("#new-deck");
const drawBtn = document.querySelector("#draw");
const deckHolder = document.querySelector("#remaining-card");

let deckId;
let computerScore = 0;
let playerScore = 0;

shuffleBtn.addEventListener("click", handleClick);
drawBtn.addEventListener("click", drawCards);

async function handleClick() {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const deck = await res.json();
  deckId = deck.deck_id;
  displayRemaining(deck.remaining);
  draw.disabled = false;
  if (deckId) {
    shuffleBtn.classList.add("hidden");
    drawBtn.classList.remove("hidden");
    deckHolder.classList.remove("hidden");
  }
  // .then((res) => res.json())
  // .then((deck) => {
  //   deck = deck;
  //   deckId = deck.deck_id;
  //   displayRemaining(deck.remaining);
  //   draw.disabled = false;
  // })
  // .then(() => {
  //   if (deckId) {
  //     shuffleBtn.classList.add("hidden");
  //     drawBtn.classList.remove("hidden");
  //     deckHolder.classList.remove("hidden");
  //   }
  // });
}
async function drawCards() {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  renderCards(data);
  displayRemaining(data.remaining);
  // .then((data) => {
  //   console.log(data);
  //   renderCards(data);
  //   displayRemaining(data.remaining);
  // });
}
function renderCards(data) {
  document.getElementById("computer-card").src = `${data.cards[0].image}`;
  document.getElementById("player-card").src = `${data.cards[1].image}`;
  higherScore(data.cards[0].value, data.cards[1].value);
  if (data.remaining === 0) {
    checkWinner(playerScore, computerScore);
    draw.disabled = true;
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
    document.getElementById("computer-score").textContent =
      "Computer: " + ++computerScore;
  } else if (cards.indexOf(card1) < cards.indexOf(card2)) {
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

function displayRemaining(data) {
  deckHolder.textContent = `Remaining cards:  ${data}`;
}
