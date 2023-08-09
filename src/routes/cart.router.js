const { Router } = require("express");
const router = Router();
const CartManager = require("../managers/CartManager");

const cartManager = new CartManager("src/json/cart.json");

router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send({ status: "success", payload: carts });
    });

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCart(req.params.cid);
    res.send({ status: "success", payload: cart });
    });

router.post("/", async (req, res) => {
    const cart = await cartManager.addCart();
    res.send({ status: "success", payload: cart });
    }
);

router.post("/:cid/products/:pid/:units", async (req, res) => {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.params.units);
    res.send({ status: "success", payload: cart });
    }
);

module.exports = router;