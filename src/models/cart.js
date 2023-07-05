const fs = require('fs');
const path = require('path');
const cartDataPath = path.join(__dirname, '../data/carrito.json');

class Cart {
  constructor(cart) {
    this.id = cart.id;
    this.products = cart.products || [];
  }

  static findById(id) {
    const cartData = Cart.getAll();
    return cartData.find(cart => cart.id === id);
  }

  static getAll() {
    const cartData = fs.readFileSync(cartDataPath, 'utf-8');
    return JSON.parse(cartData);
  }

  save() {
    const cartData = Cart.getAll();
    const cartIndex = cartData.findIndex(cart => cart.id === this.id);
    if (cartIndex !== -1) {
      cartData[cartIndex] = this;
    } else {
      cartData.push(this);
    }
    fs.writeFileSync(cartDataPath, JSON.stringify(cartData, null, 2), 'utf-8');
  }
}

module.exports = Cart;
