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
                        //check if a user with the userid already exists in the client table
                        //datetime = new Date().toLocaleDateString("en-US", { timeZone: "America/Vancouver" });
                        clientid = recordset.recordset[0].recid
                        firstname = req.query.partnername.split(" ")[0];
                        lastname = req.query.partnername.split(" ")[1];

                        request.query("select * from clientemployer WHERE clientrecid = '" + clientid + "';", function (err, recordset) {

                            if (recordset.recordset[0]) {
                                console.log("updating...")
                                //update clientemployer
                                request.query("update clientemployer set employer = '" + req.query.employer + "', occupation = '" + req.query.occupation + "', address1 = '" + req.query.corporateaddress + "', phone = '" + req.query.corporatephone + "' WHERE clientrecid = '" + clientid + "';", function (err, recordset) {
                                    if (err) console.log(err);
                                    //update maritalstatus in client table
                                    request.query("update client set maritalstatus = '" + req.query.maritalstatus + "', partnerfirstname = '" + firstname + "', partnerlastname = '" + lastname +"' WHERE recid = '" + clientid + "';", function (err, recordset) {
                                        if (err) console.log(err);
                                        //todo client identity document
                                    })
                                })
                            }
                            else {
                                //create clientemployer
                                request.query("insert into clientemployer(clientrecid, seq, employer, occupation, address1, phone) values ('" + clientid + "', '1', '" + req.query.employer + "', '" + req.query.occupation + "', '" + req.query.corporateaddress + "', '" + req.query.corporatephone + "');", function (err, recordset) {
                                    if (err) console.log(err);
                                    //client maritalstatus
                                    request.query("update client set maritalstatus = '" + req.query.maritalstatus + "', partnerfirstname = '" + firstname + "', partnerlastname = '" + lastname +"' WHERE recid = '" + clientid + "';", function (err, recordset) {
                                        if (err) console.log(err);
                                        //todo client identity document
                                    }) 
                                })
                                }
                        })
                    })
                }
            })
        })
    })
});


module.exports = router;