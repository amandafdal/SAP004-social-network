export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      firebase.firestore().collection('users').get().then((querySnapshot) => {
        const emailArray = [];
        querySnapshot.forEach((doc) => {
          emailArray.push(doc.data().email);
        });
        const booleanEmail = [];
        for (let value of emailArray) {
          booleanEmail.push(value === firebase.auth().currentUser.email);
        }

        const status = booleanEmail.indexOf(true);
        if (status === -1) {
          firebase.firestore().collection('users').doc().set({
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
            name: firebase.auth().currentUser.displayName,
            minibio: 'Escreva sua MiniBio',
            login: 'Google',
            profileimage: 'https://firebasestorage.googleapis.com/v0/b/social-network-sap004.appspot.com/o/mimi.png?alt=media&token=dc33f03b-706e-43f9-ba56-3468598fd730',
            coverimage: 'https://firebasestorage.googleapis.com/v0/b/social-network-sap004.appspot.com/o/cover-img.jpg?alt=media&token=8ea3250c-42c8-4880-b1c0-c4c89220f9f2',
          });
          window.location.hash = 'home';
        } else {
          window.location.hash = 'home';
        }
      });
    });
};

export const login = (email, password, callback) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.hash = 'home';
    })
    .catch((error) => {
      callback(error.message);
    });
};
