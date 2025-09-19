// const Banner = require('../../models/adminModel/Banner');
const cloudinary = require('../../utils/cloudinary');

const Banner = require("../../models/adminModel/Banner");

// 📤 Add Banner
exports.addBanner = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const banner = new Banner({ image: result.secure_url });

    await banner.save();
    res.status(201).json({ success: true, message: 'Banner added', data: banner });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
};

// 📋 Get All Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ success: true, data: banners });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// 🖊️ Update Banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cloudinary.uploader.upload(req.file.path);

    const updated = await Banner.findByIdAndUpdate(
      id,
      { image: result.secure_url },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.status(200).json({ success: true, message: 'Banner updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// 🗑️ Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Banner.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.status(200).json({ success: true, message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
