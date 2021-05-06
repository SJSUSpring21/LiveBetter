const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

// npm install --save body-parser
// npm install --save cors
// npm install ibm_db
// npm install mongoose
// npm install dotenv

// The command below runs server
// node index.js

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: ['GET', "POST"],
    credentials: true
}));

//middleware
app.use(express.json());


//model
const User = require('./model/user');

mongoose.connect(
        'mongodb+srv://varun:varun123@cluster0.hmh9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    .then(() => {
        console.log("connected to db");
    })


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/client/build`));
    console.log("In Production Mode");


    app.get('/login', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });

    app.get('/signup', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });

    app.get('/portal', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });

    app.get('/portal-trial', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });

    app.get('/result', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });

    app.get('/result-trial', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });
    
    app.get('/history', (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`);
    });
}


app.get('/', (req, res) => {
    console.log("Backend Connected.");
    res.send("Backend connected!");
});

//import routes
app.use(require('./routes/auth'));
app.use(require('./routes/query'));


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

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});