import express from "express";
import userRoutes from "./routes/userRoutes.js";
import celestialBodiesRoutes from "./routes/celestialBodiesRoutes.js";
import observationsRoutes from "./routes/observationsRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/celestialBodies", celestialBodiesRoutes);
app.use("/api/observations", observationsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});