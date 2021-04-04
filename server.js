// Require dependencies
const express = require("express");
const mongoose = require("mongoose");

// Create PORT 
const PORT = process.env.PORT || 8000

// Use middleware to set up express server
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use middleware to serve static files
app.use(express.static("public"));

// Connect to mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Import routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`Workout Tracker running @http://localhost:${PORT}!`);
});
