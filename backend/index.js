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

//connecting to db

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

app.listen(3001, ()=>{
    console.log("Server Up and running");
});