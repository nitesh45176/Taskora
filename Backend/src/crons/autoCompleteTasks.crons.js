import cron from "node-cron";
import { autoCompleteTasks } from "../controllers/task.controller.js";

let isRunning = false; // Prevent overlapping executions

cron.schedule("* * * * *", async () => {
  if (isRunning) {
    console.log("Previous job still running, skipping...");
    return;
  }

  try {
    isRunning = true;
    await autoCompleteTasks();
  } catch (error) {
    console.error("Cron job error:", error);
  } finally {
    isRunning = false;
  }
});