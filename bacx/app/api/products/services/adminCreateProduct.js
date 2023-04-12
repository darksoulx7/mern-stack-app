const { ProductDao: { createProduct } } = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
      const product = await createProduct(req.body);
      const ans = {
        msg: "product created",
        productId: product._id
      };
      resp.status(200).send(ans);
  } catch (err) {
    logger.error(`Error while creating product, ${err}`);
    next(err);
  }
};
