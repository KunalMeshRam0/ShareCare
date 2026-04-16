const Request = require("../models/request");
const Item = require("../models/Item");

/* ================= CREATE REQUEST ================= */
const createRequest = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    /* CHECK ITEM */
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    /* CHECK IF ALREADY REQUESTED BY SAME NGO */
    const existing = await Request.findOne({
      item: itemId,
      ngo: req.user.id
    });

    if (existing) {
      return res.status(400).json({
        message: "You already requested this item"
      });
    }

    /* CREATE REQUEST */
    const request = await Request.create({
      item: itemId,
      ngo: req.user.id,
      donor: item.donor,
      message: message || "",
      status: "pending"
    });

    /* OPTIONAL: MARK ITEM AS REQUESTED */
    item.status = "requested";
    await item.save();

    res.status(201).json({
      message: "Request created successfully",
      request
    });

  } catch (error) {
    console.log("CREATE REQUEST ERROR:", error);
    res.status(500).json({ message: "Request failed" });
  }
};

/* ================= NGO REQUESTS ================= */
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ ngo: req.user.id })
      .populate("item")
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DONOR REQUESTS ================= */
const getDonorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ donor: req.user.id })
      .populate("item")
      .populate("ngo", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE STATUS ================= */
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = ["approved", "rejected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const request = await Request.findById(req.params.id)
      .populate("item");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    /* 🔥 IF APPROVED → ASSIGN ITEM */
    if (status === "approved") {
      request.item.status = "assigned";
      await request.item.save();
    }

    res.json({
      message: "Request updated",
      request
    });

  } catch (error) {
    console.log("UPDATE REQUEST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= EXPORT ================= */
module.exports = {
  createRequest,
  getMyRequests,
  getDonorRequests,
  updateRequestStatus
};