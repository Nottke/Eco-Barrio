const prisma = require("../prisma");

/**
 * Convierte una coordenada opcional en número.
 * Devuelve null si no fue ingresada y NaN si es inválida.
 */
function parseOptionalCoordinate(value) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const numericValue = Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : Number.NaN;
}

/**
 * Convierte y valida un identificador recibido por params.
 */
function parsePositiveId(value) {
  const numericId = Number(value);

  return Number.isInteger(numericId) &&
    numericId > 0
    ? numericId
    : null;
}

/**
 * Valida y normaliza los datos de un punto de reciclaje.
 */
function validateRecyclingPointData({
  name,
  address,
  latitude,
  longitude,
  description,
}) {
  const trimmedName =
    typeof name === "string"
      ? name.trim()
      : "";

  const trimmedAddress =
    typeof address === "string"
      ? address.trim()
      : "";

  const trimmedDescription =
    typeof description === "string"
      ? description.trim()
      : "";

  if (!trimmedName || !trimmedAddress) {
    return {
      error: "Nombre y dirección son obligatorios",
    };
  }

  if (
    trimmedName.length < 3 ||
    trimmedName.length > 100
  ) {
    return {
      error:
        "El nombre debe tener entre 3 y 100 caracteres",
    };
  }

  if (
    trimmedAddress.length < 5 ||
    trimmedAddress.length > 200
  ) {
    return {
      error:
        "La dirección debe tener entre 5 y 200 caracteres",
    };
  }

  if (trimmedDescription.length > 500) {
    return {
      error:
        "La descripción no puede superar los 500 caracteres",
    };
  }

  const parsedLatitude =
    parseOptionalCoordinate(latitude);

  const parsedLongitude =
    parseOptionalCoordinate(longitude);

  if (Number.isNaN(parsedLatitude)) {
    return {
      error: "La latitud debe ser un número válido",
    };
  }

  if (Number.isNaN(parsedLongitude)) {
    return {
      error: "La longitud debe ser un número válido",
    };
  }

  const hasLatitude = parsedLatitude !== null;
  const hasLongitude = parsedLongitude !== null;

  if (hasLatitude !== hasLongitude) {
    return {
      error:
        "Debes ingresar latitud y longitud juntas",
    };
  }

  if (
    parsedLatitude !== null &&
    (
      parsedLatitude < -90 ||
      parsedLatitude > 90
    )
  ) {
    return {
      error:
        "La latitud debe estar entre -90 y 90",
    };
  }

  if (
    parsedLongitude !== null &&
    (
      parsedLongitude < -180 ||
      parsedLongitude > 180
    )
  ) {
    return {
      error:
        "La longitud debe estar entre -180 y 180",
    };
  }

  return {
    data: {
      name: trimmedName,
      address: trimmedAddress,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      description: trimmedDescription || null,
    },
  };
}

// Crear punto de reciclaje
const createRecyclingPoint = async (req, res) => {
  try {
    const validation =
      validateRecyclingPointData(req.body);

    if (validation.error) {
      return res.status(400).json({
        message: validation.error,
      });
    }

    const recyclingPoint =
      await prisma.recyclingPoint.create({
        data: validation.data,
      });

    return res.status(201).json({
      message:
        "Punto de reciclaje creado correctamente",
      recyclingPoint,
    });
  } catch (error) {
    console.error(
      "Error Prisma al crear punto de reciclaje:",
      error
    );

    return res.status(500).json({
      message:
        "Error al crear punto de reciclaje",
      error: error.message,
    });
  }
};

// Obtener todos los puntos de reciclaje
const getRecyclingPoints = async (req, res) => {
  try {
    const recyclingPoints =
      await prisma.recyclingPoint.findMany({
        orderBy: {
          id: "desc",
        },
      });

    return res.json(recyclingPoints);
  } catch (error) {
    console.error(
      "Error Prisma al obtener puntos de reciclaje:",
      error
    );

    return res.status(500).json({
      message:
        "Error al obtener puntos de reciclaje",
      error: error.message,
    });
  }
};

// Obtener punto de reciclaje por ID
const getRecyclingPointById = async (
  req,
  res
) => {
  try {
    const pointId =
      parsePositiveId(req.params.id);

    if (pointId === null) {
      return res.status(400).json({
        message:
          "El identificador del punto no es válido",
      });
    }

    const recyclingPoint =
      await prisma.recyclingPoint.findUnique({
        where: {
          id: pointId,
        },
      });

    if (!recyclingPoint) {
      return res.status(404).json({
        message:
          "Punto de reciclaje no encontrado",
      });
    }

    return res.json(recyclingPoint);
  } catch (error) {
    console.error(
      "Error Prisma al obtener punto de reciclaje:",
      error
    );

    return res.status(500).json({
      message:
        "Error al obtener punto de reciclaje",
      error: error.message,
    });
  }
};

// Actualizar punto de reciclaje
const updateRecyclingPoint = async (
  req,
  res
) => {
  try {
    const pointId =
      parsePositiveId(req.params.id);

    if (pointId === null) {
      return res.status(400).json({
        message:
          "El identificador del punto no es válido",
      });
    }

    const existingPoint =
      await prisma.recyclingPoint.findUnique({
        where: {
          id: pointId,
        },
      });

    if (!existingPoint) {
      return res.status(404).json({
        message:
          "Punto de reciclaje no encontrado",
      });
    }

    const validation =
      validateRecyclingPointData(req.body);

    if (validation.error) {
      return res.status(400).json({
        message: validation.error,
      });
    }

    const recyclingPoint =
      await prisma.recyclingPoint.update({
        where: {
          id: pointId,
        },
        data: validation.data,
      });

    return res.json({
      message:
        "Punto de reciclaje actualizado correctamente",
      recyclingPoint,
    });
  } catch (error) {
    console.error(
      "Error Prisma al actualizar punto de reciclaje:",
      error
    );

    return res.status(500).json({
      message:
        "Error al actualizar punto de reciclaje",
      error: error.message,
    });
  }
};

// Eliminar punto de reciclaje
const deleteRecyclingPoint = async (
  req,
  res
) => {
  try {
    const pointId =
      parsePositiveId(req.params.id);

    if (pointId === null) {
      return res.status(400).json({
        message:
          "El identificador del punto no es válido",
      });
    }

    const existingPoint =
      await prisma.recyclingPoint.findUnique({
        where: {
          id: pointId,
        },
      });

    if (!existingPoint) {
      return res.status(404).json({
        message:
          "Punto de reciclaje no encontrado",
      });
    }

    await prisma.recyclingPoint.delete({
      where: {
        id: pointId,
      },
    });

    return res.json({
      message:
        "Punto de reciclaje eliminado correctamente",
    });
  } catch (error) {
    console.error(
      "Error Prisma al eliminar punto de reciclaje:",
      error
    );

    return res.status(500).json({
      message:
        "Error al eliminar punto de reciclaje",
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