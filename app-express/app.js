const path = require('path');
const express = require('express');
// const expressHbs = require('express-handlebars');

const app = express();
const PORT = 3000;

const errorsController = require('./controllers/errors')

// app.engine('.hbs', expressHbs({
//   extname: '.hbs', 
//   defaultLayout: 'main-layout'
// }));
// app.set('view engine', 'pug');
// app.set('view engine', '.hbs');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorsController.notFound)

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
})