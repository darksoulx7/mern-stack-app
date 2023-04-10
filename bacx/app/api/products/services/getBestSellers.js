const { ProductDao: { getBestSellers } } = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
      const products = await getBestSellers();
      const ans = {
        msg: "Product Fetched Successfully!!",
        products,
      };
      resp.status(200).send(ans);
  } catch (err) {
    logger.error(`Error while getting product, ${err}`);
    next(err);
  }
};
