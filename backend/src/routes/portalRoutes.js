const express = require("express");
const   {createWebsite, getWebsites, getWebsiteById,updateWebsiteStatus,  updateWebsite, deleteWebsite,getWebsitesbystatus}  = require("../controllers/portalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create",protect, createWebsite);
router.get("/", protect, getWebsites);

router.get("/:id", protect,  getWebsiteById);
router.put("/:id", protect, updateWebsite);
router.delete("/:id", protect, deleteWebsite);
router.patch("/:id", protect, updateWebsiteStatus);
router.get("/websitesStatus/:status", protect, getWebsitesbystatus);

module.exports = router;