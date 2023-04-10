const express = require("express");
const { getProducts, getProductById, getBestSellers } = require("./services");

const app = express();
const router = express.Router();

app.use(express.json());

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get('/bestsellers', getBestSellers)
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);

module.exports = router;
