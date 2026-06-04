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

router.get("/", authMiddleware, getEvents);
router.get("/:id", authMiddleware, getEventById);

module.exports = router;