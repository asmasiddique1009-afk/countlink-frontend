const express = require("express");
const   {createWebsite, getWebsites, getWebsiteStats, getDashboardData, updateWebsite, deleteWebsite}  = require("../controllers/portalController");

const router = express.Router();

router.post("/create", createWebsite);
router.get("/", getWebsites);
router.get("/:id/stats", getWebsiteStats);
router.get("/dashboard", getDashboardData);
router.put("/:id", updateWebsite);
router.delete("/:id", deleteWebsite);
module.exports = router;