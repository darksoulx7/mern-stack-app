const { OrderDao : { getOrderForAnalysis } } = require('../../../commons/db/dao');
const logger = require("../../../commons/utils/logger");
/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */
module.exports = async (req, resp, next) => {
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);
    
    const orderData = await getOrderForAnalysis(start, end);
    resp.status(200).json(orderData);
  } catch (err) {
    logger.error(`Error: ${err}`);
    next(err);
  }
};