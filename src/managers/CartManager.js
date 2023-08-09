const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const ProductsManager = require("./ProductsManager.js");
const productsManager = new ProductsManager("src/json/products.json");
// Class to manage products in cart
class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.cart = [];
  }

  // Method to get all carts
  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Method to add a cart
  async addCart() {
    const cid = uuidv4();
    const data = await this.getCarts();
    const newCart = {
      id: cid,
      products: [],
    };
    data.push(newCart);
    await fs.promises.writeFile(
      path.join(".", this.filePath),
      JSON.stringify(data, null, 2)
    );
    return newCart;
  }

  // Method to get a cart by id
  async getCart(id) {
    const data = await this.getCarts();
    const cart = data.filter((cart) => cart.id === id);
    return cart;
  }

  // Method to add a product to a cart by id and product id
  async addProductToCart(cid, pid, units) {
    try {
      const data = await this.getCarts();
      const cart = data.filter((cart) => cart.id === cid);
      const unit = parseInt(units);
      const product = await productsManager.getProductById(pid);
      const newProduct = {
        pid,
        quantity: unit,
      };
      // si el producto no existe en el carrito lo agrega
        if (cart[0].products.length === 0) {
            cart[0].products.push(newProduct);
            // si el producto ya existe en el carrito suma la cantidad
        } else if (cart[0].products.length > 0) {
            const productIndex = cart[0].products.findIndex(
                (product) => product.pid === pid
            );
            if (productIndex === -1) {
                cart[0].products.push(newProduct);
            } else {
                cart[0].products[productIndex].quantity += unit;
            }
        }
        await fs.promises.writeFile(
            path.join(".", this.filePath),
            JSON.stringify(data, null, 2)
        );
        return cart;
    } catch (error) {
        console.log(error);
    }
    }
}

            

module.exports = CartManager;
