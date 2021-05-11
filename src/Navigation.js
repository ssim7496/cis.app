import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className="navbarPadding">
                <Navbar.Brand href="/">CIS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" />

                <Nav className="mr-auto">
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/client">
                        Clients
                    </NavLink>
                </Nav>
            </Navbar>
        )
    }
}