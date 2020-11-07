export const signIn = (credentials) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'LOGIN_START' });
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            var docRef = getFirebase().firestore().collection('users').doc(resp.user.uid);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    const data = doc.data();
                    dispatch({ type: 'LOGIN_SUCCESS', data });
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    dispatch({ type: 'LOGIN_SUCCESS' });
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'SIGNOUT_START' });
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNOUT_ERROR' });
            console.log("signout error");
        });

    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'SIGNUP_START' });
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(resp => {
            return firestore.collection('users').doc(resp.user.uid).set({
                fullName: newUser.fullName,
                role: newUser.role,
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            console.log("err:", err);
            dispatch({ type: 'SIGNUP_ERROR', err });
        });
    }
}