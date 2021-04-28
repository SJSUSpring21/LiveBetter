const express = require('express');
const app = express();
const port = 3001;



// npm install --save body-parser
// npm install --save cors
// npm install ibm_db
// npm install mongoose

// The command below runs server
// node index.js

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', "POST"],
    credentials: true
}));

//middleware
app.use(express.json());

//connecting to db
var ibmdb = require('ibm_db');
var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-08.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=tnd75634;PWD=mc2xp68xqn9+dbx0;PROTOCOL=TCPIP"

mongoose.connect(
        'mongodb+srv://varun:varun123@cluster0.hmh9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    .then(() => {
        console.log("connected to db");
    })



app.get('/', (req, res) => {
    console.log("Backend Connected");
    res.send("Backend connected");
});

//import routes
app.use(require('./routes/auth'));


//***************************** For IBM DB2 **************************** */

// Input is lat and lng values
// Returns row for nearest Chicago location from our 
// Example: localhost:3001/schools/count?lat=37.330401&lng=-121.839181
app.get('/chicago', (req, res) => {

    var input_lat = req.query.lat;
    var input_lng = req.query.lng;
    var table = 'Data'

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)
    query_string = `SELECT *, 
        SQRT((("lat" - ${input_lat})*("lat" - ${input_lat}) 
        + ("lng" - ${input_lng})* ("lng" - ${input_lng}))) as "DISTANCE" 
        FROM ${table} 
        ORDER BY DISTANCE ASC 
        LIMIT 1`

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

// Input is lat, lng, radius
// radius is in miles
// Returns count of parks and schools within radius of lat,lng
// Example: localhost:3001/queries?lat=37.330401&lng=-121.839181&radius=2
app.get('/queries', (req, res) => {

    var input_lat = req.query.lat; //user input for latitude
    var input_lng = req.query.lng; //user input for longitude
    var table = ["Parks", "Schools"]; // Define the table to query
    var radius_miles = req.query.radius;

    var query_string_1 = get_query_string_count(input_lat, input_lng, table[0], radius_miles);
    var query_string_2 = get_query_string_count(input_lat, input_lng, table[1], radius_miles);

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)
    ibmdb.open(connStr).then(
        conn => {
            conn.query(query_string_1).then(
                data => {
                    var parks = data[0]["1"]
                    console.log("Query for parks is complete!");
                    if (parks > 20) {
                        parks = 20;
                    }
                    return parks;

                }, err => {
                    res.send(err)
                    console.log("Error on park query.")
                    console.log(err)
                }
            ).then(
                parks => {
                    conn.query(query_string_2).then(
                        data => {
                            var schools = data[0]["1"]
                            if (schools > 20) {
                                schools = 20
                            }
                            var to_send = [{
                                "Park_Count": parks,
                                "School_Count": schools
                            }]

                            res.send(to_send);
                            conn.close(function () {
                                console.log('Query is complete for Parks and Schools.\n');
                            });
                        }, err => {
                            res.send(err)
                            console.log(err)
                            console.log("Error on schools query.")
                            
                        }
                    )
                }
            )
        }, err => {
            console.log(err);
        }
    );
});

// Functions to Query IBM Database
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

function get_query_string_count(input_lat, input_lng, table, radius_miles) {
    var distance_unit = (69.0).toFixed(2)
    query_string = `SELECT COUNT(*) 
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
        WHERE distance <= ${radius_miles}`;

    return query_string;
}

//***************************** End IBM DB2 **************************** */






app.listen(port, () => {
    console.log("Server Up and running");
});