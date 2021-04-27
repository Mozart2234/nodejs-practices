const path = require('path')
const express = require('express')
// const expressHbs = require('express-handlebars');

const app = express()
const PORT = 3000

const errorsController = require('./controllers/errors')

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// app.engine('.hbs', expressHbs({
//   extname: '.hbs',
//   defaultLayout: 'main-layout'
// }));
// app.set('view engine', 'pug');
// app.set('view engine', '.hbs');

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, _, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

// Routes
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(errorsController.notFound)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'Alexei',
        email: 'test@test.com'
      })
    }
    return user
  })
  .then((user) => {
    return user.createCart()
  })
  .then((_) => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT} 🚀🚀🚀`)
    })
  })
  .catch(err => console.log(err))
