const { ProductDao: {  findProductById, deleteProduct } } = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");
const message = require("../../../commons/utils/getMessage");
/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
    const product = await findProductById(req.params.id);
    if (product) {
      const x = await deleteProduct(product.name);
      resp.json({ message: x.deletedCount ? message("productRemoved") : message("productNotFound") });
    } else {
      resp.json({ msg: message("productNotFound") });
    }
  } catch (err) {
    logger.error(`Error while getting product, ${err}`);
    next(err);
  }
};
