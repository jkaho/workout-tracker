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
            exerciseDiv.classList.add(`no-${counter - 1}`);
            // if (counter === workoutExercises.length) {
            //     exerciseDiv.classList.add("last-exercise");
            // }
            
            const exerciseNameDiv = document.createElement("div");
            exerciseNameDiv.textContent = `Exercise #${counter}: ${exercise.name}`;
            const exerciseDurationDiv = document.createElement("div");
            exerciseDurationDiv.textContent = `Duration: ${exercise.duration}`;

            exerciseDiv.appendChild(exerciseNameDiv);

            // Create table to hold exercise stats
            const exerciseTable = document.createElement("table");
            exerciseTable.classList.add("exercise-table");

            if (exercise.type === "cardio") {
                // Render exercise type to table
                const exerciseTypeTr = document.createElement("tr");
                const exerciseTypeTdKey = document.createElement("td");
                exerciseTypeTdKey.classList.add("exercise-keys");
                const exerciseTypeTdValue = document.createElement("td");
                exerciseTypeTdValue.classList.add("exercise-values");

                const exerciseTypeKeyP = document.createElement("p");
                exerciseTypeKeyP.textContent = "TYPE";
                const exerciseTypeValueP = document.createElement("p");
                exerciseTypeValueP.textContent = "Cardio";

                exerciseTypeTdKey.appendChild(exerciseTypeKeyP);
                exerciseTypeTdValue.appendChild(exerciseTypeValueP);
                exerciseTypeTr.appendChild(exerciseTypeTdKey);
                exerciseTypeTr.appendChild(exerciseTypeTdValue);

                // Render exercise distance to table
                const exerciseDistanceTr = document.createElement("tr");
                const exerciseDistanceTdKey = document.createElement("td");
                exerciseDistanceTdKey.classList.add("exercise-keys");
                const exerciseDistanceTdValue = document.createElement("td");
                exerciseDistanceTdValue.classList.add("exercise-values");

                const exerciseDistanceKeyP = document.createElement("p");
                exerciseDistanceKeyP.textContent = "DISTANCE";
                const exerciseDistanceValueP = document.createElement("p");
                exerciseDistanceValueP.textContent = exercise.distance;

                exerciseDistanceTdKey.appendChild(exerciseDistanceKeyP);
                exerciseDistanceTdValue.appendChild(exerciseDistanceValueP);
                exerciseDistanceTr.appendChild(exerciseDistanceTdKey);
                exerciseDistanceTr.appendChild(exerciseDistanceTdValue);

                // Append table to exercise div
                exerciseTable.appendChild(exerciseTypeTr);
                exerciseTable.appendChild(exerciseDistanceTr);
                exerciseDiv.appendChild(exerciseTable);
            } else {
                // Render exercise type to table
                const exerciseTypeTr = document.createElement("tr");
                const exerciseTypeTdKey = document.createElement("td");
                exerciseTypeTdKey.classList.add("exercise-keys");
                const exerciseTypeTdValue = document.createElement("td");
                exerciseTypeTdValue.classList.add("exercise-values");

                const exerciseTypeKeyP = document.createElement("p");
                exerciseTypeKeyP.textContent = "TYPE";
                const exerciseTypeValueP = document.createElement("p");
                exerciseTypeValueP.textContent = "Resistance";

                exerciseTypeTdKey.appendChild(exerciseTypeKeyP);
                exerciseTypeTdValue.appendChild(exerciseTypeValueP);
                exerciseTypeTr.appendChild(exerciseTypeTdKey);
                exerciseTypeTr.appendChild(exerciseTypeTdValue);

                // Render exercise weight to table
                const exerciseWeightTr = document.createElement("tr");
                const exerciseWeightTdKey = document.createElement("td");
                exerciseWeightTdKey.classList.add("exercise-keys");
                const exerciseWeightTdValue = document.createElement("td");
                exerciseWeightTdValue.classList.add("exercise-values");

                const exerciseWeightKeyP = document.createElement("p");
                exerciseWeightKeyP.textContent = "WEIGHT";
                const exerciseWeightValueP = document.createElement("p");
                exerciseWeightValueP.textContent = exercise.weight;

                exerciseWeightTdKey.appendChild(exerciseWeightKeyP);
                exerciseWeightTdValue.appendChild(exerciseWeightValueP);
                exerciseWeightTr.appendChild(exerciseWeightTdKey);
                exerciseWeightTr.appendChild(exerciseWeightTdValue);

                // Render exercise sets to table
                const exerciseSetsTr = document.createElement("tr");
                const exerciseSetsTdKey = document.createElement("td");
                exerciseSetsTdKey.classList.add("exercise-keys");
                const exerciseSetsTdValue = document.createElement("td");
                exerciseSetsTdValue.classList.add("exercise-values");

                const exerciseSetsKeyP = document.createElement("p");
                exerciseSetsKeyP.textContent = "SETS";
                const exerciseSetsValueP = document.createElement("p");
                exerciseSetsValueP.textContent = exercise.sets;

                exerciseSetsTdKey.appendChild(exerciseSetsKeyP);
                exerciseSetsTdValue.appendChild(exerciseSetsValueP);
                exerciseSetsTr.appendChild(exerciseSetsTdKey);
                exerciseSetsTr.appendChild(exerciseSetsTdValue);
 
                // Render exercise reps to table
                const exerciseRepsTr = document.createElement("tr");
                const exerciseRepsTdKey = document.createElement("td");
                exerciseRepsTdKey.classList.add("exercise-keys");
                const exerciseRepsTdValue = document.createElement("td");
                exerciseRepsTdValue.classList.add("exercise-values");

                const exerciseRepsKeyP = document.createElement("p");
                exerciseRepsKeyP.textContent = "REPS";
                const exerciseRepsValueP = document.createElement("p");
                exerciseRepsValueP.textContent = exercise.reps;

                exerciseRepsTdKey.appendChild(exerciseRepsKeyP);
                exerciseRepsTdValue.appendChild(exerciseRepsValueP);
                exerciseRepsTr.appendChild(exerciseRepsTdKey);
                exerciseRepsTr.appendChild(exerciseRepsTdValue);

                // Render table to exercise div 
                exerciseTable.append(exerciseTypeTr);
                exerciseTable.append(exerciseWeightTr);
                exerciseTable.append(exerciseSetsTr);
                exerciseTable.append(exerciseRepsTr);
                exerciseDiv.appendChild(exerciseTable);
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

    // Delete exercise functionality
    // const deleteExerciseBtns = document.querySelectorAll(".delete-exercise-btn");
    // deleteExerciseBtns.forEach(button => {
    //     button.addEventListener("click", function(event) {
    //         event.preventDefault();
    //         const workoutDiv = event.target.parentElement.parentElement.parentElement;
    //         console.log(workoutDiv)
    //         const workoutId = workoutDiv.getAttribute("id").split("-")[1];
    //         const exerciseDiv = event.target.parentElement.parentElement;
    //         const exerciseIndex = exerciseDiv.classList[1].split("-")[1];
    //         API.deleteExercise(workoutId, exerciseIndex).then(() => window.location.replace("/history"));
    //     })
    // })

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

