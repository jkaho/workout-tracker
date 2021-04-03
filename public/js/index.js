init();

async function init() {
  // Calls getLastWorkout() function if 'Continue Workout' button is clicked
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      document.querySelector("#new-btn").setAttribute(
          "style", "width: 50%; margin: 0 20px 20px 10px;"
        );
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
      document.querySelector("#new-btn").setAttribute(
          "style", "width: 100%;  margin: 10px 20px;"
        );
    }
  }
}

