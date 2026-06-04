const prisma = require("../prisma");

const createReport = async (req, res) => {
  try {
    const { title, description, location, imageUrl } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        location,
        imageUrl,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Reporte creado correctamente",
      report,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear reporte",
      error: error.message,
    });
  }
};

const getReports = async (req, res) => {
  try {
    const where = req.user.role === "ADMIN" ? {} : { userId: req.user.id };

    const reports = await prisma.report.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener reportes",
      error: error.message,
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    if (req.user.role !== "ADMIN" && report.userId !== req.user.id) {
      return res.status(403).json({ message: "No tienes permisos para ver este reporte" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener reporte",
      error: error.message,
    });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["PENDING", "APPROVED", "REJECTED", "RESOLVED"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const report = await prisma.report.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json({
      message: "Estado del reporte actualizado",
      report,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar estado",
      error: error.message,
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.report.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Reporte eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar reporte",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  deleteReport,
};