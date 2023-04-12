const { ProductDao: { getProductsForAdmin } } = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
      const products = await getProductsForAdmin();
      const ans = {
        msg: "Admin - Products",
        products,
      };
      resp.status(200).send(ans);
  } catch (err) {
    logger.error(`Error while getting product, ${err}`);
    next(err);
  }
};
