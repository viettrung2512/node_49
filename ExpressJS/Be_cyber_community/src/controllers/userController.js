import * as userService from "../service/userService.js";

const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("login:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

const register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("register", error);
        res.status(400).json({
            message: error.message || "Đăng ký không thành công",
        });
    }
};

const order = async (req, res) => {
    try {
        const result = await userService.order(req.params.food_id, req.body);
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("order", error);
        res.status(400).json({
            message: error.message || "Xử lý không thành công",
        });
    }
};

export { login, register, order };
