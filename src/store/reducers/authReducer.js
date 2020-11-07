const initState = {
    authError: null,
    loading: false,
    role: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            console.log('login start');
            return { ...state, loading: true }

        case 'LOGIN_SUCCESS':
            console.log('login success:', action);
            return { ...state, authError: null, loading: false, role: action.data.role }

        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: "E-mail hoặc mật khẩu đăng nhập không hợp lệ!",
                loading: false
            }

        case 'SIGNOUT_START':
            console.log('signout start');
            return { ...state, loading: true }

        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return { ...state, authError: null, loading: false, role: null }

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