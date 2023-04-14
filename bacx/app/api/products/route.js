const express = require("express");
const { getProducts, getProductById, getBestSellers, getProductsForAdmin, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminFileUplod, adminDeleteProductImage } = require("./services");
// const { getProducts, getProductById, getBestSellers, getProductsForAdmin, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminFileUplod, adminDeleteProductImage } = require("../../commons/controllers/productController");

const { verifyIsLoggedIn, verifyIsAdmin } = require("../../commons/middleware/verifyAuthToken");
const router = express.Router();

// user routes
router.get("/", getProducts);
router.get("/get-one/:id", getProductById);
router.get('/bestsellers', getBestSellers)
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);

// admin routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", getProductsForAdmin);
router.post("/admin", adminCreateProduct);
router.post("/admin/upload", adminFileUplod)
router.put("/admin/:id", adminUpdateProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)
router.delete("/admin/:id", adminDeleteProduct);

module.exports = router;
