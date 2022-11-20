window.onload = function() {
    document.querySelectorAll(".link").forEach(function (a) {
        a.addEventListener("click", resolveComponentLink);
    });
    replaceArticle("main");
}

function resolveComponentLink(event) {
    let a = event.currentTarget;
    let componentName = a.getAttribute("data-ref");
    replaceArticle(componentName);
}

function replaceArticle(componentName) {
    let componentArticle = document.getElementById("component");
    fetch("fragments/" + componentName + ".html")
        .then(response => response.text())
        .then(content => componentArticle.innerHTML = content)
        .then(a => {
            replaceStylesheet(componentName);
            replaceScript(componentName);
        });
}

function replaceStylesheet(componentName) {
    let headElement = document.querySelector("head");
    let componentStylesheet = document.getElementById("componentStylesheet");
    let newComponentStylesheet = document.createElement("link");
    headElement.removeChild(componentStylesheet);
    newComponentStylesheet.id = "componentStylesheet";
    newComponentStylesheet.rel = "stylesheet";
    newComponentStylesheet.href = "css/" + componentName + ".css";
    headElement.appendChild(newComponentStylesheet);
}

function replaceScript(componentName) {
    let componentScript = document.getElementById("componentScript");
    let bodyElement = document.querySelector("body");
    let newComponentScript = document.createElement("script");
    bodyElement.removeChild(componentScript);
    newComponentScript.id = "componentScript";
    newComponentScript.src = "js/" + componentName + ".js";
    newComponentScript.async = false;
    bodyElement.appendChild(newComponentScript);
}