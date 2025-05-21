import * as restaurantService from "../service/restaurantService.js";

const likeAndDisLike = async (req, res) => {
    try {
        const result = await restaurantService.likeAndDisLike(req.body);
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("likeAndDisLike:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

const getLikeOfRestaurant = async (req, res) => {
    try {
        const data = await restaurantService.getLikeOfRestaurant(req.params.res_id);
        res.status(200).json({
            message: "Xử lý thành công",
            data,
        });
    } catch (error) {
        console.error("getLikeOfRestaurant:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

const getLikeOfUser = async (req, res) => {
    try {
        const data = await restaurantService.getLikeOfUser(req.params.user_id);
        res.status(200).json({
            message: "Xử lý thành công",
            data,
        });
    } catch (error) {
        console.error("getLikeOfUser:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

const addRate = async (req, res) => {
    try {
        const data = await restaurantService.addRate(req.body);
        res.status(200).json({
            message: "Xử lý thành công",
            data,
        });
    } catch (error) {
        console.error("addRate:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

const getRateOfRestaurant = async (req, res) => {
    try {
        const data = await restaurantService.getRateOfRestaurant(req.params.res_id);
        res.status(200).json({
            message: "getRateOfRestaurant",
            data,
        });
    } catch (error) {
        console.error("getRateOfRestaurant:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

const getRateOfUser = async (req, res) => {
    try {
        const data = await restaurantService.getRateOfUser(req.params.user_id);
        res.status(200).json({
            message: "Xử lý thành công",
            data,
        });
    } catch (error) {
        console.error("getRateOfUser:", error);
        res.status(400).json({ message: error.message || "Xử lý không thành công" });
    }
};

export { likeAndDisLike, getLikeOfRestaurant, getLikeOfUser, addRate, getRateOfRestaurant, getRateOfUser };
