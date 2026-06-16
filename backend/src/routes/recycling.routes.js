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

router.get("/:id", authMiddleware, getRecyclingPointById);
router.get("/", authMiddleware, getRecyclingPoints);


module.exports = router;