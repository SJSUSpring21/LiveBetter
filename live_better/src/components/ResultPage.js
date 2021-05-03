import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown, Image, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {
    FaVoicemail, FaGraduationCap, FaBiking, FaShoppingCart,
    FaBus, FaDollarSign, FaHiking, FaHospital, FaDumbbell,
    FaUtensils, FaCloudSun
} from 'react-icons/fa';

//class ResultPage extends React.Component{
function ResultPage() {

    var history = useHistory();

    // Input latitude and longitude
    var lat = history.location.state.lat;
    var lng = history.location.state.lng;

    // User weights
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

    // Counts from Database or Google
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

    // Changed if arrest data is available
    var arrestHTML = <div></div>

    // Changed if arrest data not available
    var safetyNote = <div></div>

    // change to false at the end of useEffect()
    const [isLoading, setLoading] = useState(true);

    // point values for each individual feature
    const [safety, setSafety] = useState(0);
    const [atm, setAtm] = useState(0);
    const [bike, setBike] = useState(0);
    const [bus, setBus] = useState(0);
    const [gym, setGym] = useState(0);
    const [hike, setHike] = useState(0);
    const [hospital, setHospital] = useState(0);
    const [restaurant, setRestaurant] = useState(0);
    const [supermarket, setSupermarket] = useState(0);
    const [school, setSchool] = useState(0);
    const [park, setPark] = useState(0);

    // Color of progress bar
    const [barColor, setColor] = useState("success");

    // Final Score
    const [livabilityScore, setScore] = useState(0);

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

    useEffect(() => {
        // Calculate Total Weights User Inputs
        var totalScore = restaurantScore + schoolScore + busstationScore + atmScore + safetyScore +
            supermarketScore + parkScore + gymScore + hospitalScore + hikeTrailScore + bikeTrailScore;

        // If User Doesn't Input Weights, set them all to 10
        if (totalScore === 0) {
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
            if (totalScore === 0) {
                totalScore = 1;
            }
        }

        // ******* Set Weights ******************
        // Changing the number you divide by changes the max value
        // for the particular feature
        // e.g bikeWeight = bikeCount / 5.0
        // The above means 5 or more bike trails will give a max score
        // for that feature
        var safeWeight = arrestCount / 100.0;
        if (safeWeight >= 1) { safeWeight = 1.0; }

        //invert arrest count since more arrest is negative
        safeWeight = (1 - safeWeight);

        var atmWeight = atmCount / 20.0;
        if (atmWeight >= 1) { atmWeight = 1; }

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
        if (restaurantWeight >= 1) { restaurantWeight = 1; }

        var supermarketWeight = supermarketCount / 10.0;
        if (supermarketWeight >= 1) { supermarketWeight = 1; }

        var schoolWeight = schoolCount / 20.0;
        if (schoolWeight >= 1) { schoolWeight = 1; }

        var parkWeight = parkCount / 5.0;
        if (parkWeight >= 1) { parkWeight = 1; }


        // ******************** Calculate Score ******************
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

        score = score * 10;
        setScore(score.toFixed(1));


        // Changes color of progress bar
        if (score <= 5) {
            setColor("danger");
        } else if (score <= 7.5) {
            setColor("warning");
        }

        // ************** Individual Scores for each Feautre
        // Sets the point value for each individual variable
        // Might be able to do a breakdown of score?
        setSafety(Math.round(safetyScore / totalScore * safeWeight * 10));
        setAtm(Math.round(atmScore / totalScore * atmWeight * 10));
        setBike(Math.round(bikeTrailScore / totalScore * bikeWeight * 10));
        setBus(Math.round(busstationScore / totalScore * busWeight * 10));
        setGym(Math.round(gymScore / totalScore * gymWeight * 10));
        setHike(Math.round(hikeTrailScore / totalScore * hikeWeight * 10));
        setHospital(Math.round(hospitalScore / totalScore * hospitalWeight * 10));
        setRestaurant(Math.round(restaurantScore / totalScore * restaurantWeight * 10));
        setSupermarket(Math.round(supermarketScore / totalScore * supermarketWeight * 10));
        setSchool(Math.round(schoolScore / totalScore * schoolWeight * 10));
        setPark(Math.round(parkScore / totalScore * parkWeight * 10));


        setLoading(false);
    }, []);

    if (isLoading) {
        return (<div>Loading...</div>)
    }

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

            <div id="content-wrap" class='container'>
                <div class='row mt-5 justify-content-center'>
                    <h1>Location Score</h1>
                </div>
                <div class='row justify-content-center'><h1 className="heading">{livabilityScore}</h1></div>
                <div class='row justify-content-center'>
                    <div class='col-8'>
                        <ProgressBar variant={barColor} now={livabilityScore * 10} />
                    </div>

                </div>
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

            <footer id="footer" class='py-3 bg-dark text-white text-center'>
                <div>
                    Group 12 - Live<span class='text-success'>B</span>etter
                                </div>
            </footer>
        </div>
    )

}

export default ResultPage