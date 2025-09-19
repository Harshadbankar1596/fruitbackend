const Address = require("../../models/userModel/Address");


exports.addAddress = async (req, res) => {
    try {
      console.log("userId");
      const userId = req.user._id; // from auth middleware
      const { username, contactNo, pincode, city, locality, flatOrBuilding } = req.body;
  
      const newAddress = new Address({
        userId,
        username,
        contactNo,
        pincode,
        city,
        locality,
        flatOrBuilding
      });
  
      await newAddress.save();
      res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  exports.getUserAddresses = async (req, res) => {
    try {
      const { userId } = req.params;
      const addresses = await Address.find({ userId });
      res.status(200).json(addresses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
//   exports.getUserAddressesid = async (req, res) => {
//     try {
//       const { id } = req.params;
//       console.log("kjhasgdk",req.params)
//       const addresses = await Address.findById(id); // ✅ MongoDB _id se find karo
  
//       if (!addresses) {
//         return res.status(404).json({ message: 'Address not found' });
//       }
  
//       res.status(200).json(addresses);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
  
  // Delete address
  exports.deleteAddress = async (req, res) => {
    try {
      const { id } = req.params;
      await Address.findByIdAndDelete(id);
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Update address
  exports.updateAddress = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedAddress = await Address.findByIdAndUpdate(id, updatedData, { new: true });
      res.status(200).json({ message: 'Address updated', address: updatedAddress });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };