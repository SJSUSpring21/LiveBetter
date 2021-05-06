import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/esm';
import axios from 'axios';
import { useState } from 'react';
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom';

function HistoryPage() {

    const [scores, setScores] = useState([]);
    var history = useHistory();

    // Change Border Color Based on Score
    const variants = [
        'danger',
        'danger',
        'danger',
        'danger',
        'danger',
        'danger',
        'warning',
        'warning',
        'success',
        'success',
        'success',
    ]
    useEffect(() => {

        //Check for user credentials
        const userEmail = localStorage.email || -1;
        const userID = localStorage.userid || -1;
        const username = localStorage.Name || -1;

        // User is not logged in
        // Redirect to trial page
        if (userEmail === -1 || userID === -1 || username === -1) {
            console.log("Not logged in.. redirecting to home");
            history.push({
                pathname: "/"
            })

        }
        else {
            const data = {
                email: localStorage.getItem('email') || -1
            };
            axios.post('/getscores', data)
                .then(response => {
                    console.log(response);
                    console.log(response.data.scores);
                    setScores(response.data.scores.reverse());
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [history])

    // ****** Logout Function *******
    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.clear();
        history.push({
            pathname: "/"
        });
    }

    return (
        <div class="main-section">
            <div id='content-wrap' >
                <Navbar bg="light" variant="light">
                    <Navbar.Brand className="logo" href="/">
                        Live<span class='text-success'>B</span>etter
                    </Navbar.Brand>
                    <Nav className="mr-auto"></Nav>

                    <Nav className="ml-auto" variant="light" >
                        <Nav.Link href="/portal">Get Score</Nav.Link>
                        <Nav.Link ><span class="active">My Search</span></Nav.Link>
                        <NavDropdown title={localStorage.getItem('Name')} id="nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <div class="row mt-5 justify-content-center">
                    <h1 className="heading">Search History</h1>
                </div>

                <hr style={{
                    color: 'green',
                    backgroundColor: 'green',
                    height: 5
                }}
                />

                <div class="container">
                    <div class="row my-5">
                        <div class="col">
                            <CardColumns>
                                {
                                    scores.map(score => (
                                        <div class="m-4">
                                            <Card border={variants[Math.round(Math.min(score.score, 10))]} className="mb-3">
                                                <Card.Body>
                                                    <Card.Title className="text-center">
                                                        <h2>{Math.min(score.score.toFixed(1), 10)}</h2>
                                                    </Card.Title>
                                                    <Card.Text className="text-muted">
                                                        {score.address || "Unknown Address"}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </CardColumns>

                        </div>

                    </div>
                </div>
            </div>
            <footer id="footer" class='py-3 bg-dark text-white text-center'>
                <div>
                    Group 12 - Live<span class='text-success'>B</span>etter
                                </div>
            </footer>
        </div >
    )
}

export default HistoryPage