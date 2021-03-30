const API = {
    // Requests backend to retrieve all workouts, grabs the last one
    async getLastWorkout() {
        let res;
        try {
        res = await fetch("/api/workouts");
        } catch (err) {
        console.log(err)
        }
        const json = await res.json();

        return json[json.length - 1];
    },

    // Requests to update specified workout with exercise
    async addExercise(data) {
        const id = location.search.split("=")[1];

        const res = await fetch("/api/workouts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    },
    
    // Requests to post an empty workout object
    async createWorkout(data = {}) {
        const res = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        return json;
    },

    // Request to retrieve all workouts
    async getWorkoutsInRange() {
        const res = await fetch(`/api/workouts/range`);
        const json = await res.json();

        return json;
    },
};
