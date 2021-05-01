import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown, Image } from 'react-bootstrap';
import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import skyline from '../components/images/skyline.png';
import globephoto from './images/third.svg';
import {
    FaVoicemail, FaGraduationCap, FaBiking, FaShoppingCart,
    FaBus, FaDollarSign, FaHiking, FaHospital, FaDumbbell,
    FaUtensils, FaCloudSun
} from 'react-icons/fa';

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

    var safetyCount = history.location.state.query.Arrest_Count;
    var atmCount = history.location.state.query.atm;
    var bikeCount = history.location.state.query.bike_trail;
    var busCount = history.location.state.query.bus_station;
    var gymCount = history.location.state.query.gym;
    var hikeCount = history.location.state.query.hike_trail;
    var hospitalCount = history.location.state.query.hospital;
    var restaurantCount = history.location.state.query.restaurant;
    var supermarketCount = history.location.state.query.supermarket;
    var schoolCount = history.location.state.park_school[0].School_Count;
    var parkCount = history.location.state.park_school[0].Park_Count;

    var arrestHTML = <div></div>
    var safetyNote = <div></div>

    const [isLoading, setLoading] = useState(true);

    // Only shows Arrest count for Chicago Database
    if (safetyCount) {
        arrestHTML = <div class='col-3'>
            <div class='row mt-3 justify-content-center'>
                <p><FaVoicemail class='result-icon' />  {safetyCount} Arrests</p>
            </div>
        </div>
    } else {
        safetyNote = <div class='row mt-5 justify-content-center'>
            <div class='col-6  alert alert-danger' role='alert'>
                Unfortunately, we only have safety data for locations in Chicago.
                Your location score was calculated without considering crime statistics.
            </div>
        </div>
    }

    const [livabilityScore, setScore] = useState(0);
    useEffect(() => {
        // Calculate Score - doesn't include arrest counts
        var totalScore = restaurantScore + schoolScore + busstationScore + atmScore + safetyScore +
            supermarketScore + parkScore + gymScore + hospitalScore + hikeTrailScore + bikeTrailScore;

        // All Weights set to, make all weights equal as default
        if (totalScore == 0) {
            safetyScore = 10;
            restaurantScore = 10;
            schoolScore = 10;
            busstationScore = 10;
            atmScore = 10;
            supermarketScore = 10;
            parkScore = 10;
            gymScore = 10;
            hospitalScore = 10;
            hikeTrailScore = 10;
            bikeTrailScore = 10;

            totalScore = 110;
        } 

        var arrestCount = safetyCount;
        // Don't take into consideration the safety score
        if (!arrestCount) {
            totalScore -= safetyScore;
            safetyScore = 0;
            arrestCount = 0;

            // This line prevents a division by 0
            if(totalScore == 0){
                totalScore = 1;
            }
        }

        var safeWeight = arrestCount / 100.0;
        if (safeWeight >= 1) { safeWeight = 1.0; }
        //invert arrest count since more arrest is negative
        safeWeight = (1 - safeWeight); 

        var atmWeight = atmCount / 20.0;

        var bikeWeight = bikeCount / 5.0;
        if (bikeWeight >= 1) { bikeWeight = 1; }

        var busWeight = busCount / 10.0;
        if (busWeight >= 1) { busWeight = 1; }

        var gymWeight = gymCount / 10.0;
        if (gymWeight >= 1) { gymWeight = 1; }

        var hikeWeight = hikeCount / 5.0;
        if (hikeWeight >= 1) { hikeWeight = 1; }

        var hospitalWeight = hospitalCount / 3.0;
        if (hospitalWeight >= 1) { hospitalWeight = 1; }

        var restaurantWeight = restaurantCount / 20.0;

        var supermarketWeight = supermarketCount / 10.0;
        if (supermarketWeight >= 1) { supermarketWeight = 1; }

        var schoolWeight = schoolCount / 20.0;

        var parkWeight = parkCount / 5.0;
        if (parkWeight >= 1) { parkWeight = 1; }

        // Take Weighted average of all scores
        var score = restaurantScore / totalScore * restaurantWeight +
            schoolScore / totalScore * schoolWeight +
            busstationScore / totalScore * busWeight +
            atmScore / totalScore * atmWeight +
            supermarketScore / totalScore * supermarketWeight +
            parkScore / totalScore * parkWeight +
            gymScore / totalScore * gymWeight +
            hospitalScore / totalScore * hospitalWeight +
            hikeTrailScore / totalScore * hikeWeight +
            bikeTrailScore / totalScore * bikeWeight +
            safetyScore / totalScore * safeWeight;

        score = Math.round(score * 100);
        setScore(score);
        setLoading(false);
    }, []);

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <div class='main-section full-screen-div'>
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
                <div class='row mt-5 justify-content-center'>
                    <h1>Location Score</h1>
                </div>
                <div class='row justify-content-center'><h1 className="heading">{livabilityScore}</h1></div>
                <div class='row mt-5 justify-content-center'>
                </div>
                <div class='row mt-5 justify-content-center'>
                    <div class="col-3">
                        <div class='row mt-3 justify-content-center'>
                            <p><FaBiking class='result-icon' />  {bikeCount} Bike Trails</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaUtensils class='result-icon' />  {restaurantCount} Restaurants</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaGraduationCap class='result-icon' />  {schoolCount} Schools</p>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class='row mt-3 justify-content-center'>
                            <p><FaBus class='result-icon' />  {busCount} Bus Stops</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaDollarSign class='result-icon' />  {atmCount} ATMs</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaShoppingCart class='result-icon' />  {supermarketCount} Supermarkets</p>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class='row mt-3 justify-content-center'>
                            <p><FaCloudSun class='result-icon' />  {parkCount} Parks</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaDumbbell class='result-icon' />  {gymCount} Gyms</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaHospital class='result-icon' />  {hospitalCount} Hospitals</p>
                        </div>
                    </div>
                </div>
                <div class='row justify-content-center'>
                    <div class='col-3'>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaHiking class='result-icon' />  {hikeCount} Hike Trails</p>
                        </div>
                    </div>
                    {arrestHTML}
                </div>

                <div class="row m-5 justify-content-center">
                    <Link to="/portal">
                        <Button variant="success btn-lg rounded-pill" >Check Another Location</Button>
                    </Link>
                </div>

                {safetyNote}
            </div>


            <div class="row  mt-5">
                <Image class='mt-auto mx-auto'
                    src={skyline} />
            </div>

        </div>
    )

}

export default ResultPage