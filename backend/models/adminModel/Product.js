// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//   productName: String,
//   productImage: String,
//   productPrice: Number,
//   quantity: String,
//   description: String,
//   nutritionValue: String,
//   healthBenefits: String,
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   subcategory: {
//     type: String // you can store subcategory name or id
//   }
// });

// module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  productImage: String,
  productPrice: Number,
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
  ,
  description: String,
  nutritionValue: String,
  healthBenefits: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  categoryName: {
    type: String // Store category name separately
  },
  subcategory: {
    type: String
  }
});

module.exports = mongoose.model('Product', ProductSchema);
