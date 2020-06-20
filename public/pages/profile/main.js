//import { } from './data.js';

export default () => {
    const container = document.createElement("div");
        
    // FIREBASE
      //MOSTRAR INFOS

    function mostrarDados(nameCurrent, emailCurrent, miniBioCurrent){
         container.innerHTML =`
         <header>
            <img class="btn-menu" src="img/menu.png">
            <ul class="menu" id="menu">
              <li class="menu-item" id= "menu-item-home">Home</a></li>
              <li class="menu-item" id= "sign-out">Sair</li>
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
                    <p class = "user-name" >${nameCurrent}</p>
                    <p>${emailCurrent}</p>
                    <p>${miniBioCurrent}</p>
                    </div>
                </div>        
            </div>
          </section>
        ` ; 
         
        container.querySelector("#sign-out").addEventListener("click", (event) =>{
          event.preventDefault()
          firebase.auth().signOut().then(function() {
              window.location.hash = "login"
          });
        })
      
        container.querySelector("#menu-item-home").addEventListener("click",(event)=>{
          event.preventDefault()
          window.location.hash = "home";
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
      <input id = "new-password" type="text" class="edit-profile-input" placeholder="Digite aqui sua nova senha"/>
      <br>
      <input id = "old-password" type="password" class="edit-profile-confirm" placeholder="Digite aqui sua senha atual para confirmar as mudanças"/>
      <br>
      <br>
      <label for="profile-image">Escolha sua imagem de perfil:</label>
      <br>
      <input id = "profile-image" type="file"  name="profile-image" accept=".jpg, .jpeg, .png"/>
      <br>
      <br>
      <label for="cover-image">Escolha sua imagem de background:</label>
      <br>
      <input id = "cover-image" type="file"  name="cover-image" accept=".jpg, .jpeg, .png"/>
      
      <br>
      <br>
      <button id = "save-modifications" class = "save-profile-button" type="button">Salvar modificações</button>
      <br>
      <button id = "cancel-changes" class = "save-profile-button" type="button">Cancelar</button>
      </form>
      `;


      document.querySelector("#save-modifications").addEventListener("click", (event)=>{
        event.preventDefault();
        const newName = document.querySelector("#edit-name").value;
        const newEmail = document.querySelector("#edit-email").value;
        const newMinibio = document.querySelector("#mini-bio-value").value;
        const newPassword = document.querySelector("#new-password").value;
        const oldPassword = document.querySelector("#old-password").value;
        //const idUserOn = firebase.auth().currentUser.uid;

            
            // PARA ATUALIZAR O displayName:  OK
            firebase.auth().currentUser.updateProfile({
              displayName: newName
            })
            
            //PARA ATUALIZAR EMAIL: OK       
            const user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
              user.email, 
              oldPassword
            );
            
            firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
                firebase.auth().currentUser.updateEmail(newEmail).then(function() {
                })
            })          
            
          
           // PARA ATUALIZAR MINIBIO: OK
           
           
           firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid)
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  
                  firebase.firestore().collection("users").doc(doc.id).update({
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
                    
                });
              })
              .catch(function(error) {
                console.log("Error getting documents: ", error);
              });
            }
          })      

            
            document.getElementById("pb-info").innerHTML =`
            <p class = "user-name" >${newName}</p>
            <p>${newEmail}</p>
            <p>${newMinibio}</p>
            `;
      })

      document.querySelector("#cancel-changes").addEventListener("click", (event)=>{
        event.preventDefault();


        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                const nameFirestore = doc.data().name;
                const emailFirestore =  doc.data().email;
                const miniBioFirestore = doc.data().minibio;
                document.getElementById("pb-info").innerHTML =`
                  <p class = "user-name" >${nameFirestore}</p>
                  <p>${emailFirestore}</p>
                  <p>${miniBioFirestore}</p>
                  `;              
                  
              });
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });
          }
        })

      })

    });
  
            
} //FECHA A FUNCTION MOSTRAR DADOS

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      //const nameUser = firebase.auth().currentUser.displayName;
      //const emailUser = firebase.auth().currentUser.email;

      firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const nameFirestore = doc.data().name;
          const emailFirestore =  doc.data().email;
          const minibioFirestore =  doc.data().minibio;

          mostrarDados(nameFirestore, emailFirestore, minibioFirestore);
            
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }
  })   

    return container;
  };
  