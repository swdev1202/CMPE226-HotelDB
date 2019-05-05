/* CMPE226 Team 7 */
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKey');

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

// crate a new connection information
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hotel'
})

// connect to the database
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

app.get('/', function(req, res){
    res.send("Hello from index.js back end!");
})


/******************************Sign-Up******************************/
// GUEST CREATE BACKEND
app.post('/create', function(req, res){
    console.log("Hello from inside the post create backend..!");

    // first, encrypt our plain text password
    const encryptPassword = cryptr.encrypt(req.body.password);

    // create a SQL query using a stored procedure on DB
    var sql = "CALL createGuest (" +
    mysql.escape(req.body.guest_id) + ", " +
    mysql.escape(req.body.firstname) + ", " +
    mysql.escape(req.body.lastname) + ", " + 
    mysql.escape(req.body.phone_number) + ", " +
    mysql.escape(encryptPassword) + " )";

    con.query(sql, function(err, result){
        if (err)
        {
            // HTTP 400
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Error while creating user..!");
            console.log("Error while creating user..!");
        }
        else
        {
            // HTTP 200
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("User created successfully!");
            console.log("User created successfully!");
        }
    })
})

// EMPLOYEE CREATE BACKEND
app.post('/empcreate', function(req, res){
    console.log("Hello from inside the post employee create back end.. ");

    // first, encrpyt a plain text password
    const encryptPassword = cryptr.encrypt(req.body.password);

    // SQL query using a stored procedure in DB
    var sql = "CALL createEmployee (" +
    mysql.escape(req.body.emp_id) + ", " +
    mysql.escape(req.body.ssn) + ", " +
    mysql.escape(req.body.firstname) + ", " +
    mysql.escape(req.body.lastname) + ", " + 
    mysql.escape(req.body.dob) + ", " +
    mysql.escape(req.body.salary) + ", " +
    mysql.escape(encryptPassword) + ", " + 
    mysql.escape(req.body.dno) + ")";

    con.query(sql, function(err, result){
        if (err)
        {
            // HTTP 400
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error while creating employee..");
            console.log("Error while creating employee!");
        }
        else
        {
            // HTTP 200
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Employee created successfully!');
            console.log("Employee created successfully!");
        }
    })
})

