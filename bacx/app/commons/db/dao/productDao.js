const Product = require('../models/ProductModel');
const recordsPerPage = require('../../config/pagination');

exports.getProducts = async () => {
    return await Product.find({}).sort({ name: "asc" }).orFail().limit(recordsPerPage);
};

exports.findProduct = async (product) => {
    return await Product.findOne({ name: product });
}

exports.createProduct = async (product) => {
    return await Product.create({ name: product });
}

exports.deleteProduct = async (product) => {
    return await Product.deleteOne({ name: product });
}

// exports.addValuesToTheAttr = (productExists, obj) => {
//     productExists.attrs.push(obj);
// }

exports.saveProduct = async (product) => {
    return await product.save();
};