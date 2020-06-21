import { createPost, watchPosts, logout, deletePost, editPost } from './data.js';

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
  const template = /* html */ `
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
          <p class = "user-name" >${nameUser}</p>
          <p>${emailUser}</p>
          </div>
        </div>
      </div>
      <div class="feed">
        <div class="create-post-box" id="create-post">
          <textarea style="resize: none" class="create-post-input" id="create-post-input" rows="5" placeholder="Como você está se sentindo?"></textarea>
          <div class="create-post-btns">
            <button class="upload-img-btn" id="upload-img-btn"><img class="upload-img-icon" src="img/picture.png"></button>
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
    postTemplate.innerHTML = /* html */`
      <div class="template-post post-top">
        <span>${newPost.data().name}</span>
        <img class="icons" src="./img/publicit2.svg" alt="Publicidade do Post" />
        <img
          class="icons"
          src="./img/delete.svg"
          alt="Deletar Post"
          id="delete-btn"
          data-id="${newPost.id}"
        />
      </div>
      <div class="template-post post-middle">
        <textarea disabled style="resize: none" id="text-post" data-id="${newPost.id}">
          ${newPost.data().text}
        </textarea>
        <button id="save-edit-btn" data-id="${newPost.id}" class="hide">Save</button>
      </div>
      <div class="template-post post-botton">
        <img class="icons" src="./img/like.svg" alt="Like" />
        <img class="icons" src="./img/comment.svg" alt="Comentar Post" />
        <img id="edit-btn" data-id="${newPost.id}" class="icons" src="./img/edit.svg" alt="Editar Post" />
      </div>
    </div>
    `;
    postContainer.appendChild(postTemplate);

    const deleteBtn = postTemplate.querySelector(`#delete-btn[data-id="${newPost.id}"]`);
    const editBtn = postTemplate.querySelector(`#edit-btn[data-id="${newPost.id}"]`);
    const saveEditBtn = postTemplate.querySelector(`#save-edit-btn[data-id="${newPost.id}"]`);
    const editInput = postTemplate.querySelector(`#text-post[data-id="${newPost.id}"]`);

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
      saveEditBtn.style.display = "inline-block";
      editInput.removeAttribute('disabled');
    })

    saveEditBtn.addEventListener("click", (event) =>{
      event.preventDefault();
      const editId = saveEditBtn.dataset.id;
      const editPostValue = editInput.value;
      clearPosts();
      editPost(editId, editPostValue);
      saveEditBtn.style.display = "none";
      editInput.setAttribute('disabled', true);
    }); 
    
    deleteBtn.addEventListener("click", (event) =>{
      event.preventDefault();
      const deleteId = deleteBtn.dataset.id;
      clearPosts();
      deletePost(deleteId);
    });
  };
  postBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const post = {
      user: firebase.auth().currentUser.uid,
      text: textPost.value,
      likes: 0,
      comments: [],
    };
    clearPosts();
    createPost(post);
    textPost.value="";
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
}//FECHA A FUNÇÃO SHOW DATA
  return container;
};

//----------------------------------------------------------------------------------------------
/*
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const nameFirestore = doc.data().name;
        const emailFirestore =  doc.data().email;

      const nameUser = firebase.auth().currentUser.displayName;
      const emailUser = firebase.auth().currentUser.email;

        document.querySelector("#pb-info").innerHTML =`
        <p class = "user-name" >${firebase.auth().currentUser.displayName}</p>
        <p>${firebase.auth().currentUser.email}</p>
        `;       
          
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }
})




firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const nameUser = firebase.auth().currentUser.displayName;
        const emailUser = firebase.auth().currentUser.email;
    }
  })
*/


