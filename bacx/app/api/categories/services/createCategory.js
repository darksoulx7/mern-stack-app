const { CategoryDao: { findCategory, createCategory } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');
const { messages } = require('../../../commons/utils');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {

    try {

    const { category } = req.body;
    if(!category) resp.status(400).send("Category input is required");
    
    console.log("Category", category);
    const categoryExists = await findCategory(category);
      console.log("category already exists", categoryExists);
    if(categoryExists) resp.status(400).send("Category name already exists!")

    else {
        const categoryCreated = await createCategory(category);
        const ans = {
            msg: messages('createdCategory'),
            item: categoryCreated
        }
        return resp.json(ans);
    }

  } catch (err) {
    console.log("Error creating category!", err);
    next(next);
  }

};