function showWorkoutHistory(workoutHistory) {
    workoutHistory.forEach(workout => {
        const workoutDiv = document.createElement("div");
        workoutDiv.classList.add("workout-div");
        
    })
}

API.getAllWorkouts().then(showWorkoutHistory);