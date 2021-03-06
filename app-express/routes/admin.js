const express = require('express')
const router = express.Router()

const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct
} = require('../controllers/admin')

// GET => /admin/add-product
router.get('/add-product', getAddProduct)

// POST => /admin/add-product
router.post('/add-product', postAddProduct)

// GET => /admin/edit-product/:id
router.get('/edit-product/:id', getEditProduct)

// POST => /admin/edit-product/:id
router.post('/edit-product', postEditProduct)

// POST => /admin/delete-product
router.post('/delete-product', deleteProduct)

// GET => /admin/products
router.get('/products', getProducts)

module.exports = router
