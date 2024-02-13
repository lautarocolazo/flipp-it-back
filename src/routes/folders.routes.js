import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

// Get all folders
router.get("/folders", async (req, res) => {
  const folders = await prisma.folder.findMany({
    include: {
      decks: true,
    },
  });
  res.json(folders);
});

// Get specific folder by id
router.get("/folders/:id", async (req, res) => {
  const folderId = parseInt(req.params.id);
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.json(folder);
  } catch (error) {
    console.error("Error retrieving folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new folder
router.post("/folders", async (req, res) => {
  const newFolder = await prisma.folder.create({
    data: req.body,
  });
  res.json(newFolder);
});

// Update folder by id
router.put("/folders/:id", async (req, res) => {
  const folderId = parseInt(req.params.id);
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: req.body,
    });

    res.json(updatedFolder);
  } catch (error) {
    console.error("Error updating folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete folder by id
router.delete("/folders/:id", async (req, res) => {
  const folderId = parseInt(req.params.id);
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    await prisma.folder.delete({
      where: { id: folderId },
    });

    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
