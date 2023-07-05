import express from 'express';
import Product from './product.js';

const productsRouter = express.Router();

// Obtener todos los productos
productsRouter.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = Product.find(limit);
  res.json(products);
});

// Obtener un producto por su id
productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = Product.findById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
productsRouter.post('/', (req, res) => {
  const newProduct = req.body;
  const product = new Product(newProduct);
  product.save();
  res.status(201).json(product);
});

// Actualizar un producto por su id
productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;

  const product = Product.findById(productId);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  product.update(updatedProduct);
  res.json(product);
});

// Eliminar un producto por su id
productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;

  const product = Product.findById(productId);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  product.delete();
  res.sendStatus(204);
});

export default productsRouter
