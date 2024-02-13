import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

// Get all users
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get specific user by id
router.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new user
router.post("/users", async (req, res) => {
  const newUser = await prisma.user.create({
    data: req.body,
  });
  res.json(newUser);
});

// Delete user by id
router.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
