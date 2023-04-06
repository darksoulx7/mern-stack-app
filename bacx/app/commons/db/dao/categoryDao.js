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
      return await Category.deleteOne({ name: category });
}

exports.addValuesToTheAttr = (categoryExists, obj) => {
      categoryExists.attrs.push(obj);  
}

exports.saveCategory = async (category) => {
      return await category.save();
};   

exports.findCategoryInAsc = async () => { 
      return await Category.find({}).sort({name: "asc"});
};