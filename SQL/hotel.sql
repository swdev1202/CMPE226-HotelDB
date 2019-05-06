-- SJSU CMPE 226 Spring 2019 TEAM7
DROP DATABASE IF EXISTS hotel;
CREATE DATABASE hotel;
USE hotel;

CREATE TABLE Guest(
    guestID VARCHAR(20) NOT NULL, -- PK
    guestFName VARCHAR(20),
    guestLName VARCHAR(20),
    guestPhoneNumber CHAR(10),
	guestPassword VARCHAR(72) NOT NULL -- VARHCAR size depending on the encrpytion 
);

CREATE TABLE Invoice(
    invoiceNum INT NOT NULL, -- PK
    invoiceDate DATE,
    roomCharge DECIMAL(6,2),
    foodCharge DECIMAL(6,2),
    guestID VARCHAR(20) --  FK to Guest.guestID
);

CREATE TABLE Reservation(
    bookNumber INT NOT NULL, -- PK
    beginDate DATE,
    endDate DATE,
    guestID VARCHAR(20), --  FK to Guest.guestID
    roomNum INT -- FK to Room.roomNumber
);

CREATE TABLE Room(
    roomNumber INT NOT NULL, -- PK
    roomType CHAR(3) NOT NULL, -- 'std':standard, 'lux':luxury, 'sui':suite
    roomPrice DECIMAL(6,2),
    roomStatus INT -- empty:0, occupied=1, cleaning=2, construction=3
);

CREATE TABLE Orders(
    orderNumber INT NOT NULL, -- PK
    guestID VARCHAR(20) -- FK to Guest.guestID
);

CREATE TABLE Contain(
    orderNumber INT NOT NULL, -- PK & FK to Orders.orderNumber
    foodID INT NOT NULL, -- PK & FK to Food.foodID
    quantity INT NOT NULL
);

CREATE TABLE Food(
    foodID INT NOT NULL, -- PK
    foodName VARCHAR(20) NOT NULL,
    foodPrice DECIMAL(4,2),
    foodCategory VARCHAR(20)
);

CREATE TABLE Employee(
    employeeID INT NOT NULL UNIQUE,
    employeeSSN CHAR(9) NOT NULL, -- PK (reflect this change on ERD)
    employeeFName VARCHAR(20) NOT NULL,
    employeeLName VARCHAR(20) NOT NULL,
    employeeDOB DATE,
    employeeSalary INT,
	employeePassword VARCHAR(72) NOT NULL, -- depending on  the encryption 
    dno INT NOT NULL -- FK to Department.departmentNumber
);

CREATE TABLE Department(
	departmentNumber INT NOT NULL, -- PK
    departmentName VARCHAR(10) NOT NULL,
    manager_SSN CHAR(9) NOT NULL -- FK to Employee.SSN
);

-- assigning PK to each table --
ALTER TABLE Guest ADD CONSTRAINT PK_Guest_ID PRIMARY KEY(guestID);
ALTER TABLE Invoice ADD CONSTRAINT PK_Invoicec_Num PRIMARY KEY(invoiceNum);
ALTER TABLE Reservation ADD CONSTRAINT PK_Reservation_Num PRIMARY KEY(bookNumber);
ALTER TABLE Room ADD CONSTRAINT PK_Room_Num PRIMARY KEY(roomNumber);
ALTER TABLE Orders ADD CONSTRAINT PK_Order_Num PRIMARY KEY(orderNumber);
ALTER TABLE Contain ADD CONSTRAINT PK_Contain_orNum_fID PRIMARY KEY(orderNumber, foodID);
ALTER TABLE Food ADD CONSTRAINT PK_Food_ID PRIMARY KEY(foodID);
ALTER TABLE Employee ADD CONSTRAINT PK_Employee_SSN PRIMARY KEY(employeeSSN);
ALTER TABLE Department ADD CONSTRAINT PK_Department_Num PRIMARY  KEY(departmentNumber);

-- assigning AUTO_INCREMENT to certain PK --
ALTER TABLE Orders CHANGE orderNumber  orderNumber INT NOT NULL AUTO_INCREMENT;
ALTER TABLE invoice CHANGE invoiceNum  invoiceNum INT NOT NULL AUTO_INCREMENT;
ALTER TABLE reservation CHANGE bookNumber  bookNumber INT NOT NULL AUTO_INCREMENT;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `createGuest`(IN guestID varchar(20), IN guestFName varchar(20), IN guestLName varchar(20), IN guestPhoneNumber char(10), IN guestPassword varchar(72))
BEGIN
	INSERT INTO Guest (guestID, guestFname, guestLName, guestPhoneNumber, guestPassword) VALUES (guestID, guestFName, guestLName, guestPhoneNumber, guestPassword);
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getGuestPassword`(IN guest_id VARCHAR(20))
BEGIN
	SELECT guestPassword From Guest WHERE guestID = guest_id;
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `createEmployee`(IN employeeID INT, IN employeeSSN CHAR(9), IN employeeFName VARCHAR(20), IN employeeLName VARCHAR(20), IN employeeDOB VARCHAR(20), IN employeeSalary INT, IN employeePassword VARCHAR(72), IN dno INT)
BEGIN
	INSERT INTO Employee (employeeID, employeeSSN, employeeFName, employeeLName, employeeDOB, employeeSalary, employeePassword, dno) VALUES (employeeID, employeeSSN, employeeFName, employeeLName, employeeDOB, employeeSalary, employeePassword, dno);
END //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmployeePassword`(IN employee_ID INT)
BEGIN
	SELECT employeePassword FROM Employee WHERE employeeID = employee_ID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE select_parameters_for_invoice()
BEGIN
	DECLARE _gid VARCHAR(20);
    DECLARE _date DATE;
    DECLARE _price DECIMAL(6,2);
    
	SELECT guestID, endDate, (endDate - beginDate) * roomPrice as RoomCharge INTO _gid, _date, _price
	FROM Reservation as reserve
	JOIN Room as room WHERE reserve.roomNum = room.roomNumber
	ORDER BY bookNumber DESC
	LIMIT 1;
    
    INSERT INTO Invoice (invoiceDate, roomCharge, foodCharge, guestID) VALUES (_date, _price, 0, _gid);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_reservation_insert
	AFTER INSERT ON Reservation
    FOR EACH ROW
BEGIN
	CALL select_parameters_for_invoice;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_total_order_price()
BEGIN
	DECLARE _totalprice DEC(6,2);
    DECLARE _gid VARCHAR(20);

	SELECT guestID, SUM(quantity * foodPrice) INTO _gid, _totalprice
	FROM FOOD_ORDER
	JOIN Food ON FOOD_ORDER.foodID = Food.foodID
	WHERE orderNumber IN (SELECT MAX(orderNumber) FROM Orders);
    
    UPDATE Invoice SET foodCharge = _totalprice WHERE guestID = _gid;
END //
DELIMITER //

DELIMITER //
CREATE TRIGGER after_food_order_insert
	AFTER INSERT ON Contain
    FOR EACH ROW
BEGIN
	CALL get_total_order_price;
END //
DELIMITER ;
