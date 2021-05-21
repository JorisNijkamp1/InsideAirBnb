const initialState = {
    password: '',
    token: null,
    role: '',
    username: '',
    redirect: false
};

export function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case 'handleLoginAction':
            return {
                ...state,
                username: action.username,
                password: '',
                passwordRepeat: ''
            }
        case 'setLoginError':
            return {...state, error: action.error}
        default:
            return state;
    }
}