import initModels from "../models/init-models.js";
import { sequelize } from "./../models/connect.js";

const model = initModels(sequelize);

const likeAndDisLike = async (body) => {
    const { user_id, date_like, res_id } = body;

    const resExist = await model.restaurant.findOne({ where: { res_id } });

    if (!resExist) throw new Error("Restaurant không tồn tại");

    const likeExist = await model.like_res.findOne({ where: { user_id, res_id } });

    if (likeExist) {
        if (!likeExist.dis_like) {
            await model.like_res.update(
                { ...likeExist, dis_like: 1 },
                {
                    where: {
                        like_res_id: likeExist.like_res_id,
                    },
                    returning: true,
                }
            );

            const data = await model.like_res.findOne({
                attributes: ["like_res_id", "date_like", "dis_like"],
                where: {
                    like_res_id: likeExist.like_res_id,
                },
                include: [
                    {
                        model: model.restaurant,
                        as: "re",
                    },
                ],
            });

            return { message: "dislike thành công", data };
        }

        if (likeExist.dis_like) {
            await model.like_res.update(
                { ...likeExist, dis_like: 0 },
                {
                    where: {
                        like_res_id: likeExist.like_res_id,
                    },
                }
            );

            const data = await model.like_res.findOne({
                attributes: ["like_res_id", "date_like", "dis_like"],
                where: {
                    like_res_id: likeExist.like_res_id,
                },
                include: [
                    {
                        model: model.restaurant,
                        as: "re",
                    },
                ],
            });

            return { message: "like thành công", data };
        }
    }

    if (!likeExist) {
        const createdLike = await model.like_res.create({
            user_id,
            res_id: +res_id,
            date_like,
        });

        const data = await model.like_res.findOne({
            attributes: ["like_res_id", "date_like", "dis_like"],
            where: {
                like_res_id: createdLike.like_res_id,
            },
            include: [
                {
                    model: model.restaurant,
                    as: "re",
                },
            ],
        });

        return { message: "like thành công", data };
    }
};

const getLikeOfRestaurant = async (res_id) => {
    const resExist = await model.restaurant.findOne({ where: { res_id } });

    if (!resExist) throw new Error("Restaurant không tồn tại");

    const listLikeOfRes = await model.like_res.findAll({
        attributes: ["like_res_id", "date_like", "dis_like"],
        where: {
            res_id: resExist.res_id,
            dis_like: 0,
        },
        include: [
            {
                model: model.users,
                as: "user",
                attributes: {
                    exclude: ["password"],
                },
            },
        ],
    });

    return {
        ...resExist.dataValues,
        listLikeOfRes,
    };
};

const getLikeOfUser = async (user_id) => {
    const userExist = await model.users.findOne({
        attributes: {
            exclude: ["password"],
        },
        where: { user_id },
    });

    if (!userExist) throw new Error("User không tồn tại");

    const likeOfUser = await model.like_res.findAll({
        attributes: ["like_res_id", "date_like", "dis_like"],
        where: {
            user_id: userExist.user_id,
            dis_like: 0,
        },
        include: [
            {
                model: model.restaurant,
                as: "re",
            },
        ],
    });

    return {
        ...userExist.dataValues,
        likeOfUser,
    };
};

const addRate = async (body) => {
    const { user_id, date_rate, amount, res_id } = body;

    const resExist = await model.restaurant.findOne({ where: { res_id } });

    if (!resExist) throw new Error("Restaurant không tồn tại");

    const createRate = await model.rate_res.create({
        user_id,
        res_id,
        amount,
        date_rate,
    });

    const data = await model.rate_res.findOne({
        attributes: ["rate_res_id", "amount", "date_rate"],
        where: {
            rate_res_id: createRate.rate_res_id,
        },
        include: [
            {
                model: model.restaurant,
                as: "re",
            },
        ],
    });

    return data;
};

const getRateOfRestaurant = async (res_id) => {
    const resExist = await model.restaurant.findOne({ where: { res_id } });

    if (!resExist) throw new Error("Restaurant không tồn tại");

    const listRateOfRes = await model.rate_res.findAll({
        attributes: ["rate_res_id", "amount", "date_rate"],
        where: {
            res_id: resExist.res_id,
        },
        include: [
            {
                model: model.users,
                as: "user",
                attributes: {
                    exclude: ["password"],
                },
            },
        ],
    });

    return {
        ...resExist.dataValues,
        listRateOfRes,
    };
};

const getRateOfUser = async (user_id) => {
    const userExist = await model.users.findOne({
        attributes: {
            exclude: ["password"],
        },
        where: { user_id },
    });

    if (!userExist) throw new Error("User không tồn tại");

    const rateOfUser = await model.rate_res.findAll({
        attributes: ["rate_res_id", "amount", "date_rate"],
        where: {
            user_id: userExist.user_id,
        },
        include: [
            {
                model: model.restaurant,
                as: "re",
            },
        ],
    });

    return {
        ...userExist.dataValues,
        rateOfUser,
    };
};

export {
    likeAndDisLike,
    getLikeOfRestaurant,
    getLikeOfUser,
    addRate,
    getRateOfRestaurant,
    getRateOfUser,
};
