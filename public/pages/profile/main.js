import { createMiniBio } from './data.js';

export default () => {
    const container = document.createElement('div');
    const template = `
      <header>
        <img class="btn-menu" src="img/menu.png">
        <ul class="menu" id="menu">
          <li class="menu-item" id= "menu-item-profile">Perfil</a></li>
          <li class="menu-item" id=sign-out>Sair</li>
        </ul>
        <img class="header-logo" src="img/LOGO-SH-SITE2.png" alt="Logo SafeHome">
      </header>

      <section class="home-page">
        <div class="profile-box" id="profile-box">
            <div class="profile-cover"></div>
            <button class = "edit-profile-button" id = "edit-profile-button" type="button">Editar perfil</button>
            <div class="profile-content">
                <img class="user-photo" src="img/Zai.jpeg"> 
                <div class="pb-info" id="pb-info">

                </div>
            </div>        
        </div>
      </section>
    `
    container.innerHTML = template;
  
    container.querySelector("#sign-out").addEventListener("click", (event) =>{
      event.preventDefault()
      firebase.auth().signOut().then(function() {
          window.location.hash = "login"
      });
    })

    container.querySelector("#menu-item-profile").addEventListener("click",(event)=>{
      event.preventDefault()
      window.location.hash = "profile";
    });

    container.querySelector(".btn-menu").addEventListener("click",(event)=>{
      event.preventDefault()
      container.querySelector(".btn-menu").classList.toggle("hide")
      container.querySelector(".menu").classList.toggle("menu-items-show")
    });

    container.addEventListener("click",(event)=>{
      event.preventDefault()
      if (!event.target.matches(".btn-menu")) {
        container.querySelector(".btn-menu").classList.remove("hide");
        container.querySelector(".menu").classList.remove("menu-items-show");
      };
    });

    

    // FIREBASE

      //MOSTRAR INFOS
    const infoPerfil = container.querySelector("#pb-info");
     
    //const uidCurrent = firebase.auth().currentUser.uid;  
    
    
    function mostrarDados(local){

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const nameCurrent = firebase.auth().currentUser.displayName;
          const emailCurrent = firebase.auth().currentUser.email; 

          let nome = document.createElement("p");
          let email = document.createElement("p");
          let miniBio = document.createElement("p");
    
          nome.className += "user-name";
          email.className += "user-bio";
          miniBio.className += "user-bio";
  
          nome.innerHTML = nameCurrent;
          email.innerHTML = emailCurrent;
          miniBio.innerHTML = "Escreva sua MiniBio";
  
    
          local.appendChild(nome);
          local.appendChild(email);
          local.appendChild(miniBio);
        }
      });
    }

  mostrarDados(infoPerfil);


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      

      firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().name);
            console.log(doc.data().email);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    }
  })
  
    
    
    


      //EDITAR INFOS

    container.querySelector("#edit-profile-button").addEventListener("click",(event)=>{
      event.preventDefault();

      document.getElementById("pb-info").innerHTML = `
      <form method="post" enctype="multipart/form-data">
      <input id = "edit-name" type="text" class="edit-profile-input" placeholder="Digite aqui seu nome"/>
      <br>
      <input id = "edit-email" type="text" class="edit-profile-input" placeholder="Digite aqui seu email"/>
      <br>
      <input id = "mini-bio-value" type="text" class="edit-profile-input" placeholder="Digite aqui sua MiniBio"/>
      <br>
      <input id = "new-password" type="password" class="edit-profile-input" placeholder="Digite aqui sua nova senha"/>
      <br>
      <label for="profile-image">Escolha sua imagem de perfil:</label>
      
      <input id = "profile-image" type="file"  name="profile-image" accept=".jpg, .jpeg, .png"/>
      <br>
      <br>
      <label for="cover-image">Escolha sua imagem de background:</label>
      
      <input id = "cover-image" type="file"  name="cover-image" accept=".jpg, .jpeg, .png"/>
      <br>
      <button id = "save-modifications" class = "save-profile-button" type="button">Salvar modificações</button>
      </form>
      `;  

      document.querySelector("#save-modifications").addEventListener("click", (event)=>{
        event.preventDefault();
        const name = document.querySelector("#edit-name").value;
        const email = document.querySelector("#edit-email").value;
        const minibio = document.querySelector("#mini-bio-value").value;
        const idUserOn = firebase.auth().currentUser.uid;
      })
    });

    

    return container;
  };
  