const express = require("express");

const {
  createRecyclingPoint,
  getRecyclingPoints,
  getRecyclingPointById,
  updateRecyclingPoint,
  deleteRecyclingPoint,
} = require("../controllers/recycling.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Lectura pública
router.get("/", getRecyclingPoints);
router.get("/:id", getRecyclingPointById);

// Gestión exclusiva del administrador
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createRecyclingPoint
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateRecyclingPoint
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteRecyclingPoint
);

module.exports = router;