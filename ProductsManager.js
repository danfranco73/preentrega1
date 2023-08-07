const fs = require("fs"); // Importing fs module
const path = require("path"); // Importing path module

// Class to manage products

class ProductsManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
  }

  // Method to get all products
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
    // creo el metodo addProduct
    // creo id para el producto sin que se repita
    try {
      const data = await this.getProducts();
      const id = data.length + 1;
      const newProduct = {
        ...producto,
        id,
      };
      data.push(newProduct);
      await fs.promises.writeFile(
        path.resolve(__dirname, this.filePath),
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
        ...product,
        id: id,
      };
      await fs.promises.writeFile(
        path.join(__dirname, this.filePath),
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
      path.join(__dirname, this.filePath),
      JSON.stringify(data, null, 2)
    );
  }
}

module.exports = ProductsManager;
