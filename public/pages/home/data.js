export const watchPosts = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((newPost) => {
        if (newPost.data().privacy === false
        || newPost.data().user === firebase.auth().currentUser.uid) {
          callback(newPost);
        }
      });
    });
};

export const createPost = (newPost) => {
  firebase.firestore().collection('posts').add(newPost);
};

export const logout = () => {
  firebase.auth().signOut().then(() => {
    window.location.hash = 'login';
  });
};

export const deletePost = (postId) => {
  firebase.firestore().collection('posts').doc(postId).delete();
};

export const editPrivacy = (postId, privacyPost) => {
  firebase.firestore().collection('posts').doc(postId).update({
    privacy: privacyPost,
  });
};

export const editPost = (postId, textValue) => {
  firebase.firestore().collection('posts').doc(postId)
    .update({ text: textValue });
};

export const updateLike = (postId, action) => {
  firebase.firestore().collection('posts').doc(postId)
    .update({ likes: action });
};
