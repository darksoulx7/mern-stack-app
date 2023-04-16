const { UserDao: { findUserById, saveUser } } = require('../../../commons/db/dao');
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
    await saveUser(user, req.body);
    resp.send("user updated");
  } catch (err) {
    logger.error(`Error while showing users, ${err}`);
    next(err);
  }
};