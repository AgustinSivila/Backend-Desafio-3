import express from 'express';
import ProductManager from '../ProductManager.js';

const app = express();
const manager = new ProductManager("./productos.json");

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit || -1;
    const products = await manager.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await manager.getProductById(pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  

app.listen(8080, () => console.log('Running on 8080...'));
