const prisma = require("../prisma");

//crear evento
const createEvent = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    if (!title || !description || !location || !date) {
      return res.status(400).json({
        message: "Título, descripción, ubicación y fecha son obligatorios",
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
      },
    });

    res.status(201).json({
      message: "Evento creado correctamente",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear evento",
      error: error.message,
    });
  }
};

//ver eventos
const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener eventos",
      error: error.message,
    });
  }
};

//obtener evento por id
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener evento",
      error: error.message,
    });
  }
};

//actualizar evento
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, date } = req.body;

    const event = await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        location,
        date: new Date(date),
      },
    });

    res.json({
      message: "Evento actualizado correctamente",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar evento",
      error: error.message,
    });
  }
};

//eliminar evento
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Evento eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar evento",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};