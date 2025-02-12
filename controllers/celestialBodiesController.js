import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCelestialBodies = async (req, res) => {
  try {
    const celestialBodies = await prisma.celestialBodies.findMany();
    res.json(celestialBodies);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving celestial bodies",
      error: err.message,
    });
  }
};

export const createCelestialBodies = async (req, res) => {
  try {
    const { name } = req.body;
    const celestialBodies = await prisma.celestialBodies.create({
      data: { name },
    });
    res.status(201).json(celestialBodies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating celestial body", error: err.message });
  }
};

export const updateCelestialBodies = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const celestialBodies = await prisma.celestialBodies.findUnique({
      where: { id },
    });

    if (!celestialBodies) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    const updatedCelestialBodies = await prisma.celestialBodies.update({
      where: { id },
      data: { name },
    });

    res.json(updatedCelestialBodies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating celestial body", error: err.message });
  }
};

export const deleteCelestialBodies = async (req, res, next) => {
  const { id } = req.params;

  try {
    const celestialBodies = await prisma.celestialBodies.findUnique({
      where: { id },
    });

    if (!celestialBodies) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    await prisma.observations.deleteMany({
      where: { celestialBodiesId: id },
    });

    await prisma.celestialBodies.delete({
      where: { id },
    });

    res.json({ message: "Celestial body deleted successfully" });
  } catch (err) {
    next(err);
  }
};