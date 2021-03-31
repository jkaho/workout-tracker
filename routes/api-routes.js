const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        // Get all workouts
        db.Workout.aggregate([
            { $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }}
        ]).then(
            db.Workout.find({})
            .then(allWorkouts => {
                console.log(allWorkouts);
                res.json(allWorkouts);
            })
            .catch(err => {
                res.json(err);
            })
        )
    });

    app.post("/api/workouts", (data, res) => {
        // Create workout 
        db.Workout.create(data)
            .then(newWorkout => {
                res.json(newWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        // Add exercise to workout
        db.Workout.findOneAndUpdate(
            { _id: req.params.id }, 
            { $push: { exercises: req.body }},
            { new: true })
            .then(updatedWorkout => {
                res.json(updatedWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts/range", (data, res) => {
        // Get all workouts (?)
        db.Workout.find({})
            .then(allWorkouts => {
                res.json(allWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    })
}