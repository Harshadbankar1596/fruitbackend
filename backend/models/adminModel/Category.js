const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: String,
  image: String,
});

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  subcategories: [SubcategorySchema],
});

module.exports = mongoose.model('Category', CategorySchema);
