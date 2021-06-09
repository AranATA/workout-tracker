const express = require("express");
const mongoose = require("mongoose");

// initialize server
const app = express();

// set up port
const PORT = process.env.PORT || 3000;

// make sure we can use JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public folder static 
app.use(express.static("public"));

// code added for Mongo Atlas deployment
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

    // routes
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
