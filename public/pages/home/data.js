export const watchPosts = (callback) => {
  firebase.firestore().collection("posts")
    .orderBy("date", "desc")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((newPost) => {

        
        if (newPost.data().privacy === false || newPost.data().user === firebase.auth().currentUser.uid) {
          callback(newPost)
          firebase.firestore().collection("posts").doc(newPost.id).collection("comentarios")
          .orderBy("date", "asc")
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((uidComent) => {
              //console.log(uidComent.id) //AQUI RECEBE TODOS OS COMENTÁRIOS EXISTENTES DO POST ESPECÍFICO
                //displayComent(uidComent, uidPostAtual)
                //callback(newPost, uidComent)
            })
          })
        }
      });
    });
}

export const createPost = (newPost) => {
  firebase.firestore().collection("posts").add(newPost)
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export const logout = () => {
  firebase.auth().signOut().then(() => {
    window.location.hash = "login";
  });
}

export const deletePost = (postId) => {
  firebase.firestore().collection("posts").doc(postId).delete()
}

export const editPrivacy = (postId, privacyPost) => {
  firebase.firestore().collection("posts").doc(postId).update({
    privacy: privacyPost
  })
}

export const editPost = (postId, textValue) => {
  firebase.firestore().collection("posts").doc(postId)
    .update({text: textValue})
}

export const updateLike = (postId, action)=>{
  firebase.firestore().collection("posts").doc(postId)
    .update({likes: action})
}