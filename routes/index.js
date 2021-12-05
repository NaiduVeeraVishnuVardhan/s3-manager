const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");
const multer = require("multer");
const util = require("util");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    });

router.post("/upload",uploadFile.single("file"), appController.upload);
router.get("/download", appController.download);

module.exports = router;
