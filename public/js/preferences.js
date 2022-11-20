init();

function init() {
    let formElement = document.querySelector("form");
    formElement.addEventListener("submit", function(event) {
        event.preventDefault();
        let durationElement = document.getElementById("duracionJuego");
        let cardNumElement = document.getElementById("numCartas");
        localStorage.setItem("duracionJuego", durationElement.value);
        localStorage.setItem("numCartas", cardNumElement.value);
        replaceArticle("game");
    });
}