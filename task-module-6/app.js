const express = require('express')
const app = express()
const PORT = 3000

const users = []

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.set('view engine', 'pug')
app.set('views', 'views')

app.get('/', (_, res)  => {
  res.render('home', { pageTitle: 'Home' })
})

app.post('/users', (req, res) => {
  console.log(req.body)
  users.push({ name: req.body.name })
  res.redirect(301, '/users')
})

app.get('/users', (_, res) => {
  res.render('users', { users })
})

app.listen(PORT, () => {
  console.log(`Route app listening at port ${PORT}`)
})