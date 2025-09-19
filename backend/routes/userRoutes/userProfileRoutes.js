const express = require('express');
const router = express.Router();
const userProfileController = require('../../controllers/userController/userProfileController');

router.post('/create', userProfileController.createProfile);
router.get('/all', userProfileController.getAllProfiles);
router.get('/:id', userProfileController.getProfile);
router.put('/:id', userProfileController.updateProfile);
router.delete('/:id', userProfileController.deleteProfile);

module.exports = router;
