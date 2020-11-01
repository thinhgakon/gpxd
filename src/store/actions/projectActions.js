export const createProject = (project) => {
    return (dispatch, getState, getFirebase) => {
        // make async call to database
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT_SUCCESS', project });
        }).catch(err => {
            dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
        });
    }
};

export const updateProject = (project) => {
    return (dispatch, getState, getFirebase) => {
        // make async call to database
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        getFirebase().firestore().collection('projects').doc(project.id).update({
            title: project.title,
            content: project.content,
            updatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'UPDATE_PROJECT_SUCCESS', project });
        }).catch(err => {
            dispatch({ type: 'UPDATE_PROJECT_ERROR' }, err);
        });
    }
};