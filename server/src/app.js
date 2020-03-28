const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  helmet = require("helmet"),
  cookieParser = require("cookie-parser"),
  { StatusNotFound } = require("./helpers/httpErrors");

//custom imports
const dataRoutes = require("./routes/data.routes");

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Custom routes
app.use("/api/data", dataRoutes);


//404 default route
app.use((req, res) => {
  res
    .status(StatusNotFound)
    .json({ error: true, message: "Route unavailable" });
});
module.exports = app;
