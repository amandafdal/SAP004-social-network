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
        for (const value of emailArray) {
          booleanEmail.push(value === firebase.auth().currentUser.email);
        }
        const status = booleanEmail.indexOf(true);

        if (status === -1) {
          firebase.firestore().collection('users').doc().set({
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
            name: firebase.auth().currentUser.displayName,
            minibio: 'Escreva sua MiniBio',
            profileimage: [],
            coverimage: [],
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
