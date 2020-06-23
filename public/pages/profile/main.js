import { updateDisplayName,
         reauthenticateUser,
         emailUpdate,
         passwordUpdate,
         updateUserDocName,
         updateUserDocEmail,
         updateUserDocMiniBio } from './data.js';


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
                    <div class="pb-info-profile" id="edit-info-profile"></div>
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
    container.querySelector("#edit-profile-button").addEventListener("click",(event)=>{
      event.preventDefault();

      document.getElementById("edit-info-profile").innerHTML = "";

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
        <div id = "warning-require-email" class="warning"></div>
        <div id = "warning-require-password" class="warning"></div>
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
        <div id = "warning"></div>
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

        const authenticate = reauthenticateUser(oldPassword);

        //alert(`${profileImage}`)
        //alert(`${coverImage}`

        /*
        const validationArray = [];

        if(newEmail !== "" && oldPassword === ""){
          document.querySelector("#warning-require-email").innerHTML = "Atenção: insira senha atual para editar o email!";
          validationArray.push(false);
        }else{
          if(newEmail !== ""){
            emailUpdate(authenticate, newEmail)
            updateUserDocEmail(idUserOn, newEmail)
            validationArray.push(true);
          }
        }

        if(newPassword !== "" && oldPassword === ""){
          document.querySelector("#warning-require-password").innerHTML = "Atenção: insira senha atual para editar a senha!";
          validationArray.push(false);
        }else{
          if(newPassword !== ""){
            passwordUpdate(authenticate, newPassword)
            validationArray.push(true);
          }
        }

        if(newNameContainerForUpdateDisplayName !== ""){
          updateDisplayName(newNameContainerForUpdateDisplayName)
          updateUserDocName(idUserOn, newName)
          validationArray.push(true);
        }else{
          validationArray.push(false);
        }

        if(newMinibio !== ""){
          updateUserDocMiniBio(idUserOn, newMinibio)
          validationArray.push(true);
        }else{
          validationArray.push(false);
        }

                         
        const status = validationArray.indexOf(true);
        if(status == -1){
          document.querySelector("#warning").innerHTML = "Atenção: todos o campos estão em branco ou campos necessários não foram preenchidos! Para fazer atualizações insira dados nos respectivos campos acima!";
        }else{

          document.getElementById("pb-info-profile").innerHTML = "";

          if(newNameContainerForUpdateDisplayName !== ""){
            document.getElementById("edit-info-profile").innerHTML +=`
            <p class = "user-name" >${newNameContainerForUpdateDisplayName}</p>
            `;
          }else{
            document.getElementById("edit-info-profile").innerHTML +=`
            <p class = "user-name" >${firebase.auth().currentUser.displayName}</p>
            `;
          }

          if(newEmail !== ""){
            document.getElementById("edit-info-profile").innerHTML +=`
            <p class = "user-name" >${newEmail}</p>
            `;
          }else{
            document.getElementById("edit-info-profile").innerHTML +=`
            <p>${firebase.auth().currentUser.email}</p>
            `;
          }

          if(newMinibio !== ""){
            document.getElementById("edit-info-profile").innerHTML +=`
            <p>${newMinibio}</p>
            `;
          }else{
            document.getElementById("edit-info-profile").innerHTML +=`
            <p>${miniBioCurrent}</p>
            `;
          }
        } 
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
  