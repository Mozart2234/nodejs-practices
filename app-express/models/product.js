const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();

    getData(products => {
      products.push(this);
      fs.writeFile(FILE, JSON.stringify(products), (err) => { 
        console.log(err);
      })
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
};

module.exports = Product;