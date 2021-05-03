import React, { useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Navbar,Nav,Button, Row, Col, NavDropdown, Container, ProgressBar} from 'react-bootstrap/esm';
import Spinner from 'react-bootstrap/Spinner'
import {useState} from 'react';
import '../index.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    FaVoicemail, FaGraduationCap, FaBiking, FaShoppingCart,
    FaBus, FaDollarSign, FaHiking, FaHospital, FaDumbbell,
    FaUtensils, FaCloudSun
} from 'react-icons/fa';

import {Link} from 'react-router-dom';


function ResultPage(props) {
    const history = useHistory();
    const location = useLocation();
    const [isLoading, setLoading] = useState(true);
    const [query_results, setQueryResults] = useState();
    let safetyScore = 0;

    //const[safetyScore, changeSafetyScore]= useState(location.state.safetyScore);
    const [restaurantScore, changeRestaurantScore] = useState(location.state.restaurantScore);
    const[schoolScore, changeSchoolScore]= useState(location.state.schoolScore);
    const[busstationScore, changeBusStationScore]= useState(location.state.busstationScore);
    const[atmScore, changeAtmScore]= useState(location.state.atmScore);
    const[supermarketScore, changeSuperMarketScore]= useState(location.state.supermarketScore);
    const[parkScore, changeParkScore]= useState(location.state.parkScore);
    const[gymScore, changeGymScore]= useState(location.state.gymScore);
    const[hospitalScore, changeHospitalScore]= useState(location.state.hospitalScore);
    const[hikeTrailScore, changeHikeTrailScore]= useState(location.state.hikeTrailScore);
    const[bikeTrailScore, changeBikeTrailScore]= useState(location.state.bikeTrailScore);
    const[formattedAddress, setFormattedAddress] = useState(location.state.formattedAddress);

    //Count
    const [safetyCount,setSafetyCount] = useState(0);
    const [restaurantCount,setRestaurantCount] = useState(0);
    const [schoolCount,setSchoolCount] = useState(0);
    const [busstationCount,setBusStationCount] = useState(0);
    const [atmCount,setAtmCount] = useState(0);
    const [supermarketCount,setSuperMarketCount] = useState(0);
    const [parkCount,setParkCount] = useState(0);
    const [gymCount,setGymCount] = useState(0);
    const [hospitalCount,setHospitalCount] = useState(0);
    const [hikeTrailCount,setHikeTrailCount] = useState(0);
    const [bikeTrailCount,setBikeTrailCount] = useState(0);


    const[finalScore, SetFinalScore]= useState();

    //changes
    const [barColor, setColor] = useState("success");
    
    // Changed if arrest data is available
    var arrestHTML = <div></div>

    // Changed if arrest data not available
    var safetyNote = <div></div>


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
    

    useEffect(()=>{
        console.log(location);
    
        const data = {
            lat:location.state.lat,
            lng:location.state.lng
        }
        axios.post(`http://localhost:3001/chicago`,data)
                    .then(res => {

                        setQueryResults(res.data);

                        if (res.data.length === 0) {
                            console.log("Chicago Data Query came up empty...")

                            // Maybe we can use Google Places API here 
                        }
                        console.log("Chicago Data");
                        console.log(res.data);

                        let userScoreSum = safetyScore + restaurantScore + schoolScore + busstationScore + atmScore + supermarketScore + parkScore + gymScore + hospitalScore + hikeTrailScore +bikeTrailScore;
                        console.log("User Score Sum:"+userScoreSum);
                        if(userScoreSum){
                            //set everything to Zero
                        }

                        safetyScore = 0 - location.state.safetyScore;
                        console.log(safetyScore);
                        
                        let weights= [];
                        weights.push(safetyScore);
                        weights.push(restaurantScore);
                        weights.push(schoolScore);
                        weights.push(busstationScore);
                        weights.push(atmScore);
                        weights.push(supermarketScore);
                        weights.push(parkScore);
                        weights.push(gymScore);
                        weights.push(hospitalScore);
                        weights.push(hikeTrailScore);
                        weights.push(bikeTrailScore);
                        console.log(weights);
                        //step 1 aresst count if > 100 then = 100
                        //step 2 add 11 features
                        //step 2.1 get weigths for every user input put it an array //weights array
                        //step 3 separate out 10 score for every feature
                        // step 4 put every feature in an array
                        // step 5 step 2.1 * step 4 then add
                        var safetyCount = res.data.Arrest_Count;
                        var atmCount = res.data.atm;
                        var bikeTrailCount = res.data.bike_trail;
                        var busStationCount = res.data.bus_station;
                        var gymCount = res.data.gym;
                        var hikeTrailCount = res.data.hike_trail;
                        var hospitalCount  = res.data.hospital;
                        var restaurantCount = res.data.restaurant;
                        var supermarketCount = res.data.supermarket;
                        var schoolCount = res.data.school;
                        var parkCount = res.data.park;

                        setSafetyCount(res.data.Arrest_Count);
                        setRestaurantCount(res.data.restaurant);
                        setSchoolCount(res.data.school);
                        setBusStationCount(res.data.bus_station);
                        setAtmCount(res.data.atm);
                        setSuperMarketCount(res.data.supermarket);
                        setParkCount(res.data.park);
                        setGymCount(res.data.gym);
                        setHospitalCount(res.data.hospital);
                        setHikeTrailCount(res.data.hike_trail);
                        setBikeTrailCount(res.data.bike_trail);

                        if(safetyCount > 100){
                            safetyCount = 100;
                        }

                        for(let i = 0; i < weights.length; i++){
                            weights[i] = weights[i] / userScoreSum;
                        }
                        console.log(weights); // weights

                        let features = [];

                        features.push((safetyCount /100) * 10);
                        features.push((restaurantCount/20)* 10);
                        features.push((schoolCount/20)* 10);
                        features.push((busStationCount/20)* 10);
                        features.push((atmCount/20)* 10);
                        features.push((supermarketCount/20)* 10);
                        features.push((parkScore/20)* 10);
                        features.push((gymCount/20)* 10);
                        features.push((hospitalCount/20)* 10);
                        features.push((parkCount /20)* 10);
                        features.push((hikeTrailCount/20)* 10);
                        features.push((bikeTrailCount/20)* 10);
                        console.log(features);
                        
                        let totalScore = 0;

                        for(let i = 0; i< weights.length; i++){
                            totalScore += (weights[i]*features[i]);
                        }
                        console.log(totalScore);
                        if(totalScore > 8){
                            setColor("succes");
                        }else if (totalScore >4 && totalScore < 8){
                            setColor("warning");
                        }else{
                            setColor("danger");
                        }
                        if(totalScore < 1){
                            totalScore = 1.0;
                        }
                        if(totalScore >= 10){
                            totalScore= 10;
                        }
                        SetFinalScore(totalScore);
                        const results = {
                            address: formattedAddress,
                            score:totalScore,
                            email: localStorage.getItem('email')
                        }
                        axios.post('http://localhost:3001/savescore',results)
                            .then(response=>{
                                console.log(response);
                                console.log(response.data.message);

                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                        setTimeout(()=>{
                            setLoading(false);
                        },1000);

 
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
    },[location])
    if(isLoading){
        return(
            <div>
                <Container>
                    <Row className="loading-row1">
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<Spinner animation="border" variant="success" />
                            <h3>Your results are loading</h3>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
                
            </div>
        )
    }else{
        
        return (
            <div>
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
                
                <Row>
                    <Col></Col>
                    <Col>
                    <div>
                        <div class='row mt-10 justify-content-center'>
                            <h1>Location Score</h1>
                        </div>
                        <div class='row justify-content-center'><h1 className="heading">{finalScore.toFixed(2)}</h1></div>
                        <div class='row justify-content-center'>
                            <div class='col-10'>
                                <ProgressBar variant={barColor} now={(finalScore/10)*100} />
                            </div>
                        </div>
                    </div>
                    <div class='container'>
                

                    <div class='row mt-5 justify-content-center'>
                        <div class="col-4">
                            <div class='row mt-3 justify-content-center'>
                                <p><FaBiking class='result-icon' />  {bikeTrailCount} Bike Trails</p>
                            </div>
                            <div class='row mt-3 justify-content-center'>
                                <p><FaUtensils class='result-icon' />  {restaurantCount} Restaurants</p>
                            </div>
                            <div class='row mt-3 justify-content-center'>
                                <p><FaGraduationCap class='result-icon' />  {schoolCount} Schools</p>
                            </div>
                        </div>
    
                        <div class="col-4">
                            <div class='row mt-3 justify-content-center'>
                                <p><FaBus class='result-icon' />  {busstationCount} Bus Stops</p>
                            </div>
                            <div class='row mt-3 justify-content-center'>
                                <p><FaDollarSign class='result-icon' />  {atmCount} ATMs</p>
                            </div>
                            <div class='row mt-3 justify-content-center'>
                                <p><FaShoppingCart class='result-icon' />  {supermarketCount} Supermarkets</p>
                            </div>
                        </div>
    
                        <div class="col-4">
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
                                <p><FaHiking class='result-icon' />  {hikeTrailCount} Hike Trails</p>
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

                        
                        
                    </Col>
                    <Col></Col>
                </Row>
                
            </div>
        )
    }
    
}

export default ResultPage
