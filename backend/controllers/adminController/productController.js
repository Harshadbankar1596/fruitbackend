// const Product = require('../models/Product');

const Category = require("../../models/adminModel/Category");
const Product = require("../../models/adminModel/Product");

// exports.addProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       productPrice,
//       quantity,
//       description,
//       nutritionValue,
//       healthBenefits,
//       category,
//       subcategory
//     } = req.body;

//     const productImage = req.file?.path;

//     const newProduct = new Product({
//       productName,
//       productImage,
//       productPrice,
//       quantity,
//       description,
//       nutritionValue,
//       healthBenefits,
//       category,
//       subcategory
//     });

//     await newProduct.save();

//     res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Server error', error: err.message });
//   }
// };

// const Category = require('../models/Category'); // Make sure this path is correct

exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      quantity,
      description,
      nutritionValue,
      healthBenefits,
      category,
      subcategory
    } = req.body;

    const productImage = req.file?.path;

    // Get category name from Category model
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const newProduct = new Product({
      productName,
      productImage,
      productPrice,
      quantity,
      description,
      nutritionValue, 
      healthBenefits,
      category,
      categoryName: categoryData.name, // Save name here
      subcategory
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      const {
        productName,
        productPrice,
        quantity,
        description,
        nutritionValue,
        healthBenefits,
        category,
        subcategory
      } = req.body;
      const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }
      const updateData = {
        productName,
        productPrice,
        quantity,
        description,
        nutritionValue,
        healthBenefits,
        category,
        categoryName: categoryData.name, 
        subcategory
      };
  
      // If a new image is uploaded
      if (req.file?.path) {
        updateData.productImage = req.file.path;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  };


  // 🗑️ Delete Product
exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  };
  
  // 📦 Get All Products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find()
        .populate('category', 'categoryName') // Populates category name
        .populate('subcategory', 'subcategoryName'); // Populates subcategory name
  
      res.status(200).json({ success: true, data: products });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  };

  exports.getGroupedProducts = async (req, res) => {
    try {
      const products = await Product.find().populate("category").lean();
  
      const grouped = {};
  
      for (const product of products) {
        const categoryId = product.category._id.toString();
        const categoryName = product.category.name; // Now this will work
        const subcategory = product.subcategory;
  
        if (!grouped[categoryId]) {
          grouped[categoryId] = {
            categoryId,
            categoryName,
            subcategories: {}
          };
        }
  
        if (!grouped[categoryId].subcategories[subcategory]) {
          grouped[categoryId].subcategories[subcategory] = {
            name: subcategory,
            products: []
          };
        }
  
        grouped[categoryId].subcategories[subcategory].products.push(product);
      }
  
      const result = Object.values(grouped).map(category => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        subcategories: Object.values(category.subcategories)
      }));
  
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  };
  
  

  
  
  // 📦 Get Single Product by ID
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate('category', 'categoryName')
        .populate('subcategory', 'subcategoryName');
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  };
  