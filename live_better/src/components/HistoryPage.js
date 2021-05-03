import React, { useEffect } from 'react'
import {Navbar,Nav,Button, Row, Col, Image, NavDropdown, Form, Modal} from 'react-bootstrap/esm';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {useState} from 'react';

function HistoryPage() {

    const [scores, setScores] = useState([]);
    useEffect(()=>{
        const data = {
            email: localStorage.getItem('email')
        }
        axios.post('http://localhost:3001/getscores',data)
            .then(response=>{
                console.log(response);
                console.log(response.data.scores);
                setScores(response.data.scores);

            })
            .catch((error)=>{
                console.log(error);
            })
    },[])
    return (
        <div>
            <div className="history-page">
                <Navbar bg="light" variant="light">
                    <Navbar.Brand className="logo" href="/">
                        Live<span class='text-success'>B</span>etter
                    </Navbar.Brand>
                    <Nav className="mr-auto"></Nav>

                    <Nav className="ml-auto" variant="pills" >
                        <Nav.Link><Link to='/portal'>Get Score</Link></Nav.Link>
                        <Nav.Link active>My Search</Nav.Link>
                        <NavDropdown title={localStorage.getItem('Name')} id="nav-dropdown">
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Row className="history-row">
                </Row>
                <Row>
                    <Col>
                        <Nav  variant="tabs" defaultActiveKey="/history">
                            <Nav.Item>
                            <Nav.Link ><Link to="/history/scores">History</Link></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link ><Link to="/history/compare">Compare</Link></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <hr style={{
                            color: 'green',
                            backgroundColor: 'green',
                            height: 5
                        }}
                />
                    </Col>
                </Row>
                
                
                
                <Route path = '/history/scores'>
                    
                    {
                        scores.map(score =>(
                            <div>
                                <Button variant ="link">
                                    {score.address}  : {score.score}
                                </Button>
                                <br />
                            </div>
                        ))
                    }
                    
                </Route>

                <Route path = '/history/compare'>
                    <Row>
                     <h1>Adam your part</h1>
                    </Row>
                </Route>

                
                
            </div>
            
        </div>
    )
}

export default HistoryPage
