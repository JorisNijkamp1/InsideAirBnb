import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Container} from "reactstrap";
import {authContext} from "../AzureADConfig";

const LogoutComponent = (props) => {
    return (
        <Container>
            <h3>Logout</h3>
            <button
                className="btn btn-primary btn-block"
                onClick={() => authContext.logOut()}
            >
                Uitloggen
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

export const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);