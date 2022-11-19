var CARD_TYPES = ["bastos1", "bastos12", "copas1", "copas12", "espadas1", "espadas12", "oros1", "oros12"];

var gameDuration;
var cardNum;

var time;
var points;

var cards;
var cardsLeft;

var firstSelectedCard;
var secondSelectedCard;

var pid;

function Card(type, image) {
    this["type"] = type;
    this["image"] = image;
    this["reverse"] = "img/reverso.jpg";
}

init();
document.getElementById("reiniciarBtn").addEventListener("click", function () {
    init();
    let endModalElement = document.getElementById("modalFinal");
    $(endModalElement).modal("hide");
});

function init() {
    points = 0;
    gameDuration = localStorage.getItem("duracionJuego") != null
        ? localStorage.getItem("duracionJuego")
        : 60;
    cardNum = localStorage.getItem("numCartas")
        ? localStorage.getItem("numCartas")
        : 20;
    cardsLeft = cardNum;
    createCards();
    paintCards();
    initTimer();
}

function initTimer() {
    time = gameDuration;
    let timeInputElement = document.getElementById("marcadorTiempo");
    pid = setInterval(function() {
        time--;
        timeInputElement.value = time;
        if(time === 0) {
            clearInterval(pid);
            pid = undefined;
        }
    }, 1000);
}

function createCards() {
    cards = [];
    for(let i = 0; i < cardNum/2; i++) {
        let index = i % CARD_TYPES.length;
        let cardType = CARD_TYPES[index];
        cards.push(new Card(cardType, "img/"+cardType+".jpg"));
        cards.push(new Card(cardType, "img/"+cardType+".jpg"));
    }
    cards = cards.sort((a, b) => Math.random() - 0.3)
}

function paintCards() {
    let deck = document.getElementById("tablero");
    deck.innerHTML = "";
    let i = 0;
    for(let card of cards) {
        let cardElem = new Image(80, 120);
        cardElem.src = card.reverse;
        cardElem.setAttribute("data-index",i.toString());
        cardElem.classList.add("game_card");
        cardElem.addEventListener("click", handleCardClick);
        deck.appendChild(cardElem);
        i++;
    }
}

function handleCardClick(event) {
    if(pid !== undefined) {
        selectCard(event);
    }
}

function selectCard(event) {
    let cardElement = event.currentTarget;
    let selectedCard = cards[cardElement.getAttribute("data-index")];
    if(firstSelectedCard === undefined) {
        firstSelectedCard = cardElement;
        cardElement.src = selectedCard.image;
    } else if(secondSelectedCard === undefined) {
        secondSelectedCard = cardElement;
        cardElement.src = selectedCard.image;
        checkCardsMatch();
    }
}

function checkCardsMatch() {
    let firstCard = cards[firstSelectedCard.getAttribute("data-index")];
    let secondCard = cards[secondSelectedCard.getAttribute("data-index")];
    let pointInputElem = document.getElementById("marcadorPuntos");
    if(firstCard.type === secondCard.type) {
        points += 15;
        cardsLeft -= 2;
        resetSelectedCards(true);
        if(cardsLeft === 0) {
            handleGameEnd();
        }
    } else {
        console.log("No match");
        points -= 5;
        setTimeout(function(){resetSelectedCards(false)}, 700);
    }
    pointInputElem.value = points;
}

function resetSelectedCards(match) {
    let firstCard = cards[firstSelectedCard.getAttribute("data-index")];
    let secondCard = cards[secondSelectedCard.getAttribute("data-index")];
    if(!match) {
        firstSelectedCard.src = firstCard.reverse;
        secondSelectedCard.src = secondCard.reverse;
    } else {
        firstSelectedCard.removeEventListener("click", handleCardClick);
        secondSelectedCard.removeEventListener("click", handleCardClick);
    }
    firstSelectedCard = undefined;
    secondSelectedCard = undefined;
}

function handleGameEnd() {
    let endModalElement = document.getElementById("modalFinal");
    let timeModalElement = document.getElementById("modalTiempo");
    let pointModalElem = document.getElementById("modalPuntuacion");
    clearInterval(pid);
    pid = undefined;
    if(cardNum === 26) {
        points += 25;
    } else if(cardNum === 32) {
        points += 50;
    }

    switch (gameDuration) {
        case 60:
            points += 100;
            break;
        case 90:
            points += 75;
            break;
        case 120:
            points += 50;
            break;
        case 150:
            points += 25;
            break;
        default:
            break;
    }
    timeModalElement.innerHTML = (gameDuration - time).toString();
    pointModalElem.innerHTML = points;
    $(endModalElement).modal("show");
}