const express = require('express');
const { addContact, getAllContacts } = require('../../controllers/userController/ContactusController');
const router = express.Router();


router.post('/add', addContact);
router.get('/getall', getAllContacts);

module.exports = router;
