const fs = require("fs"); // Importing fs module
const path = require("path"); // Importing path module
const uuidv4 = require("uuidv4");

// Class to manage products

class ProductsManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
  }

  // Method to get all products in my products.json in the src/json folder
  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8"); 
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
  

  // Method to add a product
  async addProduct(producto) {
    try {
      const id = Math.floor(Math.random() * 100000) + 1; // I use Math.random to generate a random id for my product and I expect that it will not be repeated
      const data = await this.getProducts();
      const newProduct = {
        ...producto, // I use the spread operator to add whatever  I want (lets say I'm the user) to add as a product
        id: id,
      };
      data.push(newProduct);
      await fs.promises.writeFile(
        path.join(".", this.filePath),
        JSON.stringify(data, null, 2)
      );
      return newProduct;
    }
    catch (error) {
      console.log(error);
    }
  }

    // Method to get a product by id
    async getProductById(id) {
      try {
        if(id===undefined) throw new Error("No se ha ingresado un id"); 
        if(id<1) throw new Error("El id debe ser mayor a 0");
        if(id===null) throw new Error("El id no puede ser nulo");
        const data = await this.getProducts();
        const product = data.filter((product) => product.id === id);
        return product;
      }
      catch (error) {
        console.log(error);
      }
    }


  // Method to update a product
  async updateProduct(id, product) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((product) => product.id === id);
      data[index] = {
        ...product, // I use the spread operator to add whatever  I want to change in my product but keeping the code (I had to write it again because I didn't know how to do it)
        id: id,
      };
      await fs.promises.writeFile(
        path.join(".", this.filePath),
        JSON.stringify(data, null, 2)
      );
      return data[index];
    } catch (error) {
      console.log(error);
    }
  }
  // Method to delete a product
  async deleteProduct(id) {
    const data = await this.getProducts();
    const index = data.findIndex((product) => product.id === id);
    data.splice(index, 1);
    await fs.promises.writeFile(
      path.join(".", this.filePath),
      JSON.stringify(data, null, 2)
    );
  }
}

module.exports = ProductsManager;
