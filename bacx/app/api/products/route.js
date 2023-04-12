const express = require("express");
const { getProducts, getProductById, getBestSellers, getProductsForAdmin, adminDeleteProduct, adminCreateProduct, adminUpdateProduct } = require("./services");

const app = express();
const router = express.Router();

app.use(express.json());

router.get("/", getProducts);
router.get("/get-one/:id", getProductById);
router.get('/bestsellers', getBestSellers)
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);

// admin routes
router.get("/admin", getProductsForAdmin);
router.delete("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);

module.exports = router;
