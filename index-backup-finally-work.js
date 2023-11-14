const express = require('express');
/*import express from 'express'*/

const app = express();

var thformula = function (v, v1, v2, a1, a2) {
     return Math.round(a1+ (a2-a1)*(v-v1)/(v2-v1));
}

var thcal = function (val) {
  var data = 0;
  if(Math.round(val)<=25){
    data =thformula(Math.round(val),0,25,0,25);
  }else if(Math.round(val)>25 && Math.round(val)<=37){
    data = thformula(Math.round(val),26,37,26,50);
  }else if(Math.round(val)>37 && Math.round(val)<=50){
    data = thformula(Math.round(val),38,50,51,100);
  }else if(Math.round(val)>50 && Math.round(val)<=90){
    data = thformula(Math.round(val),51,90,101,200);
  }else if(Math.round(val)>90){
    data = Math.round(val)-90+200;
  }
  return data;
}

var uscal = function (val) {
  data = 0;
  if(val>0){
    if(val<=12){
      data=(((50-0)*(val-0))/(12-0))+0;
    }
    else if( (val<=35.4) && (val>12) ){
      data=(((100-50)*(val-12))/(35.4-12))+50;
    }
    else if( (val<=55.4) && (val>35.4) ){
      data=(((150-100)*(val-35.4))/(55.4-35.4))+100;
    }
    else if( (val<=150.4) && (val>55.4) ){
      data=(((200-150)*(val-55.4))/(150.4-55.4))+150;
    }
    else if( (val<=250.4) && (val>150.4) ){
      data=(((300-200)*(val-150.4))/(250.4-150.4))+200;
    }
    else if( (val<=350.4) && (val>250.4) ){
      data=(((400-300)*(val-250.4))/(350.4-250.4))+300;
    }
    else if( (val>350.4) ){
      data=(((500-400)*(val-350.4))/(500.4-350.4))+400;
    }
    return Math.round(data);
  }
}

var th_array = [
        {
          color: '',
          icon: '',
          title: '',
          title_en: '',
          caption: '',
          caption_en: '',
        },{
          color: '0,191,243',
          icon: 'th-dust-boy-01',
          title: 'คุณภาพอากาศดีมาก',
          title_en: 'Very Good',
          caption: 'คุณภาพอากาศดีมาก เหมาะสำหรับกิจกรรมกลางแจ้งและการท่องเที่ยว',
          caption_en: '',
        },{
          color: '0,166,81',
          icon: 'th-dust-boy-02',
          title: 'คุณภาพอากาศดี',
          title_en: 'Good',
          caption: 'คุณภาพอากาศดี สามารถทำกิจกรรมกลางแจ้งและท่องเที่ยวได้ตามปกติ',
          caption_en: 'Air quality is considered satisfactory, and air pollution poses little or no risk',
        },{
          color: '253,192,78',
          icon: 'th-dust-boy-03',
          title: 'คุณภาพอากาศปานกลาง',
          title_en: 'Moderate',
          caption: '[ประชาชนทั่วไป] สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ [ผู้ที่ต้องดูแลสุขภาพเป็นพิเศษ] หากมีอาการเบื้องต้น เช่น ไอ หายใจลำบาก ระคายเคือง ตา ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง',
          caption_en: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution',
        },{
          color: '242,101,34',
          icon: 'th-dust-boy-04',
          title: 'คุณภาพอากาศมีผลกระทบต่อสุขภาพ',
          title_en: 'Unhealthy',
          caption: '[ประชาชนทั่วไป] ควรเฝ้าระวังสุขภาพ ถ้ามีอาการเบื้องต้น เช่น ไอ หายใจลาบาก ระคาย เคืองตา ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง หรือใช้อุปกรณ์ป้องกันตนเองหากมีความจำเป็น [ผู้ที่ต้องดูแลสุขภาพเป็นพิเศษ] ควรลดระยะเวลาการทากิจกรรมกลางแจ้ง หรือใช้อุปกรณ์ ป้องกันตนเองหากมีความจำเป็น ถ้ามีอาการทางสุขภาพ เช่น ไอ หายใจลำบาก ตา อักเสบ แน่นหน้าอก ปวดศีรษะ หัวใจเต้นไม่เป็นปกติ คลื่นไส้ อ่อนเพลีย ควรพบแพทย์',
          caption_en: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
        },{
          color: '205,0,0',
          icon: 'th-dust-boy-05',
          title: 'คุณภาพอากาศมีผลกระทบต่อสุขภาพมาก',
          title_en: 'Very Unhealthy',
          caption: 'ประชาชนทุกคนควรหลีกเลี่ยงกิจกรรมกลางแจ้ง หลีกเลี่ยงพื้นที่ที่มีมลพิษทางอากาศสูง หรือใช้อุปกรณ์ป้องกันตนเองหากมีความจำเป็น หากมีอาการทางสุขภาพควรพบแพทย์',
          caption_en: 'Health warnings of emergency conditions. The entire population is more likely to be affected',
        }
    ];

