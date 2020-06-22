import { createPost, watchPosts, logout, deletePost, editPost, updateLike } from './data.js';

export default () => {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        const nameAuth = firebase.auth().currentUser.displayName;
        const emailAuth = firebase.auth().currentUser.email;

        if(typeof nameAuth !== 'string'){
          showData("Que bom ter você conosco!", emailAuth) 
        }else{
          showData(nameAuth, emailAuth) 
        }   
    }
  })


const container = document.createElement('div');
function showData(nameUser, emailUser){  
const template = `
    <header>
      <img class="btn-menu" src="img/menu.png">
      <ul class="menu" id="menu">
        <li class="menu-item" id= "menu-item-profile">Perfil</a></li>
        <li class="menu-item" id=sign-out>Sair</li>
      </ul>
      <img class="header-logo" src="img/LOGO-SH-SITE2.png" alt="Logo SafeHome">
    </header>
    <section class="home-page flex-column">
      <div class="profile-box" id="profile-box">
        <img class="user-cover-img" src="img/cover-img.jpg">
        <div class="profile-content">
          <img class="user-photo" src="img/mimi.png">
          <div class="pb-info" id="pb-info">
          <p class = "user-name" >${nameUser}</p>
          <p>${emailUser}</p>
          </div>
        </div>
      </div>
      <div class="feed flex-column">
        <div class="create-post-box flex-column" id="create-post">
          <textarea style="resize: none" class="create-post-input" id="create-post-input" rows="5" placeholder="Como você está se sentindo?"></textarea>
          <div class="create-post-btns">
            <button type="submit" class="post-btn" id="post-btn">Postar</button>
          </div>
        </div>
        <div class="posts-container" id="posts-container"></div>
      </div>
    </section>
  `;
  container.innerHTML = template;
  const clearPosts = ()=> postContainer.innerHTML = "";
  
  const postBtn = container.querySelector("#post-btn");
  const postContainer = container.querySelector("#posts-container");
  const textPost = container.querySelector("#create-post-input");

  const displayPost = (newPost) => {
    const postTemplate = document.createElement("div");
    postTemplate.classList.add("post");
    postTemplate.classList.add("flex-column");
    postTemplate.innerHTML = `
      <div class = "color-post template-post position-post">
        <div class = "post-top">
          <span class="name-post">${newPost.data().name}</span>
          <img class = "icons" src="./img/publicit2.svg" alt = "Publicidade do Post" />
        </div>
        <img
          class = "icons"
          src = "./img/delete.svg"
          alt = "Deletar Post"
          id = "delete-btn"
          data-id = "${newPost.id}"
        />
      </div>
      <div class="template-post post-middle">
        <textarea disabled style="resize: none" rows="4" class="edit-post-input" 
          id="text-post" data-id="${newPost.id}"> ${newPost.data().text}
        </textarea>
      </div>
      <div class = "color-post template-post position-post">
        <div class = "position-post">
          <img class = "icons" src = "./img/like.svg" alt = "Like" 
          id="like" data-id="${newPost.id}"/>
          <span class="name-post">${newPost.data().likes}</span>
        </div>
        <img id = "edit-btn" data-id="${newPost.id}" class = "icons icon-edit" 
          src = "./img/edit.svg" alt = "Editar Post" />
        <img id="save-edit-btn" data-id="${newPost.id}" class="hide save-icon" 
          src="./img/checkmark.svg" alt = "Salvar edição"/>
      </div>
    </div>
    `;
    postContainer.appendChild(postTemplate);

    const deleteBtn = postTemplate.querySelector(`#delete-btn[data-id="${newPost.id}"]`);
    const editBtn = postTemplate.querySelector(`#edit-btn[data-id="${newPost.id}"]`);
    const saveEditBtn = postTemplate.querySelector(`#save-edit-btn[data-id="${newPost.id}"]`);
    const editInput = postTemplate.querySelector(`#text-post[data-id="${newPost.id}"]`);
    const likeBtn = postTemplate.querySelector(`#like[data-id="${newPost.id}"]`);

    const validateUser = ()=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user){        
          if (newPost.data().user !== firebase.auth().currentUser.uid) {
          deleteBtn.style.display = "none";
          editBtn.style.display = "none";
        }else{
          deleteBtn.style.display = "inline-block";
          editBtn.style.display = "inline-block";
        }
      }
      });
    }
    validateUser()

    editBtn.addEventListener("click", (event) =>{
      event.preventDefault();
      saveEditBtn.style.display = "inline-block";
      editBtn.style.display = "none";
      editInput.removeAttribute('disabled');
    })

    saveEditBtn.addEventListener("click", (event) =>{
      event.preventDefault();
      const editId = saveEditBtn.dataset.id;
      const editPostValue = editInput.value;
      clearPosts();
      editPost(editId, editPostValue);
      saveEditBtn.style.display = "none";
      editBtn.style.display = "inline-block";
      editInput.setAttribute('disabled', true);
    }); 
    
    deleteBtn.addEventListener("click", (event) =>{
      event.preventDefault();
      const deleteId = deleteBtn.dataset.id;
      clearPosts();
      deletePost(deleteId);
    });

    //verificar como curtir uma unica vez
    likeBtn.addEventListener("click", (event) =>{
      event.preventDefault();
      const likeId = likeBtn.dataset.id;
      const likesAmount = newPost.data().likes
      if (newPost.data().user !== firebase.auth().currentUser.uid) {
        clearPosts(); 
        updateLike(likeId, likesAmount, 1);
      }
    })
  };
  postBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const post = {
      user: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName,
      text: textPost.value,
      likes: 0,
      date: new Date()
    };
    clearPosts();
    createPost(post);
    textPost.value = "";
  })
  watchPosts(displayPost)

  container.querySelector("#sign-out").addEventListener("click", (event) => {
    event.preventDefault()
    logout();
  })

  container.querySelector("#menu-item-profile").addEventListener("click", (event) => {
    event.preventDefault()
    window.location.hash = "profile"
  });

  container.querySelector(".btn-menu").addEventListener("click", (event) => {
    event.preventDefault()
    container.querySelector(".btn-menu").classList.toggle("hide")
    container.querySelector(".menu").classList.toggle("menu-items-show")
  });
  container.addEventListener("click", (event) => {
    event.preventDefault()
    if (!event.target.matches(".btn-menu")) {
      container.querySelector(".btn-menu").classList.remove("hide");
      container.querySelector(".menu").classList.remove("menu-items-show");
    };
  });
}
  return container;
};