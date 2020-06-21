import routes from "./routes.js";

const main = document.querySelector("#root");

const validateHash = (hash) => hash === "" ? "login" : hash.replace("#", "");

const renderPage = () => {
    main.innerHTML = "";
    const page = validateHash(window.location.hash);
    main.appendChild(routes[page]);
};

const init = () => {
    window.addEventListener("hashchange", () => {
        renderPage();
    });
};


window.addEventListener("load", () => {
    renderPage();
    init();
});

