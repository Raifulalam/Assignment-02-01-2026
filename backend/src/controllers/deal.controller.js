const Deal = require("../models/Deal");

exports.getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find().sort({ createdAt: -1 });
        res.json(deals);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch deals" });
    }
};

exports.getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) return res.status(404).json({ message: "Deal not found" });
        res.json(deal);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch deal" });
    }
};
