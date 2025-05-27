
# XỬ LÝ LIKE NHÀ HÀNG

### Xử lý like nhà hàng (like, unlike)

POST: http://localhost:3069/restaurant/likeAndDisLike

### Lấy danh sách like theo nhà hàng

GET: http://localhost:3069/restaurant/getLikeOfRestaurant/:res_id

### Lấy danh sách like theo user

GET: http://localhost:3069/restaurant/getLikeOfUser/:user_id

# XỬ LÝ ĐÁNH GIÁ NHÀ HÀNG

### Xử lý thêm đánh giá

POST: http://localhost:3069/restaurant/addRate

### Lấy danh sách đánh giá theo nhà hàng

GET: http://localhost:3069/restaurant/getRateOfRestaurant/:res_id

### Lấy danh sách đánh giá theo user

GET: http://localhost:3069/restaurant/getRateOfUser/:user_id

# XỬ LÝ USER ĐẶT MÓN

### Đặt món

POST: http://localhost:3069/user/order/:food_id
