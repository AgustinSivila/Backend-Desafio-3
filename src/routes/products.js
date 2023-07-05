const express = require('express');
const productsController = require('../controllers/products');

const productsRouter = express.Router();

// Obtener todos los productos
productsRouter.get('/', productsController.getAllProducts);

// Obtener un producto por su id
productsRouter.get('/:pid', productsController.getProductById);

// Agregar un nuevo producto
productsRouter.post('/', productsController.createProduct);

// Actualizar un producto por su id
productsRouter.put('/:pid', productsController.updateProduct);

// Eliminar un producto por su id
productsRouter.delete('/:pid', productsController.deleteProduct);

module.exports = productsRouter;
