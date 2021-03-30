module.exports = (app) => {
    app.get("/api/workouts", (data, res) => {
        // Get all workouts
    });

    app.post("/api/workouts", (data, res) => {
        // Create workout 
    });

    app.put("/api/workouts/:id", (data, res) => {
        // Add exercise to workout
    });

    app.get("/api/workouts/range", (data, res) => {
        // Get all workouts (?)
    })
}