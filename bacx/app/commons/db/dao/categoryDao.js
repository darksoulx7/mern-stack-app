const Category = require('../models/CategoryModel')
// const logger = require('../../../commons/utils/logger');

exports.getCategories = async () => {
        return await Category.find({}).sort({ name: "asc" }).orFail(); 
      };

exports.findCategory = async (category) => {
      return await Category.findOne({ name: category });
}

exports.createCategory = async (category) => {
      return await Category.create({ name: category });
}
  