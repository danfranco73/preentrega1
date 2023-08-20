// I use this file to import all my routes and then export them to use them in my server.js so it looks cleaner and easier to read
const { Router } = require("express");
const router = Router();
const path = require("path");

// uso el método join de path para unir la ruta absoluta de mis routes
const productRouter = require(path.join(__dirname, "product.router.js"));
const cartRouter = require(path.join(__dirname, "cart.router.js"));
const viewsRouter = require(path.join(__dirname, "views.router.js"));

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);
router.use("/", viewsRouter);

module.exports = router;
