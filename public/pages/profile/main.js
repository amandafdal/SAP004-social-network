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
            <button class = "edit-profile-button" type="button">Editar perfil</button>
            <div class="profile-content">
                <img class="user-photo" src="img/mimi.png"> 
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
      window.location.hash = "profile"
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
   
    const db = firebase.firestore();
    //db.settings({ timestampsInSnapshots: true });
    
    const infoPerfil = container.querySelector("#pb-info");
    
    function mostrarDados(doc){
      let nome = document.createElement("p");
      let email = document.createElement("p");
      let miniBio = document.createElement("p");
    
      nome.className += "user-name";
      email.className += "user-bio";
      miniBio.className += "user-bio";

      infoPerfil.setAttribute("data-id", doc.id);
      nome.innerHTML = firebase.auth().currentUser.displayName;
      email.innerHTML = firebase.auth().currentUser.email;
      miniBio.innerHTML = "Escreva sua MiniBio";

    
      infoPerfil.appendChild(nome);
      infoPerfil.appendChild(email);
      infoPerfil.appendChild(miniBio);
}
    
    db.collection("usuarios").get().then( (snapshot) => {
    snapshot.docs.forEach(doc => {
      mostrarDados(doc);
       })
    })


    return container;
  };
  