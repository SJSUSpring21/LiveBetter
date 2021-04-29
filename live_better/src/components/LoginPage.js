import React from 'react';
import { Form, Button, Navbar, Image } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import livebetterlogo from '../components/images/new.svg';
import skyline from '../components/images/skyline.png';

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
                console.log(response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    localStorage.setItem('Name', response.data.user.username);
                    localStorage.setItem('email', response.data.user.email);
                    localStorage.setItem('userid', response.data.user._id);
                    history.push('/portal');
                }
                if (response.status === 400) {
                    console.log(response.data);
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

    return (
        <div class='main-section'>
            <Navbar bg="light" variant="light sticky-top">
                <Navbar.Brand className="logo" href="/">
                    Live<span class='text-success'>B</span>etter
                </Navbar.Brand>
            </Navbar>

            <div class="container-fluid">
                <div class="row m-3 justify-content-center">
                    <h1 className="heading">Login to Live<span class='text-success'>B</span>etter</h1>
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
                <div class='row mt-5 justify-content-center'>
                    <div class='col-6'>
                        <Image class='img-responsive mx-auto'
                            src={livebetterlogo} />
                    </div>
                </div>

            </div>


            <div class="row fixed-bottom">
                <Image class='img-responsive mx-auto'
                    src={skyline} />
            </div>

        </div>
    )
}

export default LoginPage
