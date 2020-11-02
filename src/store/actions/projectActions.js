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

export const updateProject = (project) => {
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'UPDATE_PROJECT_START', project });
        // make async call to database
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('projects').doc(project.id).update({
            ...project,
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'UPDATE_PROJECT_SUCCESS', project });
        }).catch(err => {
            dispatch({ type: 'UPDATE_PROJECT_ERROR' }, err);
        });
    }
};

export const loadProject = () => {
    // console.log("load project");
    return (dispatch, getState, getFirebase) => {
        dispatch({ type: 'LOAD_PROJECT_START' });
        // make async call to database
        const profile = getState().firebase.profile;
        const creatorId = getState().firebase.auth.uid;
        var projectsRef = getFirebase().firestore().collection("projects");

        projectsRef.get()
            .then(function (querySnapshot) {
                console.log("querySnapshot:", querySnapshot);
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(err => {
                dispatch({ type: 'LOAD_PROJECT_ERROR' }, err);
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
                dispatch({ type: 'GET_A_PROJECT_SUCCESS', data })
            }
            else {
                dispatch({ type: 'GET_A_PROJECT_ERROR' });
                console.log('does not exist')
            }

        })
    }
};