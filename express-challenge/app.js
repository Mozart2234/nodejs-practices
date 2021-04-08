const express = require('express');
const path = require('path');

const app = express();
const PORT = 3005;

const pathView = (name) => {
  return path.join(__dirname, 'views', name)
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/users', (_, res) => {
  res.sendFile(pathView('users.html'))
})

app.get('/', (_, res) => {
  res.sendFile(pathView('app.html'))
})

app.listen(PORT, () => {
  console.log('Running server on nodejs')
})