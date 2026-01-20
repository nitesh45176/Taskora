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



import jwt from "jsonwebtoken";

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

      user.status = "runner";
      await user.save();
    }

    // RUNNER → USER
    else if (user.status === "runner") {
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
    }

    // 🔥 ISSUE NEW TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Role switched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        isRunner: user.isRunner,
      },
      token,
    });
  } catch (error) {
    console.error("Switch role error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




