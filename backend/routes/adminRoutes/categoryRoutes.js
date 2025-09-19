const express = require('express');
const { addCategory, getCategoriesWithSubcategories } = require('../../controllers/adminController/categoryController');
const upload = require('../../middlewares/multer');
const router = express.Router();
// const upload = require('../middlewares/multer');
// const { addCategory } = require('../controllers/categoryController');

router.post('/create',upload.fields([ { name: 'categoryImage', maxCount: 1 },{ name: 'subcategoryImage', maxCount: 1 },]),addCategory)
router.get('/all', getCategoriesWithSubcategories);



module.exports = router;
