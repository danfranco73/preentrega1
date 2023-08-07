const { Router } = require("express");
const router = Router();
const ProductsManager = require("../../ProductsManager");

const productsManager = new ProductsManager("src/data/products.json");

router.get("/", async (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const products = await productsManager.getProducts();
    const productsLimit = products.slice(0, limit);
    res.json(productsLimit);
  } else {
    const products = await productsManager.getProducts();
    res.json({ products });
  }
});
// get products by id
router.get("/:pid", async (req, res) => {
  int = parseInt(req.params.pid);
  const product = await productsManager.getProductById(int);
  res.json(product);
});

router.post("/", async (req, res) => {
    const product = await productsManager.addProduct(req.body);
    res.json(product);
  });

router.put("/:pid", async (req, res) => {
  int = parseInt(req.params.pid);
  const product = await productsManager.updateProduct(int, req.body);
  res.json(product);
  });

router.delete("/:id", async (req, res) => {
  int = parseInt(req.params.id);
  const product = await productsManager.deleteProduct(int);
  res.json(product);
});

module.exports = router;
// cambios en el archivo index.js
