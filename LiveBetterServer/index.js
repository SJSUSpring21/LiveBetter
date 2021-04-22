const express = require('express');
const app = express();
const port = 3001;

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration


// npm install --save body-parser
// npm install --save cors
// npm install ibm_db

// The command below runs server
// node index.js

var ibmdb = require('ibm_db');
var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-08.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=tnd75634;PWD=mc2xp68xqn9+dbx0;PROTOCOL=TCPIP"

function get_query_string(input_lat, input_lng, table, radius_miles, limit){
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

function get_query_string_count(input_lat, input_lng, table, radius_miles){
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


// Input is lat and lng values
// Returns all schools within 1 mile
// Example: localhost:3001/schools?lat=37.330401&lng=-121.839181
app.get('/schools', (req, res) => {

    var input_lat = req.query.lat;
    var input_lng = req.query.lng;

    var radius_miles = (1.0).toFixed(2)
    var table = 'Schools'
    var limit = 100

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)

    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);
        query_string = get_query_string(input_lat, input_lng, table, radius_miles,limit);

        conn.query(query_string, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data);
            }

            conn.close(function () {
                console.log('Query is complete for schools.');
            });
        });
    });
});


// Input is lat and lng values
// Returns count of schools within 1 mile
// Example: localhost:3001/schools/count?lat=37.330401&lng=-121.839181
app.get('/schools/count', (req, res) => {

    var input_lat = req.query.lat;
    var input_lng = req.query.lng;

    var radius_miles = (1.0).toFixed(2)
    var table = 'Schools'

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)
    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        var query_string = get_query_string_count(input_lat, input_lng, table, radius_miles)

        conn.query(query_string, function (err, data) {
            if (err) {
                res.send(err)
            } else {


                // Returns the number of schools within the radius for that query
                res.send([{
                    "school_count": data[0]["1"]
                }]);
            }

            conn.close(function () {
                console.log('Query is complete for schools count.');
            });
        });
    });
});


// Input is lat and lng values
// Returns row for nearest Chicago location from our 
// Example: localhost:3001/schools/count?lat=37.330401&lng=-121.839181
app.get('/chicago', (req, res) => {

    var input_lat = req.query.lat;
    var input_lng = req.query.lng;
    var table = 'Data'

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)
    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        // This Query selects the closest row given lat/lng values
        query_string = `SELECT *, 
        SQRT((("lat" - ${input_lat})*("lat" - ${input_lat}) 
        + ("lng" - ${input_lng})* ("lng" - ${input_lng}))) as "DISTANCE" 
        FROM ${table} 
        ORDER BY DISTANCE ASC 
        LIMIT 1`

        conn.query(query_string, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data[0]);
            }

            conn.close(function () {
                console.log('Query is complete for chicago data.');
            });
        });
    });
});


// Input is lat, lng, table, radius
// Table can be "Parks" or "Schools"
// radius is in miles
// Returns count of parks or schools within radius
// Example: localhost:3001/queries?lat=37.330401&lng=-121.839181&radius=2
app.get('/query', (req, res) => {

    var input_lat = req.query.lat; //user input for latitude
    var input_lng = req.query.lng; //user input for longitude
    var table = req.query.table; // Define the table to query
    var radius_miles = req.query.radius;

    console.log(`Lat: ${input_lat}\tLong: ${input_lng}`)
    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        var query_string = get_query_string_count(input_lat, input_lng, table, radius_miles)

        conn.query(query_string, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send([{
                    "Count": data[0]["1"]
                }]);
            }

            conn.close(function () {
                console.log(`Query is complete for ${table}.`);
            });

        });


    });
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
    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        conn.query(query_string_1, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                conn.query(query_string_2, function (err, data_2) {
                    if (err) {
                        res.send(err)
                    } else {

                        var to_send = [{
                            "Park_Count": data[0]["1"],
                            "School_Count": data_2[0]["1"]
                        }]
                        res.send(to_send);

                    }
                });
            }
            conn.close(function () {
                console.log('Query is complete for Parks and Schools.');
            });
        });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))