import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {
    FaVoicemail, FaGraduationCap, FaBiking, FaShoppingCart,
    FaBus, FaDollarSign, FaHiking, FaHospital, FaDumbbell,
    FaUtensils, FaCloudSun
} from 'react-icons/fa';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

function ResultPageTrial() {

    var history = useHistory();

    // Input latitude and longitude
    var lat = history.location.state.lat;
    var lng = history.location.state.lng;

    //******************* User weights *******************
    const [userSafety, setUserSafety] = useState(history.location.state.safetyScore);
    const [userRestaurant, setUserRestaurant] = useState(history.location.state.restaurantScore);
    const [userSchool, setUserSchool] = useState(history.location.state.schoolScore);
    const [userBus, setUserBus] = useState(history.location.state.busstationScore);
    const [userAtm, setUserAtm] = useState(history.location.state.atmScore);
    const [userSupermarket, setUserSupermarket] = useState(history.location.state.supermarketScore);
    const [userPark, setUserPark] = useState(history.location.state.parkScore);
    const [userGym, setUserGym] = useState(history.location.state.gymScore);
    const [userHospital, setUserHospital] = useState(history.location.state.hospitalScore);
    const [userHike, setUserHike] = useState(history.location.state.hikeTrailScore);
    const [userBike, setUserBike] = useState(history.location.state.bikeTrailScore);

    const safetyScoreFunction = (event, newValue) => {
        console.log("Setting score to", newValue);
        setUserSafety(newValue);
    }

    const restaurantScoreFunction = (event, newValue) => {
        setUserRestaurant(newValue);
    }
    const schoolScoreFunction = (event, newValue) => {
        setUserSchool(newValue);
    }

    const busStationScoreFunction = (event, newValue) => {
        setUserBus(newValue);
    }

    const atmScoreFunction = (event, newValue) => {
        setUserAtm(newValue);
    }

    const supermarketScoreFunction = (event, newValue) => {
        setUserSupermarket(newValue);
    }

    const parkScoreFunction = (event, newValue) => {
        setUserPark(newValue);
    }

    const gymScoreFunction = (event, newValue) => {
        setUserGym(newValue);
    }

    const hospitalScoreFunction = (event, newValue) => {
        setUserHospital(newValue);
    }

    const hikeTrailScoreFunction = (event, newValue) => {
        setUserHike(newValue);
    }

    const bikeTrailScoreFunction = (event, newValue) => {
        setUserBike(newValue);
    }

    // **************** End ofUser Weights *****************************

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
    var arrestSliderHTML = <div></div>

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

    // **** Theme For Slider *****
    const marks = [
        { value: 0, label: '0' },
        { value: 1, label: '' },
        { value: 2, label: '' },
        { value: 3, label: '' },
        { value: 4, label: '' },
        { value: 5, label: '5' },
        { value: 6, label: '' },
        { value: 7, label: '' },
        { value: 8, label: '' },
        { value: 9, label: '' },
        { value: 10, label: '10' },

    ]

    const muiTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    height: 24,
                    width: 24,
                    marginTop: -8,
                    marginLeft: -12,
                    backgroundColor: '#fff',
                    border: '2px solid green',
                },
                track: {
                    color: '#32CD32',
                    height: 8,
                    borderRadius: 4,
                },
                rail: {
                    color: 'grey',
                    height: 8,
                    borderRadius: 4,
                },
                valueLabel: {
                    color: 'green',
                    left: 'calc(-50% + 4px)',
                },
            }
        }
    });

    // **** End Theme For Slider *****

    // Only shows Arrest count for Chicago Database
    if (safetyCount) {
        arrestHTML = <div class='col-3'>
            <div class='row mt-3 justify-content-center'>
                <p><FaVoicemail class='result-icon' />  {safetyCount} Arrests</p>
            </div>
        </div>

        // Only Show Arest Slider if data is available
        arrestSliderHTML = <div class='row justify-content-center'>
            <div class='col-4'>
                <ThemeProvider theme={muiTheme}>
                    <Typography id="discrete-slider">
                        Safety
        </Typography>
                    <Slider
                        defaultValue={userSafety}
                        aria-labelledby="discrete-slider-small-steps"
                        marks={marks}
                        min={0}
                        max={10}
                        valueLabelDisplay="auto"
                        onChange={safetyScoreFunction}
                        disabled={true}
                    />
                </ThemeProvider>
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

        // User weights
        var safetyScore = userSafety;
        var restaurantScore = userRestaurant
        var schoolScore = userSchool;
        var busstationScore = userBus;
        var atmScore = userAtm;
        var supermarketScore = userSupermarket;
        var parkScore = userPark;
        var gymScore = userGym;
        var hospitalScore = userHospital;
        var hikeTrailScore = userHike;
        var bikeTrailScore = userBike;

        // Calculate Total Weights User Inputs
        var totalScore = restaurantScore + schoolScore + busstationScore + atmScore + safetyScore +
            supermarketScore + parkScore + gymScore + hospitalScore + hikeTrailScore + bikeTrailScore;

        // If User Doesn't Input Weights, set them all to 10
        if (totalScore === 0) {
            safetyScore = 10;
            restaurantScore = 10;
            schoolScore = 10;
            busstationScore = 0;
            atmScore = 0;
            supermarketScore = 0;
            parkScore = 0;
            gymScore = 0;
            hospitalScore = 0;
            hikeTrailScore = 0;
            bikeTrailScore = 0;

            totalScore = 30;
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
        } else {
            setColor("success");
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
        console.log('Recalculated Location Score.');
    }, [userSafety, userRestaurant, userSchool, userBus, userAtm, userSupermarket,
        userPark, userGym, userHospital, userHike, userBike,
    ]);



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
                    <NavDropdown title={"Login"} id="nav-dropdown">
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <div id="content-wrap" class='container'>
                <div class='row mt-5 justify-content-center'>
                    <h1>Location Score - Trial</h1>
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
                            <p><FaBiking class='result-icon' />  <span id='blur'>{bikeCount}</span> Bike Trails</p>
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
                            <p><FaBus class='result-icon' />  <span id='blur'>{busCount}</span> Bus Stops</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaDollarSign class='result-icon' />  <span id='blur'>{atmCount}</span> ATMs</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaShoppingCart class='result-icon' />  <span id='blur'>{supermarketCount}</span> Supermarkets</p>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class='row mt-3 justify-content-center'>
                            <p><FaCloudSun class='result-icon' />  <span id='blur'>{parkCount}</span> Parks</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaDumbbell class='result-icon' />  <span id='blur'>{gymCount}</span> Gyms</p>
                        </div>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaHospital class='result-icon' />  <span id='blur'>{hospitalCount}</span> Hospitals</p>
                        </div>
                    </div>
                </div>
                <div class='row justify-content-center'>
                    <div class='col-3'>
                        <div class='row mt-3 justify-content-center'>
                            <p><FaHiking class='result-icon' />  <span id='blur'>{hikeCount}</span> Hike Trails</p>
                        </div>
                    </div>
                    {arrestHTML}
                </div>

                <div class="row m-5 justify-content-center">
                    <Link to="/portal-trial">
                        <Button variant="success btn-lg rounded-pill" >Check Another Location</Button>
                    </Link>
                </div>

                {safetyNote}
                <div class='row mt-5 justify-content-center'>
                    <h2>Login to try out different parameters!</h2>
                </div>
                <div class='row mt-1 justify-content-center'>
                    <div class='col-4'>
                        <ThemeProvider theme={muiTheme}>
                            <Typography id="discrete-slider">
                                Restaurants
                            </Typography>
                            <Slider
                                defaultValue={userRestaurant}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={restaurantScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Schools
                            </Typography>
                            <Slider
                                defaultValue={userSchool}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={schoolScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Bus Stations
                            </Typography>
                            <Slider
                                defaultValue={userBus}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={busStationScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                ATMs
                            </Typography>
                            <Slider
                                defaultValue={userAtm}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={atmScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Bike Trails
                            </Typography>
                            <Slider
                                defaultValue={userBike}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={bikeTrailScoreFunction}
                                disabled={true}
                            />
                        </ThemeProvider>
                    </div>
                    <div class='col-1'></div>
                    <div class='col-4'>
                        <ThemeProvider theme={muiTheme}>

                            <Typography id="discrete-slider">
                                Supermarkets
                            </Typography>
                            <Slider
                                defaultValue={userSupermarket}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={supermarketScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Parks
                            </Typography>
                            <Slider
                                defaultValue={userPark}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={parkScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Gyms
                            </Typography>
                            <Slider
                                defaultValue={userGym}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={gymScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Hospitals
                            </Typography>
                            <Slider
                                defaultValue={userHospital}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={hospitalScoreFunction}
                                disabled={true}
                            />
                            <Typography id="discrete-slider">
                                Hike Trails
                            </Typography>
                            <Slider
                                defaultValue={userHike}
                                aria-labelledby="discrete-slider-small-steps"
                                marks={marks}
                                min={0}
                                max={10}
                                valueLabelDisplay="auto"
                                onChange={hikeTrailScoreFunction}
                                disabled={true}
                            />

                        </ThemeProvider>
                    </div>
                </div>
                {arrestSliderHTML}


                <div class="row mt-5 justify-content-center">
                    <div class='col-4 p-3'>
                        <h3>Like what you see?</h3>
                    </div>
                </div>

                <div class="row mt-2 mb-5 justify-content-center">
                    <div class='col-2'>
                        <Link to="/login"><Button variant="success btn-block" >Login</Button></Link>
                    </div>
                    <div class='col-2'>
                        <Link to="/signup"><Button variant="success btn-block" className="signup-button">Signup</Button></Link>
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

export default ResultPageTrial