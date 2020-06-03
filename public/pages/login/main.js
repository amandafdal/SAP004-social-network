export default () => {
    const container = document.createElement('div');
    container.className = "login-page";
    const template = `
        <div>
            <img src="img/LOGO-SH-SITE6.png" alt="Logo SafeHome"><img/>
        </div>
        <div class="login-container">
            <img src="img/LOGO-SH-SITE.png" alt="Safe House Logotype"><br>
            <input type="email" class="login-input"  id = "user-email" placeholder="Email"><br>
            <input type="password" class="login-input" id="user-password" placeholder="Senha"><br>
            <button class="login" id="login-btn">Entrar</button>
        </div>
    `;
    container.innerHTML = template;
    return container;
}