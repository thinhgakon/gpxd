const initState = {
    authError: null,
    loading: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            console.log('login start');
            return { ...state, loading: true }

        case 'LOGIN_SUCCESS':
            console.log('login success');
            return { ...state, authError: null, loading: false }

        case 'LOGIN_ERROR':
            console.log('login error');
            return { ...state, authError: "Đăng nhập thất bại", loading: false }

        case 'SIGNOUT_START':
            console.log('signout start');
            return { ...state, loading: true }

        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return { ...state, authError: null, loading: false }

        case 'SIGNOUT_ERROR':
            console.log('signout eror');
            return { ...state, authError: "Đăng xuất thất bại", loading: false }

        case 'SIGNUP_START':
            console.log('signup start')
            return { ...state, loading: true }

        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return { ...state, authError: null, loading: false }

        case 'SIGNUP_ERROR':
            console.log('signup error', action.err)
            return { ...state, authError: action.err.message, loading: false }

        default:
            return state
    }
};

export default authReducer;