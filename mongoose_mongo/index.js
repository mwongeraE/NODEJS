//Mongoose Guide Functions with MongoDB
/*
Mongoose is an  Object  data modelling library for MongoDB and node js

Database - can contain one or more collections
Collection - can contain one or more documents
Document - Key/Value pair list or array of nested documents
schema - Specific datastructure of a documents

Each schema maps to a collection and defines the shape of the documents
*/
const mongoose = require('mongoose')

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database')

//Define a Schema and create a Model
const { Schema } = mongoose

const personSchema = new Schema({
  name: String,
  age: Number,
})

const Person = mongoose.model('Person', personSchema)

//Instantiate and save
const person = new Person({ name: 'John', age: 18 })

person.save((error) => {
  if (error) {
    return console.log(`Error has occurred: ${error}`)
  }

  console.log('Document is successfully saved')
})

//Find the documents
Person.find({}, function (error, documents) {
  console.log(documents)
})

/*
Schema Types
-String
-Number
-Date
-Boolean
-ObjectId
-Array
Properties for Strings
    -match: RegExp, creates a validator that checks if the value matches regExp
    -enum: Array, creates a validator that checks if the value is in the given Array
    -minlength:
    -maxLength
*/

const person = new Person({
  userName: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 6,
    maxLength: 12,
  }
})

//Validators
/*
check whether value is valid before saving to the database
*/
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3
    }
  }
})

const Breakfast = db.model('Breakfast', breakfastSchema)

//Queries
const Person = mongoose.model('Person', personSchema)

//Create Methods
Person.create({ name: 'Mercy' }, (error,john) => {
  if(error) {
    return console.log(error)
  }

  console.log(john)
})

//Read Methods
/*
Model.find() - Finds all dicuments that match given query
*/

Person.find({ name: 'John', age: 18}, (error, result) => {
  if (error) {
    return console.log(`Error has occurred: ${error}`)
  }
  console.log(result)
})

//Model.findById() -- finds a single document by its id
Person.findById(id, (error, person) => {
  //Code
})

Person.findOne({ name: 'John'}, (error,person) {
  //Code
})

//Update Methods
/*
Model.updateMany() -- Update all documents that match criteria
*/
Person.updateMany({ name: 'John'}, {name: 'Jason'}, (err) => {
  //Code
})
/*
Model.updateOne() -- Update only the first document that matches criteria
*/
Person.updateOne({ name: 'John'}, { name: 'Jason'}, (err) => {})

//Delete Methods
/*
Model.deleteMany() -- deletes all the documents that match conditions from the collections
*/
Person.deleteMany({ name: 'John', age: { $gte: 18} }, (err) => {})

/*
Model.deleteOne() -- Deletes the first document that matches conditions from the collection
*/
Person.deleteOne({ name: 'John' }, (err) => {})
