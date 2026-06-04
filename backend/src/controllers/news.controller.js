const prisma = require("../prisma");

//crear noticia
const createNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Título y contenido son obligatorios",
      });
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    res.status(201).json({
      message: "Noticia creada correctamente",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear noticia",
      error: error.message,
    });
  }
};

//obtener noticia
const getNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(news);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener noticias",
      error: error.message,
    });
  }
};

//obtener noticia por id
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await prisma.news.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!news) {
      return res.status(404).json({
        message: "Noticia no encontrada",
      });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener noticia",
      error: error.message,
    });
  }
};

//actualizar noticia, solo admin
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;

    const news = await prisma.news.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    res.json({
      message: "Noticia actualizada correctamente",
      news,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar noticia",
      error: error.message,
    });
  }
};

//eliminar noticia, solo admin
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Noticia eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar noticia",
      error: error.message,
    });
  }
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
};