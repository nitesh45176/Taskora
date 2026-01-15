import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },
    items: {
      type: [itemSchema],
      default: [],
    },

    pickupLocation: {
      masked: {
        type: String,
        required: true,
      },
      full: {
        type: String,
      },
    },
    dropLocation: {
      masked: {
        type: String,
        required: true,
      },
      full: {
        type: String,
      },
    },

    deadline: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    platformFee: {
      type: Number,
      default: 20,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "OPEN",
        "ACCEPTED",
        "IN_PROGRESS",
        "DELIVERED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "OPEN",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedAt: Date,
    deliveredAt: Date,
    completedAt: Date,

    
  },
  { timestamps: true }
);

taskSchema.index({ status: 1 });
taskSchema.index({ acceptedBy: 1 });
taskSchema.index({ createdBy: 1 });


taskSchema.pre("save", function () {
  this.totalPrice = this.price + this.platformFee;
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
