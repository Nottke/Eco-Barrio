const express = require("express");

const {
  createIndicator,
  getIndicators,
  getIndicatorById,
  getAutomaticIndicators,
  updateIndicator,
  deleteIndicator,
} = require("../controllers/indicators.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Lectura pública
router.get("/", getIndicators);
router.get("/automatic", getAutomaticIndicators);
router.get("/:id", getIndicatorById);

// Gestión exclusiva del administrador
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

module.exports = router;