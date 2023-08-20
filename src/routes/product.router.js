const { Router } = require("express");
const router = Router();
const ProductsManager = require("../managers/ProductsManager");

const productsManager = new ProductsManager("src/json/products.json");

router.get("/", async (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const products = await productsManager.getProducts();
    const productsLimit = products.slice(0, limit);
    res.send({ status: "success", payload: productsLimit });
  } else {
    const products = await productsManager.getProducts();
    res.send({ status: "success", payload: products });
  }
});
// route to get products by id
router.get("/:pid", async (req, res) => {
  int = parseInt(req.params.pid); // I declared in the ProductsManager.js that the id must be a number
  const product = await productsManager.getProductById(int);
  res.send({ status: "success", payload: product });
});
// route for adding products 
router.post("/", async (req, res) => {
  let code = req.body.code;
  const products = await productsManager.getProducts();
  const codes = products.map((product) => product.code); // here I get all the codes from my products.json so I can compare them later with the code that I want to add, so if the code already exists it will not be added
  if (codes.includes(code)) {
    res
      .status(400)
      .send("El código de producto ya existe y no se puede agregar");
  } else {
    try {
      const { title, description, code, price, stock, status, thumbnails } =
        req.body;
      // todos los datos son obligatorios a excepcion de los thumbnails
      if (!title || !description || !code || !price || !stock || !status) {
        res
          .status(400)
          .send(
            "Faltan datos, por favor completar, sólo los thumbnails son opcionales"
          );
      }
      const product = await productsManager.addProduct(req.body);
      res.send({ status: "success", payload: product });
    } catch (error) {
      console.log(error);
    }
  }
});

// route for updating products by id, but the code must exist first and then it can be updated (I had to write it down every time I wanted to update a product, didn't know how to do it in another way)
router.put("/:pid", async (req, res) => {
  int = Number(req.params.pid);
  let code = req.body.code;
  const products = await productsManager.getProducts();
  const codes = products.map((product) => product.code);
  if (codes.includes(code)) {
    try {
      const product = await productsManager.updateProduct(int, req.body);
      res.send({ status: "success", payload: product });
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(400)
      .send(
        "El código de producto no existe y no se puede actualizar, agregar primero"
      );
  }
});
// route for deleting products by id
router.delete("/:pid", async (req, res) => {
 const id = Number(req.params.pid);
  const product = await productsManager.deleteProduct(id);
  res.send({ status: "success", payload: product });
});

module.exports = router;
