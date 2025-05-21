import * as ordersService from "../service/ordersService.js";

const addOrder = async (req, res) => {
    try {
        const result = await ordersService.addOrder(req.body);
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("addOrder:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

export { addOrder };
