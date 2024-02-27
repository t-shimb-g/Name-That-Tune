// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

var friendsArray = require("../data/friends")

// Routes
// =============================================================
module.exports = function (my_app) {
    // Basic route that sends the user first to the AJAX Page
    my_app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    my_app.get("/survey", function (req, res) {
        console.log(__dirname);
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    my_app.get("*", function (req, res) {
        console.log(__dirname);
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


}
