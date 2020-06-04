export default () =>{
    const container = document.createElement("div");
    container.className = "login-page";
    const template = `
        <div>
            <img src="img/LOGO-SH-SITE6.png" alt="Safe Home Logo">
        </div>
        <div class="login-container">
            <img src="img/LOGO-SH-SITE.png" alt="Safe Home Logotype"><br>
            <input type="text" class="login-input" id = "user-name" placeholder="Nome"><br>
            <input type="email" class="login-input" id = "user-email" placeholder="Email"><br>
            <input type="password" class="login-input" id = "user-password" placeholder="Senha"><br>
            <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha"><br>
            <button class="login" id="create-account-btn" href="#home">Criar conta</button>
            <p class="create-acc">Já possui conta?
                <a class="register-link" href="#login">Faça o seu login</a>  
            </p>        
        </div>
    `;
    container.innerHTML=template
    return container;
}