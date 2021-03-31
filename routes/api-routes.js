const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        // Get all workouts
        db.Workout.find({})
            .then(allWorkouts => {
                res.json(allWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", (data, res) => {
        // Create workout 
        const workout = new db.Workout(data);

        db.Workout.create(workout)
            .then(newWorkout => {
                res.json(newWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        // Add exercise to workout
        db.Workout.findByIdAndUpdate(req.params.id, req.body)
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