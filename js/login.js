var error = false;

init();

function init() {
    let formElement = document.querySelector("form");
    formElement.addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.getElementById("usuario").value;
        let password = document.getElementById("clave").value;
        //handle login
    });
}