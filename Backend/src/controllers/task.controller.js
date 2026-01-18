import Task from "../models/Task.model.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = req.user; // coming from auth middleware

    if (user.status !== "user") {
      return res.status(403).json({
        message: "Only Users can create tasks",
      });
    }

    const {
      title,
      description,
      items,
      pickupLocation,
      dropLocation,
      deadline,
      price,
    } = req.body;

    if (
      !title ||
      !pickupLocation?.masked ||
      !dropLocation?.masked ||
      !deadline ||
      !price
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const platformFee = 20;
    const totalPrice = price + platformFee;

    const task = await Task.create({
      title,
      description,
      items,
      pickupLocation,
      dropLocation,
      deadline,
      price,
      platformFee,
      totalPrice,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all open tasks (for runners to browse)
export const getOpenTasks = async (req, res) => {
  try {
    const runnerId = req.user.id;

    if (req.user.status !== "runner") {
      return res.status(403).json({
        message: "Only runners can view open tasks",
      });
    }

    const tasks = await Task.find({
      status: "OPEN",
      createdBy: { $ne: runnerId }, // Don't show own tasks
    })
      .populate("createdBy", "name email") // Populate user details
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptTask = async (req, res) => {
  try {
    const runnerId = req.user.id;
    const { taskId } = req.params;

    if (req.user.status !== "runner") {
      return res.status(403).json({ message: "Only RUNNER can accept tasks" });
    }

    //checking if runner already has an task
    const activeTask = await Task.findOne({
      acceptedBy: runnerId,
      status: { $in: ["ACCEPTED", "IN_PROGRESS"] },
    });

    if (activeTask) {
      return res.status(400).json({
        message: "You already have an task, Complete that Task first.",
      });
    }

    // Atomically accept task
    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        status: "OPEN",
        createdBy: { $ne: runnerId },
      },
      {
        status: "ACCEPTED",
        acceptedBy: runnerId,
      },
      {
        new: true,
      },
    );

    if (!task) {
      return res
        .status(400)
        .json({ message: "Task not available for acceptance" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task is accepted successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const startTask = async (req, res) => {
  try {
    const runnerId = req.user.id;
    const { taskId } = req.params;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        status: "ACCEPTED",
        acceptedBy: runnerId,
      },
      {
        status: "IN_PROGRESS",
      },
      {
        new: true,
      },
    );

    if (!task) {
      return res.status(400).json({ message: "Task cannot be started" });
    }

    res.status(200).json({ success: true, message: "Task is started.", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markDelivered = async (req, res) => {
  try {
    const runnerId = req.user.id;
    const { taskId } = req.params;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        status: "IN_PROGRESS",
        acceptedBy: runnerId,
      },
      {
        status: "DELIVERED",
      },
      {
        new: true,
      },
    );

    if (!task) {
      return res
        .status(400)
        .json({ message: "Task cannot be marked as delivered." });
    }

    res
      .status(200)
      .json({ success: true, message: "Task is marked as delivered.", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//If user forgot to mark task completed , then it will automatically marked as completed after 24 hours
export const autoCompleteTasks = async () => {
  try {
    const result = await Task.updateMany(
      {
        status: "DELIVERED",
        updatedAt: {
          $lte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      { status: "COMPLETED" },
    );
  } catch (error) {
    console.error("Auto-complete error:", error);
  }
};

export const cancelByUser = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        createdBy: userId,
        status: { $in: ["OPEN", "ACCEPTED"] },
      },
      {
        status: "CANCELLED",
        acceptedBy: null,
      },
      { new: true },
    );

    if (!task) {
      return res
        .status(400)
        .json({ message: "Task cannot be cancelled at this stage" });
    }

    res.status(200).json({ message: "Task cancelled", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const cancelByRunner = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        acceptedBy: new mongoose.Types.ObjectId(req.user.id),
        status: "ACCEPTED",
      },
      {
        status: "OPEN",
        acceptedBy: null,
      },
      { new: true }
    );

    if (!task) {
      return res.status(400).json({
        message: "You can't cancel this task",
      });
    }

    res.status(200).json({
      message: "Task cancelled and released",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getMyCreatedTasks = async (req, res) => {
  if (req.user.status !== "user") {
    return res.status(403).json({
      message: "Only USER can access created tasks",
    });
  }

  const userId = req.user.id;

  try {
    const tasks = await Task.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyAcceptedTasks = async (req, res) => {
  if (req.user.status !== "runner") {
    return res.status(403).json({
      message: "Only RUNNER can access accepted tasks",
    });
  }

  const runnerId = req.user.id;

  try {
    const tasks = await Task.find({ acceptedBy: runnerId }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyActiveTask = async (req, res) => {
  if (req.user.status !== "runner") {
    return res.status(403).json({
      message: "Only RUNNER can access active task",
    });
  }

  const runnerId = req.user.id;

  try {
    const task = await Task.findOne({
      acceptedBy: runnerId,
      status: { $in: ["ACCEPTED", "IN_PROGRESS"] },
    });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({
      _id: taskId,
      $or: [{ createdBy: userId }, { acceptedBy: userId }],
    }).populate("createdBy acceptedBy", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const completeTaskByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;

    if (req.user.status !== "user") {
      return res.status(403).json({
        message: "Only USER can complete the task",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        createdBy: userId,
        status: "DELIVERED",
      },
      {
        status: "COMPLETED",
      },
      { new: true },
    );

    if (!task) {
      return res.status(400).json({
        message: "Task cannot be completed at this stage",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
