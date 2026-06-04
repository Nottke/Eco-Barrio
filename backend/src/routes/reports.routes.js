const express = require("express");

const {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  deleteReport,
} = require("../controllers/reports.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, createReport);
router.get("/", authMiddleware, getReports);
router.get("/:id", authMiddleware, getReportById);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateReportStatus
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteReport
);

module.exports = router;