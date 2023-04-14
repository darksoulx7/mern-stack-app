const { UserDao: { findUserByEmail } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');
const { comparePasswords } = require("../../../commons/utils/hashPassword");
const generateAuthToken = require('../../../commons/utils/generateAuthToken');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
        const { email, password, doNotLogout } = req.body;
        if (!(email && password)) {
            return resp.status(400).send("All inputs are required");
        }

        const user = await findUserByEmail(email);
        if (user) {

            if (!comparePasswords(password, user.password)) {
                return resp.status(401).send("wrong credentials")
            }

            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            };

            if (doNotLogout) {
                cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
            }

            return resp.cookie(
                "access_token",
                generateAuthToken(
                    user._id,
                    user.name,
                    user.lastName,
                    user.email,
                    user.isAdmin
                ),
                cookieParams
            ).json({
                success: "user logged in",
                userLoggedIn: { _id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin, doNotLogout }
            });
        } else {
            return resp.status(401).send("user does not exist!");
        }
    } catch (err) {
        logger.error(`Error while showing users, ${err}`);
        next(error);
    }
};