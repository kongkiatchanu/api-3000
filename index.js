const express = require('express');
/*import express from 'express'*/
const urlencode = require('urlencode');

const app = express();

var thformula = function (v, v1, v2, a1, a2) {
     // return Math.round((a1+ (a2-a1))*((v-v1)/(v2-v1)));
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
    data = (Math.round(val)-90)+200;
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
  con.query("SELECT station.id, station_id as dustboy_id, name_th as dustboy_name, name_th as dustboy_name_en, lat as dustboy_lat,lng as dustboy_lon,CONCAT(lastupdate_date,' ',lastupdate_time) as log_datetime,CEIL(pm25_value) as pm25,CEIL(aqi_value) as pm25_th_aqi,'2' AS source_id,'Air4Thai' AS source_name FROM pcd_hourly JOIN station ON pcd_hourly.station_id=station.dustboy_id WHERE station.source_id='2' AND pm25_value>0 AND lastupdate_date LIKE CONCAT(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%')", function (err, result, fields) {
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

      if(row.pm25<=25){
        th_score = 1;
      }else if(row.pm25>25 && row.pm25<=37){
        th_score = 2;
      }else if(row.pm25>37 && row.pm25<=50){
        th_score = 3;
      }else if(row.pm25>50 && row.pm25<=90){
        th_score = 4;
      }else if(row.pm25>90){
        th_score = 5;
      }

      if(row.pm25<=11.9){
        us_score=1;
      }
      else if( (row.pm25<=35.4) && (row.pm25>11.9) ){
        us_score=2;
      }
      else if( (row.pm25<=55.4) && (row.pm25>35.4) ){
        us_score=3;
      }
      else if( (row.pm25<=150.4) && (row.pm25>55.4) ){
        us_score=4;
      }
      else if( (row.pm25<=250.4) && (row.pm25>150.4) ){
        us_score=5;
      }
      else if( (row.pm25<=350.4) && (row.pm25>250.4) ){
        us_score=6;
      }
      else if( (row.pm25>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.id,
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
  con.query("SELECT station.id,nrct2.dustboy_id,nrct2.dustboy_name,nrct2.dustboy_lat,nrct2.dustboy_lon,CEIL(nrct2.pm10) AS pm10,CEIL(nrct2.pm25) AS pm25,nrct2.temp,nrct2.humid,CEIL(nrct2.us_aqi) AS us_aqi,nrct2.us_color,nrct2.us_title,nrct2.us_caption,nrct2.us_dustboy_icon,CEIL(nrct2.th_aqi) AS th_aqi,nrct2.th_color,nrct2.th_title,nrct2.th_caption,nrct2.th_dustboy_icon,nrct2.log_datetime,'3' AS source_id,'AeroSURE' AS source_name FROM nrct2 JOIN station ON nrct2.dustboy_id=station.dustboy_id WHERE station.source_id='3' AND nrct2.pm25>0 AND nrct2.log_datetime LIKE CONCAT(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%')", function (err, result, fields) {
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

      if(row.pm25<=25){
        th_score = 1;
      }else if(row.pm25>25 && row.pm25<=37){
        th_score = 2;
      }else if(row.pm25>37 && row.pm25<=50){
        th_score = 3;
      }else if(row.pm25>50 && row.pm25<=90){
        th_score = 4;
      }else if(row.pm25>90){
        th_score = 5;
      }

      if(row.pm25<=11.9){
        us_score=1;
      }
      else if( (row.pm25<=35.4) && (row.pm25>11.9) ){
        us_score=2;
      }
      else if( (row.pm25<=55.4) && (row.pm25>35.4) ){
        us_score=3;
      }
      else if( (row.pm25<=150.4) && (row.pm25>55.4) ){
        us_score=4;
      }
      else if( (row.pm25<=250.4) && (row.pm25>150.4) ){
        us_score=5;
      }
      else if( (row.pm25<=350.4) && (row.pm25>250.4) ){
        us_score=6;
      }
      else if( (row.pm25>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.id,
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
  con.query("SELECT station.id,nrct4_new.dustboy_id,nrct4_new.dustboy_name,nrct4_new.dustboy_lat,nrct4_new.dustboy_lon,CEIL(nrct4_new.pm10) AS pm10,CEIL(nrct4_new.pm25) AS pm25,nrct4_new.temp,nrct4_new.humid,CEIL(nrct4_new.us_aqi) AS us_aqi,nrct4_new.us_color,nrct4_new.us_title,nrct4_new.us_caption,nrct4_new.us_dustboy_icon,CEIL(nrct4_new.th_aqi) AS th_aqi,nrct4_new.th_color,nrct4_new.th_title,nrct4_new.th_caption,nrct4_new.th_dustboy_icon,nrct4_new.log_datetime,'4' AS source_id,'AirEnvir' AS source_name FROM nrct4_new JOIN station ON nrct4_new.dustboy_id=station.dustboy_id WHERE station.source_id='4' AND nrct4_new.pm25>0 AND nrct4_new.log_datetime LIKE CONCAT(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%')", function (err, result, fields) {
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

      if(row.pm25<=25){
        th_score = 1;
      }else if(row.pm25>25 && row.pm25<=37){
        th_score = 2;
      }else if(row.pm25>37 && row.pm25<=50){
        th_score = 3;
      }else if(row.pm25>50 && row.pm25<=90){
        th_score = 4;
      }else if(row.pm25>90){
        th_score = 5;
      }

      if(row.pm25<=11.9){
        us_score=1;
      }
      else if( (row.pm25<=35.4) && (row.pm25>11.9) ){
        us_score=2;
      }
      else if( (row.pm25<=55.4) && (row.pm25>35.4) ){
        us_score=3;
      }
      else if( (row.pm25<=150.4) && (row.pm25>55.4) ){
        us_score=4;
      }
      else if( (row.pm25<=250.4) && (row.pm25>150.4) ){
        us_score=5;
      }
      else if( (row.pm25<=350.4) && (row.pm25>250.4) ){
        us_score=6;
      }
      else if( (row.pm25>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.id,
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
        log_datetime: row.log_datetime.replace('Z', '').replace('T', ' ').replace('.000', ''),
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
  con.query("SELECT station.id,nrct3.dustboy_id,nrct3.dustboy_name,nrct3.dustboy_lat,nrct3.dustboy_lon,CEIL(nrct3.pm10) AS pm10,CEIL(nrct3.pm25) AS pm25,nrct3.temp,nrct3.humid,CEIL(nrct3.us_aqi) AS us_aqi,nrct3.us_color,nrct3.us_title,nrct3.us_caption,nrct3.us_dustboy_icon,CEIL(nrct3.th_aqi) AS th_aqi,nrct3.th_color,nrct3.th_title,nrct3.th_caption,nrct3.th_dustboy_icon,nrct3.log_datetime,'5' AS source_id,'CMAQHI' AS source_name FROM nrct3 JOIN station ON nrct3.dustboy_id=station.dustboy_id WHERE station.source_id='5' AND nrct3.pm25>0 AND nrct3.log_datetime LIKE CONCAT(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%')", function (err, result, fields) {
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

      if(row.pm25<=25){
        th_score = 1;
      }else if(row.pm25>25 && row.pm25<=37){
        th_score = 2;
      }else if(row.pm25>37 && row.pm25<=50){
        th_score = 3;
      }else if(row.pm25>50 && row.pm25<=90){
        th_score = 4;
      }else if(row.pm25>90){
        th_score = 5;
      }

      if(row.pm25<=11.9){
        us_score=1;
      }
      else if( (row.pm25<=35.4) && (row.pm25>11.9) ){
        us_score=2;
      }
      else if( (row.pm25<=55.4) && (row.pm25>35.4) ){
        us_score=3;
      }
      else if( (row.pm25<=150.4) && (row.pm25>55.4) ){
        us_score=4;
      }
      else if( (row.pm25<=250.4) && (row.pm25>150.4) ){
        us_score=5;
      }
      else if( (row.pm25<=350.4) && (row.pm25>250.4) ){
        us_score=6;
      }
      else if( (row.pm25>350.4) ){
        us_score=6;
      }

      var dust = {
        id: row.id,
        dustboy_id: row.id,
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

///sensors/6
app.get('/sensors/6', (req, res) => {
  var data = [];

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://www.cusense.net:8082/api/v1/sensorData/realtime/pm',
    headers: {
      'accept': 'application/json',
      'X-Gravitee-Api-Key': 'dc45a48f-a2de-42db-a588-50c8ddf5da03'
    }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    //res.send(JSON.stringify(response.data, replacer));

    var jsondata = response.data

    let cuSenseArray = Object.keys(jsondata).map(key => jsondata[key]);
    console.log(cuSenseArray);

    cuSenseArray.forEach(obj => {

      if (obj.info.project != "Dustboy")
      {
        console.log(JSON.stringify(obj.data[0].time));
        console.log(JSON.stringify(obj.data[0].pm25));
        console.log(JSON.stringify(obj.info.id));
        console.log(JSON.stringify(obj.info.lat));
        console.log(JSON.stringify(obj.info.lon));
        //start looping through data
        var th_score = 0;
        var us_score = 0;

        var th_aqi = 0;
        th_aqi = thcal(obj.data[0].pm25);

        var us_aqi = 0;
        us_aqi = uscal(obj.data[0].pm25);

	if(obj.data[0].pm25<=15){
          th_score = 1;
        }else if(obj.data[0].pm25>15 && obj.data[0].pm25<=25){
          th_score = 2;
        }else if(obj.data[0].pm25>25 && obj.data[0].pm25<=37.5){
          th_score = 3;
        }else if(obj.data[0].pm25>37.5 && obj.data[0].pm25<=75){
          th_score = 4;
        }else if(obj.data[0].pm25>75){
          th_score = 5;
        }

        if(obj.data[0].pm25<=11.9){
          us_score=1;
        }
        else if( (obj.data[0].pm25<=35.4) && (obj.data[0].pm25>11.9) ){
          us_score=2;
        }
        else if( (obj.data[0].pm25<=55.4) && (obj.data[0].pm25>35.4) ){
          us_score=3;
        }
        else if( (obj.data[0].pm25<=150.4) && (obj.data[0].pm25>55.4) ){
          us_score=4;
        }
        else if( (obj.data[0].pm25<=250.4) && (obj.data[0].pm25>150.4) ){
          us_score=5;
        }
        else if( (obj.data[0].pm25<=350.4) && (obj.data[0].pm25>250.4) ){
          us_score=6;
        }
        else if( (obj.data[0].pm25>350.4) ){
          us_score=6;
        }

        var dust = {
          id: obj.id,
          dustboy_id: obj.info.id,
          dustboy_name: obj.info.name,
          dustboy_lat: obj.info.lat,
          dustboy_lon: obj.info.lon,
          source_id: '6',
          source_name: 'CUSense',
          pm10: obj.data[0].pm10,
          pm25: obj.data[0].pm25,
          temp: '0',
          humid: '0',
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
          log_datetime: new Date(obj.data[0].time).toISOString().slice(0, 19).replace('T', ' '),
        }
        data.push(dust)
      }
      //end looping through data


    });
    res.send(JSON.stringify(data, replacer));


  })
  .catch(function (error) {
    console.log(error);
  });

});
//

///sensors/7
app.get('/sensors/7', (req, res) => {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://yakkaw.mfu.ac.th/openapi/yakkaw_share/?api_key=aoiwe$nb34sdKKJUqmdeq23skdj$XY',
    headers: { }
  };

  var data = [];

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    // res.send(JSON.stringify(response.data, replacer));

    var jsondata = response.data
    jsondata.forEach(obj => {
      // Object.entries(obj).forEach(([key, value]) => {
      //   console.log(`${key} ${value}`);
      // });
      // console.log('-------------------');

      //start looping through data
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(obj.pm25);

      var us_aqi = 0;
      us_aqi = uscal(obj.pm25);

      if(obj.pm25<=15){
        th_score = 1;
      }else if(obj.pm25>15 && obj.pm25<=25){
        th_score = 2;
      }else if(obj.pm25>25 && obj.pm25<=37.5){
        th_score = 3;
      }else if(obj.pm25>37.5 && obj.pm25<=75){
        th_score = 4;
      }else if(obj.pm25>75){
        th_score = 5;
      }
	    

      if(obj.pm25<=11.9){
        us_score=1;
      }
      else if( (obj.pm25<=35.4) && (obj.pm25>11.9) ){
        us_score=2;
      }
      else if( (obj.pm25<=55.4) && (obj.pm25>35.4) ){
        us_score=3;
      }
      else if( (obj.pm25<=150.4) && (obj.pm25>55.4) ){
        us_score=4;
      }
      else if( (obj.pm25<=250.4) && (obj.pm25>150.4) ){
        us_score=5;
      }
      else if( (obj.pm25<=350.4) && (obj.pm25>250.4) ){
        us_score=6;
      }
      else if( (obj.pm25>350.4) ){
        us_score=6;
      }

      var dust = {
        id: obj.id,
        dustboy_id: obj.id,
        dustboy_name: obj.dustboy_name,
        dustboy_lat: obj.dustboy_lat,
        dustboy_lon: obj.dustboy_lon,
        source_id: '7',
        source_name: 'Yakkaw',
        pm10: obj.pm10,
        pm25: obj.pm25,
        temp: obj.temp,
        humid: obj.humid,
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
        log_datetime: new Date(obj.log_datetime).toISOString().slice(0, 19).replace('T', ' '),
      }
      data.push(dust)
      //end looping through data


    });
    res.send(JSON.stringify(data, replacer));

  })
  .catch(function (error) {
    console.log(error);
  });

});
//

///sensors/8
//purpleair
app.get('/sensors/8', (req, res) => {

  //start get token
  var axios = require('axios');

    // url: 'https://map.purpleair.com/token?version=1.8.40',

  var config = {
    method: 'get',
    url: 'https://map.purpleair.com/token',
    headers: {
      'authority': 'map.purpleair.com',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'accept': 'text/plain',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://map.purpleair.com/1/mPM25/a10/p604800/cC0',
      'accept-language': 'en-US,en;q=0.9',
      // 'cookie': '_orig_referrer=https%3A%2F%2Fwww.google.com%2F; _landing_page=%2F; _y=699af9f3-1715-4b77-980c-edc42990a87c; _shopify_y=699af9f3-1715-4b77-980c-edc42990a87c; _ga=GA1.2.1493093026.1641467431; _gid=GA1.2.1740613978.1641467431; _gcl_au=1.1.1949826355.1641467433; _fbp=fb.1.1641467433369.2048731386; cookieControl=true; cookieControlPrefs=["preferences","analytics","marketing"]; _s=59758c04-f328-43ba-a958-81f61573006d; _shopify_s=59758c04-f328-43ba-a958-81f61573006d; _hjSessionUser_2549388=eyJpZCI6ImZmNjUyNmYyLWMxNTgtNTMyMi1iMWMwLThmZjNhYWQwYmY4ZCIsImNyZWF0ZWQiOjE2NDE0Njc0MzE5OTYsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_2549388=eyJpZCI6Ijc3OWM3OTEzLTBiYTgtNGNlNy04YjAwLWVmOTVhMmExN2U4ZiIsImNyZWF0ZWQiOjE2NDE0ODEzMjA5OTN9; _hjAbsoluteSessionInProgress=0; _shopify_sa_t=2022-01-06T15%3A02%3A01.139Z; _shopify_sa_p=; _gat=1'
    },
    withCredentials: true,
  };

  axios(config)
  .then(function (response) {
    // const token = response.data.trim();//'YXj8g8FGWWceYpsw+HVNWQ2SEyKjnHfA7gG5aSvUne1bAMkYIotXvudWtYKvI0SQqwY+zrG9EBAQFEnbBIrZ81ZSmVgJVgRcy044kXW6yrY2wEzmiLXHfq32EwlhjdyJ';//response.data.trim();//encodeURIComponent(response.data.trim());
    console.log(response.data);
    res.send(response.data);



  })
  .catch(function (error) {
    console.log(error);
  });

  //end get token

});
//

///sensors/9
//AIT วัดฝุ่น.ไทย
app.get('/sensors/9', (req, res) => {

  var data = [];

  var before = Math.floor(Date.now()/1000);
  var after = before - 10000;

  var axios = require('axios');

  var config = {
    method: 'get',
    // url: 'https://xn--l3ckl2byc3b2g.xn--o3cw4h/v2/markers.json.php?before='+before+'&after='+after+'&value=6&sensors=4315255211324134%2C35669077243571343%2C3566907722571343%2C43152552121241343%2C43174052152831343%2C43173113272511343%2C43173113140721343%2C4317311391519343%2C43173113192009343%2C43152552271241343%2C43173113130721343%2C43173113150021343%2C43173113153119343%2C43173113250419343%2C43173113131321343%2C4317311312019343%2C2472776327523773%2C2472776415000163%2C1676581389099183%2C1676581370306103%2C2472776327559073%2C4315255211439343%2C43152552170441343%2C10%2C4315255224234134%2C4317311361119343%2C43173113140421343%2C4317218221129343%2C43173113271019343%2C43173113101321343%2C43173113113919343%2C43173113260321343%2C4317311381811343%2C43173113291021343%2C4317311341319343%2C4317311391321343%2C4317311300921343%2C43174052130331343%2C43173113233019343%2C4315255224134134%2C431525522194134%2C358083614995213%2C358083614938783%2C4317311351721343%2C43173113191021343%2C4317311323019343%2C4317405251031343%2C43173113113611343%2C1319605068112033%2C4317311352519343%2C43174052252629343%2C43173113151121343%2C43174052212831343%2C4317311381121343%2C43152552211639343%2C4317311321721343%2C4317311331221343%2C43152552141741343%2C43152552123141343%2C43173113152521343%2C4317311342921343%2C43173113193719343%2C43173113292319343%2C4315255251241343%2C43173113202321343%2C2472776327624803%2C2472776250951583%2C2472776331412613%2C1676581370283653%2C2472776327507933%2C2472776414981133%2C2472776415009593%2C2472776327517013%2C2472776331333133%2C1676581388900003%2C2472776327459623%2C2472776327476643%2C2472776327559583%2C2472776414993403%2C2472776331412493%2C2472776250968333%2C1676581370276423%2C2472776414920743%2C2472776327516983%2C2472776415003883%2C2472776327471703%2C2472776331351263%2C2472776327552463%2C1676581389077183%2C2472776327523143%2C1676581388930603%2C1676581388924443%2C1676581388928373%2C2472776327552403%2C2472776327522813%2C358083614916843%2C1676581388937333%2C2472776414962203%2C1676581370325543%2C2472776331406483%2C2472776327631463%2C2472776327529483%2C43152552222241343%2C4315255210539343%2C43152552231241343%2C4315255221839343%2C1319605201717632%2C1319605201183422%2C2472776415009652%2C1319605201698522%2C1319605200209582%2C4315255271441343%2C1319605201177502%2C1319605201652442%2C2472776414885162%2C2472776414926782%2C1319605201194822%2C1319605201737032%2C1319605200209072%2C2472776327523082%2C1319605201709322%2C1319605201195122%2C1319605201201792%2C1319605201195242%2C1319605201194342%2C1319605201109632%2C1319605201728102%2C1319605200318232%2C1676581370330032%2C1319605200209642%2C43152552143341343%2C35669959211421343%2C35669959291321343%2C43152552231139343%2C43152552170239343%2C35669959121321343%2C43173113140311343%2C43173113133521343%2C43173113100121343%2C43173113112419343%2C4317311351821343%2C43173113131721343%2C43167018202221343%2C43173113101311343%2C2199031581642%2C35669959130221343%2C358083614937883%2C43152552291441343%2C2472776335413893%2C358083614927403%2C4315255281641343%2C43152552211341343%2C1676581389098403%2C2472776250958693%2C1676581370330303%2C2472776414985843%2C2472776327507873%2C43152552111241343%2C2472776327615693%2C43152552251241343%2C43152552121741343%2C4315255240441343%2C4315255210339343%2C4315255211739343%2C358083614915973%2C1676581388942333%2C2472776331412553%2C43173113121419343%2C43174052110729343%2C43152552231541343%2C4317311300021343%2C43152552100639343%2C35669077221171343%2C2472776331400773%2C43173113141021343%2C2280%2C2558%2C2207%2C1676581370226203%2C2472776415003643%2C43173113133219343%2C431525527114134%2C431525520124134%2C2041%2C2169%2C43173113120021343%2C43173113252419343%2C43173113270521343%2C43173113272611343%2C43174052170329343%2C43173113110821343%2C43173113231121343%2C43173113211019343%2C4317311312219343%2C43173113212221343%2C43173113252321343%2C2472776331406243%2C43173113101119343%2C4317311331021343%2C4317311391121343%2C43173113281419343%2C4317311381721343%2C4317311352619343%2C43173113250521343%2C43173113153019343%2C1676581389081643%2C43173113211221343%2C43174052251229343%2C1676581370325213%2C2472776327605603%2C358083614927733%2C358083614916963%2C2472776327523323%2C1676581389098823%2C2472776331400353%2C43173113230221343%2C2252%2C4317311310321343%2C4315255231139343%2C4315255271839343%2C3566907716257134%2C4315255281341343%2C2472776414992923%2C358083614927913%2C431525525054134%2C43174052150229343%2C43173113291519343%2C4317311321321343%2C3566907713327134%2C2472776327528973%2C2164%2C2385%2C2353%2C2193%2C2331%2C300%2C2287%2C2185%2C2076%2C43173113201021343%2C1319605201183752%2C1319605200485552%2C1319605201194282%2C2472776335432743%2C2472776327482513%2C2472776327552883%2C1676581388938113%2C2472776331334063%2C1676581388943263%2C43173113183019343%2C4315255213214134%2C2472776335419283%2C2472776327646823%2C2472776327529363%2C4317311351121343%2C1676581388928613%2C43173113211321343%2C1319605201717092%2C4317311341119343%2C1319605200209252%2C358083614845163%2C1676581388892713%2C43173113151221343%2C43173113123219343%2C43173113163219343%2C4317311350921343%2C43173113292519343%2C43173113131121343%2C43173113140321343%2C43173113243619343%2C43173113222319343%2C43174052222731343%2C43173113123019343%2C4317405281229343%2C2472776331351473%2C2472776327552853%2C1676581370305923%2C4317311341221343%2C35669077133171343%2C4317405221229343',
    // headers: {
    url: 'https://xn--l3ckl2byc3b2g.xn--o3cw4h/v2/markers.json.php?before=1641611220&after=1641607620&value=6&sensors=4315255211324134%2C35669077243571343%2C3566907722571343%2C43152552121241343%2C43174052152831343%2C43173113272511343%2C43173113140721343%2C4317311391519343%2C43173113192009343%2C43152552271241343%2C43173113130721343%2C43173113150021343%2C43173113153119343%2C43173113250419343%2C43173113131321343%2C4317311312019343%2C2472776327523773%2C2472776415000163%2C1676581389099183%2C1676581370306103%2C2472776327559073%2C4315255211439343%2C43152552170441343%2C10%2C4315255224234134%2C4317311361119343%2C43173113140421343%2C4317218221129343%2C43173113271019343%2C43173113101321343%2C43173113113919343%2C43173113260321343%2C4317311381811343%2C43173113291021343%2C4317311341319343%2C4317311391321343%2C4317311300921343%2C43174052130331343%2C43173113233019343%2C4315255224134134%2C431525522194134%2C358083614995213%2C358083614938783%2C4317311351721343%2C43173113191021343%2C4317311323019343%2C4317405251031343%2C43173113113611343%2C1319605068112033%2C4317311352519343%2C43174052252629343%2C43173113151121343%2C43174052212831343%2C4317311381121343%2C43152552211639343%2C4317311321721343%2C4317311331221343%2C43152552141741343%2C43152552123141343%2C43173113152521343%2C4317311342921343%2C43173113193719343%2C43173113292319343%2C4315255251241343%2C43173113202321343%2C2472776327624803%2C2472776250951583%2C2472776331412613%2C1676581370283653%2C2472776327507933%2C2472776414981133%2C2472776415009593%2C2472776327517013%2C2472776331333133%2C1676581388900003%2C2472776327459623%2C2472776327476643%2C2472776327559583%2C2472776414993403%2C2472776331412493%2C2472776250968333%2C1676581370276423%2C2472776414920743%2C2472776327516983%2C2472776415003883%2C2472776327471703%2C2472776331351263%2C2472776327552463%2C1676581389077183%2C2472776327523143%2C1676581388930603%2C1676581388924443%2C1676581388928373%2C2472776327552403%2C2472776327522813%2C358083614916843%2C1676581388937333%2C2472776414962203%2C1676581370325543%2C2472776331406483%2C2472776327631463%2C2472776327529483%2C43152552222241343%2C4315255210539343%2C43152552231241343%2C4315255221839343%2C1319605201717632%2C1319605201183422%2C2472776415009652%2C1319605201698522%2C1319605200209582%2C4315255271441343%2C1319605201177502%2C1319605201652442%2C2472776414885162%2C2472776414926782%2C1319605201194822%2C1319605201737032%2C1319605200209072%2C2472776327523082%2C1319605201709322%2C1319605201195122%2C1319605201201792%2C1319605201195242%2C1319605201194342%2C1319605201109632%2C1319605201728102%2C1319605200318232%2C1676581370330032%2C1319605200209642%2C43152552143341343%2C35669959211421343%2C35669959291321343%2C43152552231139343%2C43152552170239343%2C35669959121321343%2C43173113140311343%2C43173113133521343%2C43173113100121343%2C43173113112419343%2C4317311351821343%2C43173113131721343%2C43167018202221343%2C43173113101311343%2C2199031581642%2C35669959130221343%2C358083614937883%2C43152552291441343%2C2472776335413893%2C358083614927403%2C4315255281641343%2C43152552211341343%2C1676581389098403%2C2472776250958693%2C1676581370330303%2C2472776414985843%2C2472776327507873%2C43152552111241343%2C2472776327615693%2C43152552251241343%2C43152552121741343%2C4315255240441343%2C4315255210339343%2C4315255211739343%2C358083614915973%2C1676581388942333%2C2472776331412553%2C43173113121419343%2C43174052110729343%2C43152552231541343%2C4317311300021343%2C43152552100639343%2C35669077221171343%2C2472776331400773%2C43173113141021343%2C2280%2C2558%2C2207%2C1676581370226203%2C2472776415003643%2C43173113133219343%2C431525527114134%2C431525520124134%2C2041%2C2169%2C43173113120021343%2C43173113252419343%2C43173113270521343%2C43173113272611343%2C43174052170329343%2C43173113110821343%2C43173113231121343%2C43173113211019343%2C4317311312219343%2C43173113212221343%2C43173113252321343%2C2472776331406243%2C43173113101119343%2C4317311331021343%2C4317311391121343%2C43173113281419343%2C4317311381721343%2C4317311352619343%2C43173113250521343%2C43173113153019343%2C1676581389081643%2C43173113211221343%2C43174052251229343%2C1676581370325213%2C2472776327605603%2C358083614927733%2C358083614916963%2C2472776327523323%2C1676581389098823%2C2472776331400353%2C43173113230221343%2C2252%2C4317311310321343%2C4315255231139343%2C4315255271839343%2C3566907716257134%2C4315255281341343%2C2472776414992923%2C358083614927913%2C431525525054134%2C43174052150229343%2C43173113291519343%2C4317311321321343%2C3566907713327134%2C2472776327528973%2C2164%2C2385%2C2353%2C2193%2C2331%2C300%2C2287%2C2185%2C2076%2C43173113201021343%2C1319605201183752%2C1319605200485552%2C1319605201194282%2C2472776335432743%2C2472776327482513%2C2472776327552883%2C1676581388938113%2C2472776331334063%2C1676581388943263%2C43173113183019343%2C4315255213214134%2C2472776335419283%2C2472776327646823%2C2472776327529363%2C4317311351121343%2C1676581388928613%2C43173113211321343%2C1319605201717092%2C4317311341119343%2C1319605200209252%2C358083614845163%2C1676581388892713%2C43173113151221343%2C43173113123219343%2C43173113163219343%2C4317311350921343%2C43173113292519343%2C43173113131121343%2C43173113140321343%2C43173113243619343%2C43173113222319343%2C43174052222731343%2C43173113123019343%2C4317405281229343%2C2472776331351473%2C2472776327552853%2C1676581370305923%2C4317311341221343%2C35669077133171343%2C4317405221229343',
    headers: {
      'Connection': 'keep-alive',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://xn--l3ckl2byc3b2g.xn--o3cw4h/v2/map.html',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': 'lang=en; disclaimer=accepted'
    }
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    // console.log('before='+before);
    // console.log('after='+after);
    // res.send(JSON.stringify(response.data));

    var jsondata = response.data.table

    jsondata.forEach(obj => {

      //start looping through data
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(obj.avg);

      var us_aqi = 0;
      us_aqi = uscal(obj.avg);

      if(obj.avg<=25){
        th_score = 1;
      }else if(obj.avg>25 && obj.avg<=37){
        th_score = 2;
      }else if(obj.avg>37 && obj.avg<=50){
        th_score = 3;
      }else if(obj.avg>50 && obj.avg<=90){
        th_score = 4;
      }else if(obj.avg>90){
        th_score = 5;
      }

      if(obj.avg<=11.9){
        us_score=1;
      }
      else if( (obj.avg<=35.4) && (obj.avg>11.9) ){
        us_score=2;
      }
      else if( (obj.avg<=55.4) && (obj.avg>35.4) ){
        us_score=3;
      }
      else if( (obj.avg<=150.4) && (obj.avg>55.4) ){
        us_score=4;
      }
      else if( (obj.avg<=250.4) && (obj.avg>150.4) ){
        us_score=5;
      }
      else if( (obj.avg<=350.4) && (obj.avg>250.4) ){
        us_score=6;
      }
      else if( (obj.avg>350.4) ){
        us_score=6;
      }

      var dust = {
        id: obj.id,
        dustboy_id: obj.sensor_id,
        dustboy_name: obj.sensor_name,
        dustboy_lat: obj.gps_lat,
        dustboy_lon: obj.gps_lng,
        source_id: '9',
        source_name: 'AIT',
        pm10: '0',
        pm25: obj.avg,
        temp: '0',
        humid: '0',
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
        log_datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      }
      data.push(dust)
      //end looping through data


    });
    res.send(JSON.stringify(data, replacer));

  })
  .catch(function (error) {
    console.log(error);
  });

});
//

///sensors/10
//sensor4all
app.get('/sensors/10', (req, res) => {

  var data = [];

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://sensor4all.azurewebsites.net/api/GetList',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    // console.log('before='+before);
    // console.log('after='+after);
    // res.send(JSON.stringify(response.data));

    var jsondata = response.data

    jsondata.forEach(obj => {

      //start looping through data
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(obj.pm25);

      var us_aqi = 0;
      us_aqi = uscal(obj.pm25);

      if(obj.pm25<=15){
        th_score = 1;
      }else if(obj.pm25>15 && obj.pm25<=25){
        th_score = 2;
      }else if(obj.pm25>25 && obj.pm25<=37.5){
        th_score = 3;
      }else if(obj.pm25>37.5 && obj.pm25<=75){
        th_score = 4;
      }else if(obj.pm25>75){
        th_score = 5;
      }

      if(obj.pm25<=11.9){
        us_score=1;
      }
      else if( (obj.pm25<=35.4) && (obj.pm25>11.9) ){
        us_score=2;
      }
      else if( (obj.pm25<=55.4) && (obj.pm25>35.4) ){
        us_score=3;
      }
      else if( (obj.pm25<=150.4) && (obj.pm25>55.4) ){
        us_score=4;
      }
      else if( (obj.pm25<=250.4) && (obj.pm25>150.4) ){
        us_score=5;
      }
      else if( (obj.pm25<=350.4) && (obj.pm25>250.4) ){
        us_score=6;
      }
      else if( (obj.pm25>350.4) ){
        us_score=6;
      }

      var dust = {
        id: obj.id,
        dustboy_id: obj.device_id,
        dustboy_name: obj.name_th,
        dustboy_lat: obj.lat,
        dustboy_lon: obj.long,
        source_id: '10',
        source_name: 'Sensor4All',
        pm10: '0',
        pm25: obj.pm25,
        temp: '0',
        humid: '0',
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
        log_datetime: new Date(obj.created_at).toISOString().slice(0, 19).replace('T', ' '),
      }
      data.push(dust)
      //end looping through data


    });
    res.send(JSON.stringify(data, replacer));

  })
  .catch(function (error) {
    console.log(error);
  });

});
//

///sensors/11
//NT
app.get('/sensors/11', (req, res) => {
  var loop = 1;
  var data = [];

  var province_lat = {
    "Bangkok":"13.7278956",
    "Krabi":"8.0862997",
    "Kanchanaburi":"14.0227797",
    "Kalasin":"16.4314078",
    "Kamphaeng Phet":"16.4827798",
    "Khon Kaen":"16.4419355",
    "Chanthaburi":"12.61134",
    "Chachoengsao":"13.6904194",
    "Chonburi":"13.3611431",
    "Chai Nat":"15.1851971",
    "Chaiyaphum":"15.8068173",
    "Chumphon":"10.4930496",
    "Chiang Rai":"19.9071656",
    "Chiang Mai":"18.7877477",
    "Trang":"7.5593851",
    "Trat":"12.2427563",
    "Tak":"16.8839901",
    "Nakhon Nayok":"14.2069466",
    "Nakhon Pathom":"13.8199206",
    "Nakhon Phanom":"17.392039",
    "Nakhon Ratchasima":"14.9798997",
    "Nakhon Si Thammarat":"8.4303975",
    "Nakhon Sawan":"15.6930072",
    "Nonthaburi":"13.8621125",
    "Narathiwat":"6.4254607",
    "Nan":"18.7756318",
    "Buriram":"14.9930017",
    "Pathum Thani":"14.0208391",
    "Prachuap Khiri Khan":"11.812367",
    "Prachin Buri":"14.0509704",
    "Pattani":"6.869484399999999",
    "Ayutthaya":"14.3532128",
    "Phayao":"19.1664789",
    "Phangnga":"8.4407456",
    "Phatthalung":"7.6166823",
    "Phichit":"16.4429516",
    "Phitsanulok":"16.8298048",
    "Phetchaburi":"13.1111601",
    "Phetchabun":"16.4189807",
    "Phrae":"18.1445774",
    "Phuket":"7.9810496",
    "Maha Sarakham":"16.1850896",
    "Mukdahan":"16.542443",
    "Mae Hong Son":"19.2990643",
    "Yasothon":"15.792641",
    "Yala":"6.541147",
    "Roi Et":"16.0538196",
    "Ranong":"9.9528702",
    "Rayong":"12.6833115",
    "Ratchaburi":"13.5282893",
    "Lop Buri":"14.7995081",
    "Lampang":"18.2888404",
    "Lamphun":"18.5744606",
    "Loei":"17.4860232",
    "Si Sa Ket":"15.1186009",
    "Sakon Nakhon":"17.1545995",
    "Songkhla":"7.1756004",
    "Satun":"6.6238158",
    "Samut Prakan":"13.5990961",
    "Samut Songkhram":"13.4098217",
    "Samut Sakhon":"13.5475216",
    "Sa Kaeo":"13.824038",
    "Saraburi":"14.5289154",
    "Sing Buri":"14.8936253",
    "Sukhothai":"17.0055573",
    "Suphan Buri":"14.4744892",
    "Surat Thani":"9.1382389",
    "Surin":"14.882905",
    "Nong Khai":"17.8782803",
    "Nong Bua Lamphu":"17.2218247",
    "Ang Thong":"14.5896054",
    "Amnat Charoen":"15.8656783",
    "Udon Thani":"17.4138413",
    "Uttaradit":"17.6200886",
    "Uthai Thani":"15.3835001",
    "Ubon Ratchathani":"15.2286861",
    "Bueng Kan":"18.3609104"
  }

  var province_lon = {
    "Bangkok":"100.52412349999997",
    "Krabi":"98.90628349999997",
    "Kanchanaburi":"99.53281149999998",
    "Kalasin":"103.5058755",
    "Kamphaeng Phet":"99.52266179999992",
    "Khon Kaen":"102.8359921",
    "Chanthaburi":"102.10385459999998",
    "Chachoengsao":"101.07795959999999",
    "Chonburi":"100.98467170000004",
    "Chai Nat":"100.12512500000003",
    "Chaiyaphum":"102.03150270000003",
    "Chumphon":"99.18001989999993",
    "Chiang Rai":"99.83095500000002",
    "Chiang Mai":"98.99313110000003",
    "Trang":"99.61100650000003",
    "Trat":"102.51747339999997",
    "Tak":"99.12584979999997",
    "Nakhon Nayok":"101.21305110000003",
    "Nakhon Pathom":"100.06216760000007",
    "Nakhon Phanom":"104.76955079999993",
    "Nakhon Ratchasima":"102.09776929999998",
    "Nakhon Si Thammarat":"99.96312190000003",
    "Nakhon Sawan":"100.12255949999997",
    "Nonthaburi":"100.51435279999998",
    "Narathiwat":"101.82531429999995",
    "Nan":"100.77304170000002",
    "Buriram":"103.10291910000001",
    "Pathum Thani":"100.52502759999993",
    "Prachuap Khiri Khan":"99.79732709999996",
    "Prachin Buri":"101.37274389999993",
    "Pattani":"101.25048259999994",
    "Ayutthaya":"100.56895989999998",
    "Phayao":"99.9019419",
    "Phangnga":"98.51930319999997",
    "Phatthalung":"100.07402309999998",
    "Phichit":"100.34823289999997",
    "Phitsanulok":"100.26149150000003",
    "Phetchaburi":"99.93913069999996",
    "Phetchabun":"101.15509259999999",
    "Phrae":"100.14028310000003",
    "Phuket":"98.36388239999997",
    "Maha Sarakham":"103.30264609999995",
    "Mukdahan":"104.72091509999996",
    "Mae Hong Son":"97.96562259999996",
    "Yasothon":"104.14528270000005",
    "Yala":"101.28039469999999",
    "Roi Et":"103.65200359999994",
    "Ranong":"98.60846409999999",
    "Rayong":"101.23742949999996",
    "Ratchaburi":"99.81342110000003",
    "Lop Buri":"100.65337060000002",
    "Lampang":"99.49087399999996",
    "Lamphun":"99.0087221",
    "Loei":"101.72230020000006",
    "Si Sa Ket":"104.32200949999992",
    "Sakon Nakhon":"104.1348365",
    "Songkhla":"100.61434699999995",
    "Satun":"100.06737440000006",
    "Samut Prakan":"100.59983190000003",
    "Samut Songkhram":"100.00226450000002",
    "Samut Sakhon":"100.27439559999993",
    "Sa Kaeo":"102.0645839",
    "Saraburi":"100.91014210000003",
    "Sing Buri":"100.39673140000002",
    "Sukhothai":"99.82637120000004",
    "Suphan Buri":"100.11771279999994",
    "Surat Thani":"99.32174829999997",
    "Surin":"103.49371070000007",
    "Nong Khai":"102.74126380000007",
    "Nong Bua Lamphu":"102.42603680000002",
    "Ang Thong":"100.45505200000002",
    "Amnat Charoen":"104.62577740000006",
    "Udon Thani":"102.78723250000007",
    "Uttaradit":"100.09929420000003",
    "Uthai Thani":"100.02455269999996",
    "Ubon Ratchathani":"104.85642170000006",
    "Bueng Kan":"103.64644629999998"
  }

  var axios = require('axios');
  var https = require('https');

  var config = {
    method: 'get',
    // url: 'https://rguard.ntdigitalsolutions.com/api/province/Bangkok/hourly-aqi',
    url: 'https://rguard.ntdigitalsolutions.com/api/province/hourly-aqi',
    headers: {
      'apikey': 'kaWyen6t41EF2FIkbQW6LgrzIxwVfXlF'
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    })
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    // console.log('before='+before);
    // console.log('after='+after);
    //res.send(JSON.stringify(response.data));

    var jsondata = response.data.result.data

    jsondata.forEach(obj => {

      //start looping through data
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(obj.pm2_5);

      var us_aqi = 0;
      us_aqi = uscal(obj.pm2_5);

      if(obj.pm2_5<=15){
        th_score = 1;
      }else if(obj.pm2_5>15 && obj.pm2_5<=25){
        th_score = 2;
      }else if(obj.pm2_5>25 && obj.pm2_5<=37.5){
        th_score = 3;
      }else if(obj.pm2_5>37.5 && obj.pm2_5<=75){
        th_score = 4;
      }else if(obj.pm2_5>75){
        th_score = 5;
      }

      if(obj.pm2_5<=11.9){
        us_score=1;
      }
      else if( (obj.pm2_5<=35.4) && (obj.pm2_5>11.9) ){
        us_score=2;
      }
      else if( (obj.pm2_5<=55.4) && (obj.pm2_5>35.4) ){
        us_score=3;
      }
      else if( (obj.pm2_5<=150.4) && (obj.pm2_5>55.4) ){
        us_score=4;
      }
      else if( (obj.pm2_5<=250.4) && (obj.pm2_5>150.4) ){
        us_score=5;
      }
      else if( (obj.pm2_5<=350.4) && (obj.pm2_5>250.4) ){
        us_score=6;
      }
      else if( (obj.pm2_5>350.4) ){
        us_score=6;
      }

      var dust = {
        id: 110000 + loop,//obj.id,
        dustboy_id: 110000 + loop,//obj.device_id,
        dustboy_name: obj.province,
        dustboy_lat: province_lat[obj.province],//'13.7244416',
        dustboy_lon: province_lon[obj.province],//'100.352911',
        source_id: '11',
        source_name: 'NT',
        pm10: '0',
        pm25: obj.pm2_5,
        temp: '0',
        humid: '0',
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
        log_datetime: new Date(obj.timestamp).toISOString().slice(0, 19).replace('T', ' '),
      }
      data.push(dust)
      //end looping through data

      loop++;
    });
    res.send(JSON.stringify(data, replacer));

  })
  .catch(function (error) {
    console.log(error);
  });

});
//

///sensors/12
//BOSCH BLUESKY
app.get('/sensors/12', (req, res) => {

  var respdata = [];


var axios = require('axios');

  var data = JSON.stringify({
    "parameterValues": {
      "Type": "DATA",
      "deviceID": "pey0525:bluesky_359072067236014",
      "TimestampRange":{"from":"-3600000","to":"+0"},
    },
    "queryTag": "string",
    "tag": null
  });

var config = {
  method: 'post',
  url: 'https://bosch-iot-insights.com/mongodb-query-service/v2/pey0525/query-templates/618ccfbe6de2a380b138adc1/execute-query',
  headers: {
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Cookie': '__VCAP_ID__=6b5dc0d9-82f6-4f32-671a-3278; JSESSIONID=0251a340-387d-4c2d-a45a-8bb02530cf50; XSRF-TOKEN=87424db7-bfe6-4db0-88ce-e600ed266ba8; ap=ciam-insights',
    'Origin': 'https://bosch-iot-insights.com',
    'Referer': 'https://bosch-iot-insights.com/ui/assets/swagger-ui/index.html?url=/mongodb-query-service/api-docs?group=latest',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'X-XSRF-TOKEN': '87424db7-bfe6-4db0-88ce-e600ed266ba8',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"'
  },
  data : data
};

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    //res.send(JSON.stringify(response.data[0].payload.PM2P5_1hr));

    var jsondata = response.data

    jsondata.forEach(obj => {

      //start looping through data
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(obj.payload.PM2P5_1hr);

      var us_aqi = 0;
      us_aqi = uscal(obj.payload.PM2P5_1hr);

      if(obj.payload.PM2P5_1hr<=25){
        th_score = 1;
      }else if(obj.payload.PM2P5_1hr>25 && obj.payload.PM2P5_1hr<=37){
        th_score = 2;
      }else if(obj.payload.PM2P5_1hr>37 && obj.payload.PM2P5_1hr<=50){
        th_score = 3;
      }else if(obj.payload.PM2P5_1hr>50 && obj.payload.PM2P5_1hr<=90){
        th_score = 4;
      }else if(obj.payload.PM2P5_1hr>90){
        th_score = 5;
      }

      if(obj.payload.PM2P5_1hr<=11.9){
        us_score=1;
      }
      else if( (obj.payload.PM2P5_1hr<=35.4) && (obj.payload.PM2P5_1hr>11.9) ){
        us_score=2;
      }
      else if( (obj.payload.PM2P5_1hr<=55.4) && (obj.payload.PM2P5_1hr>35.4) ){
        us_score=3;
      }
      else if( (obj.payload.PM2P5_1hr<=150.4) && (obj.payload.PM2P5_1hr>55.4) ){
        us_score=4;
      }
      else if( (obj.payload.PM2P5_1hr<=250.4) && (obj.payload.PM2P5_1hr>150.4) ){
        us_score=5;
      }
      else if( (obj.payload.PM2P5_1hr<=350.4) && (obj.payload.PM2P5_1hr>250.4) ){
        us_score=6;
      }
      else if( (obj.payload.PM2P5_1hr>350.4) ){
        us_score=6;
      }

      var dust = {
        id: '359072067236014',
        dustboy_id: '359072067236014',
        dustboy_name: 'IMB Bosch',
        dustboy_lat: '18.776649266666',
        dustboy_lon: '98.9850874333333',
        source_id: '12',
        source_name: 'BOSCH',
        pm10: '0',
        pm25: obj.payload.PM2P5_1hr,
        temp: '0',
        humid: '0',

        // "PM10_24hr": 10.809,
        //       "PM2P5_24hr": 8.075,
        //       "PM10_1hr": 14.384,
        //       "PM2P5_1hr": 9.902,
        //       "NO2_1hr": -4.623,
        //       "O3_1hr": 105.996,
        //       "SO2_1hr": -71.729,
        //       "CO_1hr": 514.863,
        //       "LocalTime": "2022-05-04T12:00:00.000Z",
        //       "CO_3_CORR_1hr_PPM": 0.447707,
        //       "NO2_1_CORR_1hr_PPM": -2.459043,
        //       "O3_0_CORR_1hr_PPM": 54.079592,
        //       "SO2_2_CORR_1hr_PPM": -27.377481,

        // "PM10_24hr": 10.809,
        //       "PM2P5_24hr": 8.075,
        //       "PM10_1hr": 14.384,
        //       "PM2P5_1hr": 9.902,
        //       "NO2_1hr": -4.623,
        //       "O3_1hr": 105.996,
        //       "SO2_1hr": -71.729,
        //       "CO_1hr": 514.863,
        //       "LocalTime": "2022-05-04T12:00:00.000Z",
        //       "CO_3_CORR_1hr_PPM": 0.447707,
        //       "NO2_1_CORR_1hr_PPM": -2.459043,
        //       "O3_0_CORR_1hr_PPM": 54.079592,
        //       "SO2_2_CORR_1hr_PPM": -27.377481,
        no2_1hr: obj.payload.NO2_1hr,
        o3_1hr: obj.payload.O3_1hr,
        so2_1hr: obj.payload.SO2_1hr,
        co_1hr: obj.payload.CO_1hr,
        co_3_corr_1hr_ppm: obj.payload.CO_3_CORR_1hr_PPM,
        no2_1_corr_1hr_ppm: obj.payload.NO2_1_CORR_1hr_PPM,
        o3_0_corr_1hr_ppm: obj.payload.O3_0_CORR_1hr_PPM,
        so2_2_corr_1hr_ppm: obj.payload.SO2_2_CORR_1hr_PPM,



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
        log_datetime: new Date(obj.payload.UTC).toISOString().slice(0, 19).replace('T', ' '),
      }
      respdata.push(dust)
      //end looping through data


    });
    res.send(JSON.stringify(respdata, replacer));

  })
  .catch(function (error) {
    console.log(error);
  });

});
//

///sensors/13
//NTAQHI.INFO
app.get('/sensors/13', (req, res) => {

  var data = [];

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://www.ntaqhi.info/api/avghour/UyCnKlT4OvX89Rh6PWCsuaSllUnghWcwKxg0sGMV',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    // console.log('before='+before);
    // console.log('after='+after);
    // res.send(JSON.stringify(response.data));

    var jsondata = response.data.data

    jsondata.forEach(obj => {

      //start looping through data
      var th_score = 0;
      var us_score = 0;

      var th_aqi = 0;
      th_aqi = thcal(obj.pm2_5);

      var us_aqi = 0;
      us_aqi = uscal(obj.pm2_5);

      if(obj.pm2_5<=15){
        th_score = 1;
      }else if(obj.pm2_5>15 && obj.pm2_5<=25){
        th_score = 2;
      }else if(obj.pm2_5>25 && obj.pm2_5<=37.5){
        th_score = 3;
      }else if(obj.pm2_5>37.5 && obj.pm2_5<=75){
        th_score = 4;
      }else if(obj.pm2_5>75){
        th_score = 5;
      }

      if(obj.pm2_5<=11.9){
        us_score=1;
      }
      else if( (obj.pm2_5<=35.4) && (obj.pm2_5>11.9) ){
        us_score=2;
      }
      else if( (obj.pm2_5<=55.4) && (obj.pm2_5>35.4) ){
        us_score=3;
      }
      else if( (obj.pm2_5<=150.4) && (obj.pm2_5>55.4) ){
        us_score=4;
      }
      else if( (obj.pm2_5<=250.4) && (obj.pm2_5>150.4) ){
        us_score=5;
      }
      else if( (obj.pm2_5<=350.4) && (obj.pm2_5>250.4) ){
        us_score=6;
      }
      else if( (obj.pm2_5>350.4) ){
        us_score=6;
      }

      var dust = {
        id: 130000 + parseInt(obj.id),
        dustboy_id: 130000 + parseInt(obj.id),
        dustboy_name: obj.area_name,
        dustboy_lat: obj.latitude,
        dustboy_lon: obj.longitude,
        source_id: '13',
        source_name: 'NTAQHI',
        pm10: '0',
        pm25: obj.pm2_5,    
        temp: '0',
        humid: '0',
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
        log_datetime: obj.ts,
      }
      data.push(dust)
      //end looping through data


    });
    res.send(JSON.stringify(data, replacer));

  })
  .catch(function (error) {
    console.log(error);
  });

});
//

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );
