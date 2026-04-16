const express = require("express");
const router = express.Router();

const {
  createRequest,
  getMyRequests,
  getDonorRequests,
  updateRequestStatus
} = require("../controllers/requestController");

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// NGO → create request
router.post("/", verifyToken, allowRoles("ngo"), createRequest);

// NGO → my requests
router.get("/my", verifyToken, allowRoles("ngo"), getMyRequests);

// Donor → incoming requests
router.get("/donor", verifyToken, allowRoles("donor"), getDonorRequests);

// Donor/Admin → update
router.put("/:id", verifyToken, allowRoles("donor"), updateRequestStatus);

module.exports = router;