const express = require("express");
const router = express.Router();
// const fun = require("./controllers/file-controller.js");
const {upload, uploadFile , getData, getPagination} = require("../controllers/file-controller");

router.route("/").post(upload.single("file"), uploadFile);

module.exports = router;


router.route("/data").get(getData);
router.route("/pagination").get(getPagination);