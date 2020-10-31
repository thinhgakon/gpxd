import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CreateProject = () => {
    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />
    return (
        <div>
            Add Project
        </div>
    );
};

export default CreateProject;