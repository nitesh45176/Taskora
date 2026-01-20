import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import "./crons/autoCompleteTasks.crons.js";
import tasksRoutes from "./routes/task.route.js";
import userRoutes from "./routes/user.route.js";



const app = express();


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks",tasksRoutes)
app.use("/api/user", userRoutes)

export default app;


