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
        console.log(hash);
        
        var sql = "INSERT INTO Guest (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword) VALUES ( " +
        mysql.escape(req.body.guest_id) + ", " +
        mysql.escape(req.body.firstname) + ", " + 
        mysql.escape(req.body.lastname) + ", " + 
        mysql.escape(req.body.phone_number) + ", " + 
        mysql.escape(hash) + ")";

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

app.post('/login', function(req, res){
    console.log("Hello from inside the (post) login backend..!");

    var guest_id = req.body.guest_id;

    var sql = "SELECT guestPassword From Guest WHERE guestID = " + 
    mysql.escape(guest_id);

    con.query(sql, function(err, result){
        if (result.length > 0)
        {
            console.log("Is our query successful?");
            console.log(result[0].guestPassword);

            bcrypt.compare(req.body.password, result[0].guestPassword, function(err, success){
                if (success == true)
                {
                    console.log("Valid password!");

                    res.cookie('cookie', guest_id, {maxAge: 900000, httpOnly: false, path: '/'});

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Successful login!");
                }
                else
                {
                    console.log("Invalid password!");

                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Invalid credentials!");
                }
            })
        }
    })
});

app.post('/emplogin', function(req, res){
    console.log("Hello from inside the (post) employee login backend..!");

    var sql = "SELECT employeePassword From Employee WHERE employeeID = " + 
    mysql.escape(employee_id);

    con.query(sql, function(err, result){
        if (result.length > 0)
        {
            bcrypt.compare(req.body.password, result[0].employeePassword, function(err, success){
                if (success == true)
                {
                    console.log("Valid password!");

                    res.cookie('cookie', guest_id, {maxAge: 900000, httpOnly: false, path: '/'});

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Successful login!");
                }
                else
                {
                    console.log("Invalid password!");

                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Invalid credentials!");
                }
            })
        }
    })
});

app.post('/reservation', function(req, res){
    console.log("Hello fom inside the post reservation backend..!")

    var onlyDateCheckIn = req.body.checkInDate_cal.slice(0,10);
    var onlyDateCheckOut = req.body.checkOutDate_cal.slice(0,10);

    // we will have to find how many rooms are available given the date
    var sql = "SELECT * FROM Reservation WHERE beginDate = ? AND endDate = ?";
    con.query(sql, [onlyDateCheckIn, onlyDateCheckOut], function(err, result) {
        if (err) throw err;
        console.log(result)
    });
});

app.listen(3001, function(req, res){
    console.log("Port 3001 is open and ready!");
});