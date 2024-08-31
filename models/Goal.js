const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "weight",
        "strength",
        "cardio",
        "flexibility",
        "endurance",
        "balance",
        "mobility",
        "recovery",
      ],
    },
    target: {
      type: String,
      required: function () {
        return !["flexibility", "endurance", "strength", "cardio"].includes(
          this.type
        );
      },
    },
    duration: {
      type: String,
      required: function () {
        return ["cardio", "endurance", "recovery", "strength"].includes(this.type);
      },
    },
    weight: {
      type: String,
      required: function () {
        return this.type === "weight";
      },
    },
    reps: {
      type: Number,
      required: function () {
        return this.type === "strength";
      },
    },
    sets: {
      type: Number,
      required: function () {
        return this.type === "strength";
      },
    },
    distance: {
      type: Number,
      required: function () {
        return ["cardio", "endurance"].includes(this.type);
      },
    },
    stretchDuration: {
      type: Number,
      required: function () {
        return this.type === "flexibility";
      },
    },
    balanceExercises: {
      type: Number,
      required: function () {
        return this.type === "balance";
      },
    },
    mobilityExercises: {
      type: Number,
      required: function () {
        return this.type === "mobility";
      },
    },
    recoverySessions: {
      type: Number,
      required: function () {
        return this.type === "recovery";
      },
    },
    muscleGroup: {
      type: String,
      required: function () {
        return this.type === "strength";
      },
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
