// Aqui serão criados os eventos de Manipulação de DOM e templates
//import { greeting } from './data.js';
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
        <img class="user-cover-img" src="img/cover-img.jpg">
        <div class="profile-content">
          <img class="user-photo" src="img/mimi.png">
          <div class="pb-info" id="pb-info">
            <p class="user-name">Amanda</p>
            <p class="user-bio">Estudante da Lab</p>
          </div>
        </div>
      </div>
      <div class="feed">
        <div class="create-post-box" id="create-post">
          <textarea class="create-post-input" id="create-post-input" rows="5" placeholder="Como você está se sentindo?"></textarea>
          <div class="create-post-btns">
            <button class="upload-img-btn" id="upload-img-btn"><img class="upload-img-icon" src="img/picture.png"></button>
            <button type="submit" class="post-btn" id="post-btn">Postar</button>
          </div>
        </div>
        <p>lugarzin do coração para os posts</p>
      </div>
    </section>
  `
  container.innerHTML= template

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
  return container;
};
