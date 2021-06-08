const router = require("express").Router();
// Import workout model
const Workout  = require("../models/workout");

// GET last workout

router.get("/api/workouts", (req, res) => {
	Workout.find({})
		.then(dbWorkout => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).res.json(err);
		});
});

// ADD exercise

router.put("/api/workouts/:id", ({ params, body }, res) => {
  console.log("p", params, body);

  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).res.json(err);
    });
});

// CREATE workout

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).res.json(err);
    });
});

// GET workout in range

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Export API routes
module.exports = router;