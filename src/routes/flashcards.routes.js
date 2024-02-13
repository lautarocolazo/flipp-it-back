import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

// Get all flashcards
router.get("/flashcards", async (req, res) => {
  const flashcards = await prisma.flashcard.findMany();
  res.json(flashcards);
});

// Get specific flashcard by id
router.get("/flashcards/:id", async (req, res) => {
  const flashcardId = parseInt(req.params.id);
  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: flashcardId },
    });
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    res.json(flashcard);
  } catch (error) {
    console.error("Error retrieving flashcard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new flashcard
router.post("/flashcards", async (req, res) => {
  const newFolder = await prisma.flashcard.create({
    data: req.body,
  });
  res.json(newFolder);
});

// Update flashcard by id
router.put("/flashcards/:id", async (req, res) => {
  const flashcardId = parseInt(req.params.id);
  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: flashcardId },
    });
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    const updatedFolder = await prisma.flashcard.update({
      where: { id: flashcardId },
      data: req.body,
    });

    res.json(updatedFolder);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete flashcard by id
router.delete("/flashcards/:id", async (req, res) => {
  const flashcardId = parseInt(req.params.id);
  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: flashcardId },
    });
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    await prisma.flashcard.delete({
      where: { id: flashcardId },
    });

    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
