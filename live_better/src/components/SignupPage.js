import React from 'react';
import { useState } from 'react';
import { Form, Button, Navbar, Nav, Image } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

function SignupPage() {

    const history = useHistory();
    const [name, handleNameChange] = useState("");
    const [email, handleEmailChange] = useState("");
    const [password, handlePasswordChange] = useState("");

    function signupUser(event) {
        const data = {
            name: name,
            email: email,
            password: password
        }
        console.log(data);
        event.preventDefault();
        axios.post('/signup', data)
            .then((response) => {
                console.log(response.status);
                console.log(response.data);
                localStorage.setItem('Name', response.data.user.username);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('userid', response.data.user._id);
                history.push('/portal');

            })
    }


    return (
        <div class='main-section'>
            <Navbar bg="light" variant="light sticky-top">
                <Navbar.Brand className="logo" href="/">
                    Live<span class='text-success'>B</span>etter
                </Navbar.Brand>
                <Nav className="mr-auto"></Nav>

                <Nav className="ml-auto">
                    <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                </Nav>
            </Navbar>
            <div id="content-wrap" class='container-fluid'>
                <div class='row m-3 justify-content-center'>
                    <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
                </div>
                <div class='row m-3 justify-content-center'>
                    <div class='col-3'>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter Name"
                                    onChange={(event) => {
                                        handleNameChange(event.target.value);
                                    }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                    placeholder="Enter email"
                                    onChange={(event) => {
                                        handleEmailChange(event.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    placeholder="Password"
                                    onChange={(event) => {
                                        handlePasswordChange(event.target.value)
                                    }}
                                />
                            </Form.Group>

                            <Button variant="success btn-block"
                                type="submit"
                                onClick={(event) => {
                                    signupUser(event)
                                }}>
                                Signup
                            </Button>
                        </Form>
                    </div>
                </div>
                <div class='row justify-content-center'>
                    <p>Already have an account? <Link to='/login'>Login Here</Link></p>
                </div>
            </div>
            <footer id="footer" class='py-3 bg-dark text-white text-center'>
                <div>
                    Group 12 - Live<span class='text-success'>B</span>etter
                                </div>
            </footer>
        </div>
    )
}

export default SignupPage
