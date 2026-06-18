const express = require("express");

const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Lectura pública
router.get("/", getNews);
router.get("/:id", getNewsById);

// Gestión exclusiva del administrador
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createNews
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateNews
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteNews
);

module.exports = router;