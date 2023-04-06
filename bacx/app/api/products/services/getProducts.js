const { ProductDao: { getProducts } } = require('../../../commons/db/dao');

const { messages } = require('../../../commons/utils');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
    const products = await getProducts();
    const ans = {
      msg: messages('getProducts'),
      items: products,
      count: products.length
    }
    resp.status(200).send(ans);
    
  } catch (err) {
    logger.error(`Error while showing users, ${err}`);
    next(err);
  }
};