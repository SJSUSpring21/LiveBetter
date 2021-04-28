import React from 'react';
import { Navbar, Nav, Button, Row, Col, Image } from 'react-bootstrap/esm';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import PortalPage from './PortalPage';
import SignupPage from './SignupPage';
import ResultPage from './ResultPage';
import '../index.css';
import livebetterlogo from '../components/images/new.svg';
import aboutphoto from './images/second.svg';

function LandingPage() {
    //landing page function

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className="main-section">

                            <div class='cointainer'>
                                <Navbar bg="light" variant="light">
                                    <Navbar.Brand className="logo" href="/">LiveBetter</Navbar.Brand>
                                    <Nav className="mr-auto"></Nav>

                                    <Nav className="ml-auto">
                                        <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                                    </Nav>
                                </Navbar>
                                <Row className="row1">
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col></Col>
                                            <Col xs={8}>
                                                <h1 className="heading">Live Better</h1>
                                                <h3 className="line">Check the livability score for your location</h3>
                                                <Row>

                                                    <Col><Link to="/signup"><Button variant="success" className="signup-button">Signup</Button></Link></Col>

                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col>
                                        <Row>

                                            <Col>
                                                <Image className="newImage"
                                                    src={livebetterlogo} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className="about-section">
                                <Row className="row2"></Row>
                                <Row>
                                    <Col><Image className="aboutImage"
                                        src={aboutphoto} /></Col>
                                    <Col>
                                        <Row className="row3"></Row>
                                        <Row>
                                            <Col xs={8}><h2>Find the best places to live based on Crime Rate, Hospitals, Gyms and other facilities nearby.</h2></Col>
                                            <Col></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Route>

                    <Route exact path="/signup">
                        <SignupPage />
                    </Route>

                    <Route exact path="/login">
                        <LoginPage />
                    </Route>

                    <Route exact path="/portal">
                        <PortalPage />
                    </Route>

                    <Route exact path="/result">
                        <ResultPage />
                    </Route>

                </Switch>
            </Router>
        </div>
    )
}

export default LandingPage
