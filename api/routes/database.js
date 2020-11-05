var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

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
        request.query('select top 1 * from client', function (err, recordset) {

            if (err) console.log(err);

            // send records as a response
            console.log(recordset);
            res.send(recordset)

        });
    });
});

module.exports = router;