// GUEST LOGIN BACKEND
app.post('/login', function(req, res){
    console.log("Hello from inside the post login back end.. ");

    var guest_id = req.body.guest_id;
    var password = req.body.password;
    var guest = guest_id;

    // First, retrieve the stored password given a guest_id
    var sql = "CALL getGuestPassword ( " +
    mysql.escape(guest) + ")";
    con.query(sql, function(err, result){

        console.log(result);
        // Decrypt the stored password to compare with given password
        const decryptPassword = cryptr.decrypt(result[0][0].guestPassword);

        if (password === decryptPassword)
        {
            console.log("Valid password!");

            // Assigning this guest session
            res.cookie('cookie', req.body.guest_id, {maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end("Successful login");
            console.log("Successful login!");
        }
        else
        {
            console.log("Invalid password!");

            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Invalid credentials");
            console.log("Invalid credentials!");
        }
    })
})

// EMPLOYEE LOGIN BACKEND
app.post('/emplogin', function(req, res){
    console.log("Hello from inside the post employee login back end.. ");

    var emp_id = req.body.emp_id;
    var password = req.body.password;
    // var employee = emp_id;

    var sql = "CALL getEmployeePassword (" + 
    mysql.escape(emp_id) + ")";

    con.query(sql, function(err, result){
        // First, decrpyt stored password
        const decryptPassword = cryptr.decrypt(result[0][0].employeePassword);

        if (password === decryptPassword)
        {
            console.log("Valid password!");
            // Give this employee a new session
            res.cookie('cookie', req.body.emp_id, {maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end("Successful login");
            console.log("Successful login!");
        }
        else
        {
            console.log("Invalid password!");

            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Invalid credentials");
            console.log("Invalid credentials!");
        }
    })
})

//---------------- GUEST RESERVTAION ------------------//
app.post('/reservation/search', function(req, res){
    var onlyDateCheckIn = req.body.checkInDate_cal.slice(0,10);
    var onlyDateCheckOut = req.body.checkOutDate_cal.slice(0,10);
    console.log(onlyDateCheckIn, onlyDateCheckOut);

    var sql = "SELECT roomNumber, roomType, roomPrice FROM Room WHERE roomNumber NOT IN (SELECT roomNum FROM Reservation WHERE beginDate = ?)";
    con.query(sql, [onlyDateCheckIn], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/reservation/check', function(req, res){
    var guestid = req.body.guestid;
    console.log(guestid);

    var sql = "SELECT * FROM Reservation WHERE guestID = ? ORDER BY beginDate ASC";
    con.query(sql, [guestid], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/reservation/make', function(req,res){
    var onlyDateCheckIn = req.body.checkInDate_cal.slice(0,10);
    var onlyDateCheckOut = req.body.checkOutDate_cal.slice(0,10);
    var userID = req.body.userID;
    var roomNum = req.body.roomNumber;
    console.log(onlyDateCheckIn, onlyDateCheckOut, userID, roomNum);

    var sql = "INSERT INTO Reservation (beginDate, endDate, guestID, roomNum) VALUES (?,?,?,?)";
    con.query(sql, [onlyDateCheckIn, onlyDateCheckOut, userID, roomNum], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            res.send("Insertion Success!");
        }
    });
});

//----------------- GUEST INVOICE ---------------------//
app.post('/invoice', function(req,res){
    var userID = req.body.guestid;
    console.log(userID);

    var sql = "SELECT * FROM Invoice WHERE guestID = ? ORDER BY invoiceDate ASC"
    con.query(sql, [userID], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});


/*******************************************************/
/*********************** front desk ********************/
/*******************************************************/

//--------------------------rooms----------------------//
// view rooms
app.get('/frontdesk/view-room', function(req, res){
    var sql = "SELECT * FROM Room ORDER BY roomNumber ASC";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

// update rooms
app.post('/frontdesk/update-room', function(req, res){
    var roomNum = req.body.roomNumber;
    var newStatus = req.body.newStatus;
    console.log(roomNum, newStatus)

    var sql = "UPDATE Room SET roomStatus=? WHERE roomNumber=?";
    con.query(sql, [newStatus, roomNum], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            var message = "Room Status Change Successful";
            console.log(message);
            res.send(message);
        }
    });
});

//--------------------------reservations----------------------//
// view reservations
app.get('/frontdesk/view-reservation', function(req, res){
    console.log("Reservation status request from the frontdesk");
    var sql = "SELECT * FROM Reservation ORDER BY bookNumber ASC";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

// update reservations
app.post('/frontdesk/update-reservation', function(req, res){
    var roomNum = req.body.roomNumber;
    var bookNum = req.body.bookNumber;
    console.log(bookNum, roomNum)

    var sql = "UPDATE Reservation SET roomNum=? WHERE bookNumber=?";
    con.query(sql, [roomNum, bookNum], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
        }
    });
});

// insert reservations
app.post('/frontdesk/insert-reservation', function(req, res){
    var checkin = req.body.checkIn;
    var checkout = req.body.checkOut;
    var guestid = req.body.guestId;
    var roomnum = req.body.roomNum;

    console.log(checkin, checkout, guestid, roomnum);

    var sql = "INSERT INTO Reservation (beginDate, endDate, guestID, roomNum) VALUES (?,?,?,?)";
    con.query(sql, [checkin, checkout, guestid, roomnum], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            res.send("Inserted New Reservation!");
        }
    });
});

// delete reservations (manager)
app.post('/frontdesk/delete-reservation', function(req, res){
    var res_num = req.body.reservation_number
    console.log(res_num)

    var sql = "DELETE FROM Reservation WHERE bookNumber=?";
    con.query(sql, [res_num], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            var message = "DELETE successfully"
            console.log(message);
            res.send(message);
        }
    });
});

// -----------------------invoice-----------------------//

// view invoice
app.get('/frontdesk/view-invoice', function(req, res){
    var sql = "SELECT * FROM Invoice ORDER BY invoiceNum ASC";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

// insert invoice
app.post('/frontdesk/insert-invoice', function(req, res){
    var guestID = req.body.guestID;
    var invoiceDate = req.body.invoiceDate;
    var roomCharge = req.body.roomCharge;
    var foodCharge = req.body.foodCharge;

    console.log(guestID, invoiceDate, roomCharge, foodCharge);

    var sql = "INSERT INTO Invoice (invoiceDate, roomCharge, foodCharge, guestID) VALUES (?,?,?,?)";
    con.query(sql, [invoiceDate, roomCharge, foodCharge, guestID], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            var message = "Inserted New Invoice!";
            console.log(message);
            res.send(message);
        }
    });
});

// update invoice
app.post('/frontdesk/update-invoice', function(req, res){
    var invoiceNum = req.body.invoice_num;
    var invoiceDate = req.body.invoiceDate;
    var roomCharge = req.body.roomCharge;
    var foodCharge = req.body.foodCharge;

    console.log(invoiceNum, invoiceDate, roomCharge, foodCharge);

    var sql = "UPDATE Invoice SET invoiceDate=?, roomCharge=?, foodCharge=? WHERE invoiceNum=?";
    con.query(sql, [invoiceDate, roomCharge, foodCharge, invoiceNum], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            var message = "Updated Invoice!";
            console.log(message);
            res.send(message);
        }
    });
});

// delete invoice (manager)
app.post('/frontdesk/delete-invoice', function(req, res){
    var invoiceNum = req.body.invoice_num
    console.log(invoiceNum)

    var sql = "DELETE FROM Invoice WHERE invoiceNum=?";
    con.query(sql, [invoiceNum], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            var message = "DELETE successfully"
            console.log(message);
            res.send(message);
        }
    });
});


//--------------------------orders----------------------//
// view orders
app.get('/frontdesk/view-order', function(req, res){
    console.log("Order status request from the frontdesk");
    var sql = "SELECT * FROM Orders as O JOIN Produces as P WHERE O.orderNumber = P.orderNumber";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

app.listen(3001, function(req, res){
    console.log("Port 3001 is open and ready!");
});