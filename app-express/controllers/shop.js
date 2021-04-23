// const Cart = require('../models/cart')
const Product = require('../models/product')

const getProducts = (_, res) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'Shop',
      path: '/products'
    })
  }).catch(err => console.log(err))
}

const getProduct = (req, res) => {
  const id = req.params.id
  Product.findByPk(id).then((product) => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      product: product
    })
  }).catch(err => console.log(err))
}

const getIndex = async (_, res) => {
  const products = await Product.findAll()

  res.render('shop/index', {
    products,
    pageTitle: 'Shop',
    path: '/'
  })
}

const getCart = (req, res) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    }).then(products => {
      console.log('Products', products)
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products
      })
    })
    .catch(err => console.log(err))
}

const postCard = (req, res) => {
  const prodID = req.body.productId
  let fetchCart
  let newQuantity = 1

  req.user.getCart().then(cart => {
    fetchCart = cart
    return cart.getProducts({ where: { id: prodID } })
  }).then(products => {
    const product = products[0]
    if (product) {
      const oldQuantity = product.cartItem.quantity
      newQuantity = oldQuantity + 1

      return product
    }

    return Product.findByPk(prodID)
  }).then(product => {
    return fetchCart.addProduct(product, { through: { quantity: newQuantity } })
  })
    .then((_) => res.redirect('/cart'))
}

const postDeleteProduct = (req, res) => {
  const productId = req.params.id

  req.user.getCart().then(cart => {
    return cart.getProducts({ where: { id: productId } })
  }).then(products => {
    const product = products[0]
    const { cartItem } = product
    return cartItem.destroy()
  }).then((_) => res.redirect('/cart'))
}

const getCheckout = (_, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

const getOrders = (_, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your orders',
    path: '/orders'
  })
}

module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCard,
  getCheckout,
  getOrders,
  postDeleteProduct
}
