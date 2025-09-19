const express = require('express');
const upload = require('../../middlewares/multer');
const { addBanner, updateBanner, deleteBanner, getBanners } = require('../../controllers/adminController/bannerController');
const router = express.Router();


router.post('/add', upload.single('image'), addBanner);
router.get('/all', getBanners);
router.put('/update/:id', upload.single('image'), updateBanner);
router.delete('/delete/:id', deleteBanner);

module.exports = router;
