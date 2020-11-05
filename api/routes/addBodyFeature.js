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
            userid = String(recordset.recordset[0].accountid)

            bcrypt.compare(userid, req.cookies.id, function (err, result) {
                if (err) console.log(err);
                if (result) {

                    request.query("select * from client WHERE createdby = '" + userid + "';", function (err, recordset) {
                        clientid = recordset.recordset[0].recid
                        
                        //check if user already has clientmedical entries and get previous seq id
                        request.query("select TOP 1  * from clientmedical WHERE clientrecid = '" + clientid + "' ORDER BY seq DESC;", function (err, recordset){
                            if (err) console.log(err);
                            if (recordset.recordset[0]) {
                                seq = parseInt(recordset.recordset[0].seq) + 1
                            }
                            else {
                                seq = 1
                            }
                            //add body feature to database
                            request.query("insert into clientmedical(clientrecid, medicaltype, seq, description, type, place) values ('" + clientid + "', '" + req.query.medicaltype + "', '" + seq + "', '" + req.query.description + "', '" + req.query.type + "', '" + req.query.place + "');", function (err, recordset) {
                                if (err) console.log(err);
                            })
                        })
                    })
                }
            })
        })
    })
});


module.exports = router;