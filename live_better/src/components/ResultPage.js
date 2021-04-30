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

    var safetyCount = history.location.state.query.Arrest_Count;
    var atmCount = history.location.state.query.atm;
    var bikeCount = history.location.state.query.bike_trail;
    var busCount = history.location.state.query.bus_station;
    var gymCount = history.location.state.query.gym;
    var hikeCount = history.location.state.query.hike_trail;
    var hospitalCount = history.location.state.query.hospital;
    var restaurantCount =history.location.state.query.restaurant;
    var supermarketCount = history.location.state.query.supermarket;
    var schoolCount = history.location.state.park_school[0].School_Count;
    var parkCount = history.location.state.park_school[0].Park_Count;


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