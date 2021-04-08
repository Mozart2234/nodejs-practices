const express = require('express');
const router = express.Router();

const {
  getProducts,
  getIndex,
  getCart,
  postCard,
  getCheckout,
  getOrders,
  getProduct,
} = require('../controllers/shop')

// GET => /
router.get('/', getIndex);

// GET => /products
router.get('/products', getProducts)

// GET => /products/:id
router.get('/products/:id', getProduct)

// GET => /cart
router.get('/cart', getCart)

// POST => /cart
router.post('/cart', postCard)

// GET => /checkout
router.get('/checkout', getCheckout)

// GET => /orders
router.get('/orders', getOrders)

module.exports = router;