const db = require("../models");
const uniqid = require("uniqid");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        // Get all workouts
        db.Workout.aggregate([
            { 
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            }
        ]).then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/sorted", (req, res) => {
        // Get all workouts, sort from newest to oldeset
        db.Workout.aggregate([
            { 
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            },
            {
                $sort: { day: -1 }
            }
        ]).then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err);
        });
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

    app.delete("/api/workouts/:id", (req, res) => {
        // Delete workout
        db.Workout.deleteOne({ _id: req.params.id })
            .then(deletedWorkout => {
                console.log("Workout successfully deleted!")
                res.json(deletedWorkout);
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

    // app.put("/api/workouts/exercise/:id", (req, res) => {
    //     // Delete exercise from workout
    //     const field = `exercises.${req.body}`;
    //     console.log(field);
    //     db.Workout.findOneAndUpdate(
    //         { _id: req.params.id }, { $pull: { field }})
    //         .then(deleteExercise => {
    //             res.json(deleteExercise);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         })
    // });

    app.get("/api/workouts/range", (data, res) => {
        // Get past seven workouts
        db.Workout.aggregate([
            { 
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            }
        ]).then(result => {
            const resultInRange = result.slice(-7);
            res.json(resultInRange);
        }).catch(err => {
            res.json(err);
        });
    });
}