const Product = require('../models/product');

const getAddProduct = (_, res) => {
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    edit: false
  })
}

const postAddProduct = (req, res) => {
  const {
    title,
    imageUrl,
    price,
    description 
  } = req.body;
  
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/')
}

const getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if(!editMode) {
    res.redirect('/');
  }

  const prodId = req.params.id;
  Product.findById(prodId, product => {
    if(!product) {
      return  res.redirect('/');
    }
    res.render('admin/edit-product', { 
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      edit: editMode,
      product
    })
  })
}

const postEditProduct = (req, res) => {
  const prodId = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const updatedProduct = new Product(prodId, title, imageUrl, description, price);
  updatedProduct.save();
  res.redirect('/admin/products');
}

const deleteProduct = (req, res) => {
  const prodId = req.body.id;
  Product.deleteById(prodId, (product, err) => {
    if(err) {
      console.log("ERROR", err);
      res.redirect('/admin/products');
    } else {
      console.log("Product", product);
      res.redirect('/admin/products');
    }
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
  getEditProduct,
  postEditProduct,
  deleteProduct
}