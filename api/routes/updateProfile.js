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
            userid = String(recordset.recordset[0].accountid)
            
            bcrypt.compare(userid, req.cookies.id, function(err, result){
                if (err) console.log(err);
                if (result) {
                    
                    request.query("select * from client WHERE createdby = '" + userid + "';", function (err, recordset) {
                        //check if a user with the userid already exists in the client table
                        tag = req.query.firstname + "-" + req.query.middlename + "-" + req.query.lastname
                        datetime = new Date().toLocaleDateString("en-US", { timeZone: "America/Vancouver" });
                        clientid = recordset.recordset[0].recid

                        if (recordset.recordset[0]) {
                            //update client
                            request.query("update client set tag = '" + tag + "', firstname = '" + req.query.firstname + "', middlename = '" + req.query.middlename + "', lastname = '" + req.query.lastname + "', fatherslastname = '" + req.query.fatherslastname + "', motherslastname = '" + req.query.motherslastname + "', dateofbirth = '" + req.query.dateofbirth + "', birthcity = '" + req.query.placeofbirth + "', sex = '" + req.query.biologicalsex + "', gender = '" + req.query.gender + "', usualaddress = '" + req.query.address + "', updatedon = '" + datetime + "' WHERE recid = '" + clientid + "';", function (err, recordset) {
                                if (err) console.log(err);
                                //client nationality
                                request.query("update clientnationality set iso2 = '" + req.query.nationality + "' WHERE clientrecid = '" + clientid + "';", function (err, recordset) {
                                    if (err) console.log(err);
                                    //client ancestry
                                    request.query("update clientancestry set iso2 = '" + req.query.ancestry + "' WHERE clientrecid = '" + clientid + "';", function (err, recordset) {
                                        if (err) console.log(err);
                                        //client primary language
                                        request.query("update clientlanguage set iso3 = '" + req.query.principallanguage + "' WHERE clientrecid = '" + clientid + "' AND principal = 'TRUE';", function (err, recordset) {
                                            if (err) console.log(err);
                                            //client secondary language
                                            request.query("update clientlanguage set iso3 = '" + req.query.otherlanguage + "' WHERE clientrecid = '" + clientid + "' AND principal = 'FALSE';", function (err, recordset) {
                                                if (err) console.log(err);
                                                //client email contact
                                                request.query("update clientcontact set contact = '" + req.query.email + "' WHERE clientrecid = '" + clientid + "';", function (err, recordset) {
                                                    if (err) console.log(err);
                                                    //client phone contact
                                                    request.query("update clientcontact set contact = '" + req.query.homeworkphone + "' WHERE clientrecid = '" + clientid + "' AND contacttype = 'phone';", function (err, recordset) {
                                                        if (err) console.log(err);
                                                        //client personal phone contact
                                                        request.query("update clientcontact set contact = '" + req.query.personalphone + "' WHERE clientrecid = '" + clientid + "' AND contacttype = 'mobile';", function (err, recordset) {
                                                            if (err) console.log(err);
                                                            //client whatsapp contact
                                                            request.query("update clientcontact set contact = '" + req.query.whatsapp + "' WHERE clientrecid = '" + clientid + "' AND contacttype = 'whatsapp';", function (err, recordset) {
                                                                if (err) console.log(err);
                                                                //client other contact
                                                                request.query("update clientcontact set contact = '" + req.query.otherphone + "' WHERE clientrecid = '" + clientid + "' AND contacttype = 'other';", function (err, recordset) {
                                                                    if (err) console.log(err);
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        }
                        else {
                            //create client
                            request.query("select TOP 1 * from client ORDER BY recid DESC;", function (err, recordset) {
                                if (err) console.log(err);

                                lastrecid = parseInt(recordset.recordset[0].recid);
                                lastserversequence = parseInt(recordset.recordset[0].serversequence);

                                recid = lastrecid + 1;
                                serversequence = lastserversequence + 1;
                                //client
                                request.query("insert into client(recid, serverrecid, serversequence, status, tag, createdon, createdby, firstname, middlename, lastname, fatherslastname, motherslastname, dateofbirth, birthcity, sex, gender, usualaddress ) values ('" + recid + "', '1', '" + serversequence + "', 'active','" + tag + "', '" + datetime + "', '" + userid + "', '" + req.query.firstname + "', '" + req.query.middlename + "', '" + req.query.lastname + "', '" + req.query.fatherslastname + "', '" + req.query.motherslastname + "', '" + req.query.dateofbirth + "', '" + req.query.placeofbirth + "', '" + req.query.biologicalsex + "', '" + req.query.gender + "', '" + req.query.fulladdress + "');", function (err, recordset) {
                                    if (err) console.log(err);
                                    //client nationality
                                    request.query("insert into clientnationality(clientrecid, iso2 ) values ('" + recid + "', '" + req.query.nationality + "');", function (err, recordset) {
                                        if (err) console.log(err);
                                        //client ancestry
                                        request.query("insert into clientancestry(clientrecid, iso2 ) values ('" + recid + "', '" + req.query.ancestry + "');", function (err, recordset) {
                                            if (err) console.log(err);
                                            //client primary language
                                            request.query("insert into clientlanguage(clientrecid, iso3, principal ) values ('" + recid + "', '" + req.query.pricipallanguage + "', '" + "TRUE" + "');", function (err, recordset) {
                                                if (err) console.log(err);
                                                //client secondary language
                                                request.query("insert into clientlanguage(clientrecid, iso3, principal ) values ('" + recid + "', '" + req.query.otherlanguage + "', '" + "FALSE" + "');", function (err, recordset) {
                                                    if (err) console.log(err);
                                                    //client email contact
                                                    request.query("insert into clientcontact(clientrecid, contacttype, contact ) values ('" + recid + "', 'email', '" + req.query.email + "');", function (err, recordset) {
                                                        if (err) console.log(err);
                                                        //client phone contact
                                                        request.query("insert into clientcontact(clientrecid, contacttype, contact ) values ('" + recid + "', 'phone', '" + req.query.homeworkphone + "');", function (err, recordset) {
                                                            if (err) console.log(err);
                                                            //client personal phone contact
                                                            request.query("insert into clientcontact(clientrecid, contacttype, contact ) values ('" + recid + "', 'mobile', '" + req.query.personalphone + "');", function (err, recordset) {
                                                                if (err) console.log(err);
                                                                //client whatsapp contact
                                                                request.query("insert into clientcontact(clientrecid, contacttype, contact ) values ('" + recid + "', 'whatsapp', '" + req.query.whatsapp + "');", function (err, recordset) {
                                                                    if (err) console.log(err);
                                                                    //client other contact
                                                                    request.query("insert into clientcontact(clientrecid, contacttype, contact ) values ('" + recid + "', 'other', '" + req.query.otherphone + "');", function (err, recordset) {
                                                                        if (err) console.log(err);
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    })
                }
            })  
        })
        
    });
});

module.exports = router;