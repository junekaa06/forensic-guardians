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
        // config for database

    };

    // connect to database
    sql.connect(config, function (err) {

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
                        if (err) console.log(err);
                        clientid = recordset.recordset[0].recid
                        request.query("select * from clientnextofkin WHERE clientrecid = '" + clientid + "';", function (err, recordset) {
                            if (err) console.log(err);

                            if (recordset.recordset[0]) {
                                //update clientnextofkin
                                request.query("update clientnextofkin set firstname = '" + req.query.firstname + "', middlename = '" + req.query.middlename + "', lastname = '" + req.query.lastname + "', relationship = '" + req.query.relationship + "', address1 = '" + req.query.address + "', country = '" + req.query.country + "', postal = '" + req.query.postalcode + "', phone = '" + req.query.phone + "', email = '" + req.query.email + "' WHERE clientrecid = '"+ clientid + "';", function (err, recordset) {
                                    if (err) console.log(err);
                                })
                            }
                            else {
                                //create clientnextofkin
                                request.query("insert into clientnextofkin(clientrecid, seq, firstname, middlename, lastname, relationship, address1, country, postal, phone, email ) values ('" + clientid + "', '1', '" + req.query.firstname + "', '" + req.query.middlename + "', '" + req.query.lastname + "', '" + req.query.relationship + "', '" + req.query.address + "', '" + req.query.country + "', '" + req.query.postalcode + "', '" + req.query.phone + "', '" + req.query.email + "');", function (err, recordset) {
                                    if (err) console.log(err);

                                })

                            }
                        })
                        
                    })
                }
            })
        })

    });
});

module.exports = router;