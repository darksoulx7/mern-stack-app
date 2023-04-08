const { ProductDao: { getProducts, countDocuments, getPaginationLinksNumber } } = require("../../../commons/db/dao");
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
    let select = {};
    let queryCondition = false;
    let priceQueryCondition = {};
    let ratingQueryCondition = {};
    let categoryQueryCondition = {};
    let attrsQueryCondition = [];
    let searchQueryCondition = {};

    const sortOptions = req.query.sort || "";
    const pageNum = Number(req.query.pageNum) || 1;
    const categoryName = req.params.categoryName || "";
    const searchQuery = req.params.searchQuery || "";

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

    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });

      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    if (req.query.attrs) {
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // remove first item of items which is key
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          return acc;
        } else return acc;
      }, []);
      queryCondition = true;
    }

    if (sortOptions) {
      let sortOpt = sortOptions.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      // searchQueryCondition = { $text: { $search: '"'+searchQuery+'"' }}  // for exact search
      select = {
        score: { $meta: "textScore" },
      };
      sort = { score: { $meta: "textScore" } };
    }
    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          ...attrsQueryCondition,
          searchQueryCondition,
        ],
      };
    }

    const totalProducts = await countDocuments(query);
    const products = await getProducts(pageNum, sort, query, select);
    const ans = {
      msg: messages("getProducts"),
      products,
      pageNum,
      paginationLinksNumber: getPaginationLinksNumber(totalProducts),
    };
    resp.status(200).send(ans);
  } catch (err) {
    logger.error(`Error while fetching products!!, ${err}`);
    next(err);
  }
};