const Category = require('../models/CategoryModel')
const logger = require('../../../commons/utils/logger');

exports.getCategories = async () => {
    try {
          return await Category.find({}).sort({name: "asc"}).orFail() 
        } catch (err) {
      logger.error('Error in category dao getcategories', err);
      throw error;
    }
  };
  