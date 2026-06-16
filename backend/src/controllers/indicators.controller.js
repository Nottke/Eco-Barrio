const prisma = require("../prisma");

//crear indicador
const createIndicator = async (req, res) => {
  try {
    const { name, value, unit } = req.body;
    const trimmedName = name?.trim();
    const trimmedUnit = unit?.trim();

    if (!trimmedName || value === undefined || !trimmedUnit) {
      return res.status(400).json({
        message: "Nombre, valor y unidad son obligatorios",
      });
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return res.status(400).json({
        message: "El valor debe ser numérico",
      });
    }

    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return res.status(400).json({
        message: "El nombre debe tener entre 3 y 100 caracteres",
      });
    }

    if (trimmedUnit.length > 30) {
      return res.status(400).json({
        message: "La unidad no puede superar los 30 caracteres",
      });
    }

    if (numericValue < 0) {
      return res.status(400).json({
        message: "El valor no puede ser negativo",
      });
    }

    if (numericValue > 1000000000) {
      return res.status(400).json({
        message: "El valor supera el máximo permitido",
      });
    }

    const indicator = await prisma.indicator.create({
      data: {
        name: trimmedName,
        value: numericValue,
        unit: trimmedUnit,
      },
    });

    return res.status(201).json({
      message: "Indicador creado correctamente",
      indicator,
    });
  } catch (error) {
    console.error("Error al crear indicador:", error);

    return res.status(500).json({
      message: "Error al crear indicador",
      error: error.message,
    });
  }
};

//obtener indicadores
const getIndicators = async (req, res) => {
  try {
    const indicators = await prisma.indicator.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(indicators);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener indicadores",
      error: error.message,
    });
  }
};

//obtener indicador por id
const getIndicatorById = async (req, res) => {
  try {
    const { id } = req.params;

    const indicator = await prisma.indicator.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!indicator) {
      return res.status(404).json({
        message: "Indicador no encontrado",
      });
    }

    res.json(indicator);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener indicador",
      error: error.message,
    });
  }
};

//actualizar indicador
const updateIndicator = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, value, unit } = req.body;

    const trimmedName = name?.trim();
    const trimmedUnit = unit?.trim();

    if (!trimmedName || value === undefined || !trimmedUnit) {
      return res.status(400).json({
        message: "Nombre, valor y unidad son obligatorios",
      });
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return res.status(400).json({
        message: "El valor debe ser numérico",
      });
    }

    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return res.status(400).json({
        message: "El nombre debe tener entre 3 y 100 caracteres",
      });
    }

    if (trimmedUnit.length > 30) {
      return res.status(400).json({
        message: "La unidad no puede superar los 30 caracteres",
      });
    }

    if (numericValue < 0) {
      return res.status(400).json({
        message: "El valor no puede ser negativo",
      });
    }

    if (numericValue > 1000000000) {
      return res.status(400).json({
        message: "El valor supera el máximo permitido",
      });
    }

    const indicator = await prisma.indicator.update({
      where: {
        id: Number(id),
      },
      data: {
        name: trimmedName,
        value: numericValue,
        unit: trimmedUnit,
      },
    });

    return res.json({
      message: "Indicador actualizado correctamente",
      indicator,
    });
  } catch (error) {
    console.error(
      "Error Prisma al actualizar indicador:",
      error,
    );

    return res.status(500).json({
      message: "Error al actualizar indicador",
      error: error.message,
    });
  }
};

//eliminar indicador
const deleteIndicator = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.indicator.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Indicador eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar indicador",
      error: error.message,
    });
  }
};

// obtener indicadores automáticos desde datos reales
const getAutomaticIndicators = async (req, res) => {
  try {
    const now = new Date();

    const [
      totalReports,
      pendingReports,
      approvedReports,
      rejectedReports,
      resolvedReports,
      totalNews,
      upcomingEvents,
      totalRecyclingPoints,
    ] = await Promise.all([
      prisma.report.count(),

      prisma.report.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.report.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.report.count({
        where: {
          status: "REJECTED",
        },
      }),

      prisma.report.count({
        where: {
          status: "RESOLVED",
        },
      }),

      prisma.news.count(),

      prisma.event.count({
        where: {
          date: {
            gte: now,
          },
        },
      }),

      prisma.recyclingPoint.count(),
    ]);

    return res.json({
      generatedAt: now.toISOString(),
      indicators: {
        totalReports,
        pendingReports,
        approvedReports,
        rejectedReports,
        resolvedReports,
        totalNews,
        upcomingEvents,
        totalRecyclingPoints,
      },
    });
  } catch (error) {
    console.error(
      "Error al obtener indicadores automáticos:",
      error,
    );

    return res.status(500).json({
      message: "Error al obtener indicadores automáticos",
      error: error.message,
    });
  }
};

module.exports = {
  createIndicator,
  getIndicators,
  getIndicatorById,
  getAutomaticIndicators,
  updateIndicator,
  deleteIndicator,
};