//import { } from './data.js';

export default () => {
    const container = document.createElement("div");
    const template = `
         <header>
            <img class="btn-menu-profile" src="img/menu.png">
            <ul class="menu-profile" id="menu">
              <li class="menu-item-profile" id= "menu-item-profile">Perfil</a></li>
              <li class="menu-item-profile" id= "sign-out">Sair</li>
            </ul>
            <img class="header-logo-profile" src="img/LOGO-SH-SITE2.png" alt="Logo SafeHome">
          </header>
    
          <section class="home-page-profile">
            <div class="profile-box-profile" id="profile-box">
                <div class="profile-cover-profile" ></div>
                <button class = "edit-profile-button" id = "edit-profile-button" type="button">Editar perfil</button>
                <div class="profile-content-profile">
                    <img class="user-photo-profile" src="img/Zai.jpeg"> 
                    <div class="pb-info-profile" id="pb-info">
    
                    </div>
                </div>        
            </div>
          </section>
        ` ;


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

    container.querySelector(".btn-menu-profile").addEventListener("click",(event)=>{
      event.preventDefault()
      container.querySelector(".btn-menu-profile").classList.toggle("hide")
      container.querySelector(".menu-profile").classList.toggle("menu-items-show")
    });

    container.addEventListener("click",(event)=>{
      event.preventDefault()
      if (!event.target.matches(".btn-menu-profile")) {
        container.querySelector(".btn-menu-profile").classList.remove("hide");
        container.querySelector(".menu-profile").classList.remove("menu-items-show");
      };
    });

    

    // FIREBASE

      //MOSTRAR INFOS

    //const uidCurrent = firebase.auth().currentUser.uid;  

    const infoPerfil = container.querySelector("#pb-info");   
    
    function mostrarDados(local, nameCurrent, emailCurrent){

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //const nameCurrent = firebase.auth().currentUser.displayName;
          //const emailCurrent = firebase.auth().currentUser.email; 

          let nome = document.createElement("p");
          let email = document.createElement("p");
          let miniBio = document.createElement("p");
      
          nome.className += "user-name-profile";

          nome.innerHTML = nameCurrent;
          email.innerHTML = emailCurrent;
          miniBio.innerHTML = "Escreva sua MiniBio";
    
          local.appendChild(nome);
          local.appendChild(email);
          local.appendChild(miniBio);
        }
      });
    }

  


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const nameFirestore = doc.data().name;
          const emailFirestore =  doc.data().email;
          mostrarDados(infoPerfil, nameFirestore, emailFirestore);
            
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
      <input id = "edit-email" type="email" class="edit-profile-input" placeholder="Digite aqui seu email"/>
      <br>
      <input id = "mini-bio-value" type="text" class="edit-profile-input" placeholder="Digite aqui sua MiniBio"/>
      <br>
      <input id = "new-password" type="password" class="edit-profile-input" placeholder="Digite aqui sua nova senha"/>
      <!--
      <br>
      <label for="profile-image">Escolha sua imagem de perfil:</label>
      <input id = "profile-image" type="file"  name="profile-image" accept=".jpg, .jpeg, .png"/>
      <br>
      
      <label for="cover-image">Escolha sua imagem de background:</label>
      <input id = "cover-image" type="file"  name="cover-image" accept=".jpg, .jpeg, .png"/>
      -->
      <br>
      <button id = "save-modifications" class = "save-profile-button" type="button">Salvar modificações</button>
      </form>
      `;


      document.querySelector("#save-modifications").addEventListener("click", (event)=>{
        event.preventDefault();
        const newName = document.querySelector("#edit-name").value;
        const newEmail = document.querySelector("#edit-email").value;
        const newMinibio = document.querySelector("#mini-bio-value").value;
        //const idUserOn = firebase.auth().currentUser.uid;


            // PARA ATUALIZAR O displayName:  OK
            firebase.auth().currentUser.updateProfile({
              displayName: newName
            })
            
            /* PARA ATUALIZAR EMAIL: PERGUNTAR
            var credential;
            
            firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
                firebase.auth().currentUser.updateEmail(newEmail).then(function() {
                })
            }) 
            */  
         
           // PARA ATUALIZAR MINIBIO: como selecionar o documento que armazena os dados do currentUser?
           

           firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  
                  console.log(docRef.id)
                    
                });
              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
              });
            }
          })


           /*
           firebase.firestore().collection("users").doc(docRef.id).update({
            name: newName,
            email: newEmail,
            minibio: newMinibio
           })
           .then(function() {
               console.log("Document successfully updated!");
           })
           .catch(function(error) {
               console.error("Error updating document: ", error);
           });
           */
            
            document.getElementById("pb-info").innerHTML =`
            <p class = "user-name" >${newName}</p>
            <p>${newEmail}</p>
            <p>${newMinibio}</p>
            `;

      })
    });

    

    return container;
  };
  