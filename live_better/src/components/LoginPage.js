import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function LoginPage() {

    const history = useHistory();
    const[email, handleEmailChange] = useState("");
    const[password, handlePasswordChange] = useState("");
    const[wrongPassword, changeWrongPassword] = useState(false);

    function loginUser(event){
        const data = {
            email: email,
            password: password
        }
        console.log(data);
        event.preventDefault();
        axios.post('http://localhost:3001/login',data)
            .then((response)=>{
                console.log(response.status);
                if(response.status === 200){
                    console.log(response.data);
                    localStorage.setItem('Name',response.data.user.username);
                    localStorage.setItem('email',response.data.user.email);
                    localStorage.setItem('userid',response.data.user._id);
                    history.push('/portal');
                }
                if(response.status === 400){
                    console.log(response.data);
                    changeWrongPassword(true);
                }
                
                
            })
            .catch(error=>{
                console.log(error);
                changeWrongPassword(true);
            })
    
    
    }

    let displayWrongPassword = null;
    if(wrongPassword){
        displayWrongPassword = "Wrong Password"
    }
    return (
        <div>
            <h1>Login Page</h1>
            <Form>
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
                    loginUser(event)
                }}>
                    Submit
                </Button>
            </Form>
            {displayWrongPassword}
        </div>
    )
}

export default LoginPage
