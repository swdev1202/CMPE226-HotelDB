-- loading department --
-- ** add more departments? if needed for variety purpose ** --
INSERT INTO department VALUES
(0, 'FrontDesk', '669058470'), -- Syeda
(1, 'HR', '423463105'); -- Paul

-- loading employee --
INSERT INTO employee VALUES
(1, '423463105', 'Paul', 'Meyer', '1973-09-01', 76000, 'e01940e39040aead3e0f46a8031679b1f676612dda', 1), -- password = encrypt(test1)
(2, '669058470', 'Syeda', 'Welch', '1975-02-03', 98200, '654603ffae6ae668193bb182007efc578f3fda0a51', 0), -- password = encrypt(test2)
(3, '776323566', 'Paula', 'Taylor',	'1977-05-09', 82000, 'c9be97730f737b56ea62b69a792a8dc36815a2eec0e2', 0), -- password = encrypt(taylor)
(4, '276398473', 'John', 'Silver', '1983-05-09', 84800, '4e57c2ee1fc151485dcc358e2346e68b679cce022479', 1); -- password = encrypt(silver)

ALTER TABLE Employee ADD CONSTRAINT FK_Employee_Dept_Num FOREIGN KEY(dno) REFERENCES Department(departmentNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Department ADD CONSTRAINT FK_Manager_SSN FOREIGN KEY(manager_SSN) REFERENCES Employee(employeeSSN)  ON DELETE CASCADE  ON UPDATE CASCADE;

-- loading guests --
INSERT INTO Guest VALUES
('cmpe226', 'Kong', 'Li', '4803556262', '5e6e6bf44c442ef5758a0da4d0dac2a832b6e41305f0b0fa'),
('pardis', 'Pardis', 'Tashakori', '3335551212', 'be55a59e7b6f99cd8469d659ec3fb75ec6817938cdf2'),
('dave', 'Tai-Chun', 'Wei', '7773331212', 'cd810133b8114dc285de99d140432274c016780d6761'),
('sean', 'Sean', 'Lee', '3102935959', '8b87e1aead6ccf5df71318a3fb384789b71c081c'),
('sjsu', 'san', 'jose', '4089241000', 'ea4a3c7d991f23ecb152b9f4292f94d013fceab1');


-- loading room --
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

INSERT INTO Reservation (beginDate, endDate, guestID, roomNum) VALUES
('2019-05-09', '2019-05-11', 'cmpe226', 101),
('2019-05-22', '2019-05-23', 'cmpe226', 304),
('2019-07-17', '2019-07-19', 'sean', 601);

ALTER TABLE Reservation ADD CONSTRAINT FK_Reservation_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Reservation ADD CONSTRAINT FK_Room_Num FOREIGN KEY(roomNum) REFERENCES Room(roomNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;

ALTER TABLE Invoice ADD CONSTRAINT FK_Invoice_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE SET NULL  ON UPDATE CASCADE;

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

ALTER TABLE Orders ADD CONSTRAINT FK_Orders_Guest_ID FOREIGN KEY(guestID) REFERENCES Guest(guestID)  ON DELETE CASCADE  ON UPDATE CASCADE;

ALTER TABLE Contain ADD CONSTRAINT FK_Contain_orderNumber FOREIGN KEY(orderNumber) REFERENCES Orders(orderNumber)  ON DELETE CASCADE  ON UPDATE CASCADE;
ALTER TABLE Contain ADD CONSTRAINT FK_Contain_foodID FOREIGN KEY(foodID) REFERENCES Food(foodID)  ON DELETE CASCADE  ON UPDATE CASCADE;

-- create a VIEW for food order --
CREATE VIEW FOOD_ORDER
AS SELECT orders.orderNumber, guestID, foodID, quantity
FROM Orders, Contain
WHERE orders.orderNumber=Contain.orderNumber;
