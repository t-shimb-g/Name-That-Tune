// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

var apiRoutes = require("./routing/apiRoutes") // .js is assumed
var htmlRoutes = require("./routing/htmlRoutes") // .js is assumed
var tylerLog = require("./middleware/tylerLog") // .js is assumed

// Sets up the Express App
// =============================================================
var tyler_app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
tyler_app.use(bodyParser.urlencoded({ extended: true }));
tyler_app.use(bodyParser.json());
tyler_app.use(express.static('public'));
tyler_app.use(tylerLog)

// tyler_app.use(express.static(path.join(__dirname, "public")));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require("./app/routing/apiRoutes")(tyler_app);
// require("./app/routing/htmlRoutes")(tyler_app);

tyler_app.use('/api', apiRoutes);
tyler_app.use('/', htmlRoutes);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

// Starts the server to begin listening
// =============================================================
tyler_app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


