const { UserDao: { updateUserProfile, getUserProfile } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
        console.log("req.user", req.user)
        const user = await getUserProfile(req.user._id);


        if (Object.keys(req.body).length === 0) {
            return resp.status(400).send("Bad Request");
        }

        await updateUserProfile(req.body, user)

        resp.json({
            success: "user updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        logger.error(`Error while showing users, ${err}`);
        next(err);
    }
};