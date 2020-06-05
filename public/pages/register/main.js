export default () =>{
    const container = document.createElement("div");
    container.className = "login-page";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Safe Home Logo">
        <div class="login-container">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe Home Logotype">
            <input type="text" class="login-input" id = "user-name" placeholder="Nome">
            <input type="email" class="login-input" id = "user-email" placeholder="Email">
            <input type="password" class="login-input" id = "user-password" placeholder="Senha">
            <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha">
            <button class="login" id="create-account-btn" href="#home">Criar conta</button>
            <p class="create-acc">Já possui conta?
                <a class="register-link" href="#login">Faça o seu login</a>  
            </p>        
        </div>
    `;
    container.innerHTML=template
    return container;
}
