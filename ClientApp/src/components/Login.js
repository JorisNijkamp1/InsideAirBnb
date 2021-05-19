import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Container} from "reactstrap";

const LoginComponent = (props) => {
    useEffect(() => {
        
    }, [])
    

    return (
        <Container>
            <form>
                <h3>Login</h3>
    
                <div className="form-group">
                    <label>Gebruikersnaam</label>
                    <input type="text" className="form-control" placeholder="Vul hier je gebruikersnaam in" />
                </div>
    
                <div className="form-group">
                    <label>Wachtwoord</label>
                    <input type="password" className="form-control" placeholder="Vul hier je wachtwoord in" />
                </div>
    
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Inloggen</button>
            </form>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);