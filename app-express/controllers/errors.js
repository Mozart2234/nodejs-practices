// 404 Error
const notFound = (_, res) => {
  res
    .status(404)
    .render('404', { pageTitle: '404 - Not Found', path: ''})
}

module.exports = {
  notFound
}