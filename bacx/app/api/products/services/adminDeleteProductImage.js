const { ProductDao: { findAndDeleteImagePath } } = require("../../../commons/db/dao");
// const { getImagePathFromServer, deleteImageFromServer } = require("../../../commons/utils/imageCreatePath");
const logger = require("../../../commons/utils/logger");
const { deleteImageFromS3 } = require('../../../commons/helpers/s3-lib');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
        const imagePath = decodeURIComponent(req.params.imagePath)
        // deleteImageFromServer(getImagePathFromServer(imagePath));
        const deletedImage = deleteImageFromS3(imagePath)
        console.log("deletedImage:", deletedImage);
        
        await findAndDeleteImagePath(req.params.productId, imagePath)
        return resp.end()
    } catch (err) {
        logger.error(`Error while getting product, ${err}`);
        next(err);
    }
};
