const Product = require("../models/ProductModel");
const recordsPerPage = require("../../utils/pagination");

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

exports.findProductById = async (id) => {
  return await Product.findById(id);
}

exports.createProduct = async (product) => {
  return await Product.create({ name: product });
};

exports.deleteProduct = async (name) => {
  return await Product.deleteOne({ name });
};

exports.countDocuments = async (query) => {
  return await Product.countDocuments(query);
};

exports.getPaginationLinksNumber = (totalProducts) => {
  return Math.ceil(totalProducts / recordsPerPage);
};

exports.saveProduct = async (product) => {
  return await product.save();
};

exports.getProductsById = async (id) => {
  return await Product.findById(id).populate("reviews");
};

exports.getBestSellers = async () => {
  return await Product.aggregate([
    { $sort: { category: 1, sales: -1 } },
    { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
    { $replaceWith: "$doc_with_max_sales" },
    { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
    { $match: { sales: { $gt: 0 } } },
    { $limit: 3 },
  ]);
};

exports.getProductsForAdmin = async () => {
  // return await Product.aggregate([
  //   { $project: { name: 1, price:1, category: 1}}
  // ]).sort({ category: 1})

  return await Product.find({})
    .select("name price category")
    .sort({ category: 1 });
};


exports.createProduct = async (body) => {

  const product = new Product()
  const { name, description, count, price, category, attributesTable } = body
  product.name = name
  product.description = description
  product.count = count
  product.price = price
  product.category = category
  if (attributesTable.length > 0) {
    attributesTable.map((item) => {
      product.attrs.push(item)
    })
  }
  return await product.save()
}

exports.updateProduct = async (body, product) => {
  const { name, description, count, price, category, attributesTable } = body
  product.name = name || product.name
  product.description = description || product.description
  product.count = count || product.count
  product.price = price || product.price
  product.category = category || product.category
  if (attributesTable.length > 0) {
    product.attrs = []
    attributesTable.map((item) => {
      product.attrs.push(item)
    })
  } else {
    product.attrs = []
  }
  await product.save()
}

exports.findAndDeleteImagePath = async (id, imagePath) => {
  await Product.findOneAndUpdate({ _id: id },
    { $pull: { images: { path: imagePath } } })
}