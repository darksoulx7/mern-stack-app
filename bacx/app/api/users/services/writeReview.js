const { UserDao: { createReview, findProductById, insertRevInProdct } } = require('../../../commons/db/dao');
const logger = require("../../../commons/utils/logger");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
    const { comment, rating } = req.body;
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = ObjectId();

    let review = [
      {
        _id: reviewId,
        comment: comment,
        rating: Number(rating),
        user: {
          _id: req.user._id,
          name: req.user.name + " " + req.user.lastName,
        },
      },
    ];
    await createReview(review);

    const product = await findProductById(req.params.id);
    if (product) {
      const reviewExists = product.reviews.find(
        (review) => review.user._id.toString() === req.user._id.toString()
      );
      if (reviewExists) {
        return resp.status(400).send("product already reviewed!");
      }
      await insertRevInProdct(product, reviewId, rating);
      resp.send("review created");
    } else {
      resp.status(400).send("product not found!");
    }
  } catch (err) {
    logger.error(`Error while showing users, ${err}`);
    next(err);
  }
};