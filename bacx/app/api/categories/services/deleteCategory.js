const { CategoryDao: { deleteCategory } } = require('../../../commons/db/dao');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {

    try {
        const { category } = req.params;

        if(req.params.category !== "Choose category") {
           const entry = await deleteCategory(decodeURIComponent(category))
           if(!entry.deletedCount) resp.status(200).send("Category does not exists");
           else resp.json({ categoryDeleted: true });
         }
    } catch (err) {
        console.log("Error creating category!", err);
        next(next);
    }

};