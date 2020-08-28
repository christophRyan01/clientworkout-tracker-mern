const express = require('express'),
      router = express.Router();
const UserSchema = require('../models/user');

router.route('/').get((req, res) => {
  UserSchema.find()
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/create-client').post((req, res, ) => {
  
      const username = req.body.username
      const currentweight = Number(req.body.currentweight);
      const goalweight = Number(req.body.goalweight);
      const daysperweek = Number(req.body.daysperweek);
      const poundslost = Number(req.body.poundslost);
      const ontrack = Number(req.body.ontrack);

      const newUser = new UserSchema({
        username,
        currentweight,
        goalweight,
        daysperweek,
        poundslost,
        ontrack
      })

      newUser.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
  UserSchema.findById(req.params.id)
  .then(workout => res.json(workout))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
UserSchema.findByIdAndRemove(req.params.id)
  .then(() => res.json('User deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
UserSchema.findById(req.params.id) 
    .then(user => {
      user.username = req.body.username
      user.currentweight = Number(req.body.currentweight);
      user.goalweight = Number(req.body.goalweight);
      user.daysperweek = Number(req.body.daysperweek);
      user.poundslost = Number(req.body.poundslost);
      user.ontrack = req.body.ontrack;

      user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;