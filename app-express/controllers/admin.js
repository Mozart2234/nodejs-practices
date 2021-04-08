const Product = require('../models/product');

const getAddProduct = (_, res) => {
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
  })
}

const postAddProduct = (req, res) => {
  const {
    title,
    imageUrl,
    price,
    description 
  } = req.body;
  
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/')
}

const getEditProduct = (req, res) => {
  // const product = 
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    edit: true,

  })
}

const getProducts = (_, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', { 
      products, 
      pageTitle: 'Admin Products', 
      path: '/admin/products',
    })
  });
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct
}