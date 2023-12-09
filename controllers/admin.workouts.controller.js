const Workout = require("../models/workout.model");
const User = require("../models/user.model");

async function getWorkouts(req, res, next) {
  let workouts;
  let admin;

  try {
    workouts = await Workout.getAllWorkouts();
    admin = await User.getUserByID(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  res.render("admin/workouts-collection", {
    workouts: JSON.stringify(workouts),
    admin: admin,
  });
}

async function addWorkout(req, res, next) {
  const workoutName = req.body.name;
  let workout = new Workout(workoutName);

  try {
    const insertResult = await workout.save();
    const workoutID = insertResult.insertedId.toString();
    workout = await Workout.getWorkoutByID(workoutID);
  } catch (error) {
    return next(error);
  }

  res.json({
    addedWorkout: workout,
  });
}

async function updateWorkout(req, res, next) {
  const workoutID = req.params.id;
  const workoutName = req.body.name;

  let workout;
  try {
    workout = await Workout.getWorkoutByID(workoutID);
    workout.name = workoutName;
    await workout.save();
  } catch (error) {
    return next(error);
  }

  res.json({
    updatedWorkout: workout,
  });
}

async function deleteWorkout(req, res, next) {
  const workoutID = req.params.id;

  let workout;
  try {
    workout = await Workout.getWorkoutByID(workoutID);
    await workout.delete();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

module.exports = {
  getWorkouts: getWorkouts,
  addWorkout: addWorkout,
  updateWorkout: updateWorkout,
  deleteWorkout: deleteWorkout,
};
