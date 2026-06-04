const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const reportRoutes = require("./routes/reports.routes");
const newsRoutes = require("./routes/news.routes");
const eventRoutes = require("./routes/events.routes");
const recycleRoutes = require("./routes/recycling.routes");
const indicatorRoutes = require("./routes/indicators.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Body:", req.body);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/recycling-points", recycleRoutes);
app.use("/api/indicators", indicatorRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Eco-Barrio funcionando" });
});

module.exports = app;