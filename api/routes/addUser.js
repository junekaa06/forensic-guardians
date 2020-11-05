var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var bcrypt = require('bcrypt');

router.use(cookieParser());

router.get('/', function (req, res, next) {

  console.log("TESTING");

  const sql = require("mssql");
  // require("msnodesqlv8");
  var config = {
    server: "35.182.137.140",
    database: "ForensicGuardians",
    user: "ForensicGuardians",
    password: "P@ssw0rd",
    port: 1433
    // config for your database

  };

  // connect to your database
  sql.connect(config, function (err) {
    console.log("connected");

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("select * from Users where account = '" + req.query.email + "'", function (err, recordset) {

      if (err) console.log(err);

      // send records as a response
      console.log(recordset);
      console.log(req.query.email);
      console.log(req.query.password);

      if (recordset.recordset[0]){
        console.log("email already exists");
        res.send({ valid: false });
      } 
      else {
        console.log("new user");
        bcrypt.genSalt(10, function (err, salt) { 
          if (err) console.log(err);
          console.log("genSalt");
          bcrypt.hash(req.query.password, salt, function(err, hash){
            if (err) console.log(err);
            console.log("hash");
            datetime = new Date().toLocaleDateString("en-US", {timeZone: "America/Vancouver"});
            request.query("insert into Users(account, password, active, addedon, role, phone) values ('" + req.query.email + "', '" + hash + "', 1, '" + datetime + "', 'User', '" + req.query.telephone + "');", function (err, recordset) {
              console.log("query complete")
              if (err) console.log(err);
              console.log("recordset")
              console.log(recordset)
            });    
          });

        res.send({ valid: true });

        });
      }

    });
  });
});

module.exports = router;