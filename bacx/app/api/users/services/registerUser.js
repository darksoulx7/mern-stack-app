const { UserDao: { findUserByEmail, createUser } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');
const { hashPassword } = require("../../../commons/utils/hashPassword");
const generateAuthToken = require('../../../commons/utils/generateAuthToken');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
        const { name, lastName, email, password } = req.body;
        if (!(name && lastName && email && password)) {
            return resp.status(400).send("All inputs are required");
        }

        const userExists = await findUserByEmail(email);
        if (userExists) {
            return resp.status(400).send("user exists");
        } else {
            const hashedPassword = hashPassword(password);
            const user = await createUser({
                name,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
            });
            resp
                .cookie("access_token", generateAuthToken(user._id, user.name, user.lastName, user.email, user.isAdmin), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                })
                .status(201)
                .json({
                    success: "User created",
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                });
        }
    } catch (err) {
        logger.error(`Error while showing users, ${err}`);
        next(error);
    }
};