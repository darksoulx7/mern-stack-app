const { ProductDao: { getProductsById } } = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
      const product = await getProductsById(req.params.id);
      const ans = {
        msg: "Product Fetched Successfully!!",
        product,
      };
      resp.status(200).send(ans);
  } catch (err) {
    logger.error(`Error while getting product, ${err}`);
    next(err);
  }
};