var us_array = [
        {
          color: '',
          icon: '',
          title: '',
          title_en: '',
          caption: '',
          caption_en: '',
        },{
          color: '0, 153, 107',
          icon: 'us-dust-boy-01',
          title: 'คุณภาพอากาศดี',
          title_en: 'Good',
          caption: 'ประชาชนสามารถทำกิจกรรมต่างๆ ได้ตามปกติ',
          caption_en: 'Air quality is considered satisfactory, and air pollution poses little or no risk',
        },{
          color: '253,192,78',
          icon: 'us-dust-boy-02',
          title: 'คุณภาพอากาศปานกลาง',
          title_en: 'Moderate',
          caption: 'ประชาชนที่ไวต่อมลพิษมากกว่าคนทั่วไปควรลดการออกแรงหนักหรือเวลานานสังเกตอาการไอหรือหอบ, ประชาชนกลุ่มเสี่ยงและประชาชนทั่วไปสามารถใช้ชีวิตได้ปกติ',
          caption_en: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
        },{
          color: '235, 132, 63',
          icon: 'us-dust-boy-03',
          title: 'คุณภาพอากาศไม่ดีต่อกลุ่มเสี่ยง',
          title_en: 'Unhealthy for Sensitive Groups',
          caption: 'ประชาชนที่ไวต่อมลพิษมากกว่าคนทั่วไปควรลดการออกแรงหนักหรือเวลานานสังเกตอาการไอหรือหอบ และควรงดกิจกรรมนอกอาคาร, ประชาชนกลุ่มเสี่ยงควรงดกิจกรรมนอกอาคารที่ใช้แรงหนักหรือเป็นเวลานาน สามารถทำกิจกรรมนอกอาคารได้ แต่ไม่ควรออกแรงมากและควรพักบ่อยๆ สังเกตอาการไอหรือหอบ, ประชาชนทั่วไปสามารถใช้ชีวิตได้ตามปกติ, โรงเรียนหรือสถานศึกษาควรลดกิจกรรมกลางแจ้งที่ใช้แรงหนักหรือเป็นเวลานานและต้องจัดเตรียมหน้ากากอนามัยและห้องสะอาดสำหรับนักเรียนที่มีความเสี่ยง',
          caption_en: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
        },{
          color: '205,0,0',
          icon: 'us-dust-boy-04',
          title: 'คุณภาพอากาศไม่ดี',
          title_en: 'Unhealthy',
          caption: 'ประชาชนที่ไวต่อมลพิษมากกว่าคนทั่วไปควรงดกิจกรรมนอกอาคาร, ประชาชนในกลุ่มเสี่ยงควรงดกิจกรรมนอกอาคารที่ใช้แรงหนักหรือเป็นเวลานานทำกิจกรรมในอาคารแทน หรือเลื่อนเป็นวันอื่น, ประชาชนทั่วไปควรงดกิจกรรมนอกอาคารที่ใช้แรงหนักหรือเป็นเวลานานพักบ่อยๆ, โรงเรียนหรือสถานศึกษาควรลดกิจกรรมกลางแจ้งที่ใช้แรงหนักหรือเป็นเวลานานและต้องจัดเตรียมหน้ากากอนามัยและห้องสะอาดสำหรับนักเรียนทุกคน',
          caption_en: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
        },{
          color: '129, 21, 185',
          icon: 'us-dust-boy-05',
          title: 'คุณภาพอากาศไม่ดีอย่างยิ่ง',
          title_en: 'Very Unhealthy',
          caption: 'ประชาชนที่ไวต่อมลพิษมากกว่าคนทั่วไปควรอยู่ในห้องสะอาด(Clean room), ประชาชนกลุ่มเสี่ยงควรงดกิจกรรมนอกอาคารทุกชนิด ทำกิจกรรมในอาคารแทนหรือเลื่อนเป็นวันอื่น, โรงเรียนหรือสถานศึกษางดกิจกรรมกลางแจ้งทุกชนิดและต้องจัดเตรียมหน้ากากอนามัยและห้องสะอาดสำหรับนักเรียนทุกคน์',
          caption_en: 'Health warnings of emergency conditions. The entire population is more likely to be affected',
        },{
          color: '160, 7, 54',
          icon: 'us-dust-boy-06',
          title: 'คุณภาพอากาศอันตราย',
          title_en: 'Hazardous',
          caption: 'ประชาชนทุกคนควรงดกิจกรรมนอกอาคารทุกชนิดทำกิจกรรมในอาคารแทน, โรงเรียนหรือสถานศึกษางดกิจกรรมกลางแจ้งทุกชนิดและต้องจัดเตรียมหน้ากากอนามัยและห้องสะอาดสำหรับนักเรียนทุกคนหรือพิจารณาปิดโรงเรียน',
          caption_en: 'Health alert: everyone may experience more serious health effects',
        },{
          color: '160, 7, 54',
          icon: 'us-dust-boy-07',
          title: 'คุณภาพอากาศอันตราย',
          title_en: 'Hazardous',
          caption: 'ประชาชนทุกคนควรงดกิจกรรมนอกอาคารทุกชนิดทำกิจกรรมในอาคารแทน, โรงเรียนหรือสถานศึกษางดกิจกรรมกลางแจ้งทุกชนิดและต้องจัดเตรียมหน้ากากอนามัยและห้องสะอาดสำหรับนักเรียนทุกคนหรือพิจารณาปิดโรงเรียน',
          caption_en: 'Health alert: everyone may experience more serious health effects',
        }
    ];

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
var data = [];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT station.id, station_id as dustboy_id, name_th as dustboy_name, name_th as dustboy_name_en, lat as dustboy_lat,lng as dustboy_lon,CONCAT(lastupdate_date,' ',lastupdate_time) as log_datetime,CEIL(pm25_value) as pm25,CEIL(aqi_value) as pm25_th_aqi,'2' AS source_id,'Air4Thai' AS source_name FROM pcd_hourly JOIN station ON pcd_hourly.station_id=station.dustboy_id WHERE station.source_id='2'", function (err, result, fields) {
    if (err) throw err;
    // res.send(JSON.stringify(result, replacer));

    result.forEach(function (row)
    {
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(row.pm25);

      var us_aqi = 0;
      us_aqi = uscal(row.pm25);

      if(th_aqi<=25){
        th_score = 1;
      }else if(th_aqi>25 && th_aqi<=37){
        th_score = 2;
      }else if(th_aqi>37 && th_aqi<=50){
        th_score = 3;
      }else if(th_aqi>50 && th_aqi<=90){
        th_score = 4;
      }else if(th_aqi>90){
        th_score = 5;
      }

      if(us_aqi<=11.9){
        us_score=1;
      }
      else if( (us_aqi<=35.4) && (us_aqi>11.9) ){
        us_score=2;
      }
      else if( (us_aqi<=55.4) && (us_aqi>35.4) ){
        us_score=3;
      }
      else if( (us_aqi<=150.4) && (us_aqi>55.4) ){
        us_score=4;
      }
      else if( (us_aqi<=250.4) && (us_aqi>150.4) ){
        us_score=5;
      }
      else if( (us_aqi<=350.4) && (us_aqi>250.4) ){
        us_score=6;
      }
      else if( (us_aqi>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.dustboy_id,
        dustboy_name: row.dustboy_name,
        dustboy_lat: row.dustboy_lat,
        dustboy_lon: row.dustboy_lon,
        source_id: row.source_id,
        source_name: row.source_name,
        pm10: row.pm10,
        pm25: row.pm25,
        temp: row.temp,
        humid: row.humid,
        us_aqi: us_aqi,
        us_color: us_array[us_score].color,
        us_title: us_array[us_score].title,
        us_caption: us_array[us_score].caption,
        us_dustboy_icon: us_array[us_score].icon,
        th_aqi: th_aqi,
        th_color: th_array[th_score].color,
        th_title: th_array[th_score].title,
        th_caption: th_array[th_score].caption,
        th_dustboy_icon: th_array[th_score].icon,
        log_datetime: row.log_datetime,
      }
      data.push(dust)
    })
    res.send(JSON.stringify(data, replacer));
  });
});



});

