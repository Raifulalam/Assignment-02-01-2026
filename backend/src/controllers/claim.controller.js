const Claim = require("../models/Claim");
const Deal = require("../models/Deal");

exports.claimDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.dealId);
        if (!deal) return res.status(404).json({ message: "Deal not found" });

        if (deal.isLocked && !req.user.isVerified)
            return res
                .status(403)
                .json({ message: "Verification required to claim this deal" });

        const existingClaim = await Claim.findOne({
            user: req.user._id,
            deal: deal._id
        });
        if (existingClaim)
            return res.status(409).json({ message: "Deal already claimed" });

        const claim = await Claim.create({
            user: req.user._id,
            deal: deal._id
        });

        res.status(201).json({ message: "Deal claimed", claim });
    } catch (error) {
        console.error("CLAIM ERROR:", error);
        res.status(500).json({ message: "Failed to claim deal" });
    }
};

exports.getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ user: req.user._id }).populate("deal");
        res.json(claims);
    } catch (error) {
        console.error("FETCH CLAIMS ERROR:", error);
        res.status(500).json({ message: "Failed to fetch claims" });
    }
};
