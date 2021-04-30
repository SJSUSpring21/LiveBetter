import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown, Image } from 'react-bootstrap';
import axios from 'axios';
import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import skyline from '../components/images/skyline.png';
import globephoto from './images/third.svg'

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

    // Only shows Arrest count for Chicago Database
    if (safetyCount) {
        arrestHTML = <div class='col-2'>
            <div class='row mt-2 justify-content-center'>
                <p><FaVoicemail class='result-icon' /> {safetyCount} Arrests</p>
            </div>
        </div>
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
                <div class='row justify-content-center'><h1 className="heading">100</h1></div>

                <div class='row mt-5 justify-content-center'>
                    <div class="col-2">
                        <div class='row mt-2 justify-content-center'>
                            <p><FaBiking class='result-icon' /> {bikeCount} Bike Trails</p>
                        </div>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaUtensils class='result-icon' /> {restaurantCount} Restaurants</p>
                        </div>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaGraduationCap class='result-icon' /> {schoolCount} Schools</p>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class='row mt-2 justify-content-center'>
                            <p><FaBus class='result-icon' /> {busCount} Bus Stops</p>
                        </div>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaDollarSign class='result-icon' /> {atmCount} ATMs</p>
                        </div>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaShoppingCart class='result-icon' /> {supermarketCount} Supermarkets</p>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class='row mt-2 justify-content-center'>
                            <p><FaCloudSun class='result-icon' /> {parkCount} Parks</p>
                        </div>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaDumbbell class='result-icon' /> {gymCount} Gyms</p>
                        </div>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaHospital class='result-icon' /> {hospitalCount} Hospitals</p>
                        </div>
                    </div>
                </div>
                <div class='row justify-content-center'>
                    <div class='col-2'>
                        <div class='row mt-2 justify-content-center'>
                            <p><FaHiking class='result-icon' /> {hikeCount} Hike Trails</p>
                        </div>
                    </div>
                    {arrestHTML}
                </div>

                <div class="row m-5 justify-content-center">
                    <Link to="/portal">
                        <Button variant="success btn-lg rounded-pill" >Check Another Location</Button>
                    </Link>
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