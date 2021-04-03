const API = {
    // Requests to retrieve all workouts 
    async getAllWorkouts() {
        let res;
        try {
            res = await fetch("/api/workouts");
        } catch (err) {
            console.log(err);
        }
        const json = await res.json();
        return json;
    },

    // Requests backend to retrieve all workouts, grabs the last one
    async getLastWorkout() {
        let res;
        try {
            res = await fetch("/api/workouts");
        } catch (err) {
            console.log(err)
        }
        const json = await res.json();
        console.log(json);
        return json[0];
    },

    // Requests to update specified workout to add exercise
    async addExercise(data) {
        const id = location.search.split("=")[1];

        const res = await fetch("/api/workouts/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        console.log(json);
        return json;
    },

    // Requests to update specified workout to delete exercise
    // async deleteExercise(id, index) {
    //     const res = await fetch("/api/workouts/exercise/" + id, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(index)
    //     });

    //     try {
    //         const json = await res.json();
    //         console.log(json);
    //     } catch (err) {
    //         console.log("This is the error");
    //         console.log(err);
    //     }
    //     return json;
    // },
    
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

    // Request to delete specified workout
    async deleteWorkout(id) {
        const res = await fetch("/api/workouts/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();
        console.log(json);
        return json;
    },

    // Request to retrieve all workouts in the past seven days
    async getWorkoutsInRange() {
        const res = await fetch(`/api/workouts/range`);
        const json = await res.json();

        return json;
    },
};
