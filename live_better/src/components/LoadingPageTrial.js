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

    // Input Address
    var formattedAddress = history.location.state.formattedAddress;

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
                            // Go to Result Page
                            // Since it's a trial, set all other counts to 0
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
                                    query: {
                                        Arrest_Count: 0,
                                        atm: 0,
                                        bike_trail: 0,
                                        bus_station: 0,
                                        gym: 0,
                                        hike_trail: 0,
                                        hospital: 0,
                                        restaurant: 0,
                                        supermarket: 0
                                    },
                                    park_school: res.data,
                                    formattedAddress: formattedAddress
                                }
                            });
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
                                    park_school: res.data,
                                    formattedAddress: formattedAddress
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log("Error While Querying Chicago DB");
                        // Error go back to portal-trial page
                        history.push({
                            pathname: '/portal-trial'
                        });
                    });
            })
            .catch(error => {
                console.log(error);
                console.log("Error While Querying Schools and Parks");

                // Error go back to portal-trial page
                history.push({
                    pathname: '/portal-trial'
                });
            });
    }, [atmScore, bikeTrailScore, busstationScore, formattedAddress,
        gymScore, hikeTrailScore, history, hospitalScore, lat,
        lng, parkScore, restaurantScore, safetyScore, schoolScore, supermarketScore]); // Dependency Array

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