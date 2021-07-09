require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const client = require("./configs/db");
const cloudinary = require("./configs/cloudinary");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.status(200).send(`Server is up and running`);
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
