import express from "express";
import morgan from "morgan";
import usersRoutes from "./routes/users.routes.js";
import foldersRoutes from "./routes/folders.routes.js";
import decksRoutes from "./routes/decks.routes.js";
import flashcardsRoutes from "./routes/flashcards.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", foldersRoutes);
app.use("/api", decksRoutes);
app.use("/api", flashcardsRoutes);

export default app;
