require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Deal = require("./models/Deal");

const deals = [
    {
        title: "AWS Credits",
        description: "Get $1000 in AWS credits for your startup infrastructure.",
        partnerName: "Amazon Web Services",
        category: "Cloud",
        discount: "$1000 credits",
        isLocked: true,
        eligibilityText: "Verified startups only"
    },
    {
        title: "Notion Pro",
        description: "6 months of Notion Pro for free.",
        partnerName: "Notion",
        category: "Productivity",
        discount: "6 months free",
        isLocked: false,
        eligibilityText: "All users"
    },
    {
        title: "Figma Professional",
        description: "50% off Figma Professional plan.",
        partnerName: "Figma",
        category: "Design",
        discount: "50% off",
        isLocked: false,
        eligibilityText: "All users"
    },
    {
        title: "MongoDB Atlas Credits",
        description: "$500 in MongoDB Atlas credits.",
        partnerName: "MongoDB",
        category: "Database",
        discount: "$500 credits",
        isLocked: true,
        eligibilityText: "YC-backed or verified startups"
    },
    {
        title: "HubSpot Starter",
        description: "90% off HubSpot CRM starter plan.",
        partnerName: "HubSpot",
        category: "Marketing",
        discount: "90% off",
        isLocked: false,
        eligibilityText: "All users"
    },
    {
        title: "Vercel Pro",
        description: "3 months of Vercel Pro for startups.",
        partnerName: "Vercel",
        category: "DevTools",
        discount: "3 months free",
        isLocked: true,
        eligibilityText: "Verified startups only"
    }
];

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Deal.deleteMany();
    await Deal.insertMany(deals);
    console.log("Deals seeded");
    process.exit();
};

seed();
