// I use this file to import all my routes and then export them to use them in my server.js so it looks cleaner and easier to read
const { Router } = require("express");
const router = Router();

const productRouter = require("./product.router");
const cartRouter = require("./cart.router");

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);

module.exports = router;
