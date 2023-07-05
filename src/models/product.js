const fs = require('fs');
const path = require('path');
const productDataPath = path.join(__dirname, '../data/productos.json');

class Product {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.code = product.code;
    this.price = product.price;
    this.status = product.status || true;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnails = product.thumbnails || [];
  }

  static findById(id) {
    const productData = Product.getAll();
    return productData.find(product => product.id === id);
  }

  static find(limit) {
    const productData = Product.getAll();
    if (limit) {
      return productData.slice(0, limit);
    }
    return productData;
  }

  static getAll() {
    const productData = fs.readFileSync(productDataPath, 'utf-8');
    return JSON.parse(productData);
  }

  save() {
    const productData = Product.getAll();
    const productIndex = productData.findIndex(product => product.id === this.id);
    if (productIndex !== -1) {
      productData[productIndex] = this;
    } else {
      productData.push(this);
    }
    fs.writeFileSync(productDataPath, JSON.stringify(productData, null, 2), 'utf-8');
  }

  update(updatedProduct) {
    // Exclude id field from being updated
    delete updatedProduct.id;

    Object.assign(this, updatedProduct);
    this.save();
  }

  delete() {
    const productData = Product.getAll();
    const productIndex = productData.findIndex(product => product.id === this.id);
    if (productIndex !== -1) {
      productData.splice(productIndex, 1);
      fs.writeFileSync(productDataPath, JSON.stringify(productData, null, 2), 'utf-8');
    }
  }
}

module.exports = Product;
