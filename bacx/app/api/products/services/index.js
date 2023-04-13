const getProducts = require("./getProducts");
const getProductById = require("./getProductById");
const getBestSellers = require("./getBestSellers");
const getProductsForAdmin = require('./getProductsForAdmin');
const adminDeleteProduct = require('./adminDeleteProduct');
const adminCreateProduct = require('./adminCreateProduct');
const adminUpdateProduct = require('./adminUpdateProduct');
const adminFileUplod = require("./adminFileUplod"); 
const adminDeleteProductImage = require("./adminDeleteProductImage");

module.exports = {
    getProducts, getProductById,
    getBestSellers, getProductsForAdmin,
    adminDeleteProduct, adminCreateProduct,
  adminUpdateProduct, adminFileUplod, adminDeleteProductImage
  };
