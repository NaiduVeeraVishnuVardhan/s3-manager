const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

router.post("/upload", appController.upload);
router.get("/download", appController.download);

module.exports = router;
