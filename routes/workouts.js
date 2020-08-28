const router = require('express').Router();
const Workout = require('../models/workouts');

router.route('/').get((req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const reps = Number(req.body.reps);
  const sets = Number(req.body.sets);
  const distance = Number(req.body.distance);
  const date = Date.parse(req.body.date);



  const newWorkout = new Workout({
    username,
    description,
    duration,
    reps,
    sets,
    distance,
    date,
  });

  newWorkout.save()
  .then(() => res.json('Workout added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Workout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
Workout.findByIdAndDelete(req.params.id)
    .then(() => res.json('Workout deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
Workout.findById(req.params.id)
    .then(workout => {
      workout.username = req.body.username;
      workout.description = req.body.description;
      workout.duration = Number(req.body.duration);
      workout.reps = Number(req.body.reps);
      workout.sets = Number(req.body.sets);
      workout.distance = Number(req.body.distance);
      workout.date = Date.parse(req.body.date);

    workout.save()
        .then(() => res.json('Workout updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;