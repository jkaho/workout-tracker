const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now()
        },
        exercises: [
            {
                type: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    trim: true,
                    required: true
                },
                duration: {
                    type: Number,
                },
                // Cardio 
                distance: {
                    type: Number,
                },
                // Resistance
                weight: {
                    type: Number,
                },
                sets: {
                    type: Number,
                },
                reps: {
                    type: Number,
                }
            }
        ]
    }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
