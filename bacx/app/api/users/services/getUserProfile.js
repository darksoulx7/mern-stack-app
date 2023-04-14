const { UserDao: { getUserProfile } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
        const user = await getUserProfile(req.params.id);
        const ans = {
            msg: "user information is available!",
            doc: user
        }

        resp.status(200).json(ans);
    } catch (err) {
        logger.error(`Error while showing users, ${err}`);
        next(error);
    }
};