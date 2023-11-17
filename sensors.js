var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "api_3000",
  password: "Amazon1234!",
  database: "api_3000"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM nrct", function (err, result, fields) {
    if (err) throw err;
    console.log(JSON.stringify(result));
  });
});
