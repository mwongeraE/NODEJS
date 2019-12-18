var Product = require('../models/product.model')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test Dev Evans')
}

exports.product_create = function (req, res) {
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    )

    product.save(function (err) {
      if (err) {
        return next(err)
      }
      res.send('Product created successfully')
    })
}

exports.product_details = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return send (err)
    res.send(product)
  })
}

exports.product_update = function (req, res) {
  Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return send (err);
    res.send("Product updated")
  })
}

exports.product_delete = function (req, res) {
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) return send (err)
    res.send('Deleted successfully')
  })
}
