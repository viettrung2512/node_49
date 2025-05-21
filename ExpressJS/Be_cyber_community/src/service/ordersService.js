import initModels from "../models/init-models.js";
import { sequelize } from "./../models/connect.js";

const model = initModels(sequelize);

const addOrder = async (body) => {
    const { user_id, food_id, amount, code, arr_sub_id } = body;

    const userExist = await model.users.findOne({ where: { user_id } });
    if (!userExist) throw new Error("User không tồn tại");

    const foodExist = await model.food.findOne({ where: { food_id } });
    if (!foodExist) throw new Error("Món ăn không tồn tại");

    const createdOrder = await model.orders.create({
        user_id,
        food_id,
        amount,
        code,
        arr_sub_id,
    });

    const data = await model.orders.findOne({
        where: { orders_id: createdOrder.orders_id },
        include: [
            {
                model: model.users,
                as: "user",
                attributes: { exclude: ["password"] },
            },
            {
                model: model.food,
                as: "food",
            },
        ],
    });

    return {
        message: "Đặt món thành công",
        data,
    };
};

export { addOrder };
