export const createUser = (user) => {
    console.log("user:", user);
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'CREATE_USER_START', user });
        // make async call to database
        const profile = getState().firebase.profile;
        const creatorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('users').add({
            ...user,
            creatorFullName: profile.fullName,
            creatorId: creatorId,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_USER_SUCCESS', user });
        }).catch(err => {
            dispatch({ type: 'CREATE_USER_ERROR' }, err);
        });
    }
};

export const updateUser = (user, id) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'UPDATE_USER_START', user });
        // make async call to database
        const profile = getState().firebase.profile;
        const editorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('users').doc(id).update({
            ...user,
            editorFullName: profile.fullName,
            editorId: editorId,
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'UPDATE_USER_SUCCESS', user });
        }).catch(err => {
            dispatch({ type: 'UPDATE_USER_ERROR', err });
        });
    }
};

export const loadUser = () => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'LOAD_USER_START' });
        // make async call to database
        const creatorId = getState().firebase.auth.uid;
        var usersRef = getFirebase().firestore().collection("users");
        usersRef.get()
            .then(function (querySnapshot) {
                var users = [];
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    users.push({ ...doc.data(), key: doc.id });
                });
                dispatch({ type: 'LOAD_USER_SUCCESS', payload: users });
                // console.log("users:", users);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
};

export const getAUser = (userId) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'GET_A_USER_START' });
        // make async call to database
        const firestore = getFirebase().firestore();
        firestore.collection('users').doc(userId).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                dispatch({ type: 'GET_A_USER_SUCCESS', payload: data })
            }
            else {
                dispatch({ type: 'GET_A_USER_ERROR' });
                console.log('does not exist')
            }

        })
    }
};

export const removeAllUsers = (users) => {
    return (dispatch, getState, getFirebase) => {
        // make async call to database
        const firestore = getFirebase().firestore();
        users.forEach(element => {
            firestore.collection("users").doc(element.id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        });
    }
};

export const addSimpleUsers = () => {
    return (dispatch, getState, getFirebase) => {
        // make async call to database
        const profile = getState().firebase.profile;
        const creatorId = getState().firebase.auth.uid;
        const firestore = getFirebase().firestore();
        var usersRef = firestore.collection("users");
        for (let i = 0; i < 50; i++) {
            usersRef.add({
                owner: "Họ tên chủ hộ " + i,
                address: "Địa chỉ xây dựng " + i,
                permitNumber: "123",
                permitDate: "",
                permitAcreage: "126",
                realAcreage: "126",
                bandoso: "12",
                thuadatso: "12",
                qhduong: "10",
                qhmuong: "10",
                qhdien: "10",
                content: "Ko co",
                tranhchap: false,
                bienbanso: "111",
                huongxuly: "Ko co",
                ketquaxuly: "Ko co",
                coquankiemtra: "Phường",
                creatorFullName: profile.fullName,
                creatorId: creatorId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }
};

export const resetUser = () => {
    return {
        type: 'RESET_USER',
    }
}