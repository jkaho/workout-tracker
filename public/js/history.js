function showWorkoutHistory(workoutHistory) {
    const contentDiv = document.querySelector(".history-content");

    // Loop through each workout
    workoutHistory.forEach(workout => {
        const workoutDiv = document.createElement("div");
        workoutDiv.classList.add("workout-div");
        const workoutDateDiv = document.createElement("div");
        workoutDateDiv.classList.add("workout-date-div");
        workoutDateDiv.textContent = workout.day;

        workoutDiv.appendChild(workoutDateDiv);

        // Loop through each workout exercise
        const workoutExercises = workout.exercises;
        workoutExercises.forEach(exercise => {
            const exerciseDiv = document.createElement("div");
            exerciseDiv.classList.add("exercise-div");
            
            const exerciseNameDiv = document.createElement("div");
            exerciseNameDiv.textContent = exercise.name;
            const exerciseTypeDiv = document.createElement("div");
            exerciseTypeDiv.textContent = exercise.type;
            const exerciseDurationDiv = document.createElement("div");
            exerciseDurationDiv.textContent = exercise.duration;

            workoutDiv.appendChild(exerciseNameDiv);
            workoutDiv.appendChild(exerciseTypeDiv);
            workoutDiv.appendChild(exerciseDurationDiv);

            if (exercise.type === "cardio") {
                const exerciseDistanceDiv = document.createElement("div");
                exerciseDistanceDiv.textContent = exercise.distance;

                workoutDiv.appendChild(exerciseDistanceDiv);
            } else {
                const exerciseWeightDiv = document.createElement("div");
                exerciseWeightDiv.textContent = exercise.weight;
                const exerciseSetsDiv = document.createElement("div");
                exerciseSetsDiv.textContent = exercise.sets;
                const exerciseRepsDiv = document.createElement("div");
                exerciseRepsDiv.textContent = exercise.reps;

                workoutDiv.appendChild(exerciseWeightDiv);
                workoutDiv.appendChild(exerciseSetsDiv);
                workoutDiv.appendChild(exerciseRepsDiv);
            }
        })

        contentDiv.appendChild(workoutDiv);
    })
}

API.getAllWorkouts().then(showWorkoutHistory);