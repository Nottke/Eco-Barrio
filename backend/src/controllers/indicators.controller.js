const prisma = require("../prisma");

//crear indicador
const createIndicator = async (req, res) => {
  try {
    const { name, value, unit } = req.body;

    if (!name || value === undefined || !unit) {
      return res.status(400).json({
        message: "Nombre, valor y unidad son obligatorios",
      });
    }

    const indicator = await prisma.indicator.create({
      data: {
        name,
        value: Number(value),
        unit,
      },
    });

    res.status(201).json({
      message: "Indicador creado correctamente",
      indicator,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear indicador",
      error: error.message,
    });
  }
};

//crear indicador
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

    const indicator = await prisma.indicator.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        value: Number(value),
        unit,
      },
    });

    res.json({
      message: "Indicador actualizado correctamente",
      indicator,
    });
  } catch (error) {
    res.status(500).json({
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

module.exports = {
  createIndicator,
  getIndicators,
  getIndicatorById,
  updateIndicator,
  deleteIndicator,
};