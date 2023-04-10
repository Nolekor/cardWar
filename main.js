// https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
const shuffle = document.querySelector("#new-deck");
const draw = document.querySelector("#draw");
let deckId;

shuffle.addEventListener("click", handleClick);
draw.addEventListener("click", drawCards);

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((deck) => (deckId = deck.deck_id));
  draw.disabled = false;
}
function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((cards) => {
      console.log(cards);
      cards.cards.map((card) => {
        let html = `
      <img src="${card.images.svg}">
      `;
        document.getElementById("app").innerHTML += html;
      });
    });
}
