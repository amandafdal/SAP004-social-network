import { register } from './data.js';

export default () => {
    const container = document.createElement("div");
    container.className = "login-page";
    const template = `
        <img class="logo" src="img/LOGO-SH-SITE6.png" alt="Safe Home Logo">
        <div class="login-container">
            <img class="logotype" src="img/LOGO-SH-SITE.png" alt="Safe Home Logotype">
<<<<<<< HEAD
            <form id = "register-user">
                <input type="text" class="login-input" id = "user-name" name = "name" placeholder="Nome">
                <input type="email" class="login-input" id = "user-email" placeholder="Email">
                <input type="password" class="login-input" id = "user-password" placeholder="Senha">
                <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha">
                <button class="login-btn" id="create-account-btn">Criar conta</button>
            </form>
=======
            <input type="text" class="login-input" id = "user-name" placeholder="Nome">
            <input type="email" class="login-input" id = "user-email" placeholder="Email">
            <input type="password" class="login-input" id = "user-password" placeholder="Senha">
            <input type="password" class="login-input" id = "user-password-confirm" placeholder="Confirme sua senha">
            <p id="different-password" class="message-error"></p>
            <button class="login-btn" id="create-account-btn" href="#home">Criar conta</button>
>>>>>>> 146cb70519e0161152d2456fd21b6e53c89dcd1a
            <p class="create-acc">Já possui conta?
                <a class="register-link" href="#login">Faça o seu login</a>  
            </p>
        </div>
    `;
    container.innerHTML = template;
<<<<<<< HEAD

    const form = container.querySelector("#register-user");

    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        
        //const name = document.getElementById("user-name").value; 
        const email = document.getElementById("user-email").value; 
=======

    const messageError = (erro) => {
        container.querySelector('#different-password').innerHTML = erro;  

    }

    container.querySelector("#create-account-btn").addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById("user-email").value;
>>>>>>> 146cb70519e0161152d2456fd21b6e53c89dcd1a
        const password = document.getElementById("user-password").value;
        const passwordConfirm = document.getElementById("user-password-confirm").value;


        if (password !== passwordConfirm) {
<<<<<<< HEAD
            alert("As senhas não são iguais!");
        }else{

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: form.name.value
                    })

                    
                    firebase.firestore().collection("users").doc().set({
                        uid: firebase.auth().currentUser.uid,
                        email: document.getElementById("user-email").value,
                        name: form.name.value,
                        minibio: "Escreva sua MiniBio",
                        profileimage: [],
                        coverimage: []                   
                    })


                    window.location.hash = "home";
                })
        }

    })
    return container;
}




 
=======
            container.querySelector('#different-password').innerHTML = "Passwords are not the same";
        } else {
            register(email, password, messageError);
        };
    });
    return container;
};
>>>>>>> 146cb70519e0161152d2456fd21b6e53c89dcd1a
