const prisma = require("../prisma");

//crear punto reciclaje
const createRecyclingPoint = async (req, res) => {
  try {
    const { name, address, latitude, longitude, description } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        message: "Nombre y dirección son obligatorios",
      });
    }

    const recyclingPoint = await prisma.recyclingPoint.create({
      data: {
        name,
        address,
        latitude: latitude !== undefined ? Number(latitude) : null,
        longitude: longitude !== undefined ? Number(longitude) : null,
        description,
      },
    });

    res.status(201).json({
      message: "Punto de reciclaje creado correctamente",
      recyclingPoint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear punto de reciclaje",
      error: error.message,
    });
  }
};

//obtener punto reciclaje
const getRecyclingPoints = async (req, res) => {
  try {
    const recyclingPoints = await prisma.recyclingPoint.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(recyclingPoints);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener puntos de reciclaje",
      error: error.message,
    });
  }
};

//obtener punto reciclaje por id
const getRecyclingPointById = async (req, res) => {
  try {
    const { id } = req.params;

    const recyclingPoint = await prisma.recyclingPoint.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!recyclingPoint) {
      return res.status(404).json({
        message: "Punto de reciclaje no encontrado",
      });
    }

    res.json(recyclingPoint);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener punto de reciclaje",
      error: error.message,
    });
  }
};

//actualizar punto reciclaje
const updateRecyclingPoint = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, latitude, longitude, description } = req.body;

    const recyclingPoint = await prisma.recyclingPoint.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        address,
        latitude: latitude !== undefined ? Number(latitude) : null,
        longitude: longitude !== undefined ? Number(longitude) : null,
        description,
      },
    });

    res.json({
      message: "Punto de reciclaje actualizado correctamente",
      recyclingPoint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar punto de reciclaje",
      error: error.message,
    });
  }
};

//eliminar punto reciclaje
const deleteRecyclingPoint = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.recyclingPoint.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Punto de reciclaje eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar punto de reciclaje",
      error: error.message,
    });
  }
};

module.exports = {
  createRecyclingPoint,
  getRecyclingPoints,
  getRecyclingPointById,
  updateRecyclingPoint,
  deleteRecyclingPoint,
};