//

app.get('/sensors/3', (req, res) => {
var data = [];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT station.id,nrct2.dustboy_id,nrct2.dustboy_name,nrct2.dustboy_lat,nrct2.dustboy_lon,CEIL(nrct2.pm10) AS pm10,CEIL(nrct2.pm25) AS pm25,nrct2.temp,nrct2.humid,CEIL(nrct2.us_aqi) AS us_aqi,nrct2.us_color,nrct2.us_title,nrct2.us_caption,nrct2.us_dustboy_icon,CEIL(nrct2.th_aqi) AS th_aqi,nrct2.th_color,nrct2.th_title,nrct2.th_caption,nrct2.th_dustboy_icon,nrct2.log_datetime,'3' AS source_id,'AeroSURE' AS source_name FROM nrct2 JOIN station ON nrct2.dustboy_id=station.dustboy_id WHERE station.source_id='3'", function (err, result, fields) {
    if (err) throw err;
    // res.send(JSON.stringify(result, replacer));

    result.forEach(function (row)
    {
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(row.pm25);

      var us_aqi = 0;
      us_aqi = uscal(row.pm25);

      if(th_aqi<=25){
        th_score = 1;
      }else if(th_aqi>25 && th_aqi<=37){
        th_score = 2;
      }else if(th_aqi>37 && th_aqi<=50){
        th_score = 3;
      }else if(th_aqi>50 && th_aqi<=90){
        th_score = 4;
      }else if(th_aqi>90){
        th_score = 5;
      }

      if(us_aqi<=11.9){
        us_score=1;
      }
      else if( (us_aqi<=35.4) && (us_aqi>11.9) ){
        us_score=2;
      }
      else if( (us_aqi<=55.4) && (us_aqi>35.4) ){
        us_score=3;
      }
      else if( (us_aqi<=150.4) && (us_aqi>55.4) ){
        us_score=4;
      }
      else if( (us_aqi<=250.4) && (us_aqi>150.4) ){
        us_score=5;
      }
      else if( (us_aqi<=350.4) && (us_aqi>250.4) ){
        us_score=6;
      }
      else if( (us_aqi>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.dustboy_id,
        dustboy_name: row.dustboy_name,
        dustboy_lat: row.dustboy_lat,
        dustboy_lon: row.dustboy_lon,
        source_id: row.source_id,
        source_name: row.source_name,
        pm10: row.pm10,
        pm25: row.pm25,
        temp: row.temp,
        humid: row.humid,
        us_aqi: us_aqi,
        us_color: us_array[us_score].color,
        us_title: us_array[us_score].title,
        us_caption: us_array[us_score].caption,
        us_dustboy_icon: us_array[us_score].icon,
        th_aqi: th_aqi,
        th_color: th_array[th_score].color,
        th_title: th_array[th_score].title,
        th_caption: th_array[th_score].caption,
        th_dustboy_icon: th_array[th_score].icon,
        log_datetime: row.log_datetime,
      }
      data.push(dust)
    })
    res.send(JSON.stringify(data, replacer));
  });
});



});

