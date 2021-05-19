const initialState = {
    username: '',
    password: '',
    passwordRepeat: '',
    error: ''
};

export function RegisterReducer(state = initialState, action) {
    switch (action.type) {
        case 'handleRegisterAction':
            return {...state, username: action.username, password: '', passwordRepeat: ''}
        case 'setRegisterError':
            return {...state, error: action.error}
        default:
            return state;
    }
}