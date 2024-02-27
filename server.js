// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var tyler_app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
tyler_app.use(bodyParser.urlencoded({ extended: true }));
tyler_app.use(bodyParser.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routing/apiRoutes")(tyler_app);
require("./app/routing/htmlRoutes")(tyler_app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

// Starts the server to begin listening
// =============================================================
tyler_app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


