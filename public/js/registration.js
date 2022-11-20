var errorMsg;

init();

function init() {
    let formElement = document.querySelector("form");
    formElement.addEventListener("submit", function(event) {
        event.preventDefault();
        let password = document.getElementById("clave").value;
        let passwordRpt = document.getElementById("claveRpt").value;
        if(password !== passwordRpt && errorMsg === undefined) {
            errorMsg = document.createElement("div");
            errorMsg.classList.add("alert");
            errorMsg.classList.add("alert-danger");
            errorMsg.innerHTML = "Las contraseñas deben ser iguales..."
            formElement.appendChild(errorMsg);
        } else if(password === passwordRpt) {
            if(errorMsg !== undefined) {
                formElement.removeChild(errorMsg);
            }
            //handle registration
        }
    });
}