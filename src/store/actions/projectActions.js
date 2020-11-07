export const createProject = (project) => {
    console.log("project:", project);
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'CREATE_PROJECT_START', project });
        // make async call to database
        const profile = getState().firebase.profile;
        const creatorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('projects').add({
            ...project,
            creatorFullName: profile.fullName,
            creatorId: creatorId,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT_SUCCESS', project });
        }).catch(err => {
            dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
        });
    }
};

export const updateProject = (project, id) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'UPDATE_PROJECT_START', project });
        // make async call to database
        const profile = getState().firebase.profile;
        const editorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('projects').doc(id).update({
            ...project,
            editorFullName: profile.fullName,
            editorId: editorId,
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'UPDATE_PROJECT_SUCCESS', project });
        }).catch(err => {
            dispatch({ type: 'UPDATE_PROJECT_ERROR', err });
        });
    }
};

export const loadProject = (role) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'LOAD_PROJECT_START' });
        // make async call to database
        const creatorId = getState().firebase.auth.uid;
        var projectsRef = getFirebase().firestore().collection("projects");
        if (role == "Staff") {
            projectsRef = projectsRef.where("creatorId", "==", creatorId);
        }
        else {
            projectsRef = projectsRef.where("status", "!=", "Bản nháp");
        }
        projectsRef.get()
            .then(function (querySnapshot) {
                var projects = [];
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    projects.push({ ...doc.data(), key: doc.id });
                });
                dispatch({ type: 'LOAD_PROJECT_SUCCESS', payload: projects });
                // console.log("projects:", projects);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
};

export const getAProject = (projectId) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'GET_A_PROJECT_START' });
        // make async call to database
        const firestore = getFirebase().firestore();
        firestore.collection('projects').doc(projectId).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                dispatch({ type: 'GET_A_PROJECT_SUCCESS', payload: data })
            }
            else {
                dispatch({ type: 'GET_A_PROJECT_ERROR' });
                console.log('does not exist')
            }

        })
    }
};

export const removeAllProjects = (projects) => {
    return (dispatch, getState, getFirebase) => {
        // make async call to database
        const firestore = getFirebase().firestore();
        projects.forEach(element => {
            firestore.collection("projects").doc(element.id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        });
    }
};

export const addSimpleProjects = () => {
    return (dispatch, getState, getFirebase) => {
        // make async call to database
        const profile = getState().firebase.profile;
        const creatorId = getState().firebase.auth.uid;
        const firestore = getFirebase().firestore();
        var projectsRef = firestore.collection("projects");
        for (let i = 0; i < 50; i++) {
            projectsRef.add({
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
                tinhtrangxuly: "Đã gửi thông báo",
                status: "Công khai",
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

export const resetProject = () => {
    return {
        type: 'RESET_PROJECT',
    }
}