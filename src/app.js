import express from 'express';
import ProductManager from '../ProductManager.js';
import productsRouter from '.src/routes/products.js';
import cartsRouter from '.src/routes/carts';
import bodyParser from 'body-parser';


const app = express();
const manager = new ProductManager("./productos.json");


app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

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
app.post('/products', async (req, res) => {
  try {
    const productData = req.body;
    const product = await manager.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProductData = req.body;
    const updatedProduct = await manager.updateProduct(pid, updatedProductData);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await manager.deleteProduct(pid);
    if (deletedProduct) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(8080, () => console.log('Running on 8080...'));
