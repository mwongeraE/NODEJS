//Create product schema using mongoose
var mongoose = require('mongoose')

var Schema = mongoose.Schema

var productSchema = new Schema ({
  product_name: { type: String, Required: 'Product name can not be left blank'},

  price: {type: String, Required: 'Price cant be left blank'},

  category: { type: String, Required: 'Product category cant be left blank'}
})

module.exports = mongoose.model('Products', productSchema)
