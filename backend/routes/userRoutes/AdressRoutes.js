// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const addressController = require('../../controllers/userController/AdressController');
const authUserProtected = require('../../middlewares/authUserProtected');


// Add address
router.post('/add', authUserProtected, addressController.addAddress);

// Get all addresses for a user
router.get('/user/:userId', addressController.getUserAddresses);
// router.get('/user/:id', addressController.getUserAddressesid);
// /api/v1/address/user/:userId
// Delete address
router.delete('/:id', addressController.deleteAddress);

// Update address
router.put('/:id', addressController.updateAddress);

module.exports = router;
