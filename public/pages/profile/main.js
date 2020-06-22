import { updateDisplayName,
         updateUserDoc,
         reauthenticateUser,
         emailUpdate,
         passwordUpdate } from './data.js';


export default () => {
  
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const nameFirestore = doc.data().name;
          const emailFirestore =  doc.data().email;
          const minibioFirestore =  doc.data().minibio;

          showData(nameFirestore, emailFirestore, minibioFirestore);
            
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }
  })
  
    const container = document.createElement("div");
      
    
    // FIREBASE
      //MOSTRAR INFOS

    function showData(nameCurrent, emailCurrent, miniBioCurrent){
      
        container.innerHTML =`
        <header>
            <img class="btn-menu" src="img/menu.png">
            <ul class="menu" id="menu">
              <li class="menu-item" id= "menu-item-home">Home</a></li>
              <li class="menu-item" id= "sign-out">Sair</li>
            </ul>
            <img class="header-logo" src="img/LOGO-SH-SITE2.png" alt="Logo SafeHome">
          </header>
          <section class="home-page-profile">
            <div class="profile-box-profile" id="profile-box">
                <div class="profile-cover-profile"></div>
                <button class = "edit-profile-button main-btn" id = "edit-profile-button" type="button">Editar perfil</button>
                <div class="profile-content-profile">
                    <img class="user-photo-profile" src="img/mimi.png"> 
                    <div class="pb-info-profile" id="pb-info-profile">
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
      /*
        container.addEventListener("click",(event)=>{
          event.preventDefault()
          if (!event.target.matches(".btn-menu")) {
            container.querySelector(".btn-menu").classList.remove("hide");
            container.querySelector(".menu").classList.remove("menu-items-show");
          }
        })
      */

    //EDITAR INFOS
    container.querySelector("#edit-profile-button").addEventListener("click",()=>{
      //event.preventDefault();

      document.getElementById("pb-info-profile").innerHTML = `
      <form>
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
        <button id = "save-modifications" class = " edit-profile-button main-btn">Salvar modificações</button>
        <br>
        <button id = "cancel-changes" class = "edit-profile-button main-btn">Cancelar</button>
      </form>
      `;

    //SALVAR ATUALIZAÇÕES
    document.querySelector("#save-modifications").addEventListener("click", (event)=>{
        event.preventDefault();
        const newName = document.querySelector("#edit-name").value;
        const newNameContainerForUpdateDisplayName = container.querySelector("#edit-name").value;
        const newEmail = document.querySelector("#edit-email").value;
        const newMinibio = document.querySelector("#mini-bio-value").value;
        const profileImage = container.querySelector("#profile-image").value;
        const coverImage = container.querySelector("#cover-image").value;
        const newPassword = document.querySelector("#new-password").value;
        const oldPassword = document.querySelector("#old-password").value;
        const idUserOn = firebase.auth().currentUser.uid;

        //alert(`${profileImage}`)
        //alert(`${coverImage}`



        
        
          /*
          // PARA ATUALIZAR O DISPLAY NAME
          updateDisplayName(newNameContainerForUpdateDisplayName)

          // PARA ATUALIZAR MINIBIO
          updateUserDoc(idUserOn, newName, newEmail, newMinibio)
          
          //PARA REAUTENTICAR O USER 
          const authenticate = reauthenticateUser(oldPassword)
          
          //PARA ATUALIZAR EMAIL 
          emailUpdate(authenticate, newEmail)

          //PARA ATUALIZAR A SENHA 
          passwordUpdate(authenticate, newPassword)

          
          //MOSTRANDO INFORMAÇÕES ATUALIZADAS
          document.getElementById("pb-info-profile").innerHTML =`
            <p class = "user-name" >${newName}</p>
            <p>${newEmail}</p>
            <p>${newMinibio}</p>
            `; 
          */         
    })

      //PARA CANCELAR 
      document.querySelector("#cancel-changes").addEventListener("click", (event)=>{
        event.preventDefault();
          
            firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                const nameFirestore = doc.data().name;
                const emailFirestore =  doc.data().email;
                const miniBioFirestore = doc.data().minibio;
                document.getElementById("pb-info-profile").innerHTML =`
                  <p class = "user-name" >${nameFirestore}</p>
                  <p>${emailFirestore}</p>
                  <p>${miniBioFirestore}</p>
                  `;              
              });
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });
      })
    }) //FECHA FUNCTION DE EDITAR DADOS          
} //FECHA A FUNCTION SHOW DATA  
console.log("perfil")

    return container;
}; //FECHA O EXPORT DEFAULT
  