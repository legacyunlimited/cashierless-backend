var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllDistinctCategories,
} = require("../controllers/product");
const { getProductById, photo } = require("../middlewares/product");
const { getUserById } = require("../middlewares/user");
const {
  isSignedin,
  isAuthenticated,
  isCustomer,
  isGuard,
  isManager,
} = require("../middlewares/auth");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedin,
  isAuthenticated,
  isManager,
  createProduct
);

router.get("/product/:productId", getProduct);
//for performance optimization for photo loading
router.get("/product/photo/:productId", photo);

router.put(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isManager,
  updateProduct
);
router.delete(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isManager,
  deleteProduct
);

//get all products
router.get("/products", getAllProducts);

//getting all distinct categories
router.get("/product/categories", getAllDistinctCategories);

module.exports = router;
