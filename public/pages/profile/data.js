export function updateDisplayName(newNameContainerParameter) {
  firebase.auth().currentUser
    .updateProfile({ displayName: newNameContainerParameter });
}

export function reauthenticateUser(oldPasswordParameter) {
  return firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser.email, oldPasswordParameter,
  );
}

export function emailUpdate(authenticateParameter, newEmailParameter) {
  firebase.auth().currentUser.reauthenticateWithCredential(authenticateParameter).then(() => {
    firebase.auth().currentUser.updateEmail(newEmailParameter);
  });
}

export function passwordUpdate(authenticateParameter, newPasswordParameter) {
  firebase.auth().currentUser.reauthenticateWithCredential(authenticateParameter).then(() => {
    firebase.auth().currentUser.updatePassword(newPasswordParameter);
  });
}

export function updateUserDocName(uidParameter, newNameParameter) {
  firebase.firestore().collection('users').where('uid', '==', uidParameter)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        firebase.firestore().collection('users').doc(doc.id)
          .update({ name: newNameParameter });
      });
    });
}

export function updateUserDocEmail(uidParameter, newEmailParameter) {
  firebase.firestore().collection('users').where('uid', '==', uidParameter)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        firebase.firestore().collection('users').doc(doc.id)
          .update({ email: newEmailParameter });
      });
    });
}

export function updateUserDocMiniBio(uidParameter, newMinibioParameter) {
  firebase.firestore().collection('users').where('uid', '==', uidParameter)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        firebase.firestore().collection('users').doc(doc.id)
          .update({ minibio: newMinibioParameter });
      });
    });
}

export function updateProfilePicture(fileParameter, uploaderParameter) {
  const task = firebase.storage().ref('images/' + fileParameter.name).put(fileParameter);
  task.then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
      firebase.firestore().collection('users').where('uid', '==', firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            firebase.firestore().collection('users').doc(doc.id)
              .update({ profileimage: url });
          });
        });
      document.querySelector('#profile-img-template').src = url;
    });

  task.on('state_changed', (snapshot) => {
    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploaderParameter.value = percentage;
  });
}

export function updateCoverImage(fileParameter, uploaderParameter) {
  const task = firebase.storage().ref('images/' + fileParameter.name).put(fileParameter);
  task.then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
      firebase.firestore().collection('users').where('uid', '==', firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            firebase.firestore().collection('users').doc(doc.id)
              .update({ coverimage: url });
          });
        });
      document.querySelector('.profile-cover-profile').style.backgroundImage = `url("${url}")`;
    });

  task.on('state_changed', (snapshot) => {
    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploaderParameter.value = percentage;
  });
}
