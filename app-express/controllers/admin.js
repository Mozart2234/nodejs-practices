const Product = require('../models/product')

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
  } = req.body

  req.user.createProduct({
    title,
    imageUrl,
    price,
    description
  }).then(result => {
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
}

const getEditProduct = (req, res) => {
  const editMode = req.query.edit
  if (!editMode) {
    res.redirect('/')
  }

  const prodId = req.params.id
  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0]

      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        edit: editMode,
        product
      })
    }).catch(err => console.log(err))
}

const postEditProduct = (req, res) => {
  const prodId = req.body.id
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description

  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0]
      product.title = title
      product.imageUrl = imageUrl
      product.price = price
      product.description = description
      return product.save()
    }).then((_) => {
      res.redirect('/admin/products')
    }).catch(err => console.log(err))
}

const deleteProduct = (req, res) => {
  const prodId = req.body.id
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      res.redirect('/admin/products')
    }).catch((_) => {
      res.redirect('/admin/products')
    })
}

const getProducts = (_, res) => {
  Product.findAll().then((products) => {
    res.render('admin/products', {
      products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch(err => console.log(err))
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct
}
