const db = require("../models");
// const uniqid = require("uniqid");

module.exports = (app) => {
    // Retrieves all workouts, dynamically adds a totalDuration field and sorts by date in desc order
    app.get("/api/workouts", (req, res) => {
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

    // Retrieves all workouts, dynamically adds a totalDuration field and grabs the last 7 workouts
    app.get("/api/workouts/range", (data, res) => {
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

    // Creates a new workout document 
    app.post("/api/workouts", (data, res) => {
        db.Workout.create(data)
            .then(newWorkout => {
                res.json(newWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // Updates a workout by id -> adds an object to exercises field array
    app.put("/api/workouts/:id", (req, res) => {
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

    // Deletes a workout by id
    app.delete("/api/workouts/:id", (req, res) => {
        db.Workout.deleteOne({ _id: req.params.id })
            .then(deletedWorkout => {
                console.log("Workout successfully deleted!")
                res.json(deletedWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // Updates a workout by id -> removes an object from exercises field array
    // app.put("/api/workouts/exercise/:id", (req, res) => {
    //     req.body.id = uniqid();
    //     console.log(req.body);
    //     db.Workout.findOneAndUpdate(
    //         { _id: req.params.id }, { $pull: { field }})
    //         .then(deleteExercise => {
    //             res.json(deleteExercise);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         })
    // });
}