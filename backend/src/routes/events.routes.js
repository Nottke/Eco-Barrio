const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/events.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Lectura pública
router.get("/", getEvents);
router.get("/:id", getEventById);

// Gestión exclusiva del administrador
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createEvent
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteEvent
);

module.exports = router;