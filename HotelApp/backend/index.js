/* CMPE226 Team 7 */
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKey');

const fileUpload = require('express-fileupload');
const { createLogger, format, transports } = require('winston');

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
        logger.info("DB Connected");
    }
})

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Hello from index.js back end!");
})

const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'hotel-db-backend' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.File({ filename: 'hotel_db_error.log', level: 'error' }),
      new transports.File({ filename: 'hotel_db_combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }));
}

/******************************Sign-Up******************************/
// GUEST CREATE BACKEND
app.post('/create', function(req, res){
    logger.info('BACKEND CREATE USER');

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
            logger.error(err);
            // HTTP 400
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Error while creating user..!");
        }
        else
        {
            // HTTP 200
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("User created successfully!");
            logger.info('User Created Successfully');
        }
    })
})

// EMPLOYEE CREATE BACKEND
app.post('/empcreate', function(req, res){
    logger.info('BACKEND EMPLOYEE CREATION');

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
            logger.error(err);
            // HTTP 400
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error while creating employee..");
        }
        else
        {
            // HTTP 200
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Employee created successfully!');
            logger.info('Employee Creation Success!');
        }
    })
})

// GUEST LOGIN BACKEND
app.post('/login', function(req, res){
    logger.info('BACKEND GUEST LOGIN');

    var guest_id = req.body.guest_id;
    var password = req.body.password;
    var guest = guest_id;

    // First, retrieve the stored password given a guest_id
    var sql = "CALL getGuestPassword ( " +
    mysql.escape(guest) + ")";
    con.query(sql, function(err, result){
        if(err){
            logger.error(err);
        }
        // Decrypt the stored password to compare with given password
        const decryptPassword = cryptr.decrypt(result[0][0].guestPassword);

        if (password === decryptPassword)
        {
            // Assigning this guest session
            res.cookie('cookie', req.body.guest_id, {maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end("Successful login");
            logger.info("Successful login!");
        }
        else
        {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Invalid credentials");
            logger.error("Invalid credentials!");
        }
    })
})

// EMPLOYEE LOGIN BACKEND
app.post('/emplogin', function(req, res){
    logger.info("BACKEND EMPLOYEE LOGIN");

    var emp_id = req.body.emp_id;
    var password = req.body.password;

    var sql = "CALL getEmployeePassword (" + 
    mysql.escape(emp_id) + ")";

    con.query(sql, function(err, result){
        // First, decrpyt stored password
        const decryptPassword = cryptr.decrypt(result[0][0].employeePassword);

        if (password === decryptPassword)
        {
            // Give this employee a new session
            res.cookie('cookie', req.body.emp_id, {maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('emp', req.body.emp_id, {maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })

            res.end("Successful login");
            logger.info("Successful login!");
        }
        else
        {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Invalid credentials");
            logger.error("Invalid credentials!");
        }
    })
})

//---------------- GUEST RESERVTAION ------------------//
app.post('/reservation/search', function(req, res){
    logger.info('BACKEND RESERVATION SEARCH');

    var onlyDateCheckIn = req.body.checkInDate_cal.slice(0,10);
    var onlyDateCheckOut = req.body.checkOutDate_cal.slice(0,10);

    var sql = "SELECT roomNumber, roomType, roomPrice FROM Room WHERE roomNumber NOT IN (SELECT roomNum FROM Reservation WHERE beginDate = ?)";
    con.query(sql, [onlyDateCheckIn], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

app.post('/reservation/check', function(req, res){
    logger.info('BACKEND RESERVATION CHECK');
    var guestid = req.body.guestid;

    var sql = "SELECT * FROM Reservation WHERE guestID = ? ORDER BY beginDate ASC";
    con.query(sql, [guestid], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("RESERVATION CHECK SUCCESS");
            res.send(result);
        }
    });
});

app.post('/reservation/make', function(req,res){
    logger.info('BACKEND RESERVATION MAKE');

    var onlyDateCheckIn = req.body.checkInDate_cal.slice(0,10);
    var onlyDateCheckOut = req.body.checkOutDate_cal.slice(0,10);
    var userID = req.body.userID;
    var roomNum = req.body.roomNumber;
    console.log(onlyDateCheckIn, onlyDateCheckOut, userID, roomNum);

    var sql = "INSERT INTO Reservation (beginDate, endDate, guestID, roomNum) VALUES (?,?,?,?)";
    con.query(sql, [onlyDateCheckIn, onlyDateCheckOut, userID, roomNum], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("RESERVATION MAKE SUCCESS");
            res.send("Insertion Success!");
        }
    });
});

//----------------- GUEST INVOICE ---------------------//
app.post('/invoice', function(req,res){
    logger.info('BACKEND INVOICE VIEW');
    var userID = req.body.guestid;

    var sql = "SELECT * FROM Invoice WHERE guestID = ? ORDER BY invoiceDate ASC"
    con.query(sql, [userID], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("INVOICE VIEW SUCCESS");
            res.send(result);
        }
    });
});

//--------------------FOOD ORDER --------------------//
/*==================================== modefied here ==============================================*/
/* Hey Sean~~ The guest_id in the POST should be replaced by the guest_id from logged-in session */
/* Pardis said there is a global var guest_id defined at the top. We can use it. */
/*=============================*/

// Food Order Get
app.get('/FoodOrder', function(req, res){
    logger.info('BACKEND FOOD ORDER GET');

    var sql = "SELECT * from food;";
    con.query(sql, function(err, result){
        if (err)
        {
            logger.error(err);
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error while reading food menu..!");
        }
        else
        {
            logger.info("Food Order Get Success")
            res.send(result);
        }
    });
});

// Food Oder Post
app.post('/FoodOrder', function(req, res){
    logger.info('BACKEND FOOD ORDER POST');
    // whole order insertion should be a transaction //
    con.beginTransaction(function(err) {
        if (err) 
        {
            logger.error(err);
            throw err;
        }
        
        // insert (guest_id, order_number) to "orders table" //
        var sql = "INSERT INTO orders(guestID) VALUES (" +
            mysql.escape(req.body.guest_id) + ");";
        //console.log(sql);
        con.query(sql, function(err, result){
            if (err)
            {
                logger.error(err);
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Error while creating orders..!");
            }
            else
            {
                // and get auto-increment order_number //
                sql = "SELECT MAX(orderNumber) as ord FROM orders WHERE guestID=" + 
                    mysql.escape(req.body.guest_id) + ";";
                    //console.log(sql);
                con.query(sql, function(err, result){
                    if (err)
                    {
                        logger.error(err);
                        res.end("Error while retrieving order ID..!");
                    }
                    else
                    {   
                        // only max/latest order number returned //
                        var ord_num = result[0].ord;
                        // insert each (order_number) to "Contain table" //
                        for(var key in req.body.orders){
                            var value = req.body.orders[key];
                            if(value<=0){ continue; } // filtered which value=0
                            else
                            {
                                sql = "INSERT INTO Contain VALUES (" + ord_num + ", " + key + ", " + value + ");";
                                //console.log(sql);
                                con.query(sql, function(err, result){
                                    if(err){
                                        logger.error(err);
                                        res.end("Error while inserting order elements..!");
                                    }
                                });
                            }
                        }
                        res.send("insert finished");
                        con.commit(function(err) {
                            if (err) {
                                logger.error(err);
                                con.rollback(function() {throw err;});
                            }
                            logger.info("TRANSACTION COMPLETED");
                        });
                    }
                });
            }
        });
    });
});


/*******************************************************/
/*********************** front desk ********************/
/*******************************************************/

//--------------------------rooms----------------------//
// view rooms
app.get('/frontdesk/view-room', function(req, res){
    logger.info('FRONTDESK VIEWING ROOMS REQUESTED');
    var sql = "SELECT * FROM Room ORDER BY roomNumber ASC";
    con.query(sql, function(err, result) {
        if (err) 
        {
            logger.error(err);
            throw err;
        }
        else{
            logger.info('FRONTDESK VIEWING SUCCESS');
            res.send(result);
        }
    });
});

// update rooms
app.post('/frontdesk/update-room', function(req, res){
    logger.info('FRONTDESK UPDATE ROOM');
    var roomNum = req.body.roomNumber;
    var newStatus = req.body.newStatus;

    var sql = "UPDATE Room SET roomStatus=? WHERE roomNumber=?";
    con.query(sql, [newStatus, roomNum], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            var message = "Room Status Change Successful";
            logger.info(message);
            res.send(message);
        }
    });
});

