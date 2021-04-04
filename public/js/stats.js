function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durations = data.map(({ totalDuration }) => totalDuration);
  let dates = data.map(({ day }) => moment(day).format("DD-MM-YY HH:mm"));
  let pounds = calculateTotalWeight(data);
//   let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let pie = document.querySelector('#canvas2').getContext('2d');
  let bar = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

//   const daysOfWeek = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];

/*
    I didn't use the days of the week as labels for the line graph and bar chart
    as I felt that it would be more useful to label the x-axis with the full date
    of the workout 
*/

//   const labels = data.map(({ day }) => {
//     const date = new Date(day);
//     return daysOfWeek[date.getDay()];
//   });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Workout Duration in Minutes',
          backgroundColor: 'rgb(184, 209, 115)',
          borderColor: 'rgb(184, 209, 115)',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'LINE GRAPH',
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Kilograms',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'BAR CHART',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Workout Duration in Minutes',
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'PIE CHART',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Kilograms Lifted',
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'DOUGHNUT CHART',
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

API.getWorkoutsInRange().then(populateChart);

/* 
    The following function doesn't make sense -> it's taking the exercise names of each workout
    which were then being applied as labels to the total duration (pie chart) and weight lifted (doughnut chart) of each workout 
    (There can be multiple exercises in a workout)
*/

// function workoutNames(data) {
//   let workouts = [];

//   data.forEach(workout => {
//     workout.exercises.forEach(exercise => {
//       workouts.push(exercise.name);
//     });
//   });

//   // return de-duplicated array with JavaScript `Set` object
//   return [...new Set(workouts)];
// }

// get all workout data from back-end
