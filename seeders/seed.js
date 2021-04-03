let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let workoutSeed = [
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 10)),
    day: "20210323T064500+1100",
    exercises: [
      {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weight: 30,
        reps: 15,
        sets: 5
      },
      {
        type: "resistance",
        name: "Free Weights",
        duration: 10,
        weight: 15,
        reps: 20,
        sets: 2
      }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 9)),
    day: "20210323T064500+1100",
    exercises: [
      {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weight: 55,
        reps: 10,
        sets: 5
      }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 8)),
    day: "20210324T124500+1100",
    exercises: [
      {
        type: "resistance",
        name: "Push Press",
        duration: 25,
        weight: 25,
        reps: 8,
        sets: 4
      }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 7)),
    day: "20210326T120500+1100",
    exercises: [
      {
        type: "cardio",
        name: "Running",
        duration: 25,
        distance: 5
      }, 
      {
        type: "resistance",
        name: "Free Weights",
        duration: 20,
        weight: 10,
        reps: 5,
        sets: 3
      },
      {
        type: "cardio",
        name: "Running",
        duration: 60,
        distance: 10
      }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 6)),
    day: "20210327T145500+1100",
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 65,
        reps: 10,
        sets: 4
      }, 
      {
        type: "resistance",
        name: "Resistance Bands",
        duration: 15,
        weight: 4,
        reps: 20,
        sets: 5
      }, 
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 5)),
    day: "20210328T103000+1100",
    exercises: [
        {
          type: "cardio",
          name: "Running",
          duration: 45,
          distance: 8
        },
        {
          type: "cardio",
          name: "Power-walking",
          duration: 25,
          distance: 3
        },
        {
          type: "cardio",
          name: "Walking",
          duration: 35,
          distance: 3
        }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 5)),
    day: "20210401T081500+1100",
    exercises: [
      {
        type: "resistance",
        name: "Quad Press",
        duration: 45,
        weight: 105,
        reps: 10,
        sets: 4
      },
      {
        type: "cardio",
        name: "Walking",
        duration: 60,
        distance: 5
      }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 3)),
    day: "20210403T073500+1100",
    exercises: [
      {
        type: "cardio",
        name: "Running",
        duration: 65,
        distance: 12
      }
    ]
  },
  {
    // day: new Date(new Date().setDate(new Date().getDate() - 2)),
    day: "20210403T201500+1100",
    exercises: [
      {
        type: "resistance",
        name: "Military Press",
        duration: 30,
        weight: 20,
        reps: 10,
        sets: 4
      }, 
      {
        type: "resistance",
        name: "Resistance Bands",
        duration: 15,
        weight: 4,
        reps: 20,
        sets: 5
      }
    ]
  }
];

db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
