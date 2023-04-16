const { UserDao: { getUsers } } = require('../../../commons/db/dao');
const logger = require("../../../commons/utils/logger");
const { messages } = require("../../../commons/utils");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
    const users = await getUsers();
    const ans = {
      msg: messages("users fetched successfully!"),
      count: users.length,
      users,
    };

    resp.status(200).json(ans);
  } catch (err) {
    logger.error(`Error while showing users, ${err}`);
    next(err);
  }
};