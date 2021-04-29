import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown, Image } from 'react-bootstrap';
import axios from 'axios';
import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import skyline from '../components/images/skyline.png';
import globephoto from './images/third.svg'

//class ResultPage extends React.Component{
function ResultPage() {


    var history = useHistory();

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

    var safetyCount = "None";
    var safetyCount = "None";
    var atmCount = "None";
    var bikeCount = "None";
    var busCount = "None";
    var gymCount = "None";
    var hikeCount = "None";
    var hospitalCount = "None";
    var restaurantCount = "None";
    var supermarketCount = "None";
    var schoolCount = "None";
    var parkCount = "None";

    const [query_results, setQueryResults] = useState();
    const [parks_schools, setParkSchoolQuery] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isChicago, setChicago] = useState(false)

    useEffect(() => {
        // Query Database For Parks and Schools
        axios.get(`/queries?lat=${lat}&lng=${lng}&radius=2`)
            .then(res => {
                setParkSchoolQuery(res.data);


                console.log("Park and Schools Data");
                console.log(res.data);
                // Query Chicago Database
                axios.get(`/chicago?lat=${lat}&lng=${lng}`)
                    .then(res => {

                        if (res.data.length === 0) {
                            // Query Google
                            console.log("Chicago Data Query came up empty...")
                            axios.get(`/google-search?lat=${lat}&lng=${lng}`)
                                .then(res => {
                                    console.log("Google Data")
                                    console.log(res.data);
                                    setQueryResults(res.data);
                                    setLoading(false);
                                })
                                .catch(error => {
                                    console.log(error);
                                    setLoading(false);
                                })

                        }
                        else {
                            setChicago(true);
                            setQueryResults(res.data);
                            setLoading(false);
                            console.log("Chicago Data");
                            console.log(res.data);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.log(error);
                console.log("Error While Querying Schools and Parks");
            });

    }, []); // <-- Empty array makes sure this block of code runs exactly once


    //This page will show while accessing the database

    if (isLoading) {

        return (
            <div class='main-section'>
                <Navbar bg="light" variant="light sticky-top">
                    <Navbar.Brand className="logo" href="/">
                        Live<span class='text-success'>B</span>etter
                    </Navbar.Brand>
                    <Nav className="mr-auto"></Nav>

                    <Nav className="ml-auto">
                        <NavDropdown title={localStorage.getItem('Name')} id="nav-dropdown">
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <div class='container'>
                    <div class="row m-3 justify-content-center">
                        <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
                    </div>

                    <div class='row mt-5 justify-content-center'>
                        <div class="col-6 d-flex ">
                            <Image class='img-responsive mx-auto'
                                src={globephoto} />
                        </div>
                    </div>

                    <div class='row mt-5 justify-content-center'>
                        <h2>Please wait while we calculate your score...</h2>
                    </div>

                    <div class="row mt-5 justify-content-center ">
                        <div class="col-4">
                            <Link to="/portal"><Button variant="success btn-block" >Try Another Address</Button></Link>
                        </div>
                    </div>

                    <div class="row fixed-bottom">
                        <Image class='img-responsive mx-auto'
                            src={skyline} />
                    </div>
                </div>
            </div>
        )
    }

    // This Data is from chicago database
    if (isChicago) {
        safetyCount = query_results.Arrest_Count;
    }

    atmCount = query_results.atm;
    bikeCount = query_results.bike_trail;
    busCount = query_results.bus_station;
    gymCount = query_results.gym;
    hikeCount = query_results.hike_trail;
    hospitalCount = query_results.hospital;
    restaurantCount = query_results.restaurant;
    supermarketCount = query_results.supermarket;


    // Uses Park and School Count from data we found
    schoolCount = parks_schools[0].School_Count;
    parkCount = parks_schools[0].Park_Count;

    return (
        <div class='main-section'>
            <Navbar bg="light" variant="light">
                <Navbar.Brand className="logo" href="/">
                    Live<span class='text-success'>B</span>etter
                </Navbar.Brand>
                <Nav className="mr-auto"></Nav>

                <Nav className="ml-auto">
                    <NavDropdown title={localStorage.getItem('Name')} id="nav-dropdown">
                        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <div class='container'>
                <div class="row m-3 justify-content-center">
                    <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
                </div>
                <div class='row mt-3 justify-content-center'>
                    <h1>Location Score</h1>
                </div>
                <div class='row mt-3'>
                    <div class='col'>
                        <h2>Parameters Passed By User</h2>
                        <p>Lat: {lat}</p>
                        <p>Lng: {lng}</p>
                        <p>Safety Score: {safetyScore}</p>
                        <p>Restaurants: {restaurantScore}</p>
                        <p>Schools: {schoolScore}</p>
                        <p>Bus: {busstationScore}</p>
                        <p>ATMs: {atmScore}</p>
                        <p>Supermarkets: {supermarketScore}</p>
                        <p>Parks: {parkScore}</p>
                        <p>Gyms: {gymScore}</p>
                        <p>Hospitals: {hospitalScore}</p>
                        <p>Hike Trails: {hikeTrailScore}</p>
                        <p>Bike Trails: {bikeTrailScore}</p>
                    </div>
                    <div class='col'>
                        <h2>Data From Database</h2>
                        <p>Arrest Count: {safetyCount}</p>
                        <p>Restaurants: {restaurantCount}</p>
                        <p>Schools: {schoolCount}</p>
                        <p>Bus: {busCount}</p>
                        <p>ATMs: {atmCount}</p>
                        <p>Supermarkets: {supermarketCount}</p>
                        <p>Parks: {parkCount}</p>
                        <p>Gyms: {gymCount}</p>
                        <p>Hospitals: {hospitalCount}</p>
                        <p>Hike Trails: {hikeCount}</p>
                        <p>Bike Trails: {bikeCount}</p>
                    </div>
                </div>
                <div class="row">
                    <Link to="/portal"><Button variant="success" >Try Another Address</Button></Link>
                </div>
            </div>


            <div class="row">
                <Image class='img-responsive mx-auto'
                    src={skyline} />
            </div>

        </div>
    )

}

export default ResultPage