const express = require('express');
const cartsController = require('../controllers/carts');

const cartsRouter = express.Router();

// Crear un nuevo carrito
cartsRouter.post('/', cartsController.createCart);

// Listar los productos de un carrito por su id
cartsRouter.get('/:cid', cartsController.getCartProducts);

// Agregar un producto al carrito por su id
cartsRouter.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = cartsRouter;
