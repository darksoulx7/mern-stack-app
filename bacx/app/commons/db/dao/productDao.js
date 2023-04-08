const Product = require("../models/ProductModel");
const recordsPerPage = require("../../config/pagination");

exports.getProducts = async (pageNum, sort, query, select) => {
  return await Product.find(query)
    .select(select)
    .skip(recordsPerPage * (pageNum - 1))
    .sort(sort)
    .limit(recordsPerPage);
};

exports.findProduct = async (product) => {
  return await Product.findOne({ name: product });
};

exports.createProduct = async (product) => {
  return await Product.create({ name: product });
};

exports.deleteProduct = async (product) => {
  return await Product.deleteOne({ name: product });
};

exports.countDocuments = async (query) => {
  return await Product.countDocuments(query);
};

exports.getPaginationLinksNumber = (totalProducts) => {
  return Math.ceil(totalProducts / recordsPerPage);
};

// exports.addValuesToTheAttr = (productExists, obj) => {
//     productExists.attrs.push(obj);
// }

exports.saveProduct = async (product) => {
  return await product.save();
};

exports.getProductsById = async (id) => {
  return await Product.findById(id).populate("reviews");
};