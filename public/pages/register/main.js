/*
export default () =>{
    const container = document.createElement("div");
    container.className = "login-page";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Safe Home Logo">
        <div class="login-container">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe Home Logotype">
            
                <input type="text" class="login-input" id = "user-name" name = "name" placeholder="Nome">
                <input type="email" class="login-input" id = "user-email" placeholder="Email">
                <input type="password" class="login-input" id = "user-password" placeholder="Senha">
                <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha">
                <button class="login-btn" id="create-account-btn">Criar conta</button>
            
            <p id="different-password" class="message-error"></p>
            <p class="create-acc">Já possui conta?
                <a class="register-link" href="#login">Faça o seu login</a>  
            </p>
        </div>
    `;
    container.innerHTML = template;

    const messageError = (erro) => {
        container.querySelector('#different-password').innerHTML = erro;  
    }
    
    container.querySelector("#create-account-btn").addEventListener("click", (event) =>{
        event.preventDefault();
        
        const nameRegister = container.querySelector("#user-name").value; 
        const emailRegister = container.querySelector("#user-email").value; 
        const passwordRegister = container.querySelector("#user-password").value;
        const passwordConfirmRegister = container.querySelector("#user-password-confirm").value;
        
        if (passwordRegister !== passwordConfirmRegister) {
            document.getElementById("different-password").innerHTML = "Passwords are not the same";
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: nameRegister
                    })

                    firebase.firestore().collection("users").doc().set({
                        uid: firebase.auth().currentUser.uid,
                        email: container.querySelector("#user-email").value,
                        name: container.querySelector("#user-name").value,
                        minibio: "Escreva sua MiniBio",
                        profileimage: [],
                        coverimage: []             
                    }) 

                    window.location.hash = "home";  
                }) 
                .catch(function (error) {
                    messageError(error.message);
                })         
        } 
        
    })
    return container;
}
*/ 

import { register } from './data.js';
export default () =>{
    const container = document.createElement("div");
    container.className = "login-page";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Safe Home Logo">
        <div class="login-container">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe Home Logotype">
            
                <input type="text" class="login-input" id = "user-name" name = "name" placeholder="Nome">
                <input type="email" class="login-input" id = "user-email" placeholder="Email">
                <input type="password" class="login-input" id = "user-password" placeholder="Senha">
                <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha">
                <button class="login-btn" id="create-account-btn">Criar conta</button>
            
            <p id="different-password" class="message-error"></p>
            <p class="create-acc">Já possui conta?
                <a class="register-link" href="#login">Faça o seu login</a>  
            </p>
        </div>
    `;
    container.innerHTML = template;
    
    const messageError = (erro) => {
        container.querySelector('#different-password').innerHTML = erro;  
    }
    
    
    container.querySelector("#create-account-btn").addEventListener("click", (event) =>{
        event.preventDefault();
        const nameRegister = document.querySelector("#user-name").value; 
        const emailRegister = document.querySelector("#user-email").value; 
        const passwordRegister = document.querySelector("#user-password").value;
        const passwordConfirmRegister = document.querySelector("#user-password-confirm").value;
        
        if (passwordRegister !== passwordConfirmRegister) {
            document.getElementById("different-password").innerHTML = "Passwords are not the same";
            
        }else{
            register(emailRegister, passwordRegister, nameRegister, messageError);
        } 
        
        
    })
    return container;
}
