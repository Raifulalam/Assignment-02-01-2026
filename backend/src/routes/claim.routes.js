const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
    claimDeal,
    getMyClaims
} = require("../controllers/claim.controller");

router.post("/:dealId", authMiddleware, claimDeal);
router.get("/me", authMiddleware, getMyClaims);

module.exports = router;
