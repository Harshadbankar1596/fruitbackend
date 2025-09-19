// const UserProfile = require('../models/UserProfile');

const UserProfile = require("../../models/userModel/UserProfile");

// CREATE
exports.createProfile = async (req, res) => {
  try {
    const profile = new UserProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteProfile = async (req, res) => {
  try {
    await UserProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
