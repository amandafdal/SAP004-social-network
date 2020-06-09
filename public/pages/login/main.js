export default () => {
    const container = document.createElement('div');
    container.className = "login-page";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Logo SafeHome">
        <div class="login-container">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe House Logotype">
            <input type="email" class="login-input"  id = "user-email" placeholder="Email">
            <input type="password" class="login-input" id="user-password" placeholder="Senha">
            <button class="login-btn" id="login-btn">Entrar</button>
            <a class="create-acc register-link" href="#register">Cadastre-se</a>
        </div>
    `;
    container.innerHTML = template;

    container.querySelector("#login-btn").addEventListener("click", (event) =>{
        event.preventDefault();
        
        const email = document.getElementById("user-email").value; 
        const password = document.getElementById("user-password").value;
                
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            alert("Você está logado com email e senha!");
          });
        
    })
    
    return container;
}
