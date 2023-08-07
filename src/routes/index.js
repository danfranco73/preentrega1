const { Router } = require("express");
const router = Router();

const productRouter = require("./product.router");
const cartRouter = require("./cart.router");

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);

module.exports = router;
