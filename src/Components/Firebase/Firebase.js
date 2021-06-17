import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";

export const initializeFirebaseAppFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const newUserCreateWithEmailPassword = (newUser) => {
    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((userCredential) => {
            console.log(newUser, userCredential);
            userCredential.user.updateProfile({
                displayName: newUser.fullname
            }).then(() => {

            }).catch((error) => {

            });
            return userCredential.user;
        })
        .catch((error) => {
            return error;
        });
}


export const userSignInWithEmailAndPassword = (registeredUser) => {
    return firebase.auth().signInWithEmailAndPassword(registeredUser.email, registeredUser.password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            return error;
        });
}

export const userSignInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            return result.user;
        }).catch((error) => {
            return error;
        });
}
export const userSignInWithFacebook = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            return result.user;
        })
        .catch((error) => {
            return error;
        });
}

