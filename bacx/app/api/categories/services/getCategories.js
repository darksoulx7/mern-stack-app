const { CategoryDao: { getCategories } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');
const { messages } = require('../../../commons/utils');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */
module.exports = async (req, resp, next) => {
  try {
    const categories = await getCategories();
    const ans = {
      items: categories,
      msg: messages('getCategories'),
    }

    resp.status(200).send(ans);
  } catch (err) {
    logger.error('Error while showing users ', err);
    console.log("error", err)
    next(next);
  }
};