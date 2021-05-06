import React from 'react';
import { Navbar, Nav, Button, Image, NavDropdown } from 'react-bootstrap/esm';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import PortalPage from './PortalPage';
import SignupPage from './SignupPage';
import ResultPage from './ResultPage';
import LoadingPage from './LoadingPage';
import PortalPageTrial from './PortalPageTrial';
import ResultPageTrial from './ResultPageTrial';
import LoadingPageTrial from './LoadingPageTrial';
import HistoryPage from './HistoryPage';
import '../index.css';
import livebetterlogo from '../components/images/new.svg';
import aboutphoto from './images/second.svg';
import { useState, useEffect } from 'react';

function LandingPage() {
    const [navBarHTML, setNavBar] = useState("");

    // ****** Logout Function *******
    const handleLogout = () => {
        localStorage.clear();
    }

    //is Loading
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //Check for user credentials
        const userEmail = localStorage.email || -1;
        const userID = localStorage.userid || -1;
        const username = localStorage.Name || -1;

        console.log(`Email: ${userEmail} userID: ${userID} username: ${username}`);
        // User is Logged In
        if (userEmail !== -1 && userID !== -1 && username !== -1) {
            console.log("User is logged in");
            setNavBar(<div><Nav className="ml-auto" variant="light" >
                <Nav.Link href="/portal">Get Score</Nav.Link>
                <Nav.Link href="/history">My Search</Nav.Link>
                <NavDropdown title={localStorage.getItem('Name')} id="nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav></div>);
        } else {
            console.log("User is not logged in");
            setNavBar(<div><Nav className="ml-auto">
                <NavDropdown title={"Login"} id="nav-dropdown">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href='/signup'>Signup</NavDropdown.Item>
                </NavDropdown></Nav></div>);
        }

        setLoading(false);
    }, []);

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    //landing page function
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div class='main-section'>
                            <Navbar bg="light" variant="light sticky-top">
                                <Navbar.Brand className="logo" href="/">
                                    Live<span class='text-success'>B</span>etter
                                        </Navbar.Brand>
                                <Nav className="mr-auto"></Nav>
                                {navBarHTML}
                            </Navbar>

                            <div id='content-wrap' class='cointainer-fluid'>
                                <div class='row mt-3 justify-content-center'>
                                    <div class='col-4 my-auto'>
                                        <div class="row m-2">
                                            <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
                                        </div>
                                        <div class="row m-2">
                                            <h3 className="line">Check the livability score for your location</h3>
                                        </div>
                                        <div class="row m-2">

                                        </div>
                                        <div class='row m-3 justify-content-center'>
                                            <div class='col'>
                                                <Link to="/portal-trial">
                                                    <Button variant="success btn-block">
                                                        Try Without Logging In
                                                    </Button>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>

                                    <div class='col-4'>
                                        <Image class='img-responsive'
                                            src={livebetterlogo} />
                                    </div>
                                </div>

                                <div class="row mt-5 justify-content-center">

                                    <div class="col-6">
                                        <div class='p-5'>
                                            <Image class='img-responsive mx-auto'
                                                src={aboutphoto} />
                                        </div>
                                    </div>

                                    <div class="col-4 my-auto">
                                        <h2>Find the best places to live based on Crime Rate, Hospitals, Gyms and other facilities nearby.</h2>
                                    </div>

                                </div>


                            </div>

                            <footer id="footer" class='py-3 bg-dark text-white text-center'>
                                <div>
                                    Group 12 - Live<span class='text-success'>B</span>etter
                                </div>
                            </footer>
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

                    <Route exact path="/portal-trial">
                        <PortalPageTrial />
                    </Route>

                    <Route exact path="/result">
                        <ResultPage />
                    </Route>

                    <Route exact path="/result-trial">
                        <ResultPageTrial />
                    </Route>

                    <Route exact path="/loading">
                        <LoadingPage />
                    </Route>

                    <Route exact path="/loading-trial">
                        <LoadingPageTrial />
                    </Route>

                    <Route exact path="/history">
                        <HistoryPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default LandingPage