//
app.get('/sensors/4', (req, res) => {
var data = [];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT station.id,nrct4.dustboy_id,nrct4.dustboy_name,nrct4.dustboy_lat,nrct4.dustboy_lon,CEIL(nrct4.pm10) AS pm10,CEIL(nrct4.pm25) AS pm25,nrct4.temp,nrct4.humid,CEIL(nrct4.us_aqi) AS us_aqi,nrct4.us_color,nrct4.us_title,nrct4.us_caption,nrct4.us_dustboy_icon,CEIL(nrct4.th_aqi) AS th_aqi,nrct4.th_color,nrct4.th_title,nrct4.th_caption,nrct4.th_dustboy_icon,nrct4.log_datetime,'4' AS source_id,'AirEnvir' AS source_name FROM nrct4 JOIN station ON nrct4.dustboy_id=station.dustboy_id WHERE station.source_id='4'", function (err, result, fields) {
    if (err) throw err;
    // res.send(JSON.stringify(result, replacer));

    result.forEach(function (row)
    {
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(row.pm25);

      var us_aqi = 0;
      us_aqi = uscal(row.pm25);

      if(th_aqi<=25){
        th_score = 1;
      }else if(th_aqi>25 && th_aqi<=37){
        th_score = 2;
      }else if(th_aqi>37 && th_aqi<=50){
        th_score = 3;
      }else if(th_aqi>50 && th_aqi<=90){
        th_score = 4;
      }else if(th_aqi>90){
        th_score = 5;
      }

      if(us_aqi<=11.9){
        us_score=1;
      }
      else if( (us_aqi<=35.4) && (us_aqi>11.9) ){
        us_score=2;
      }
      else if( (us_aqi<=55.4) && (us_aqi>35.4) ){
        us_score=3;
      }
      else if( (us_aqi<=150.4) && (us_aqi>55.4) ){
        us_score=4;
      }
      else if( (us_aqi<=250.4) && (us_aqi>150.4) ){
        us_score=5;
      }
      else if( (us_aqi<=350.4) && (us_aqi>250.4) ){
        us_score=6;
      }
      else if( (us_aqi>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.dustboy_id,
        dustboy_name: row.dustboy_name,
        dustboy_lat: row.dustboy_lat,
        dustboy_lon: row.dustboy_lon,
        source_id: row.source_id,
        source_name: row.source_name,
        pm10: row.pm10,
        pm25: row.pm25,
        temp: row.temp,
        humid: row.humid,
        us_aqi: us_aqi,
        us_color: us_array[us_score].color,
        us_title: us_array[us_score].title,
        us_caption: us_array[us_score].caption,
        us_dustboy_icon: us_array[us_score].icon,
        th_aqi: th_aqi,
        th_color: th_array[th_score].color,
        th_title: th_array[th_score].title,
        th_caption: th_array[th_score].caption,
        th_dustboy_icon: th_array[th_score].icon,
        log_datetime: row.log_datetime,
      }
      data.push(dust)
    })
    res.send(JSON.stringify(data, replacer));
  });
});



});
//

