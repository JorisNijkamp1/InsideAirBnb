export function RegisterAction(username, password, passwordRepeat) {
    return async (dispatch) => {
        if (username.length < 5 || username === '') {
            dispatch(registerErrorAction('Gebruikersnaam incorrect!'))
        } else if (password === '' || password.length < 5) {
            dispatch(registerErrorAction('Wachtwoord niet geldig'))
        } else if (passwordRepeat === '' || passwordRepeat.length < 5) {
            dispatch(registerErrorAction('Vul een herhaling van uw wachtwoord in'))
        } else if (password !== passwordRepeat) {
            dispatch(registerErrorAction('Wachtwoorden komen niet overeen'))
        } else {
            dispatch(registerErrorAction(''))
            const response = await fetch('https://localhost:5001/api/register', {
                methode: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            const result = response.json();
            console.log(result);
        }
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
