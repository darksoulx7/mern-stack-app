const { UserDao: { createReview } } = require('../../../commons/db/dao');
const logger = require('../../../commons/utils/logger');

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
    try {
                // get comment, rating from request.body:
                const { comment, rating } = req.body;
        
                // create review id manually because it is needed also for saving in Product collection
                const ObjectId = require("mongodb").ObjectId;
                let reviewId = ObjectId();
        
                await createReview([
                    {
                        _id: reviewId,
                        comment: comment,
                        rating: Number(rating),
                        user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
                    }
                ])
                resp.send('review created')
    } catch (err) {
        logger.error(`Error while showing users, ${err}`);
        next(error);
    }
};