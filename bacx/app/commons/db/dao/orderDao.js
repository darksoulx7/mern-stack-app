const logger = require("../../utils/logger");
const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

exports.getUserOrders = async (id) => {
  return await Order.find({ user: id });
};

exports.getOrder = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt")
    .orFail();
  return order ? order : { msg: "Order not found" };
};

exports.createOrder = async (
  cartItems,
  orderTotal,
  paymentMethod,
  ids,
  qty,
  user
) => {
  await Product.find({ _id: { $in: ids } }).then((products) => {
    products.forEach(async function (product, idx) {
      logger.info(`sales, ${qty[idx]} , ${product.sales}` )
      product.sales += qty[idx];
      await product.save();
    });
  });

  const order = new Order({
    user: ObjectId(user._id),
    orderTotal: orderTotal,
    cartItems: cartItems,
    paymentMethod: paymentMethod,
  });

  return await order.save();
};

exports.updateOrderToDelivered = async (id) => {
  const order = await Order.findById(id).orFail();

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    return await order.save();
  } else {
    return { msg: "order not found" };
  }
};

exports.updateOrderToPaid = async (id) => {
  const order = await Order.findById(id).orFail();

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    return await order.save();
  } else {
    return { msg: "order not found!" };
  }
};

exports.getOrders = async () => {
  return await Order.find({})
    .populate("user", "-password")
    .sort({ paymentMethod: "desc" });
};

exports.getOrderForAnalysis = async (start, end) => {
  return await Order.find({
    createdAt: {
      $gte: start,
      $lte: end,
    },
  }).sort({ createdAt: "asc" });
};
