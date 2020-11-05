var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var bcrypt = require('bcrypt')

router.use(cookieParser());


router.put('/', function (req, res, next) {

    const sql = require("mssql");
    var config = {
        server: "35.182.137.140",
        database: "ForensicGuardians",
        user: "ForensicGuardians",
        password: "P@ssw0rd",
        port: 1433
        // config for your database

    };

    // connect to database
    sql.connect(config, function (err) {
        console.log("connected");

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query("select * from Users WHERE account = '" + req.cookies.name + "';", function (err, recordset) {
            if (err) console.log(err);
            userid = String(recordset.recordset[0].accountid)

            bcrypt.compare(userid, req.cookies.id, function (err, result) {
                if (err) console.log(err);
                if (result) {

                    request.query("select * from client WHERE createdby = '" + userid + "';", function (err, recordset) {
                        //check if a user with the userid already exists in the client table
                        //datetime = new Date().toLocaleDateString("en-US", { timeZone: "America/Vancouver" });
                        clientid = recordset.recordset[0].recid

                        
                        request.query("select * FROM clientmedical WHERE clientrecid = '" + clientid + "' ORDER BY seq ASC;", function (err, recordset) {
                            if (err) console.log(err);
                            featuresList = recordset.recordset
                            console.log(featuresList)
                            res.send({ features: featuresList });
                        })
                        
                    })
                }
            })
        })
    })
});


module.exports = router;