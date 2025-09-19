//  const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   product: String,
//   customer_name: String,
//   quantity: String,
//   amount: Number,
//   status: {
//     type: String,
//     enum: ['pendind', 'ongoing', 'completed', 'rejected'],
//     default: 'pendind'
//   },
//   contact_no: String,
//   address: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId : {
    type: String,
    ref: 'User',
    required: true
  },
  
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    default: 0
  }
,  
  amount: {
    type: Number,
    required: true
  },
  scheduledDeliveryDate: {
    type: String,
    required: true 
  },
  deliverySlot: {
    type: String,
    enum: ['6 PM to 9 PM', '7 AM to 10 AM', '09:30 Am to 12:30 PM'],
    required: true
  },
  packagingType: {
    type: String,
    enum: ['Crate Box', 'Carton Box', 'Cotton bag'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'ongoing', 'completed', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