//
app.get('/sensors/5', (req, res) => {

var data = [];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT station.id,nrct3.dustboy_id,nrct3.dustboy_name,nrct3.dustboy_lat,nrct3.dustboy_lon,CEIL(nrct3.pm10) AS pm10,CEIL(nrct3.pm25) AS pm25,nrct3.temp,nrct3.humid,CEIL(nrct3.us_aqi) AS us_aqi,nrct3.us_color,nrct3.us_title,nrct3.us_caption,nrct3.us_dustboy_icon,CEIL(nrct3.th_aqi) AS th_aqi,nrct3.th_color,nrct3.th_title,nrct3.th_caption,nrct3.th_dustboy_icon,nrct3.log_datetime,'5' AS source_id,'CMAQHI' AS source_name FROM nrct3 JOIN station ON nrct3.dustboy_id=station.dustboy_id WHERE station.source_id='5'", function (err, result, fields) {
    if (err) throw err;
    // res.send(JSON.stringify(result, replacer));

    result.forEach(function (row)
    {
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(row.pm25);

      var us_aqi = 0;
      us_aqi = uscal(row.pm25);

      if(th_aqi<=25){
        th_score = 1;
      }else if(th_aqi>25 && th_aqi<=37){
        th_score = 2;
      }else if(th_aqi>37 && th_aqi<=50){
        th_score = 3;
      }else if(th_aqi>50 && th_aqi<=90){
        th_score = 4;
      }else if(th_aqi>90){
        th_score = 5;
      }

      if(us_aqi<=11.9){
        us_score=1;
      }
      else if( (us_aqi<=35.4) && (us_aqi>11.9) ){
        us_score=2;
      }
      else if( (us_aqi<=55.4) && (us_aqi>35.4) ){
        us_score=3;
      }
      else if( (us_aqi<=150.4) && (us_aqi>55.4) ){
        us_score=4;
      }
      else if( (us_aqi<=250.4) && (us_aqi>150.4) ){
        us_score=5;
      }
      else if( (us_aqi<=350.4) && (us_aqi>250.4) ){
        us_score=6;
      }
      else if( (us_aqi>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.dustboy_id,
        dustboy_name: row.dustboy_name,
        dustboy_lat: row.dustboy_lat,
        dustboy_lon: row.dustboy_lon,
        source_id: row.source_id,
        source_name: row.source_name,
        pm10: row.pm10,
        pm25: row.pm25,
        temp: row.temp,
        humid: row.humid,
        us_aqi: us_aqi,
        us_color: us_array[us_score].color,
        us_title: us_array[us_score].title,
        us_caption: us_array[us_score].caption,
        us_dustboy_icon: us_array[us_score].icon,
        th_aqi: th_aqi,
        th_color: th_array[th_score].color,
        th_title: th_array[th_score].title,
        th_caption: th_array[th_score].caption,
        th_dustboy_icon: th_array[th_score].icon,
        log_datetime: row.log_datetime,
      }
      data.push(dust)
    })
    res.send(JSON.stringify(data, replacer));
  });
});



});
//

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );
