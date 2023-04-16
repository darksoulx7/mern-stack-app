const { UserDao: { findUserById, deleteUser } } = require('../../../commons/db/dao');
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
    const user = await findUserById(req.params.id);
    await deleteUser(user);
    resp.send("user removed");
  } catch (err) {
    logger.error(`Error while showing users, ${err}`);
    next(err);
  }
};