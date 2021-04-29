import React from 'react';
import { Navbar, Nav, Button, Row, Col, Image, NavDropdown, Form, Modal } from 'react-bootstrap/esm';
import globephoto from './images/third.svg'
import '../index.css';
import { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import skyline from '../components/images/skyline.png';


function PortalPage() {
    const history = useHistory();
    const [address, setAdderess] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        console.log(results);
        const latLng = await getLatLng(results[0]);
        console.log(latLng);
        setAdderess(value);
        setCoordinates(latLng);
        handleShow();

    }

    // Slider
    const useStyles = makeStyles({
        root: {
            width: 400,
        },
    });

    const classes = useStyles();

    // states for filters
    const [safetyScore, changeSafetyScore] = useState(0);
    const [restaurantScore, changeRestaurantScore] = useState(0);
    const [schoolScore, changeSchoolScore] = useState(0);
    const [busstationScore, changeBusStationScore] = useState(0);
    const [atmScore, changeAtmScore] = useState(0);
    const [supermarketScore, changeSuperMarketScore] = useState(0);
    const [parkScore, changeParkScore] = useState(0);
    const [gymScore, changeGymScore] = useState(0);
    const [hospitalScore, changeHospitalScore] = useState(0);
    const [hikeTrailScore, changeHikeTrailScore] = useState(0);
    const [bikeTrailScore, changeBikeTrailScore] = useState(0);


    const safetyScoreFunction = (event, newValue) => {
        changeSafetyScore(newValue);
    }

    const restaurantScoreFunction = (event, newValue) => {
        changeRestaurantScore(newValue);
    }
    const schoolScoreFunction = (event, newValue) => {
        changeSchoolScore(newValue);
    }

    const busStationScoreFunction = (event, newValue) => {
        changeBusStationScore(newValue);
    }

    const atmScoreFunction = (event, newValue) => {
        changeAtmScore(newValue);
    }

    const supermarketScoreFunction = (event, newValue) => {
        changeSuperMarketScore(newValue);
    }

    const parkScoreFunction = (event, newValue) => {
        changeParkScore(newValue);
    }

    const gymScoreFunction = (event, newValue) => {
        changeGymScore(newValue);
    }

    const hospitalScoreFunction = (event, newValue) => {
        changeHospitalScore(newValue);
    }

    const hikeTrailScoreFunction = (event, newValue) => {
        changeHikeTrailScore(newValue);
    }

    const bikeTrailScoreFunction = (event, newValue) => {
        changeBikeTrailScore(newValue);
    }

    // state sends all user input values to result page
    const getResults = () => {
        history.push({
            pathname: '/result',
            state: {
                lat: coordinates.lat,
                lng: coordinates.lng,
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
                bikeTrailScore: bikeTrailScore
            }
        });
    }

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

    return (
        <div>
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
            <div className="portal-main">
                <div class="row m-3 justify-content-center">
                    <h1 className="heading">Live<span class='text-success'>B</span>etter</h1>
                </div>
                <Row className="prow1">
                    <Col></Col>
                </Row>
                <Row>
                    <Col className="pheading">
                        <h1>Get Your Score</h1>
                        <br />
                        <Row>
                            <Col></Col>
                            <Col>
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={setAdderess}
                                    onSelect={handleSelect}>
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                                        return (
                                            <div>
                                                <p>Latitude:{coordinates.lat}</p>
                                                <p>Longitude:{coordinates.lng}</p>
                                                <Form.Control
                                                    {...getInputProps({ placeholder: "Type Address" })}
                                                />

                                                <div>
                                                    {loading ? <div>...loading</div> : null}

                                                    {suggestions.map((suggestion) => {
                                                        const style = {
                                                            backgroundColor: suggestion.active ? "#08ffc8" : "#ffffff"
                                                        }
                                                        return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    }}
                                </PlacesAutocomplete>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>How Much do You Care About Each Topic?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className={classes.root}>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Safety
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={safetyScore}
                                                    onChange={safetyScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />
                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Restaurant
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={restaurantScore}
                                                    onChange={restaurantScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    School
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={schoolScore}
                                                    onChange={schoolScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Bus Station
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={busstationScore}
                                                    onChange={busStationScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    ATM
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={atmScore}
                                                    onChange={atmScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    SuperMarket
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={supermarketScore}
                                                    onChange={supermarketScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Park
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={parkScore}
                                                    onChange={parkScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Gym
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={gymScore}
                                                    onChange={gymScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Hospital
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={hospitalScore}
                                                    onChange={hospitalScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Hike Trail
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={hikeTrailScore}
                                                    onChange={hikeTrailScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />
                                            </div>

                                            <div>
                                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                                    Bike Trail
                                            </Typography>
                                                <Slider
                                                    defaultValue={0}
                                                    value={bikeTrailScore}
                                                    onChange={bikeTrailScoreFunction}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={1}
                                                    marks={marks}
                                                    min={0}
                                                    max={10}
                                                    valueLabelDisplay="auto"
                                                />

                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                </Button>
                                        <Button variant="primary" onClick={getResults}>
                                            Get Score
                                </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Col>
                </Row>

                <div class='row mt-5'>
                    <div class="col d-flex justify-content-center">
                        <Image className="globeImage"
                            src={globephoto} />
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

export default PortalPage
