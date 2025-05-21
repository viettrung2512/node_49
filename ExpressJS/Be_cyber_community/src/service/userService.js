import initModels from "../models/init-models.js";
import { sequelize } from "./../models/connect.js";
import bcrypt from "bcrypt";
import { createToken } from "../helpers/jwtToken.js";

const model = initModels(sequelize);

const login = async (body) => {
    const { email, password } = body;

    const userExist = await model.users.findOne({ where: { email } });
    if (!userExist) throw new Error("Email không đúng");

    const isPassword = bcrypt.compareSync(password, userExist.password);
    if (!isPassword) throw new Error("Mật khẩu không đúng");

    const token = createToken({ user_id: userExist.user_id, full_name: userExist.full_name, email: userExist.email });

    return {
        message: "Đăng nhập thành công",
        data: { token },
    };
};

const register = async (body) => {
    const { full_name, email, password } = body;

    const userExist = await model.users.findOne({ where: { email } });
    if (userExist) throw new Error("Người dùng đã tồn tại");

    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = await model.users.create({
        full_name,
        email,
        password: passwordHash,
    });

    return {
        message: "Đăng ký thành công",
        data: {
            full_name: newUser.full_name,
            email: newUser.email,
        },
    };
};

const order = async (food_id, body) => {
    const { user_id, amount, code, arr_sub_id } = body;

    const foodExist = await model.food.findOne({ where: { food_id } });
    if (!foodExist) throw new Error("Food không tồn tại");

    const orderCreate = await model.orders.create({
        user_id,
        food_id: foodExist.food_id,
        amount,
        code,
        arr_sub_id,
    });

    const data = await model.orders.findOne({
        attributes: {
            exclude: ["user_id", "food_id"],
        },
        where: {
            orders_id: orderCreate.orders_id,
        },
        include: [
            {
                model: model.food,
                as: "food",
            },
        ],
    });

    return {
        message: "Xử lý thành công",
        data,
    };
};

export { login, register, order };
