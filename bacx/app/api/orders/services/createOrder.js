const { OrderDao : { createOrder } } = require('../../../commons/db/dao');
const logger = require("../../../commons/utils/logger");
/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */
module.exports = async (req, resp, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;
    if (!cartItems || !orderTotal || !paymentMethod) {
      return resp.status(400).send("All inputs are required");
    }

    

    let ids = cartItems.map((item) => {
      return item.productId;
    });
    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });

    logger.info(`qty ids, ${qty}, ${ids}`)
    const orderData = await createOrder(cartItems, orderTotal, paymentMethod, ids, qty, req.user);
    resp.status(201).send(orderData);

    } catch (err) {
      logger.error(`Error: ${err}`);
      next(err);
    }
};