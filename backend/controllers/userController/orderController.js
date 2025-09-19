

// const Order = require("../../models/userModel/Order");


// // Get all orders
// exports.getAllOrders = async (req, res) => {
//   const orders = await Order.find();
//   res.json(orders);
// };

// // Get orders by status
// exports.getOrdersByStatus = async (req, res) => {
//   const status = req.params.status;
//   const orders = await Order.find({ status });
//   res.json(orders);
// };

// // Create new order
// exports.createOrder = async (req, res) => {
//   const order = new Order(req.body);
//   await order.save();
//   res.status(201).json(order);
// };

// // Update order
// exports.updateOrder = async (req, res) => {
//   const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// };

// // Delete order
// exports.deleteOrder = async (req, res) => {
//   await Order.findByIdAndDelete(req.params.id);
//   res.sendStatus(204);
// };



const Product = require('../../models/adminModel/Product');
const Address = require('../../models/userModel/Address');
const Order = require('../../models/userModel/Order');

// const Order = require('../models/Order');
// const Product = require('../models/Product');
// const Address = require('../models/Address');

// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       product,
//       address,
//       quantity,
//       amount,
//       scheduledDeliveryDate,
//       deliverySlot,
//       packagingType
//     } = req.body;

//     // ✅ Check if Product exists
//     const existingProduct = await Product.findById(product);
//     if (!existingProduct) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     // ✅ Check if Address exists
//     const existingAddress = await Address.findById(address);
//     if (!existingAddress) {
//       return res.status(404).json({ success: false, message: 'Address not found' });
//     }

//     // ✅ Create Order
//     const order = await Order.create({
//       product,
//       address,
    
//       quantity,
//       amount,
//       scheduledDeliveryDate,
//       deliverySlot,
//       packagingType
//     });

//     // ✅ Populate Product and Address
//     const populatedOrder = await Order.findById(order._id)
//       .populate('product')
//       .populate('address');

//     res.status(201).json({
//       success: true,
//       message: 'Order placed successfully',
//       order: populatedOrder
//     });
//   } catch (error) {
//     console.error('Order creation failed:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to place order',
//       error: error.message
//     });
//   }
// };
exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      product,
      address,
      quantity,
      amount,
      scheduledDeliveryDate,
      deliverySlot,
      packagingType
    } = req.body;

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid quantity provided' });
    }

    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (existingProduct.quantity < qty) {
      return res.status(400).json({ success: false, message: 'Insufficient product stock' });
    }

    existingProduct.quantity -= qty;
    await existingProduct.save();

    const existingAddress = await Address.findById(address);
    if (!existingAddress) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    const order = await Order.create({
      userId,
      product,
      address,
      quantity: qty,
      amount,
      scheduledDeliveryDate,
      deliverySlot,
      packagingType,
      status: 'ongoing'
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('product')
      .populate('address');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: populatedOrder
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message
    });
  }
};




// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('product')
      .populate('address');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('product')
      .populate('address');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
  

// find by status orders
exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params; // get status from URL param

  const allowedStatuses = ['pending', 'paid', 'ongoing', 'completed', 'rejected'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const orders = await Order.find({ status })
      .populate('product')
      .populate('address');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Complete Order Status

exports.markOrderAsCompleted = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'completed'; // or 'Complete', depending on your schema
    await order.save();

    res.status(200).json({ message: 'Order marked as completed', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status input
    const validStatuses = ['pending', 'paid', 'ongoing', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status; // ✅ dynamically assigned
    await order.save();

    res.status(200).json({ message: `Order marked as ${status}`, order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTotalOrderAmount = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

    res.status(200).json({
      totalOrders: orders.length,
      totalAmount,
    });
  } catch (error) {
    console.error('Error fetching total order amount:', error);
    res.status(500).json({ message: 'Server error' });
  }
};