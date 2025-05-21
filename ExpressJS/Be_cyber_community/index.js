import dotenv from "dotenv";
dotenv.config();

import express from "express";
import rootRoute from "./src/routes/rootRoute.js";
import cors from "cors";
import "./src/models/connect.js";
import { sequelize } from "./src/models/connect.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(rootRoute);

const port = 3069;
const server = app.listen(port, async () => {
    console.log(`Lắng nghe cổng http://localhost:${port} ...`);
    try {
        const { database } = sequelize.config;
        console.log(`Kết nối database: ${database} thành công.`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
