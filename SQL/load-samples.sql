-- loading department --
-- ** add more departments? if needed for variety purpose ** --
INSERT INTO department VALUES
(0, 'FrontDesk', '669058470'), -- Syeda
(1, 'HR', '196366710'); -- Julian

-- loading employee --
INSERT INTO employee VALUES
(1, '423463105', 'Paul', 'Meyer', '1973-09-01', 76000, 1),
(2, '669058470', 'Syeda', 'Welch', '1975-02-03', 98200, 0),
(3, '432467425', 'Gregory', 'Moore', '1984-09-09', 66330, 1),
(4, '261670638', 'Nathan', 'Wu', '1970-12-21', 73000, 0),
(5, '160405504', 'Fern', 'Curtis', '1985-06-04', 70000, 0),
(6, '196366710', 'Julian', 'Chavez', '1990-10-10', 97000, 1),
(7, '186308469', 'Victoria', 'Walker', '1975-11-12', 68000, 0),
(8, '410051532', 'Scott', 'Austin', '1978-05-23', 68000, 0),
(9, '238935638', 'Abby', 'Fowler', '1989-02-14', 69000, 0),
(10, '692546374', 'Miles', 'Kirby', '1994-04-08', 75000, 0),
(11, '122470721', 'Gabriella', 'Fernandez', '1996-12-29', 78000, 0),
(12, '315362659', 'Monica', 'Gomez', '1987-10-31', 82000, 0),
(13, '432932898', 'Lorenzo', 'Calderon', '1989-09-17', 67000, 0),
(14, '198743987', 'Rosa', 'Herrera', '1981-04-04', 79000, 1),
(15, '750687067', 'Ana', 'Ross', '1992-03-28', 82000, 0),
(16, '932465322', 'Alesha', 'Shepherd','1992-01-05', 85000, 0),
(17, '924321920', 'Connor', 'John', '1988-07-11', 83000, 0),
(18, '335332264', 'Dennis', 'Thompson', '1989-04-12', 75000, 1),
(19, '904654673', 'Lauren', 'Chambers', '1985-05-26', 76000, 0),
(20, '255902532', 'Amelia', 'Lee', '1987-12-08', 75000, 0);
   -- FrontDest:15, HR:5; total:20 --
   
