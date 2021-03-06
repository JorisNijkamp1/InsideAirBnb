import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Container} from "reactstrap";
import {authContext} from "../AzureADConfig";

const LoginComponent = (props) => {
    return (
        <Container>
            <h3>Login</h3>
            <button
                className="btn btn-primary btn-block"
                onClick={() => authContext.login()}
            >
                Inloggen
            </button>
        </Container>
    );
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);