export const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function () {
            window.location.hash = "home";
        });
};

export const login = (email, password, callback) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            
            window.location.hash = "home";
        })
        .catch(function (error) {
            callback(error.message);
        });
};