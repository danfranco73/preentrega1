const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const ProductsManager = require("./ProductsManager.js");
const productsManager = new ProductsManager("src/json/products.json");

// Class to manage products in my cart
class CartManager {
  constructor(filePath) {
    this.filePath = filePath; // Path to my json file that contains all carts named "carts.json" in src/json folder
    this.cart = []; // Array to store all carts (didn't know if I had to use it or not)
  }

  // Method to get all carts from "carts.json"
  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Method to add a cart to "carts.json"
  async addCart() {
    const cid = uuidv4(); // I use uuid to generate a random id for my cart (got it from npmjs.com)
    const data = await this.getCarts();
    const newCart = {
      id: cid,
      products: [], // I use an array to store all products in my cart that I will add later
    };
    data.push(newCart);
    await fs.promises.writeFile(
      path.join(".", this.filePath), // I did not use __dirname because I had some problems with it
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

  // Method to add a product to a cart by id and product id and units of the product
  async addProductToCart(cid, pid, units) {
    try {
      const data = await this.getCarts();
      const cart = data.filter((cart) => cart.id === cid);
      const unit = parseInt(units); // I use parseInt to convert the units to a number that you told me Martin for the last chalenge
      const product = await productsManager.getProductById(pid); // I pass the product id to the method getProductById from ProductsManager to get the product
      const newProduct = {
        pid,
        quantity: unit, // I first use the number 1 but then I realized that I had to use the units and it worked
      };
      // if the cart is empty then I add the product
        if (cart[0].products.length === 0) {
            cart[0].products.push(newProduct);
      // If the cart is not empty then I check if the product is already in the cart
        } else if (cart[0].products.length > 0) {
            const productIndex = cart[0].products.findIndex(
                (product) => product.pid === pid
            );
            if (productIndex === -1) { // If the product is not in the cart then I add it
                cart[0].products.push(newProduct);
            } else {
                cart[0].products[productIndex].quantity += unit; // If the product is already in the cart then I add the units to the quantity as it says in the challenge for "Primera Entrega"
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
