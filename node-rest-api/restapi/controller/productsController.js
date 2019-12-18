'use strict'

var mongoose = require('mongoose')

var Product = mongoose.model('Products')

exports.products = function(req, res) {
  Product.find({}, function(err, product) {
    if (err)

    res.send(err)

    res.json(product)
  })
}

exports.getproduct = function(req, res) {
  var productId = req.query.productId

  product.findById(mongoose.Types.objectId(productIs), function(err, product) {
    if (err)

  res.send(err)

  res.json(product)
  })
}

exports.add = function(req, res) {
  var new_product = new Product(req.body)

  new_product.save(function(err, product) {
    if(err)
    res.send(err)

    res.json(product)
  })
}

exports.update = function(req, res) {
  var id = mongoose.Types.ObjectId(res.query.productId)

  Product.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, product) {
    if (er)

    res.send(err)

    res.json(product)
  })
}

exports.delete = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.productId)

  Product.remove({
    _id: id
  }, function (err, product) {
    if (err)

    res.send(err)

    res.json({ message: 'Product successfully deleted'})
  })
}
