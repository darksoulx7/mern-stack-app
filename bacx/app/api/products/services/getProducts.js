// const { userDao: { getUsers } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');
/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */
module.exports = async (req, resp, next) => {
  console.log("eee")
  try {
    // const userData = await getUsers();
    logger.info("hello world")
    resp.status(200).send("Fetching the data from mongo")
    // resp.status(200).send(userData);

  } catch (error) {
    console.log('Error while showing users ', error);
    next(next);
  }
};