-- SJSU CMPE 226 Spring 2019 TEAM7
DROP DATABASE IF EXISTS hotel;
CREATE DATABASE hotel;
USE hotel;

CREATE TABLE Guest(
    guestID VARCHAR(20) NOT NULL, -- PK
    guestFName VARCHAR(20),
    guestLName VARCHAR(20),
    guestPhoneNumber CHAR(10)
    -- guestPassword VARCHAR(20) NOT NULL -- VARHCAR size depending on the encrpytion  -- Dave:let's add it later
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
    -- employeeSex CHAR(1), -- M: men, W:women  -- Dave:could we remove the attribute?
    employeeDOB DATE,
    employeeSalary INT,
    -- employeePassword VARCHAR(20) NOT NULL, -- depending on  the encryption  -- Dave:let's add it later
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
ALTER TABLE Produces ADD CONSTRAINT PK_Produce_orNum_fID PRIMARY KEY(orderNumber, foodID);
ALTER TABLE Food ADD CONSTRAINT PK_Food_ID PRIMARY KEY(foodID);
ALTER TABLE Employee ADD CONSTRAINT PK_Employee_SSN PRIMARY KEY(employeeSSN);
ALTER TABLE Department ADD CONSTRAINT PK_Department_Num PRIMARY  KEY(departmentNumber);

-- assigning FK to each table --
/*
ALTER TABLE Employee ADD CONSTRAINT FK_Employee_Dept_Num FOREIGN KEY(dno) REFERENCES Department(departmentNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Department ADD CONSTRAINT FK_Manager_SSN FOREIGN KEY(manager_SSN) REFERENCES Employee(employeeSSN)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Invoice ADD CONSTRAINT FK_Invoice_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE SET NULL  ON UPDATE CASCADE;
ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Reservation ADD CONSTRAINT FK_Room_Num FOREIGN KEY(roomNum) REFERENCES Room(roomNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Orders ADD CONSTRAINT FK_Orders_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Produces ADD CONSTRAINT FK_Produces_orderNumber FOREIGN KEY(orderNumber) REFERENCES Orders(orderNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Produces ADD CONSTRAINT FK_Produces_foodID FOREIGN KEY(foodID) REFERENCES Food(foodID)  ON DELETE CASCADE  ON UPDATE CASCADE;
*/