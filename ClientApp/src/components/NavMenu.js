import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import {authContext} from "../AzureADConfig";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow bg-dark text-white">
                    <Container>
                        <NavbarBrand tag={Link} to="/">InsideAirBnb</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                  navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-white" to="/">Home</NavLink>
                                </NavItem>
                                {authContext.getCachedUser() === null ?
                                    <NavItem>
                                        <NavLink tag={Link} className="text-white" to="/login">Login</NavLink>
                                    </NavItem>
                                    : <NavItem>
                                        <NavLink tag={Link} className="text-white-dark" to="/logout">Uitloggen</NavLink>
                                    </NavItem>}
                                <NavItem>
                                    <NavLink tag={Link} className="text-white" to="/map">MapBox</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-white" to="/charts">Dashboard</NavLink>
                                </NavItem>
                                <NavItem>
                                    {authContext.getCachedUser() !== null ?
                                        <NavbarText className='pl-5'>Ingelogd
                                            als: <strong>{authContext.getCachedUser().userName}</strong></NavbarText>
                                        : null}
                                    {/*<p className='text-dark d-block' style={{padding: "0.5rem 1rem"}}>{authContext.getCachedUser()?.userName ? authContext.getCachedUser().userName : null}</p>*/}
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
