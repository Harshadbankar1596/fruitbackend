// const express = require('express');
// const router = express.Router();
// const orderController = require('../../controllers/userController/orderController');

// router.get('/get', orderController.getAllOrders);
// router.get('/status/:status', orderController.getOrdersByStatus);
// router.post('/create', orderController.createOrder);
// router.put('/:id', orderController.updateOrder);
// router.delete('/:id', orderController.deleteOrder);

// module.exports = router;


const express = require('express');
const { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder, getOrdersByStatus, markOrderAsCompleted, markOrderStatus, updateOrderStatus, getTotalOrderAmount } = require('../../controllers/userController/orderController');
const router = express.Router();
// const {
//   createOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder
// } = require('../../controllers/userController/orderController');

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
// In your routes file
// routes/orderRoutes.js
router.put('/status/:orderId', markOrderAsCompleted);
router.put('/order/status/:orderId', updateOrderStatus);

router.get('/status/:status', getOrdersByStatus);
router.get('/orders/total-amount', getTotalOrderAmount);



module.exports = router;
