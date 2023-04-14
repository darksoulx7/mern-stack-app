const { ProductDao: { findAndDeleteImagePath } } = require("../../../commons/db/dao");
const { getImagePathFromServer, deleteImageFromServer } = require("../../../commons/utils/imageCreatePath");
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
        const imagePath = decodeURIComponent(req.params.imagePath)
        deleteImageFromServer(getImagePathFromServer(imagePath));
        await findAndDeleteImagePath(req.params.productId, imagePath)
        return resp.end()
    } catch (err) {
        logger.error(`Error while getting product, ${err}`);
        next(err);
    }
};
