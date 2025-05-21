import express from "express";
import { addOrder } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/orders", addOrder);

export default router;
