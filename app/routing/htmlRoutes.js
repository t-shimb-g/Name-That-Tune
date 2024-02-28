// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

const router = require('express').Router();

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/songoftheday", function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../public/songoftheday.html"));
});

router.get("/topsongs", function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../public/topsongs.html"));
});

router.get("*", function (req, res) {
    console.log(__dirname);
    res.send("<h1>Wrong Route!</h1>")
});

module.exports = router
