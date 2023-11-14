const express = require('express');
/*import express from 'express'*/

const app = express();
app.use(express.json());

    function replacer(i, val) {
     if ( val === null ) 
     { 
        return ""; // change null to empty string
     } else {
        return val; // return unchanged
     }
    }

app.get('/', (req, res) => {
    res.send('CMU CCDC RESTFul API');
});

app.get('/sources', (req, res) => {
	var obj = [ {"source_id":"1", "source_name":"DustBoy"}, {"source_id":"2", "source_name":"Air4Thai"}, {"source_id":"3", "source_name":"AeroSURE"}, {"source_id":"4", "source_name":"AirEnvir"}, {"source_id":"5", "source_name":"CMAQHI"} ];
	var myJSON = JSON.stringify(obj);
	res.send(myJSON);
});

//

app.get('/sensors/2', (req, res) => {

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT station_id as dustboy_id, name_th as dustboy_name, name_th as dustboy_name_en, lat as dustboy_lat,lng as dustboy_lon,CONCAT(lastupdate_date,' ',lastupdate_time) as log_datetime,pm25_value as pm25,aqi_value as pm25_th_aqi,'2' AS source_id,'Air4Thai' AS source_name FROM pcd_hourly", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result, replacer));
  });
});



});

//

app.get('/sensors/3', (req, res) => {

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT *,'3' AS source_id,'AeroSURE' AS source_name FROM nrct2", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result, replacer));
  });
});



});

//
app.get('/sensors/4', (req, res) => {

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT *,'4' AS source_id,'AirEnvir' AS source_name FROM nrct4", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result, replacer));
  });
});



});
//

//
app.get('/sensors/5', (req, res) => {

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT *,'5' AS source_id,'CMAQHI' AS source_name FROM nrct3", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result, replacer));
  });
});



});
//

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );
