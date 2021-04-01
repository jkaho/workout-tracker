// Render all workouts
function showWorkoutHistory(workoutHistory) {
    const contentDiv = document.querySelector(".history-content");

    // Loop through each workout
    workoutHistory.forEach(workout => {
        const workoutDiv = document.createElement("div");
        workoutDiv.classList.add("workout-div");
        const workoutDivId = workout._id;
        workoutDiv.setAttribute("id", `no-${workoutDivId}`);

        const workoutDateDiv = document.createElement("div");
        workoutDateDiv.classList.add("workout-date-div");
        const workoutDate = moment(workout.day).format("DD-MM-YY h:mma")
        workoutDateDiv.textContent = workoutDate;

        workoutDiv.appendChild(workoutDateDiv);

        // Loop through each workout exercise
        const workoutExercises = workout.exercises;
        let counter = 0;
        workoutExercises.forEach(exercise => {
            counter++;
            const exerciseDiv = document.createElement("div");
            exerciseDiv.classList.add("exercise-div");
            // if (counter === workoutExercises.length) {
            //     exerciseDiv.classList.add("last-exercise");
            // }
            
            const exerciseNameDiv = document.createElement("div");
            exerciseNameDiv.textContent = `Exercise #${counter}: ${exercise.name}`;
            const exerciseDurationDiv = document.createElement("div");
            exerciseDurationDiv.textContent = `Duration: ${exercise.duration}`;

            exerciseDiv.appendChild(exerciseNameDiv);

            if (exercise.type === "cardio") {
                const exerciseTypeDiv = document.createElement("div");
                exerciseTypeDiv.textContent = "Type: Cardio";
                const exerciseDistanceDiv = document.createElement("div");
                exerciseDistanceDiv.textContent = `Distance: ${exercise.distance}`;

                exerciseDiv.appendChild(exerciseTypeDiv);
                exerciseDiv.appendChild(exerciseDurationDiv);
                exerciseDiv.appendChild(exerciseDistanceDiv);
            } else {
                const exerciseTypeDiv = document.createElement("div");
                exerciseTypeDiv.textContent = "Type: Resistance";
                const exerciseWeightDiv = document.createElement("div");
                exerciseWeightDiv.textContent = `Weight: ${exercise.weight}`;
                const exerciseSetsDiv = document.createElement("div");
                exerciseSetsDiv.textContent = `Sets: ${exercise.sets}`;
                const exerciseRepsDiv = document.createElement("div");
                exerciseRepsDiv.textContent = `Reps: ${exercise.reps}`;

                exerciseDiv.appendChild(exerciseTypeDiv);
                exerciseDiv.appendChild(exerciseDurationDiv);
                exerciseDiv.appendChild(exerciseWeightDiv);
                exerciseDiv.appendChild(exerciseSetsDiv);
                exerciseDiv.appendChild(exerciseRepsDiv);
            }

            const exerciseBtnDiv = document.createElement("div");
            const editExerciseBtn = document.createElement("button");
            editExerciseBtn.classList.add("edit-exercise-btn");
            editExerciseBtn.innerHTML = "<i class='fas fa-edit'></i>";
            const deleteExerciseBtn = document.createElement("button");
            deleteExerciseBtn.classList.add("delete-exercise-btn");
            deleteExerciseBtn.innerHTML = "<i class='fas fa-trash'></i>";

            exerciseBtnDiv.appendChild(editExerciseBtn);
            exerciseBtnDiv.appendChild(deleteExerciseBtn);
            exerciseDiv.appendChild(exerciseBtnDiv);

            workoutDiv.appendChild(exerciseDiv);
        })

        const deleteWorkoutBtn = document.createElement("button");
        deleteWorkoutBtn.classList.add("delete-workout-btn");
        deleteWorkoutBtn.innerHTML = "Delete workout";

        workoutDiv.appendChild(deleteWorkoutBtn);
        contentDiv.appendChild(workoutDiv);
    })

    // Delete workout functionality
    const deleteWorkoutBtns = document.querySelectorAll(".delete-workout-btn");
    deleteWorkoutBtns.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const workoutDiv = event.target.parentElement;
            const workoutId = workoutDiv.getAttribute("id").split("-")[1];
            API.deleteWorkout(workoutId).then(() => window.location.replace("/history"));
        })
    });
}

API.getAllWorkouts().then(showWorkoutHistory);

