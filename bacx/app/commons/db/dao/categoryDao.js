const Category = require('../models/CategoryModel')

exports.getCategories = async () => {
        return await Category.find({}).sort({ name: "asc" }).orFail(); 
      };

exports.findCategory = async (category) => {
      return await Category.findOne({ name: category });
}

exports.createCategory = async (category) => {
      return await Category.create({ name: category });
}

exports.deleteCategory = async (category) => {
      const categoryExists = await this.findCategory(category);
      return categoryExists ? await categoryExists.remove() : false
      
}