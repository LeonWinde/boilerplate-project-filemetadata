const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const { size, originalname, mimetype } = req.file;
  res.json({ name: originalname, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
