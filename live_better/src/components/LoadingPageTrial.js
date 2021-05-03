import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

//class ResultPage extends React.Component{
function LoadingPageTrial() {

    var history = useHistory();

    // Below Variables are defined by user
    var lat = history.location.state.lat;
    var lng = history.location.state.lng;
    var safetyScore = history.location.state.safetyScore;
    var restaurantScore = history.location.state.restaurantScore;
    var schoolScore = history.location.state.schoolScore;
    var busstationScore = history.location.state.busstationScore;
    var atmScore = history.location.state.atmScore;
    var supermarketScore = history.location.state.supermarketScore;
    var parkScore = history.location.state.parkScore;
    var gymScore = history.location.state.gymScore;
    var hospitalScore = history.location.state.hospitalScore;
    var hikeTrailScore = history.location.state.hikeTrailScore;
    var bikeTrailScore = history.location.state.bikeTrailScore;

    useEffect(() => {
        // Query Database For Parks and Schools
        axios.get(`/queries?lat=${lat}&lng=${lng}&radius=2`)
            .then(res => {

                console.log("Park and Schools Data");
                console.log(res.data);

                // Query Chicago Database
                axios.get(`/chicago?lat=${lat}&lng=${lng}`)
                    .then(res2 => {
                        if (res2.data.length === 0) {
                            // Query Google if there is not result for Chicago Data
                            console.log("Chicago Data Query came up empty...")
                            axios.get(`/google-search?lat=${lat}&lng=${lng}`)
                                .then(res3 => {
                                    console.log("Google Data")
                                    console.log(res3.data);

                                    // Go to Result Page
                                    history.push({
                                        pathname: '/result-trial',
                                        state: {
                                            lat: lat,
                                            lng: lng,
                                            safetyScore: safetyScore,
                                            restaurantScore: restaurantScore,
                                            schoolScore: schoolScore,
                                            busstationScore: busstationScore,
                                            atmScore: atmScore,
                                            supermarketScore: supermarketScore,
                                            parkScore: parkScore,
                                            gymScore: gymScore,
                                            hospitalScore: hospitalScore,
                                            hikeTrailScore: hikeTrailScore,
                                            bikeTrailScore: bikeTrailScore,
                                            query: res3.data,
                                            park_school: res.data
                                        }
                                    });
                                })
                                .catch(error => {
                                    console.log(error);
                                    console.log("Error with Google Query")
                                    // Error go back to home page
                                    history.push({
                                        pathname: '/'
                                    });
                                })
                        }
                        else {
                            // Go to Result Page
                            history.push({
                                pathname: '/result-trial',
                                state: {
                                    lat: lat,
                                    lng: lng,
                                    safetyScore: safetyScore,
                                    restaurantScore: restaurantScore,
                                    schoolScore: schoolScore,
                                    busstationScore: busstationScore,
                                    atmScore: atmScore,
                                    supermarketScore: supermarketScore,
                                    parkScore: parkScore,
                                    gymScore: gymScore,
                                    hospitalScore: hospitalScore,
                                    hikeTrailScore: hikeTrailScore,
                                    bikeTrailScore: bikeTrailScore,
                                    query: res2.data,
                                    park_school: res.data
                                }
                            });
                            console.log("Chicago Data");
                            console.log(res2.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log("Error While Querying Chicago DB");
                        // Error go back to home page
                        history.push({
                            pathname: '/'
                        });
                    });
            })
            .catch(error => {
                console.log(error);
                console.log("Error While Querying Schools and Parks");

                // Error go back to home page
                history.push({
                    pathname: '/'
                });
            });


    }, []); // <-- Empty array makes sure this block of code runs exactly once

    return (
        <div class='main-section'>
            <Navbar bg="light" variant="light sticky-top">
                <Navbar.Brand className="logo" href="/">
                    Live<span class='text-success'>B</span>etter
                    </Navbar.Brand>
                <Nav className="mr-auto"></Nav>

            </Navbar>
            <div class='container'>
                <div>
                    <div class='row mt-5 justify-content-center'>
                        <Spinner animation="border" variant="success" />
                    </div>
                    <div class='row mt-3 justify-content-center'>
                        <h3 class='mt-3'>Your results are loading</h3>
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

export default LoadingPageTrial