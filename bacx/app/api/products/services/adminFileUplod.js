const { ProductDao: { findProductById, saveProduct } } = require("../../../commons/db/dao");
const  { getImagesDirectory } = require("../../../commons/utils/set-paths-for-images");
const logger = require("../../../commons/utils/logger");
const imageValidate = require("../../../commons/utils/image-validate");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    
    try {
        let product = await findProductById(req.query.productId);

        if (!product) {
            return resp.status(400).send({ msg: "Product not Found" })

        } else {

            if (!req.files || !!req.files.images === false) {
                return resp.status(400).send("No files were uploaded.");
            }

            const validateResult = imageValidate(req.files.images)
            if (validateResult.error) {
                return resp.status(400).send(validateResult.error)
            }

            let imagesTable = []
            if (Array.isArray(req.files.images)) {
                imagesTable = req.files.images
            } else {
                imagesTable.push(req.files.images)
            }

            for (let image of imagesTable) {
                const { SAVE_DIR, SAVE_IN_DB } = getImagesDirectory(image.name)
                product.images.push({ path: SAVE_IN_DB })
                image.mv(SAVE_DIR, function (err) {
                    if (err) resp.status(500).send(err)
                })
            }
            await saveProduct(product)
            return resp.send("Files uploaded!")
        }
    } catch (err) {
        logger.error(`Error while getting product, ${err}`);
        next(err);
    }
};