//--------------------------reservations----------------------//
// view reservations
app.get('/frontdesk/view-reservation', function(req, res){
    logger.info('FRONTDESK VIEWING RESERVATIONS');
    var sql = "SELECT * FROM Reservation ORDER BY bookNumber ASC";
    con.query(sql, function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("FRONTDEST VIEW RESERVATION SUCCESS");
            res.send(result);
        }
    });
});

// update reservations
app.post('/frontdesk/update-reservation', function(req, res){
    logger.info("FRONTDESK UPDATE RESERVATION")
    var roomNum = req.body.roomNumber;
    var bookNum = req.body.bookNumber;

    var sql = "UPDATE Reservation SET roomNum=? WHERE bookNumber=?";
    con.query(sql, [roomNum, bookNum], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("FRONTDESK RESERVATION UPDATE SUCCESS");
        }
    });
});

// insert reservations
app.post('/frontdesk/insert-reservation', function(req, res){
    logger.info("FRONTDESK INSERT RESERVATION")
    var checkin = req.body.checkIn;
    var checkout = req.body.checkOut;
    var guestid = req.body.guestId;
    var roomnum = req.body.roomNum;

    var sql = "INSERT INTO Reservation (beginDate, endDate, guestID, roomNum) VALUES (?,?,?,?)";
    con.query(sql, [checkin, checkout, guestid, roomnum], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("FRONTDESK INSERT RESERVATION SUCCESS");
            res.send("Inserted New Reservation!");
        }
    });
});

