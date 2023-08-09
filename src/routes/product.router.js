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
// get products by id
router.get("/:pid", async (req, res) => {
  int = parseInt(req.params.pid);
  const product = await productsManager.getProductById(int);
  res.send({ status: "success", payload: product });
});
// usamos el metodo addProduct del PoductsManagerjs y le pasamos el body pero si el code ya existe no lo deja agregar
router.post("/", async (req, res) => {
  let code = req.body.code;
  const products = await productsManager.getProducts();
  const codes = products.map((product) => product.code);
  if (codes.includes(code)) {
    res
      .status("400")
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

// usamos el metodo updateProduct y le pasamos el body pero si el code no existe no lo deja actualizar y tira error por consola
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

router.delete("/:pid", async (req, res) => {
  int = Number(req.params.pid);
  const product = await productsManager.deleteProduct(int);
  res.send({ status: "success", payload: product });
});

module.exports = router;
