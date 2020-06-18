import routes from "./routes.js";

const main = document.querySelector("#root");

const init = () => {
    window.addEventListener("hashchange", () => {
        renderPage();
    });
};

const renderPage = () => {
    main.innerHTML = "";
    const page = validateHash(window.location.hash);
    main.appendChild(routes[page]);
};

const validateHash = (hash) => hash === "" ? "login" : hash.replace("#", "");


window.addEventListener("load", () => {
    renderPage();
    init();
<<<<<<< HEAD
})
=======
});

>>>>>>> 146cb70519e0161152d2456fd21b6e53c89dcd1a
