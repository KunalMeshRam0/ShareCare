const Item = require("../models/Item");

/* CREATE DONATION */
exports.createItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      quantity,
      condition,
      location,
      description
    } = req.body;

    const item = new Item({
      itemName,
      category,
      quantity,
      condition,
      location,
      description,
      donor: req.user.id,
      status: "available" // 🔥 MUST
    });

    await item.save();

    res.status(201).json({
      message: "Donation created",
      item
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create donation" });
  }
};

/* GET AVAILABLE ITEMS */
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "available" })
      .populate("donor", "name");

    res.json(items);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};