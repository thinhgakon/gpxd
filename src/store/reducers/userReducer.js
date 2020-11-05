const initState = {
    list: null,
    current: null,
    loading: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER_START':
            console.log('create user start', action.user);
            return { ...state, loading: true };

        case 'CREATE_USER_SUCCESS':
            console.log('create user success', action.user);
            return { ...state, loading: false };

        case 'CREATE_USER_ERROR':
            console.log('create user error');
            return { ...state, loading: false };

        case 'UPDATE_USER_START':
            console.log('update user start', action.user);
            return { ...state, loading: true };

        case 'UPDATE_USER_SUCCESS':
            console.log('update user success', action.user);
            return { ...state, loading: false, current: action.user };

        case 'UPDATE_USER_ERROR':
            console.log('update user error:', action.err);
            return { ...state, loading: false };

        case 'LOAD_USER_START':
            console.log('load user start');
            return state;

        case 'LOAD_USER_SUCCESS':
            console.log('load user success');
            return { ...state, list: action.payload };

        case 'LOAD_USER_ERROR':
            console.log('load user error');
            return state;

        case 'GET_A_USER_START':
            console.log('load user start');
            return { ...state, loading: true };

        case 'GET_A_USER_SUCCESS':
            console.log('load user success');
            return { ...state, current: action.payload, loading: false };

        case 'GET_A_USER_ERROR':
            console.log('load user error');
            return { ...state, loading: false };

        case 'RESET_USER':
            console.log('reset user');
            return { ...state, list: null, current: null };

        default:
            return state;
    }
};

export default userReducer;