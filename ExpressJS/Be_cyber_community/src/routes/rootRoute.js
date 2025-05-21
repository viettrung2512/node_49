import express from "express";
import restaurantRoute from "./restaurant.js";
import userRoute from "./user.js";
import ordersRoute from "./orders.js";

const rootRoute = express.Router();

rootRoute.use("/Welcome", (req, res) => {
    res.status(200).json("Welcome API app_food");
});

rootRoute.use("/user", userRoute);
rootRoute.use("/restaurant", restaurantRoute);
rootRoute.use("/orders", ordersRoute);

export default rootRoute;
