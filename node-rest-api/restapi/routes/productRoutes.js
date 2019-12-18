'use strict'

module.exports = function(app) {
  var product = require('../controller/productsController')

  app.route('/products')
      .get(product.products)
      .post(product.add)

  app.route('/products/:productId')
      .get(product.getproduct)
      .put(product.update)
      .delete(product.delete)
}
