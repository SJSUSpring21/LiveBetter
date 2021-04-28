import React from 'react';
import {useHistory} from 'react-router-dom';
import {Navbar, Nav,Button, NavDropdown} from 'react-bootstrap';

function ResultPage() {
    const history = useHistory();
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand className="logo" href="/">LiveBetter</Navbar.Brand>
                <Nav className="mr-auto"></Nav>

                <Nav className="ml-auto">
                    <NavDropdown title={localStorage.getItem('Name')} id="nav-dropdown">
                        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <h1>Hello Result Page</h1>
        </div>
    )
}

export default ResultPage
