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
                    unique: true,
                    required: true
                },
                duration: {
                    type: Number,
                    required: true
                },
                // Cardio 
                distance: {
                    type: Number,
                    required: true
                },
                // Resistance
                weight: {
                    type: Number,
                    required: true
                },
                sets: {
                    type: Number,
                    required: true
                },
                reps: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

WorkoutSchema.virtual("totalDuration").get(() => {
    return this.exercises.reduce((totalDuration, exercise) => {
        return totalDuration + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
