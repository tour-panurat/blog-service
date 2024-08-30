import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import { authMiddleware } from "./config/authConfig";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerDocs, swaggerUi } from "./config/swagger";
import prisma from "./prisma/client";

const app = express();

app.use(express.json());

app.use(cors());

// app.use(authMiddleware);

app.get("/profile", (req, res) => {
  const auth = req.auth;
  res.send(JSON.stringify(auth));
});

app.use("/users", authMiddleware, userRoutes);
app.use("/posts", authMiddleware, postRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log("Database connection successful.");

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure code
  }
}

startServer();