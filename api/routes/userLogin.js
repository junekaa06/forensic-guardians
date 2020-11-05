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
        request.query("select * from Users where account = '" + req.query.username + "'", function (err, recordset) {

          if (err) console.log(err);

          // send records as a response
          console.log(recordset);
          console.log(req.query.username);
          console.log(req.query.password);

            bcrypt.compare(req.query.password, recordset.recordset[0].password, function (err, result) {
              if (res) {
                  console.log("match");
                  console.log(req.header("Origin"));
                  res.cookie('name', req.query.username, {maxAge: 3600000, httpOnly: true});

                userid = String(recordset.recordset[0].accountid)
              
                bcrypt.genSalt(5, function (err, salt) {
                  if (err) console.log(err);
                  console.log("genSalt");
                  bcrypt.hash(userid, salt, function (err, hash) {
                    if (err) console.log(err);
                    console.log(hash)
                    res.cookie('id', hash, { maxAge: 3600000, httpOnly: true }).send({ found: true, username: req.query.username, password: req.query.password });
                  })
                })
                } else {
                  console.log("no match");
                  res.send( { found: false });
              }
          });

        });
    });
});

module.exports = router;