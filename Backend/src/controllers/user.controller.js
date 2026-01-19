import Task from "../models/Task.model.js";


export const applyRunner = async (req, res) => {
  try {
    const user = req.user;

    // Already a runner
    if (user.isRunner) {
      return res.status(400).json({
        message: "You already have a runner account",
      });
    }

    // Auto-approve runner
    user.isRunner = true;

    // IMPORTANT: do NOT change status here
    // user stays in USER mode unless he switches
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Runner account created successfully",
    });

  } catch (error) {
    console.error("Apply runner error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const switchRole = async (req, res) => {
  try {
    const user = req.user;

    // USER → RUNNER
    if (user.status === "user") {

      if (!user.isRunner) {
        return res.status(403).json({
          message: "You do not have a runner account",
        });
      }

      // Optional safety: check active tasks as user (future)
      user.status = "runner";
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Switched to RUNNER mode",
        status: user.status,
      });
    }

    // RUNNER → USER
    if (user.status === "runner") {

      // IMPORTANT: runner must not have active task
      const activeTask = await Task.findOne({
        acceptedBy: user._id,
        status: { $in: ["ACCEPTED", "IN_PROGRESS"] },
      });

      if (activeTask) {
        return res.status(400).json({
          message: "Complete or cancel active task before switching",
        });
      }

      user.status = "user";
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Switched to USER mode",
        status: user.status,
      });
    }

  } catch (error) {
    console.error("Switch role error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getRunnerStats = async (req, res) => {
  const runnerId = req.user.id;

  const completedTasks = await Task.find({
    acceptedBy: runnerId,
    status: "COMPLETED",
  });

  const totalEarnings = completedTasks.reduce(
    (sum, task) => sum + task.price,
    0
  );

  res.json({
    completedCount: completedTasks.length,
    totalEarnings,
  });
};
