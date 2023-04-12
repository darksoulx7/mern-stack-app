const { ProductDao: { findProductById, updateProduct } } = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
     const product = await findProductById(req.params.id);
      if(product) {
        await updateProduct(req.body, product);
        resp.json({ msg: "product updated successfully!!" });
      } else {
        resp.json({ msg: `Product does not exists for id: ${req.params.id}`})
      }
  } catch (err) {
    logger.error(`Error while creating product, ${err}`);
    next(err);
  }
};
