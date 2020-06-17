export const register = (email, password, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.hash = "home";
        })
        .catch(function (error) {
            callback(error.message);
        });
};