require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all wardrobe items for a user
app.get("/wardrobe/:userId", async (req, res) => {
  try {
    const items = await prisma.wardrobeItem.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a wardrobe item
app.post("/wardrobe", async (req, res) => {
  try {
    const { userId, url, category } = req.body;
    const item = await prisma.wardrobeItem.create({
      data: { userId, url, category },
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a wardrobe item
app.delete("/wardrobe/:id", async (req, res) => {
  try {
    await prisma.wardrobeItem.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all saved looks for a user
app.get("/looks/:userId", async (req, res) => {
  try {
    const looks = await prisma.savedLook.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(looks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a look
app.post("/looks", async (req, res) => {
  try {
    const { userId, top, bottom, outerwear, shoes, bag, extras } = req.body;
    const look = await prisma.savedLook.create({
      data: { userId, top, bottom, outerwear, shoes, bag, extras },
    });
    res.json(look);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🌸 Lily server running on port ${PORT}`);
});
