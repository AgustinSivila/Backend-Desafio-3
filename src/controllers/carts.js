import express from 'express';
import Cart  from '.src/models/cart.js';

const cartsRouter = express.Router();

// Crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
  const newCart = req.body;
  const cart = new Cart(newCart);
  cart.save();
  res.status(201).json(cart);
});

// Listar los productos de un carrito por su id
cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = Cart.findById(cartId);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Agregar un producto al carrito por su id
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  const cart = Cart.findById(cartId);
  if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
  }

  const product = cart.products.find(p => p.product === productId);
  if (product) {
    product.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  cart.save();
  res.status(201).json(cart);
});

export default cartsRouter

