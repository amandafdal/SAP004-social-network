export const watchPosts = (callback)=>{
  firebase.firestore().collection("posts")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((newPost) => {
        callback(newPost);
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
  firebase.auth().signOut().then(() =>{
    window.location.hash = "login";
  });
}

export const deletePost = (postId) =>{
  firebase.firestore().collection("posts").doc(postId).delete()
}

export const editPrivacy = (id, privacyPost) => {
  db.collection('post').add({
    privacy: true,
})
  firebase.firestore().collection('post').doc(id).update({
    privacy: privacyPost,
  })
}