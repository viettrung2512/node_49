USE FoodOrderSystem;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE restaurant (
    res_id INT AUTO_INCREMENT PRIMARY KEY,
    res_name VARCHAR(255),
    image VARCHAR(255),
    `desc` VARCHAR(255)
);

CREATE TABLE food_type (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255)
);

CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(255),
    image VARCHAR(255),
    price FLOAT,
    `desc` VARCHAR(255),
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES food_type(type_id)
);

CREATE TABLE sub_food (
    sub_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_name VARCHAR(255),
    sub_price FLOAT,
    food_id INT,
    FOREIGN KEY (food_id) REFERENCES food(food_id)
);

CREATE TABLE orders (
    user_id INT,
    food_id INT,
    amount INT,
    code VARCHAR(255),
    arr_sub_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
);

CREATE TABLE like_res (
    user_id INT,
    res_id INT,
    date_like DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

CREATE TABLE rate_res (
    user_id INT,
    res_id INT,
    amount INT,
    date_rate DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

INSERT INTO users (full_name, email, password) VALUES
('Nguyen Van Hoang', 'a@gmail.com', 'pass123'),
('Tran Thi Thu', 'b@gmail.com', 'pass456'),
('Le Van Hoa', 'c@gmail.com', 'pass789'),
('Pham Thi Dung', 'd@gmail.com', 'passabc'),
('Truc Truc', 'test@example.com', '123456'),
('Do Van Chau', 'e@gmail.com', 'passdef');


INSERT INTO restaurant (res_name, image, `desc`) VALUES
('Nha Hang A', 'image_a.jpg', 'Nhà hàng A nổi tiếng với món lẩu'),
('Nha Hang B', 'image_b.jpg', 'Nhà hàng B nổi tiếng với món nướng'),
('Nha Hang C', 'image_c.jpg', 'Nhà hàng C chuyên đồ ăn nhanh');


INSERT INTO food_type (type_name) VALUES
('Lẩu'),
('Nướng'),
('Đồ ăn nhanh');


INSERT INTO food (food_name, image, price, `desc`, type_id) VALUES
('Lẩu thái', 'lau_thai.jpg', 200000, 'Lẩu thái chua cay', 1),
('Bò nướng', 'bo_nuong.jpg', 150000, 'Bò nướng đá', 2),
('Burger bò', 'burger_bo.jpg', 50000, 'Burger bò truyền thống', 3);


INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Thêm tôm', 50000, 1),
('Thêm bò', 60000, 1),
('Phô mai', 20000, 2);


INSERT INTO orders (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ORDER001', '1,2'),
(2, 2, 1, 'ORDER002', '3'),
(3, 3, 3, 'ORDER003', ''),
(1, 2, 1, 'ORDER004', ''),
(4, 1, 1, 'ORDER005', '1');

INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, NOW()),
(1, 2, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(1, 3, NOW()),
(5, 1, NOW());


INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, NOW()),
(2, 2, 4, NOW()),
(3, 3, 3, NOW()),
(1, 2, 4, NOW()),
(5, 1, 5, NOW());

-- Tìm 5 người đã like nhà hàng nhiều nhất.
SELECT user_id, COUNT(*) AS like_count
FROM like_res
GROUP BY user_id
ORDER BY like_count DESC
LIMIT 5;

-- Tìm 2 nhà hàng có lượt like nhiều nhất.
SELECT res_id, COUNT(*) AS like_count
FROM like_res
GROUP BY res_id
ORDER BY like_count DESC
LIMIT 2;

--Tìm người đã đặt hàng nhiều nhất
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
ORDER BY order_count DESC
LIMIT 1;

--Tìm người dùng không hoạt động trong hệ thống 
SELECT users.user_id, users.full_name, users.email
FROM users
LEFT JOIN orders ON users.user_id = orders.user_id
LEFT JOIN like_res ON users.user_id = like_res.user_id
LEFT JOIN rate_res ON users.user_id = rate_res.user_id
WHERE orders.user_id IS NULL AND like_res.user_id IS NULL AND rate_res.user_id IS NULL;
