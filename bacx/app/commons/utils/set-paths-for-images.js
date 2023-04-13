const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const PRODUCT_IMAGE_DIR = path.resolve(__dirname, "../../../assets", "images", "products");
const PRODUCT_IMAGE_PATH = "/images/products/"
const PRODUCT_IMAGE_DELETE_PATH = path.resolve(__dirname, "../../../assets")

module.exports.getImagesDirectory = (name) => {

    const FILE_NAME = uuidv4() + path.extname(name)
    const SAVE_DIR = PRODUCT_IMAGE_DIR + "/" + FILE_NAME
    const SAVE_IN_DB = PRODUCT_IMAGE_PATH + FILE_NAME

    return { SAVE_DIR, SAVE_IN_DB }

}

module.exports.getImagePathFromServer = (name) => {
    return PRODUCT_IMAGE_DELETE_PATH + name;
}

module.exports.deleteImageFromServer = (path) => {
        fs.unlink(path, (err) => {
            if (err) {
                console.log("error", err)
            }
        });
}