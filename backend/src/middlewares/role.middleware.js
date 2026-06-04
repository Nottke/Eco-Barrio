const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ message: "No tienes permisos suficientes" });
    }

    next();
  };
};

module.exports = roleMiddleware;