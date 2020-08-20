import { createPost, watchPosts, logout, deletePost, updateLike, editPrivacy } from './data.js';

export default () => {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const nameAuth = firebase.auth().currentUser.displayName;
      firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid )
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const nameFirestore = doc.data().name;
          const minibioFirestore =  doc.data().minibio;
          const profileImageFirestore = doc.data().profileimage;
          const coverImageFirestore = doc.data().coverimage;

          showData(nameFirestore, minibioFirestore, profileImageFirestore, coverImageFirestore);
            
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }
  })

  const container = document.createElement('div');
  function showData(nameUser, miniBioUser, profileImageCurrent, coverImageCurrent){  
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
          <img class="user-cover-img" src="${coverImageCurrent}">
          <div class="profile-content">
            <img class="user-photo" src="${profileImageCurrent}">
            <div class="pb-info" id="pb-info">
            <p class = "user-name" >${nameUser}</p>
            <p>${miniBioUser}</p>
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

    const clearPosts = () => postContainer.innerHTML = "";
    const postBtn = container.querySelector("#post-btn");
    const postContainer = container.querySelector("#posts-container");
    const textPost = container.querySelector("#create-post-input");

    const displayPost = (newPost, uidComentParameter) => {
      //console.log(newPost.id) //AQUI RECEBE CADA POST
      const postTemplate = document.createElement("div");
      postTemplate.classList.add("post");
      postTemplate.classList.add("flex-column");
      postTemplate.innerHTML = `
        <div class = "color-post template-post position-post">
          <div class = "post-top">
            <span class="name-post">${newPost.data().name}</span>
            <img id="privacy-btn"  data-id = "${newPost.id}" class = "icons" src="./img/privacy.svg" alt = "Post Privado" />
            <img id="public-btn"  data-id = "${newPost.id}" class = "icons" src="./img/public.svg" alt = "Post Publico" />
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
            <span class="name-post">${newPost.data().likes.length}</span>
          </div>
          <img id = "coment-btn" data-id="${newPost.id}" class = "icons icon-edit" 
            src = "./img/edit.svg" alt = "Comentar Post" />
          <img id="enviar-comentario-btn" data-id="${newPost.id}" class="hide save-icon" 
            src="./img/checkmark.svg" alt = "Enviar comentário"/>
        </div>
        <div class="template-post post-middle">Comentários:</div>
        <div id="lista-de-comentarios" data-id="${newPost.id}" class="template-post post-middle"></div>
        <div id="comentar" data-id="${newPost.id}" class="template-post post-middle"></div>
      </div>
      `;

      postContainer.appendChild(postTemplate);

      const deleteBtn = postTemplate.querySelector(`#delete-btn[data-id="${newPost.id}"]`);
      const privacyBtn = postTemplate.querySelector(`#privacy-btn[data-id="${newPost.id}"]`);
      const publicBtn = postTemplate.querySelector(`#public-btn[data-id="${newPost.id}"]`)
      const likeBtn = postTemplate.querySelector(`#like[data-id="${newPost.id}"]`);
      const comentarBtn = postTemplate.querySelector(`#coment-btn[data-id="${newPost.id}"]`);
      const enviarComentBtn = postTemplate.querySelector(`#enviar-comentario-btn[data-id="${newPost.id}"]`);

      const validateUser = () => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            if (newPost.data().user !== firebase.auth().currentUser.uid) {
              deleteBtn.style.display = "none";
              
            } else {
              deleteBtn.style.display = "inline-block";
              
            }
          }
        });
      }
      validateUser()

      const privacyIcon = () => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            if (newPost.data().user !== firebase.auth().currentUser.uid) {
              privacyBtn.style.display = "none";
              publicBtn.style.display = "none";

            } else if (newPost.data().user === firebase.auth().currentUser.uid && newPost.data().privacy === true) {
              privacyBtn.style.display = "inline-block";
              publicBtn.style.display = "none";

            } else {
              privacyBtn.style.display = "none";
              publicBtn.style.display = "inline-block";
            }
          }
        });
      }
      privacyIcon();

      
      //AQUI COMEÇA ESCREVER CODIGO DOS COMENTÁRIOS

      //AQUI CRIA O COMENTÁRIO
      comentarBtn.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Comentar")

        enviarComentBtn.style.display = "inline-block";        
        document.querySelector(`#comentar[data-id="${newPost.id}"]`).innerHTML =`
          <textarea style="resize: none" rows="1" class="edit-post-input" 
            id="comentar-text-post" data-id="${newPost.id}">
          </textarea>
          `;                     
      })
                            //uid de cada comentário comentário
      const displayComent = (newPost, uidPostAtualParameter) => {
        const comentTemplate = document.createElement("div");
        comentTemplate.classList.add("post");
        comentTemplate.classList.add("flex-column");
        comentTemplate.innerHTML = `<div class = "color-post template-post position-post">
        <div class = "post-top">
          <span class="name-post">${newPost.data().name}</span>          
        </div>
        <img
          class = "icons"
          src = "./img/delete.svg"
          alt = "Deletar Comentário"
          id = "delete-coment-btn"
          data-id = "${newPost.id}"
        />
      </div>
      <div class="template-post post-middle">
        <textarea disabled style="resize: none" rows="1" class="edit-post-input" 
          id="text-post" data-id="${newPost.id}"> ${newPost.data().text}
        </textarea>
      </div>
      <div class = "color-post template-post position-post">
        <div class = "position-post">
          <img class = "icons" src = "./img/like.svg" alt = "Like" 
          id="like-coment" data-id="${newPost.id}"/>
          <span class="name-post">${newPost.data().likes.length}</span>
        </div>
        <img id = "edit-coment-btn" data-id="${newPost.id}" class = "icons icon-edit" 
          src = "./img/edit.svg" alt = "Editar Comentário" />
        <img id="save-edit-coment-btn" data-id="${newPost.id}" class="hide save-icon" 
          src="./img/checkmark.svg" alt = "Salvar edição Comentário
          "/>
      </div>
    </div>`;
    
        document.querySelector(`#lista-de-comentarios[data-id="${uidPostAtualParameter.id}"]`).appendChild(comentTemplate) 
      }

      //AQUI SALVA E POSTA COMENTÁRIO
      enviarComentBtn.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("AQUI SALVA E POSTA COMENTÁRIO")
        let listaDeComentarios = document.querySelector(`#lista-de-comentarios[data-id="${newPost.id}"]`);
        const comentPost = document.querySelector(`#comentar-text-post[data-id="${newPost.id}"]`);
        const clearComents = () => listaDeComentarios.innerHTML = "";
        const uidPostAtual = newPost;
        //console.log(newPost.id)//PEGA ID DO POST QUE A PESSOA QUER COMENTAR
        
        firebase.firestore().collection("posts").doc(newPost.id).collection("comentarios").add({
          user: firebase.auth().currentUser.uid,
            name: firebase.auth().currentUser.displayName,
            text: comentPost.value,
            likes: [],
            date: new Date()
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })       

        //clearComents();
        comentPost.value = "";
        /*
        //const watchComentarios = (callback) => {
        firebase.firestore().collection("posts").doc(newPost.id).collection("comentarios")
        .orderBy("date", "asc")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((uidComent) => {
            //console.log(uidComent.id) //AQUI RECEBE TODOS OS COMENTÁRIOS EXISTENTES DO POST ESPECÍFICO
            //console.log(uidPostAtual)
              //callback(uidComent)
              displayComent(uidComent, uidPostAtual)
          })
        })
        //}
        */
      })


      //Até aqui COMENTÁRIOS

      deleteBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const deleteId = deleteBtn.dataset.id;
        clearPosts();
        deletePost(deleteId);
      });
      
      const privacy = () => {
        const id = privacyBtn.dataset.id;
        const db = newPost.data().privacy;
        clearPosts();
        if (db === true) {
          editPrivacy(id, false)
          console.log(false)
        } else {
          editPrivacy(id, true);
          console.log(true)
        }
      }

      privacyBtn.addEventListener("click", (event) => {
        event.preventDefault();
        privacy();
      });

      publicBtn.addEventListener("click", (event) => {
        event.preventDefault();
        privacy();
      });
        
      likeBtn.addEventListener("click", (event) =>{
        event.preventDefault();
        const likeId = likeBtn.dataset.id;
        if (newPost.data().user !== firebase.auth().currentUser.uid) {
          clearPosts();
          if(newPost.data().likes.includes(firebase.auth().currentUser.uid)){
            const removeUid = firebase.firestore.FieldValue
              .arrayRemove(firebase.auth().currentUser.uid)
          updateLike(likeId, removeUid);
          }else{
            const pushUid = firebase.firestore.FieldValue
              .arrayUnion(firebase.auth().currentUser.uid)
          updateLike(likeId, pushUid);
          }
        }
      })
    };

    postBtn.addEventListener("click", (event) => {
      event.preventDefault()
      const post = {
        user: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
        text: textPost.value,
        likes: [],
        privacy: true,
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

    const closeMenu = ()=>{
      container.querySelector(".btn-menu").classList.remove("hide");
      container.querySelector(".menu").classList.remove("menu-items-show");
    }
    container.querySelector(".btn-menu").addEventListener("click",(event)=>{
      event.preventDefault()
      container.querySelector(".btn-menu").classList.toggle("hide")
      container.querySelector(".menu").classList.toggle("menu-items-show")
      setTimeout(closeMenu, 5000)
    });
    }

  return container;
};