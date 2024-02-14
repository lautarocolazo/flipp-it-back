import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

// Get all decks
router.get("/decks", async (req, res) => {
  const decks = await prisma.deck.findMany({
    include: {
      flashcards: true,
    },
  });
  res.json(decks);
});

// Get specific deck by id
router.get("/decks/:id", async (req, res) => {
  const deckId = parseInt(req.params.id);
  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    res.json(deck);
  } catch (error) {
    console.error("Error retrieving deck:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new deck
router.post("/decks", async (req, res) => {
  const newDeck = await prisma.deck.create({
    data: req.body,
  });
  res.json(newDeck);
});

// Update deck by id
router.put("/decks/:id", async (req, res) => {
  const deckId = parseInt(req.params.id);
  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    const updatedFolder = await prisma.deck.update({
      where: { id: deckId },
      data: req.body,
    });

    res.json(updatedFolder);
  } catch (error) {
    console.error("Error updating deck:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete deck by id
router.delete("/decks/:id", async (req, res) => {
  const deckId = parseInt(req.params.id);
  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    await prisma.deck.delete({
      where: { id: deckId },
    });

    res.json({ message: "Deck deleted successfully" });
  } catch (error) {
    console.error("Error deleting deck:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
