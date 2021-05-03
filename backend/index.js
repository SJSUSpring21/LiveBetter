const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ['GET', "POST"],
    credentials:true
}));

//middleware
app.use(express.json());

//model
const User = require('./model/user');

//connecting to db
//connecting to db
var ibmdb = require('ibm_db');
var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-08.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=tnd75634;PWD=mc2xp68xqn9+dbx0;PROTOCOL=TCPIP"

mongoose.connect(
    'mongodb+srv://varun:varun123@cluster0.hmh9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false})
    .then(()=>{
        console.log("connected to db");
    })



app.get('/',(req,res)=>{
    console.log("Backend Connected");
    res.send("Backend connected");
});

//import routes
app.use(require('./routes/auth'));


//Saving the score

app.post('/savescore',(req,res)=>{
    let {address, score,email} = req.body;
    console.log(address, score, email);

    const data = {
        address: address,
        score: score
    }
    User.findOneAndUpdate({email:email},{
        $push:{
            results: data
        }
    },function(error, result){
        if(error){
            console.log(error);
        }else{
            console.log(result);
            res.status(200).json({message:"Data is saved!"});
        }
    })

    
})

app.post('/getscores',(req,res)=>{
    let {email} = req.body;
    console.log(email);

    User.find({email:email},
        function(error, result){
        if(error){
            console.log(error);
        }else{
            console.log(result[0].results);
            res.status(200).json({scores:result[0].results});
        }
    })

    
})



//IBM
//***************************** For IBM DB2 **************************** */

// Input is lat and lng values
// Returns row for nearest Chicago location from our 
// Example: localhost:3001/schools/count?lat=37.330401&lng=-121.839181
app.post('/chicago', (req, res) => {

    // var input_lat = req.query.lat;
    // var input_lng = req.query.lng;
    var input_lat = req.body.lat;
    var input_lng = req.body.lng;
    console.log(input_lat);
    console.log(input_lng);
    var table = 'Data'

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)

    /*
    query_string = `SELECT *, 
        SQRT((("lat" - ${input_lat})*("lat" - ${input_lat}) 
        + ("lng" - ${input_lng})* ("lng" - ${input_lng}))) as "DISTANCE" 
        FROM ${table} 
        ORDER BY DISTANCE ASC 
        LIMIT 1`
    */

    query_string =  get_query_string(input_lat, input_lng, table, 5, 1)

    ibmdb.open(connStr).then(
        conn => {
            conn.query(query_string).then(
                data => {
                    res.send(data[0])
                    conn.close(function () {
                        console.log('Query is complete for Chicago data.');
                    });

                }, err => {
                    console.log(err);
                    console.log("Error while querying chicago databse")
                }
            )
        }, err => {
            console.log(err);
            console.log("Error while connecting to database.");
        }
    )
});

function get_query_string(input_lat, input_lng, table, radius_miles, limit) {
    var distance_unit = (69.0).toFixed(2)
    query_string = `SELECT * 
        FROM ( 
        SELECT *, 
        ${distance_unit} 
        * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(${input_lat})) 
        * COS(RADIANS("lat")) 
        * COS(RADIANS(${input_lng} - "lng")) 
        + SIN(RADIANS(${input_lat})) 
        * SIN(RADIANS("lat"))))) AS distance 
        FROM ${table} 
        WHERE "lat" 
        BETWEEN ${input_lat}  - (${radius_miles} / ${distance_unit}) 
        AND ${input_lat}  + (${radius_miles} / ${distance_unit}) 
        AND "lng" 
        BETWEEN ${input_lng} - (${radius_miles} / (${distance_unit} * COS(RADIANS(${input_lat})))) 
        AND ${input_lng} + (${radius_miles} / (${distance_unit} * COS(RADIANS(${input_lat})))) 
        ) AS d 
        WHERE distance <= ${radius_miles} 
        ORDER BY distance 
        LIMIT ${limit}`;

    return query_string;
}


app.listen(3001, ()=>{
    console.log("Server Up and running");
});