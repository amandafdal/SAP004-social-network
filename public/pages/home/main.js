import { createPost, watchPosts, logout, deletePost } from './data.js';
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
            <button type="submit" class="post-btn" id="post-btn">Postar</button>
          </div>
        </div>
        <div class="posts-container" id="posts-container"></div>
      </div>
    </section>
  `;
  container.innerHTML = template

  const postBtn = container.querySelector("#post-btn");
  const postContainer = container.querySelector("#posts-container");

  const displayPost = (newPost) => {
    const postTemplate = document.createElement("div");
    postTemplate.classList.add("post");
    postTemplate.innerHTML = `
      <div class = "color-post template-post position-post">
        <div class = "post-top">
          <span>${newPost.data().name}</span>
          <img id="privacy-btn" class = "icons" src="./img/publicit2.svg" alt = "Publicidade do Post" />
        </div>
        <img
          class = "icons"
          src = "./img/delete.svg"
          alt = "Deletar Post"
          id = "delete-btn"
          data-id = "${newPost.id}"
        />
      </div>
      <div class = "template-post post-middle position-post">
        <span class="post-content">${newPost.data().text}</span>
      </div>
      <div class = "color-post template-post position-post">
        <div class = "position-post">
          <img class = "icons" src = "./img/like.svg" alt = "Like" />
        </div>
        <img id = "edit-btn" data-id="${newPost.id}" class = "icons icon-edit" src = "./img/edit.svg" alt = "Editar Post" />
      </div>
    </div>
    `;
    postContainer.appendChild(postTemplate);

    const editBtn = postTemplate.querySelector(`#edit-btn[data-id="${newPost.id}"]`);
    const deleteBtn = postTemplate.querySelector(`#delete-btn[data-id="${newPost.id}"]`);
    const privacyBtn = postTemplate.querySelector(`#privacy-btn`)
    if (newPost.data().user !== firebase.auth().currentUser.uid) {
      deleteBtn.style.display = "none";
      editBtn.style.display = "none";
    }
    deleteBtn.addEventListener("click", (event) => {
      const deleteId = deleteBtn.dataset.id;
      event.preventDefault()
      // clearPosts()
      deletePost(deleteId)
    })

    privacyBtn.addEventListener("click", (event) => {
      const banana = privacyBtn.dataset.privacy;
      event.preventDefault();
      
      console.log(banana);
      // const privacyPost = dataset.privacy;
      // const privacyId = dataset.id;
      // editPrivacy(privacyId, privacyPost);
    })
  }
  postBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const textPost = container.querySelector("#create-post-input");
    const post = {
      user: firebase.auth().currentUser.uid,
      text: textPost.value,
      likes: 0,
      comments: [],
    };
    // clearPosts();
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
  return container;
};


 // <img class = "icons" src = "./img/comment.svg" alt = "Comentar Post" />
 // <button class="upload-img-btn" id="upload-img-btn"><img class="upload-img-icon" src="img/picture.png"></button>


 