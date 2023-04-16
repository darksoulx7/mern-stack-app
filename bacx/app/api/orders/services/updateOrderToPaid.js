const { OrderDao : { updateOrderToPaid } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');
/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */
module.exports = async (req, resp, next) => {
  try {
    const orderData = await updateOrderToPaid(req.params.id);
    resp.status(200).json(orderData)
    
  } catch (err) {
    logger.error(`Error: ${err}`);
    next(err);
  }
};