import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Container} from "reactstrap";
import {RegisterAction} from "../actions/RegisterAction";

const RegisterComponent = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    useEffect(() => {

    }, [])

    const handleRegisterButton = () => {
        console.log(username);
        console.log(password);
        console.log(passwordRepeat);
        props.registerAction(username, password, passwordRepeat);
        setUsername('');
        setPassword('');
        setPasswordRepeat('');
    }

    // console.log(props.error);
    
    return (
        <Container>
            <form onSubmit={(e) => e.preventDefault()}>
                <h3>Registreren</h3>

                <div className="form-group">
                    <label>Gebruikersnaam</label>
                    <input
                        type="text"
                        value={username ? username : ''}
                        className="form-control"
                        placeholder="Vul hier je gebruikersnaam in"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Wachtwoord</label>
                    <input
                        type="password"
                        value={password ? password : ''}
                        className="form-control"
                        placeholder="Vul hier je wachtwoord in"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    Uw wachtwoord dient <b>minimaal 5 karakters</b> lang te zijn!
                </div>
                <div className="form-group">
                    <label>Herhaal je wachtwoord</label>
                    <input
                        type="password"
                        value={passwordRepeat ? passwordRepeat : ''}
                        className="form-control"
                        placeholder="Vul hier nogmaals je wachtwoord in"
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                    </div>
                </div>
                <b>{props.error}</b>
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={() => handleRegisterButton()}
                >
                    Registreren
                </button>
            </form>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        error: state.registerReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerAction: (username, password, passwordRepeat) => dispatch(RegisterAction(username, password, passwordRepeat))
    }
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);