// const Contactus = require('../models/Contactus');

const Contactus = require("../../models/userModel/Contactus");

// 📌 Add Contact Us Entry
exports.addContact = async (req, res) => {
  try {
    const { name, email, contact, address } = req.body;

    const newContact = new Contactus({ name, email, contact, address });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Contact added successfully', data: newContact });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 📌 Get All Contact Us Entries
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contactus.find().sort({ _id: -1 }); // latest first
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
