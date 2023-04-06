const {
  ProductDao: { getProducts, countDocuments, getPaginationLinksNumber },
} = require("../../../commons/db/dao");
const logger = require("../../../commons/utils/logger");

const { messages } = require("../../../commons/utils");

/**
 *
 * @param {*} req
 * @param {*} resp
 * @param {*} next
 */

module.exports = async (req, resp, next) => {
  try {
    let query = {};
    let sort = {};
    let queryCondition = false;
    let priceQueryCondition = {};
    let ratingQueryCondition = {};
    let categoryQueryCondition = {};
    const sortOptions = req.query.sort || "";
    const pageNum = Number(req.query.pageNum) || 1;
    const categoryName = req.params.categoryName || "";

    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
        ],
      };
    }

    if (sortOptions) {
      let sortOpt = sortOptions.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    const totalProducts = await countDocuments(query);
    const products = await getProducts(pageNum, sort, query);
    const ans = {
      msg: messages("getProducts"),
      products,
      pageNum,
      paginationLinksNumber: getPaginationLinksNumber(totalProducts),
    };
    resp.status(200).send(ans);
  } catch (err) {
    logger.error(`Error while showing users, ${err}`);
    next(err);
  }
};