const getProducts = require("./getProducts");
const getProductById = require("./getProductById");
const getBestSellers = require("./getBestSellers");
const getProductsForAdmin = require('./getProductsForAdmin');
const adminDeleteProduct = require('./adminDeleteProduct');
const adminCreateProduct = require('./adminCreateProduct');
const adminUpdateProduct = require('./adminUpdateProduct');


module.exports = {
  getProducts,
  getProductById,
  getBestSellers,
  getProductsForAdmin,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct
};
