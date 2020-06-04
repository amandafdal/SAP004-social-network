export default () => {
    const container = document.createElement('div');
    container.className = "login-page";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Logo SafeHome"><img/>
        <div class="login-container">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe House Logotype">
            <input type="email" class="login-input"  id = "user-email" placeholder="Email">
            <input type="password" class="login-input" id="user-password" placeholder="Senha">
            <button class="login-btn" id="login-btn">Entrar</button>
            <p class="create-acc">Não tem uma conta? <a class="register-link" href="/#register">Registre-se</a></p>
        </div>
    `;
    container.innerHTML = template;
    return container;
}