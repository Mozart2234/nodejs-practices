const fs = require('fs');
const path = require('path');

const FILE = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
)

class Cart {
  static addProduct(product) {
    fs.readFile(FILE, (err, data) => {
      let cart = { products: [], totalPrice: 0.0 }
      if(!err) {
        cart = JSON.parse(data);
      }
      
      const prodIndex = cart.products.findIndex(p => p.id === product.id);
      const foundProduct = cart.products[prodIndex];

      let updatedProduct;
      if(foundProduct) {
        updatedProduct = {...foundProduct}
        updatedProduct.quantity += 1
        cart.products[prodIndex] = updatedProduct;
      } else {
        updatedProduct = {...product}
        updatedProduct.quantity =1
        cart.products = [...cart.products, updatedProduct]
      }
      
      cart.totalPrice += +product.price;

      fs.writeFile(FILE, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    })
  }
}

module.exports = Cart;