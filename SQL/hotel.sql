-- SJSU CMPE 226 Spring 2019 TEAM7
DROP DATABASE IF EXISTS hotel;
CREATE DATABASE hotel;
USE hotel;

CREATE TABLE Guest(
    guestID VARCHAR(20) NOT NULL, -- PK
    guestFName VARCHAR(20),
    guestLName VARCHAR(20),
    guestPhoneNumber CHAR(10),
    guestPassword VARCHAR(72) NOT NULL, -- becrypt
    PRIMARY KEY(guestID)
);

CREATE TABLE Invoice(
    invoiceNum INT NOT NULL AUTO_INCREMENT, -- PK
    invoiceDate DATE,
    roomCharge DECIMAL(6,2),
    foodCharge DECIMAL(6,2),
    guestID VARCHAR(20), --  FK to Guest.guestID
    PRIMARY KEY(invoiceNum)
);

CREATE TABLE Reservation(
    bookNumber INT NOT NULL AUTO_INCREMENT, -- PK
    beginDate DATE,
    endDate DATE,
    guestID VARCHAR(20), --  FK to Guest.guestID
    roomNum INT, -- FK to Room.roomNumber
    PRIMARY KEY(bookNumber)
);

CREATE TABLE Room(
    roomNumber INT NOT NULL, -- PK
    roomType CHAR(3) NOT NULL, -- 'std':standard, 'lux':luxury, 'sui':suite
    roomPrice DECIMAL(6,2),
    roomStatus INT -- empty:0, occupied=1, cleaning=2, construction=3
);

CREATE TABLE Orders(
    orderNumber INT NOT NULL AUTO_INCREMENT, -- PK
    guestID VARCHAR(20), -- FK to Guest.guestID
    PRIMARY KEY(orderNumber)
);

CREATE TABLE Produces(
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
    employeeID INT NOT NULL,
    employeeSSN CHAR(9) NOT NULL, -- PK (reflect this change on ERD)
    employeeFName VARCHAR(20) NOT NULL,
    employeeLName VARCHAR(20) NOT NULL,
    employeeDOB DATE,
    employeeSalary INT,
    employeePassword VARCHAR(72) NOT NULL, -- becrypt
    dno INT NOT NULL -- FK to Department.departmentNumber
);

CREATE TABLE Department(
	departmentNumber INT NOT NULL, -- PK
    departmentName VARCHAR(10) NOT NULL,
    manager_SSN CHAR(9) NOT NULL -- FK to Employee.SSN
);

-- assigning PK to each table --
-- ALTER TABLE Guest ADD CONSTRAINT PK_Guest_ID PRIMARY KEY(guestID);
-- ALTER TABLE Invoice ADD CONSTRAINT PK_Invoicec_Num PRIMARY KEY(invoiceNum);
-- ALTER TABLE Reservation ADD CONSTRAINT PK_Reservation_Num PRIMARY KEY(bookNumber);
ALTER TABLE Room ADD CONSTRAINT PK_Room_Num PRIMARY KEY(roomNumber);
-- ALTER TABLE Orders ADD CONSTRAINT PK_Order_Num PRIMARY KEY(orderNumber);
ALTER TABLE Produces ADD CONSTRAINT PK_Produce_orNum_fID PRIMARY KEY(orderNumber, foodID);
-- ALTER TABLE Food ADD CONSTRAINT PK_Food_ID PRIMARY KEY(foodID);
-- ALTER TABLE Employee ADD CONSTRAINT PK_Employee_SSN PRIMARY KEY(employeeSSN);
-- ALTER TABLE Department ADD CONSTRAINT PK_Department_Num PRIMARY KEY(departmentNumber);