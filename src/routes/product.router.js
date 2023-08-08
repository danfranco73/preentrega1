const { Router } = require("express");
const router = Router();
const ProductsManager = require("../../ProductsManager");
const e = require("express");

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
// usamos el metodo addProduct y le pasamos el body pero si el code ya existe no lo deja agregar
router.post("/", async (req, res) => {
  let code = req.body.code;
  const products = await productsManager.getProducts();
  const codes = products.map((product) => product.code);
  if (codes.includes(code)) {
    throw new Error("El código de producto ya existe y no se puede agregar");
  } else {
    try {
      const product = await productsManager.addProduct(req.body);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  }
});

// usamos el metodo updateProduct y le pasamos el body pero si el code no existe no lo deja actualizar y tira error por consola
router.put("/:pid", async (req, res) => {
  int = parseInt(req.params.pid);
  let code = req.body.code;
  const products = await productsManager.getProducts();
  const codes = products.map((product) => product.code);
  if (codes.includes(code)) {
    try {
      const product = await productsManager.updateProduct(int, req.body);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("El código de producto no existe y no se puede actualizar, agregar primero");
  }
});

router.put("/:pid", async (req, res) => {
  int = parseInt(req.params.pid);
  let code = req.body.code;
  const products = await productsManager.getProducts();
  const codes = products.map((product) => product.code);
  if (codes.includes(code)) {
    try {
      const product = await productsManager.updateProduct(int, req.body);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("El código de producto no existe y no se puede actualizar");
  }
});
  
router.delete("/:pid", async (req, res) => {
  int = parseInt(req.params.pid);
  const product = await productsManager.deleteProduct(int);
  res.json(product);
});

module.exports = router;
