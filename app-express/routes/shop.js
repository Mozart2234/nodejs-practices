const express = require('express')
const router = express.Router()

const {
  getProducts,
  getIndex,
  getCart,
  postCard,
  getCheckout,
  getOrders,
  getProduct,
  postDeleteProduct,
  createOrder
} = require('../controllers/shop')

// GET => /
router.get('/', getIndex)

// GET => /products
router.get('/products', getProducts)

// GET => /products/:id
router.get('/products/:id', getProduct)

// GET => /cart
router.get('/cart', getCart)

// POST => /cart
router.post('/cart', postCard)

// DELETE => /cart-delete-item/:id
router.post('/cart-delete-item/:id', postDeleteProduct)

// GET => /checkout
router.get('/checkout', getCheckout)

// GET => /orders
router.get('/orders', getOrders)

// POST => /create-order
router.post('/create-order', createOrder);

module.exports = router
