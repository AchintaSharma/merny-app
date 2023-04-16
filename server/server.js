// Import npm modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// Import configs
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const init = require("./utils/init");

//start express app
const app = express();

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Cors middleware
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// DB connection
mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(`Error while connecting to MongoDB: ${err}`);
});
db.once("open", () => {
  console.log("Connected to MongoDB.");
  init();
});

// Plug routes
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/comment.route")(app);
require("./routes/message.route")(app);
require("./routes/post.route")(app);

app.get("/hello", (req, res) => {
  res.status(200).send("Welcome to MERNY App!");
});

// Start app
app.listen(serverConfig.PORT, () => {
  console.log(`MERNY app running on Server at Port No. : ${serverConfig.PORT}`);
});
