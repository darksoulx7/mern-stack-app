const { CategoryDao: { findCategory, addValuesToTheAttr, saveCategory, getCategories } } = require('../../../commons/db/dao');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {

    const { key, value, categoryChoosen } = req.body;

    if (!key || !value || !categoryChoosen) {
        return resp.status(404).send("All inputs are required");
    }

    try {
        const category = categoryChoosen.split('/')[0];
        const categoryExists = await findCategory(category);

        if (categoryExists) {
            if (categoryExists.attrs.length > 0) {
                // if key exists in the database then add value to the key 
                var keyDoesNotExistInDB = true

                categoryExists.attrs.map((item, idx) => {

                    if (item.key === key) {
                        keyDoesNotExistInDB = false

                        var copyAttributeValues = [...categoryExists.attrs[idx].value]
                        copyAttributeValues.push(value)

                        var newAttributeValues = [...new Set(copyAttributeValues)]
                        categoryExists.attrs[idx].value = newAttributeValues
                    }
                })
                if (keyDoesNotExistInDB) {
                    addValuesToTheAttr(categoryExists, { key: key, value: [value] })
                }

            } else {
                addValuesToTheAttr(categoryExists, { key: key, value: [value] })
            }

            await saveCategory(categoryExists);

            let updatedCategory = await getCategories();
            return resp.status(201).json({ "attributeAdded": updatedCategory });

        } else {
            return resp.status(200).send("Category does not exist");
        }

    } catch (err) {
        console.log("Error creating category!", err);
        next(err);
    }
};