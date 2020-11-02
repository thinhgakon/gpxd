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