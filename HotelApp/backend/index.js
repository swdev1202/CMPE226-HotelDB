var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mkdirp = require('mkdirp');

const bcrypt = require('bcrypt');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// allow access control 
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hotel'
})

con.connect(function(err){
    if (err)
    {
        throw err;
    }
    else
    {
        console.log("Connected!");
    }
})

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(bodyParser.json());

// you can see this on your browser, localhost:3001
app.get('/', function(req, res){
    res.send("Hello from index.js back end!");
})

app.post('/create', function(req, res){
    console.log("Hello from inside the post create backend..!");

    var encryptPassword = null;

    bcrypt.hash(mysql.escape(req.body.password), 10, function(err, hash){

        // var sql = "INSERT INTO Guest (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword) VALUES ( " +
        var sql = "INSERT INTO Guest (guestID, guestFName, guestLName, guestPhoneNumber) VALUES ( " +
        mysql.escape(req.body.guest_id) + ", " +
        mysql.escape(req.body.firstname) + ", " + 
        mysql.escape(req.body.lastname) + ", " + 
        mysql.escape(req.body.phone_number) + ")";

        con.query(sql, function(err, result){
            if (err)
            {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })

                res.end("Error while creating user..!");
                console.log("Error while creating user..!");
                console.log(err);
            }
            else
            {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })

                res.end("User created successfully!");
                console.log("User created successfully!");
            }
        })
    });

});

app.listen(3001, function(req, res){
    console.log("Port 3001 is open and ready!");
});