// delete reservations (manager)
app.post('/frontdesk/delete-reservation', function(req, res){
    logger.info("FRONTDESK RESERVATION DELETE");
    var res_num = req.body.reservation_number

    var sql = "DELETE FROM Reservation WHERE bookNumber=?";
    con.query(sql, [res_num], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            var message = "DELETE successfully"
            logger.info(message);
            res.send(message);
        }
    });
});

// -----------------------invoice-----------------------//

// view invoice
app.get('/frontdesk/view-invoice', function(req, res){
    logger.info("FRONTDESK INVOICE VIEW");
    var sql = "SELECT * FROM Invoice ORDER BY invoiceNum ASC";
    con.query(sql, function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("FRONTDESK INVOICE VIEW SUCCESS");
            res.send(result);
        }
    });
});

// insert invoice
app.post('/frontdesk/insert-invoice', function(req, res){
    logger.info("FRONTDESK INVOICE INSERT");
    var guestID = req.body.guestID;
    var invoiceDate = req.body.invoiceDate;
    var roomCharge = req.body.roomCharge;
    var foodCharge = req.body.foodCharge;

    var sql = "INSERT INTO Invoice (invoiceDate, roomCharge, foodCharge, guestID) VALUES (?,?,?,?)";
    con.query(sql, [invoiceDate, roomCharge, foodCharge, guestID], function(err, result) {
        if (err) {
            logger.err(err);
            throw err;
        }
        else{
            var message = "Inserted New Invoice!";
            logger.info(message);
            res.send(message);
        }
    });
});

// update invoice
app.post('/frontdesk/update-invoice', function(req, res){
    logger.info("FRONTDESK INVOICE UPATE");
    var invoiceNum = req.body.invoice_num;
    var invoiceDate = req.body.invoiceDate;
    var roomCharge = req.body.roomCharge;
    var foodCharge = req.body.foodCharge;

    var sql = "UPDATE Invoice SET invoiceDate=?, roomCharge=?, foodCharge=? WHERE invoiceNum=?";
    con.query(sql, [invoiceDate, roomCharge, foodCharge, invoiceNum], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            var message = "Updated Invoice!";
            logger.info(message);
            res.send(message);
        }
    });
});

// delete invoice (manager)
app.post('/frontdesk/delete-invoice', function(req, res){
    logger.info("FRONTDESK INVOICE DELETE");
    var invoiceNum = req.body.invoice_num

    var sql = "DELETE FROM Invoice WHERE invoiceNum=?";
    con.query(sql, [invoiceNum], function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            var message = "DELETE successfully"
            logger.info(message);
            res.send(message);
        }
    });
});


//--------------------------orders----------------------//
// view orders
app.get('/frontdesk/view-order', function(req, res){
    logger.info("FRONTDESK VIEW ORDERS")
    var sql = "SELECT * FROM FOOD_ORDER";
    con.query(sql, function(err, result) {
        if (err) {
            logger.error(err);
            throw err;
        }
        else{
            logger.info("FRONTDESK VIEW ORDER SUCCESS");
            res.send(result);
        }
    });
});

app.listen(3001, function(req, res){
    logger.info("Port 3001 is open and ready!");
});