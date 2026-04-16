const Donation = require("../models/Donation");
const NGO = require("../models/NGO");
const Transport = require("../models/Transport");
const User = require("../models/User");
/**
 * Dashboard stats
 */
exports.getStats = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalDonations = await Donation.countDocuments();
      const ngos = await NGO.countDocuments({ status: "approved" });
      const pending = await NGO.countDocuments({ status: "pending" });
  
      res.json({
        totalUsers,
        totalDonations,
        ngos,
        pending
      });
  
    } catch (err) {
      res.status(500).json({ message: "Error fetching stats" });
    }
  };
/**
 * Donations
 */
exports.getDonations = async (req, res) => {
  const data = await Donation.find();
  res.json(data);
};

/**
 * Approve donation
 */
exports.approveDonation = async (req, res) => {
  await Donation.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Approved" });
};

/**
 * NGOs
 */
exports.getNGOs = async (req, res) => {
  const data = await NGO.find();
  res.json(data);
};

/**
 * Approve NGO
 */
exports.approveNGO = async (req, res) => {
  await NGO.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "NGO Approved" });
};

/**
 * Transport
 */
exports.getTransport = async (req, res) => {
    const data = await Transport.find()
      .populate("from")
      .populate("to");
  
    res.json(data);
  };


/**
 * ============================================
 * GET MONTHLY DONATION DATA (FOR CHART)
 * ============================================
 */
exports.getDonationStats = async (req, res) => {
    try {
      const data = await Donation.aggregate([
        {
          $group: {
            _id: { $month: "$date" }, // group by month
            donations: { $sum: 1 }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
  
      // Convert month number → name
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
      const formatted = data.map(item => ({
        month: months[item._id - 1],
        donations: item.donations
      }));
  
      res.json(formatted);
  
    } catch (err) {
      res.status(500).json({ message: "Error fetching chart data" });
    }
  };