ALTER TABLE Employee ADD CONSTRAINT FK_Employee_Dept_Num FOREIGN KEY(dno) REFERENCES Department(departmentNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Department ADD CONSTRAINT FK_Manager_SSN FOREIGN KEY(manager_SSN) REFERENCES Employee(employeeSSN)  ON DELETE CASCADE  ON UPDATE CASCADE;
   
-- loading Geust --
INSERT INTO Guest VALUES
('1', 'Oliver', 'Davis', '4083216543'),
('2', 'Jacob', 'Brown', '6261980447'),
('3', 'Emily', 'Morton', '2134008565'),
('4', 'Isabella', 'Li', '6694561234'),
('5', 'Oscar', 'Murphy', '9085462159'),
('6', 'Megan', 'Wilson', '2325679764'),
('7', 'Thomas', 'Roberts', '5074698426'),
('8', 'Callum', 'Anderson', '8896542478'),
('9', 'Bethany', 'White', '4082321567'),
('10', 'Reece', 'Jones', '4085684211');
   
-- loading room --
-- ** looks good new; modified ot our application later if needed ** --
-- separate room status into differnt table ---
INSERT INTO room VALUES
(101, 'std', 99.99, 0),
(102, 'std', 99.99, 0),
(103, 'std', 99.99, 0),
(104, 'std', 99.99, 0),
(105, 'std', 99.99, 0),
(201, 'std', 99.99, 0),
(202, 'std', 99.99, 0),
(203, 'std', 99.99, 0),
(204, 'std', 99.99, 0),
(205, 'std', 99.99, 0),
(301, 'std', 109.99, 0),
(302, 'std', 109.99, 0),
(303, 'std', 109.99, 0),
(304, 'std', 109.99, 0),
(305, 'lux', 209.99, 0),
(401, 'std', 109.99, 0),
(402, 'std', 109.99, 0),
(403, 'std', 109.99, 0),
(404, 'std', 109.99, 0),
(405, 'lux', 209.99, 0),
(501, 'std', 119.99, 0),
(502, 'std', 119.99, 0),
(503, 'std', 119.99, 0),
(504, 'std', 119.99, 0),
(505, 'lux', 219.99, 0),
(601, 'std', 119.99, 0),
(602, 'std', 119.99, 0),
(603, 'std', 119.99, 0),
(604, 'std', 119.99, 0),
(605, 'lux', 219.99, 0),
(701, 'lux', 259.99, 0),
(702, 'lux', 259.99, 0),
(703, 'lux', 259.99, 0),
(704, 'lux', 259.99, 0),
(801, 'sui', 399.99, 0),
(802, 'sui', 399.99, 0);
-- std: 26, lux:8, sui: 2 --> total 36 --

-- loading Reservation --
-- ** match days to invoice amount ** --
-- ** match price with room number ** --
INSERT INTO Reservation VALUES
(1, '2019-04-01', '2019-04-02', '1', 205),
(2, '2019-04-02', '2019-04-04', '2', 605),
(3, '2019-04-10', '2019-04-11', '3', 801),
(4, '2019-04-12', '2019-04-15', '4', 402),
(5, '2019-04-22','2019-04-23', '5', 704),
(6, '2019-04-23', '2019-04-26', '6', 502),  -- special case (start first but stay longer, so generate invoice late)
(7, '2019-04-24', '2019-04-25', '7', 203),
(8, '2019-04-24', '2019-04-25', '8', 301),
(9, '2019-04-25', '2019-04-26', '9', 402),
(10, '2019-04-25', '2019-04-26', '10', 101),
(11, '2019-05-03', '2019-05-04', '1', '802');

ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Reservation ADD CONSTRAINT FK_Room_Num FOREIGN KEY(roomNum) REFERENCES Room(roomNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;

-- loading Invoice --
-- ** prices need to match exact day stayed and food ordered ** --
INSERT INTO Invoice VALUES
(1, '2019-04-02', 99.99, 0, '1'),
(2, '2019-04-04', 439.98, 55, '2'),
(3, '2019-04-11', 399.99, 132, '3'),
(4, '2019-04-15', 329.97, 0, '4'),
(5, '2019-04-23', 259.99, 15, '5'),
(6, '2019-04-25', 99.99, 46, '7'),
(7, '2019-04-25', 109.99, 0, '8'),
(8, '2019-04-26', 479.96, 80, '6'),  -- special case (start first but stay longer, so generate invoice late)
(9, '2019-04-26', 109.99, 35, '9'),
(10, '2019-04-26', 99.99, 27, '10');

ALTER TABLE Invoice ADD CONSTRAINT FK_Invoice_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE SET NULL ON UPDATE CASCADE;

-- loading food --
INSERT INTO food VALUES
(1, 'Orange Juice', 6, 'Beverage'),
(2, 'Apple Juice', 6, 'Beverage'),
(3, 'Sodas', 3, 'Beverage'),
(4, 'Mineral Water', 2, 'Beverage'),
(5, 'Milk', 4, 'Beverage'),
(6, 'Hot Chocolate', 4, 'Beverage'),
(7, 'Coffee', 3.5, 'Beverage'),
(8, 'Tea', 3.5, 'Beverage'),
--
(11, 'Spinach Salad', 9, 'Starter'),
(12, 'Fruit Salad', 10, 'Starter'),
(13, 'Soup', 10, 'Starter'),
(14, 'Sausage', 9, 'Starter'),
(15, 'House Made Cheese', 11, 'Starter'),
(16, 'French Fries', 6, 'Starter'),
(17, 'Muffin', 4, 'Starter'),
--
(21, 'New York Strip Steak', 35, 'Entree'),
(22, 'Cheese Burger', 12, 'Entree'),
(23, 'Burrito', 10, 'Entree'),
(24, 'Roast Pork Shoulder', 25, 'Entree'),
(25, 'Half Roast Chicken', 24, 'Entree'),
(26, 'Chicken Sandwich', 15, 'Entree'),
(27, 'Angus Beef Sandwich', 18, 'Entree'),
--
(31, 'Butterscotch Pudding', 10, 'Dessert'),
(32, 'Ice Cream', 7, 'Dessert'),
(33, 'Cheese Cake', 12, 'Dessert'),
(34, 'Strawberry Cake', 12, 'Dessert'),
(35, 'Macaron', 20, 'Dessert');

-- loading Orders --
-- ** one guest could have more oder (but price should match invoice number) ** --
INSERT INTO Orders VALUES
(1, '2'),
(2, '3'),
(3, '3'),  -- special case, ordered twice
(4, '5'),
(5, '7'),
(6, '6'), 
(7, '9'),
(8, '10');

ALTER TABLE Orders ADD CONSTRAINT FK_Orders_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE CASCADE  ON UPDATE CASCADE;

-- loading Produces --
-- ** food should match order and invoice amount ** --
INSERT INTO Produces VALUES
(1, 1, 1),   -- $55
(1, 2, 1),
(1, 12, 1),
(1, 13, 1),
(1, 15, 1),
(1, 22, 1),
(2, 1, 2),   -- $132 Produce=2($105) & 3($27)
(2, 2, 1),
(2, 27, 1),
(2, 35, 1),
(2, 16, 1),
(2, 34, 1),
(2, 13, 2),
(2, 15, 1),
(3, 7, 2),  
(3, 31, 2), 
(4, 3, 1),   -- $15
(4, 4, 1),
(4, 23, 1),
(5, 2, 1),   -- $46
(5, 6, 1),
(5, 22, 1),
(5, 25, 1),
(6, 1, 1),   -- $80
(6, 24, 1),
(6, 12, 1),
(6, 21, 1),
(6, 6, 1),
(7, 3, 5),   -- $35
(7, 23, 2),
(8, 8, 2),  -- $27
(8, 12, 2);

ALTER TABLE Produces ADD CONSTRAINT FK_Produces_orderNumber FOREIGN KEY(orderNumber) REFERENCES Orders(orderNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Produces ADD CONSTRAINT FK_Produces_foodID FOREIGN KEY(foodID) REFERENCES Food(foodID)  ON DELETE CASCADE  ON UPDATE CASCADE;
