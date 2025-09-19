// const Category = require('../models/Category');

const Category = require("../../models/adminModel/Category");


exports.addCategory = async (req, res) => {
  try {
    console.log("sjkhsjdsjd",req.body);
    const { categoryName, subcategoryName } = req.body;

    const categoryImage = req.files['categoryImage'][0].path;
    const subcategoryImage = req.files['subcategoryImage'][0].path;

    // Pehle check karo agar category already exist karti hai
    let existingCategory = await Category.findOne({ name: categoryName });

    if (existingCategory) {
      // Agar category mil gayi, toh usmein subcategory push karo
      existingCategory.subcategories.push({
        name: subcategoryName,
        image: subcategoryImage,
      });

      await existingCategory.save();

      res.status(200).json({ success: true, message: 'Subcategory added to existing category', data: existingCategory });
    } else {
      // Agar category nahi mili, toh nayi category banao
      const newCategory = new Category({
        name: categoryName,
        image: categoryImage,
        subcategories: [
          {
            name: subcategoryName,
            image: subcategoryImage,
          },
        ],
      });

      await newCategory.save();

      res.status(201).json({ success: true, message: 'New category created', data: newCategory });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


// exports.addCategory = async (req, res) => {
//   try {
//     const { categoryName, subcategoryName } = req.body;

//     const categoryImage = req.files['categoryImage'][0].path;
//     const subcategoryImage = req.files['subcategoryImage'][0].path;

//     const newCategory = new Category({
//       name: categoryName,
//       image: categoryImage,
//       subcategories: [
//         {
//           name: subcategoryName,
//           image: subcategoryImage,
//         },
//       ],
//     });

//     await newCategory.save();

//     res.status(201).json({ success: true, message: 'Category created successfully', data: newCategory });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Server error', error: err.message });
//   }
// };
exports.getCategoriesWithSubcategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
  };