import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import "./crons/autoCompleteTasks.crons.js";
import tasksRoutes from "./routes/task.route.js";
import userRoutes from "./routes/user.route.js";



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://taskora-ygjk.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks",tasksRoutes)
app.use("/api/user", userRoutes)

export default app;


//usertoken:-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWQwNWJhNWNjNDI0NmYyYWY4MTBiYiIsImlhdCI6MTc2Nzg4Mzk5NCwiZXhwIjoxNzY4NDg4Nzk0fQ.f38ZmVAXmlzj2lnauAKUcuPIBGop06zdJ45xo4bU8RM