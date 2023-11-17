var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.99",
  user: "dev",
  password: "nrct",
  database: "dev"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM nrct", function (err, result, fields) {
    if (err) throw err;
    console.log(JSON.stringify(result));
  });
});
