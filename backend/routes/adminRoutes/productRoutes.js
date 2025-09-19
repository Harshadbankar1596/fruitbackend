const express = require('express');
const upload = require('../../middlewares/multer');
const { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById, getGroupedProducts } = require('../../controllers/adminController/productController');
const router = express.Router();


router.post('/create', upload.single('productImage'), addProduct);
router.put('/update/:id', upload.single('productImage'), updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/all', getAllProducts);             // ✅ Get All
router.get('/getProduct', getGroupedProducts);             // ✅ Get All
router.get('/:id', getProductById);


module.exports = router;
// /api/v1/admin/products/craete