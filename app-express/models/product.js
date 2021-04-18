const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const FILE = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getData = (callback) => {
  fs.readFile(FILE, (err, data) => {
    if(err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  })
} 

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getData(products => {
      if (this.id) {
        const productIndex = products.findIndex(product => product.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[productIndex] = this;

        fs.writeFile(FILE, JSON.stringify(updatedProducts), (err) => { 
          console.log(err); 
        })
      } else {
        this.id = Math.random().toString();
        products.push(this);

        fs.writeFile(FILE, JSON.stringify(products), (err) => { 
          console.log(err);
        })
      }
      

    })
  }

  static fetchAll(callback) {
    getData(callback);
  }

  static findById(id, callback) {
    getData(products => {
      const product = products.find(p => p.id == id)
      callback(product);
    })
  }

  static deleteById(id, callback) {
    getData(products => {
      console.log(id)
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex < 0) return callback(null, new Error("No found product") );

      const product = { ...products[productIndex] }
      const updatedProducts = [...products]
      updatedProducts.splice(productIndex, 1);

      fs.writeFile(FILE, JSON.stringify(updatedProducts), (err) => {
        if(err) {
          callback(product, err); 
        } else {
          Cart.deleteById(id);
          callback(product, null); 
        }
      })

    })
  }
};

module.exports = Product;