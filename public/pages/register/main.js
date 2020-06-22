import { register } from './data.js';

export default () => {
    const container = document.createElement("div");
    container.className = "login-page flex-column";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Safe Home Logo">
        <div class="login-container flex-column">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe Home Logotype">
            <input type="text" class="login-input" id = "user-name" placeholder="Nome">
            <input type="email" class="login-input" id = "user-email" placeholder="Email">
            <input type="password" class="login-input" id = "user-password" placeholder="Senha">
            <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha">
            <p id="different-password" class="message-error"></p>
            <button class="login-btn" id="create-account-btn" href="#home">Criar conta</button>
            <p class="create-acc">Já possui conta?
                <a class="register-link" href="#login">Faça o seu login</a>  
            </p>
        </div>
    `;
    container.innerHTML = template;

    const messageError = (erro) => {
        container.querySelector('#different-password').innerHTML = erro;  

    }

    container.querySelector("#create-account-btn").addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById("user-email").value;
        const password = document.getElementById("user-password").value;
        const passwordConfirm = document.getElementById("user-password-confirm").value;
        if (password !== passwordConfirm) {
            container.querySelector('#different-password').innerHTML = "Passwords are not the same";
        } else {
            register(email, password, messageError);
        };
    });
    return container;
};
