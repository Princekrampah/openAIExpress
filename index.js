const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");

const openAIRouter = require("./routes/openAIRoutes");

const port = process.env.PORT || 5000;

// create app object
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router middleware
app.use("/openAI", openAIRouter);

// static middleware
app.use(express.static(path.join(__dirname, "public")));

// listening
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
