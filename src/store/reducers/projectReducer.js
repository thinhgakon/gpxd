const initState = {
    list: null,
    current: null,
    loading: false
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT_START':
            console.log('create project start', action.project);
            return { ...state, loading: true };

        case 'CREATE_PROJECT_SUCCESS':
            console.log('create project success', action.project);
            return { ...state, loading: false };

        case 'CREATE_PROJECT_ERROR':
            console.log('create project error');
            return { ...state, loading: false };

        case 'UPDATE_PROJECT_START':
            console.log('update project start', action.project);
            return { ...state, loading: true };

        case 'UPDATE_PROJECT_SUCCESS':
            console.log('update project success', action.project);
            return { ...state, loading: false, current: action.project };

        case 'UPDATE_PROJECT_ERROR':
            console.log('update project error');
            return { ...state, loading: false };

        case 'LOAD_PROJECT_START':
            console.log('load project start');
            return state;

        case 'LOAD_PROJECT_SUCCESS':
            console.log('load project success');
            return state;

        case 'LOAD_PROJECT_ERROR':
            console.log('load project error');
            return state;

        case 'GET_A_PROJECT_START':
            console.log('load project start');
            return { ...state, loading: true };

        case 'GET_A_PROJECT_SUCCESS':
            console.log('load project success');
            return { ...state, current: action.data, loading: false };

        case 'GET_A_PROJECT_ERROR':
            console.log('load project error');
            return { ...state, loading: false };

        case 'RESET_PROJECT':
            console.log('reset project');
            return { ...state, current: null };

        default:
            return state;
    }
};

export default projectReducer;