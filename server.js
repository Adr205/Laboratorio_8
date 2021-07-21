var express = require("express");
const path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [{
    name: "Elon Musk",
    phoneNumber: "1234567890",
    email: "e@musk.com",
    uniqueId: "1"
}];

var waitList = [{
    name: "Jeff Bezos",
    phoneNumber : "0987654321",
    email: "j@bezos.com",
    uniqueId: "2"
}];

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", (req,res) =>{
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", (req,res) =>{
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get('/api/tables', (req,res) =>{
    return res.json(reservations);
});

app.get('/api/waitlist', (req,res) =>{
    return res.json(waitList)
});

app.post('/api/clear', (req,res) =>{
    reservations = [];
    waitList = [];
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.post('/reserve', (req,res) =>{
    var newReservation = req.body;
    console.log(newReservation);
    if(reservations.length < 5){
        reservations.push(newReservation);
    }else{
        waitList.push(newReservation);
    }
    res.json(newReservation);
});

app.listen(PORT, () =>{
    console.log('Server listening on port:' + PORT)});
