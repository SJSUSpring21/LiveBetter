import React from 'react';
import { Form, Button, Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

function LoginPage() {

    const history = useHistory();
    const [email, handleEmailChange] = useState("");
    const [password, handlePasswordChange] = useState("");
    const [wrongPassword, changeWrongPassword] = useState(false);

    function loginUser(event) {
        const data = {
            email: email,
            password: password
        }
        console.log(data);
        event.preventDefault();
        axios.post('/login', data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('Name', response.data.user.username);
                    localStorage.setItem('email', response.data.user.email);
                    localStorage.setItem('userid', response.data.user._id);
                    history.push('/portal');
                }
                if (response.status === 400) {
                    changeWrongPassword(true);
                }


            })
            .catch(error => {
                console.log(error);
                changeWrongPassword(true);
            })
    }

    let displayWrongPassword = null;
    if (wrongPassword) {
        displayWrongPassword = <span class="badge badge-pill badge-danger">Wrong Email or Password</span>
    }

    useEffect(() => {
        //Check for user credentials
        const userEmail = localStorage.email || -1;
        const userID = localStorage.userid || -1;
        const username = localStorage.Name || -1;
        
        // User is not logged in
        // Redirect to trial page
        if (userEmail !== -1 && userID !== -1 &&  username !== -1) {
            console.log("Already Logged In.. Redirecting to Portal");
            history.push({
                pathname: "/portal"
            })

        }
    }, [history])

    return (
        <div class='main-section'>
            <Navbar bg="light" variant="light sticky-top">
                <Navbar.Brand className="logo" href="/">
                    Live<span class='text-success'>B</span>etter
                </Navbar.Brand>
            </Navbar>

            <div id="content-wrap" class="container-fluid">
                <div class="row m-3 justify-content-center">
                    <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
                </div>

                <div class="row m-5 justify-content-center">
                    <div class="col-5">
                        <Form>
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
                                    loginUser(event)
                                }}>
                                Login
                                </Button>
                        </Form>
                        <div class='row mt-3 ml-1'>
                            {displayWrongPassword}
                        </div>

                        <div class='row mt-3 justify-content-center'>
                            <p>Don't have an account? <Link to="/signup">Signup Here</Link></p>
                        </div>
                    </div>
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

export default LoginPage
