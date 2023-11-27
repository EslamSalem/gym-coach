const Workout = require("../models/workout.model");

function getUsers(req, res, next) {
  res.render("admin/manage-users");
}

function getLogs(req, res, next) {
  res.render("admin/manage-logs");
}

async function getWorkouts(req, res, next) {
  let workouts;
  try {
    workouts = await Workout.getAllWorkouts();
  } catch (error) {
    return next(error);
  }

  res.render("admin/workouts-collection", {
    workouts: JSON.stringify(workouts),
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
    workout.delete();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

function getNutrition(req, res, next) {
  res.render("admin/manage-nutrition");
}

function getUpdateLogs(req, res, next) {
  res.render("admin/update-logs");
}

function getUpdateNutrition(req, res, next) {
  res.render("admin/update-nutrition");
}

module.exports = {
  getUsers: getUsers,
  getLogs: getLogs,
  getWorkouts: getWorkouts,
  addWorkout: addWorkout,
  updateWorkout: updateWorkout,
  deleteWorkout: deleteWorkout,
  getNutrition: getNutrition,
  getUpdateLogs: getUpdateLogs,
  getUpdateNutrition: getUpdateNutrition,
};
