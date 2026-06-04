const express = require("express");

const {
  createIndicator,
  getIndicators,
  getIndicatorById,
  updateIndicator,
  deleteIndicator,
} = require("../controllers/indicators.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createIndicator
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateIndicator
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteIndicator
);

router.get("/", authMiddleware, getIndicators);
router.get("/:id", authMiddleware, getIndicatorById);

module.exports = router;