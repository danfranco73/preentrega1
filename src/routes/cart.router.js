const { Router } = require("express"); // Importing Router from express
const router = Router(); // instance of Router for my routes
const CartManager = require("../managers/CartManager"); // Importing CartManager from src/managers/CartManager.js

const cartManager = new CartManager("src/json/cart.json"); // I create an instance of CartManager to use its methods

// Routes

// Route to get all carts from "carts.json" in src/json folder used for all the carts
router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send({ status: "success", payload: carts });
    });
// Route to get a cart by id
router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCart(req.params.cid);
    res.send({ status: "success", payload: cart });
    });
// Route to add a cart
router.post("/", async (req, res) => {
    const cart = await cartManager.addCart();
    res.send({ status: "success", payload: cart });
    }
);
// Route to add a product to a cart by id and product id and units of the product
router.post("/:cid/products/:pid/:units", async (req, res) => {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.params.units);
    res.send({ status: "success", payload: cart });
    }
);

module.exports = router;