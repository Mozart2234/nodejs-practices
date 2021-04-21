const Cart = require('../models/cart');
const Product = require('../models/product');

const getProducts = (_, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', { 
      products, 
      pageTitle: 'Shop', 
      path: '/products',
    })
  });
}

const getProduct = (req, res) => {
  const id = req.params.id;
  Product.findById(id, product => {
    console.log(product)
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      product
    })
  })
}

const getIndex = (_, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', { 
      products, 
      pageTitle: 'Shop', 
      path: '/',
    })
  });
}

const getCart = (_, res) => {
  Cart.getCart(cart => {
    res.render('shop/cart', {
      pageTitle: "Your Cart",
      path: '/cart',
      cart
    })
  })
}

const postCard = (req, res) => {
  const prodID = req.body.productId;
  Product.findById(prodID, product => {
    Cart.addProduct(product)
    res.redirect('/');
  })
}

const postDeleteProduct = (req, res) => {
  const productId = req.params.id
  Cart.deleteById(productId);
  res.redirect('/cart');
} 

const getCheckout = (_, res) => {
  res.render('shop/checkout', {
    pageTitle: "Checkout",
    path: '/checkout',
  })
}

const getOrders = (_, res) => {
  res.render('shop/orders', {
    pageTitle: "Your orders",
    path: '/orders',
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