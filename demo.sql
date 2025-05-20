-- tao co so du lieu

create database if not exists db_test

create table users (
	id int ,
	fullName varchar(255),
	email varchar(255),
	isActive boolean
)

create table food (
	id int PRIMARY KEY AUTO_INCREMENT,
	foodName VARCHAR(255),
	description VARCHAR(255)
)

create table orders (
	id int PRIMARY KEY AUTO_INCREMENT,
	userId int,
	foodId  int,
	
	FOREIGN KEY(userId) REFERENCES users(id),
	FOREIGN KEY(foodId) REFERENCES food(id)
)

-- rang buoc:
-- NOT NULL: cot phai co gia tri

create table notnull (
	id int not null
	
)

-- unique: du lieu ko duoc trung nhau

create table uniques (
	id int not null unique
)

-- primary key
-- auto_increment : tang so tu dong
create table if not exists test_primarykey(
	id int PRIMARY KEY auto_increment
)

insert into users (email, fullName, password) values 
("vtrung", "nguyen viet trung", "1234"),
("vhong", "nguyen a trung", "1234"),
("vvy", "nguyen b trung", "1234"),
("vvan", "nguyen c trung", "1234")

insert into food (foodName, description) values 
( "su kem", "banh lam tu kem"),
( "goi ga", "goi lam tu ga"),
( "goi vit", "goi lam tu vit"),
( "goi ca", "goi lam tu ca"),
( "goi heo", "goi lam tu heo")

insert into orders (userId, foodId) VALUES 	
(1, 2),
(3, 2),
(2, 5),
(1, 4),
(4, 5)

-- alter table : them cot sau khi co bang table

alter table users
add password varchar(255)

-- chinh sua cot sau khi co table
alter table users
modify COLUMN isActive BOOLEAN DEFAULT 1

alter table users
modify COLUMN id int PRIMARY KEY AUTO_INCREMENT

-- xoa tat ca du lieu ben trong bang
TRUNCATE TABLE users

SELECT * FROM orders WHERE id = 3

-- INNER JOIN
SELECT * 
FROM orders
INNER JOIN users on orders.userId=users.id 

-- LEFT JOIN: tra ve tat ca cac hang ben trai 
SELECT *
FROM users
LEFT JOIN orders on orders.userId=users.id 

-- CROSS JOIN: lay tat ca
SELECT *
FROM users
CROSS JOIN orders 






