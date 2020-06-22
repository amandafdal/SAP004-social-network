import { loginGoogle, login } from './data.js'

export default () => {
    const container = document.createElement('div');
    container.className = "login-page flex-column";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Logo SafeHome">
        <div class="login-container flex-column">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe House Logotype">
            <input type="email" class="login-input"  id = "user-email" placeholder="Email">
            <input type="password" class="login-input" id="user-password" placeholder="Senha">
            <p id="message-error" class="message-error"></p>
            <button class="main-btn" id="login-btn">Entrar</button>
            <p class="create-acc">Ou entrar com...</p>
            <img id="login-google" src="img/login-google.svg" alt="Fazer Login com conta do Google">
            <p class="create-acc">Não possui conta? <a class="create-acc register-link" href="#register">Cadastre-se</a></p>
        </div>
    `;
    container.innerHTML = template;

    const messageError = (erro) => {
        container.querySelector('#message-error').innerHTML = erro;
    };

    container.querySelector("#login-btn").addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById("user-email").value;
        const password = document.getElementById("user-password").value;
        login(email, password, messageError);
    });

    container.querySelector("#login-google").addEventListener("click", (googleLogin) => {
        googleLogin.preventDefault();
        loginGoogle();
    });

    return container;
};
