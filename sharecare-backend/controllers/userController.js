const User = require("../models/User");

/**
 * GET PROFILE
 */
exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile" });
    }
  };

/**
 * UPDATE PROFILE
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};