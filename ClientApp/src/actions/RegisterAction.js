export function RegisterAction(username, password, passwordRepeat) {
    return async (dispatch) => {
        console.log(username)
        if (username.length < 5 || username === '') {
            dispatch(registerErrorAction('Gebruikersnaam incorrect!'))
        } else if (password === '' || password.length < 5) {
            dispatch(registerErrorAction('Vul een correct wachtwoord in'))
        } else if (passwordRepeat === '' || passwordRepeat.length < 5) {
            dispatch(registerErrorAction('Vul een herhaling van uw wachtwoord in'))
        } else if (password !== passwordRepeat) {
            dispatch(registerErrorAction('Wachtwoorden komen niet overeen'))
        } else {
            dispatch(registerErrorAction(''))
            console.log('Alle data is goed!!!!!!!')
        }
        // return await fetch('https://localhost:5001/api/locations')
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((res) => {
        //         dispatch(handleRegisterAction(res));
        //     }).catch(err => {
        //         console.log(err)
        //     })
    }
}

function handleRegisterAction(data) {
    return {
        type: 'handleRegisterAction',
        value: data.username
    }
}

function registerErrorAction(error) {
    return {
        type: 'setRegisterError',
        error: error
    }
}
