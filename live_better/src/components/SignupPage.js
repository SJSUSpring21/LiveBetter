import React from 'react';
import {useState} from 'react';
import {Form, Button, Navbar} from 'react-bootstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function SignupPage() {

    const history = useHistory();
    const [name, handleNameChange] = useState("");
    const[email, handleEmailChange] = useState("");
    const[password, handlePasswordChange] = useState("");

    function signupUser(event){
        const data = {
            name: name,
            email: email,
            password: password
        }
        console.log(data);
        event.preventDefault();
        axios.post('http://localhost:3001/signup',data)
            .then((response)=>{
                console.log(response.status);
                console.log(response.data);
                localStorage.setItem('Name',response.data.user.username);
                localStorage.setItem('email',response.data.user.email);
                localStorage.setItem('userid',response.data.user._id);
                history.push('/portal');
                
            })
    }
    return (
        <div>
            <Navbar bg="light" variant="light sticky-top">
                <Navbar.Brand className="logo" href="/">
                    Live<span class='text-success'>B</span>etter
                </Navbar.Brand>
            </Navbar>

            <div class="container-fluid">
                <div class="row m-3 justify-content-center">
                    <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
            </div>
                <div class="row m-5 justify-content-center">
                    <div class="col-5">
                        <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                            placeholder="Enter Name"
                            onChange={(event)=>{
                                handleNameChange(event.target.value);
                            }} />
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                            placeholder="Enter email"
                            onChange={(event)=>{
                                handleEmailChange(event.target.value);
                            }}
                            />
                        </Form.Group>
                        
                        
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                            placeholder="Password"
                            onChange={(event)=>{
                                handlePasswordChange(event.target.value)
                            }} 
                            />
                        </Form.Group>
                
                        <Button variant="primary"
                        type="submit"
                        onClick={(event)=>{
                            signupUser(event)
                        }}>
                            Submit
                        </Button>
                    </Form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SignupPage
