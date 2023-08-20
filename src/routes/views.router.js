const express = require("express");
const Router = express.Router();
const path = require("path");
const app = express();
const router = Router;

const ProductManager = require("../managers/ProductsManager.js");

// I use the static method to use the json folder
const productsManager = new ProductManager(path.join(__dirname, "../json/products.json"));


// GET - Products page
router.get("/home", async (req, res) => {
    const listaProductos = await productsManager.getProducts();
    res.render("home", {listaProductos} );
});

// crearo el router para el formulario de productos pero trabajando con websockets
router.get("/realtimeproducts", async (req, res) => {
    const listaProductos = await productsManager.getProducts();
    res.render("realtimeproducts", { listaProductos });
});



module.exports = router;