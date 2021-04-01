async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "DATE",
    numExercises: "EXERCISES PERFORMED",
    totalDuration: "WORKOUT DURATION",
    totalWeight: "TOTAL WEIGHT LIFTED",
    totalSets: "TOTAL SETS PERFORMED",
    totalReps: "TOTAL REPS PERFORMED",
    totalDistance: "TOTAL DISTANCE COVERED"
  };

  const workoutTable = document.createElement("table");
  workoutTable.classList.add("workout-table");
    Object.keys(summary).forEach(key => {
      const tr = document.createElement("tr");
      const tdKey = document.createElement("td");
      tdKey.classList.add("workout-keys");
      const tdValue = document.createElement("td");
      tdValue.classList.add("workout-values");
      const p = document.createElement("p");
      p.textContent = workoutKeyMap[key];
      const textNode = document.createTextNode(`${summary[key]}`);
      tdKey.appendChild(p);
      tdValue.appendChild(textNode);

      tr.appendChild(tdKey);
      tr.appendChild(tdValue);
      workoutTable.append(tr);

      container.appendChild(workoutTable);
  });
//   Object.keys(summary).forEach(key => {
//     const p = document.createElement("p");
//     const strong = document.createElement("strong");

//     strong.textContent = workoutKeyMap[key];
//     const textNode = document.createTextNode(`: ${summary[key]}`);

//     p.appendChild(strong);
//     p.appendChild(textNode);

//     container.appendChild(p);
//   });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
