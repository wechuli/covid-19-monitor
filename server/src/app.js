const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  cors = require("cors"),
  helmet = require("helmet"),
  cookieParser = require("cookie-parser"),
  { StatusNotFound } = require("./helpers/httpErrors");

//custom imports

const userRoutes = require("./routes/user.routes");

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.info("Database successfully connected");
  })
  .catch(error => console.log(error));

//Custom routes
app.use("/api/users", userRoutes);

//404 default route

app.use((req, res) => {
  res
    .status(StatusNotFound)
    .json({ error: true, message: "Route unavailable" });
});
module.exports = app;
