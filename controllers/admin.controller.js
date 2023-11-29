const Workout = require("../models/workout.model");
const Nutrition = require("../models/nutrition.model");

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
    await workout.delete();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

async function getNutrition(req, res, next) {
  let nutrition;
  try {
    nutrition = await Nutrition.getAllNutrition();
  } catch (error) {
    return next(error);
  }

  res.render("admin/manage-nutrition", {
    nutrition: JSON.stringify(nutrition),
  });
}

async function addNutrition(req, res, next) {
  const nutritionName = req.body.name;
  let nutrition = new Nutrition(nutritionName);

  try {
    const insertResult = await nutrition.save();
    const nutritionID = insertResult.insertedId.toString();
    nutrition = await Nutrition.getNutritionByID(nutritionID);
  } catch (error) {
    return next(error);
  }

  res.json({
    addedNutrition: nutrition,
  });
}

async function deleteNutrition(req, res, next) {
  const nutritionID = req.params.id;

  let nutrition;
  try {
    nutrition = await Nutrition.getNutritionByID(nutritionID);
    await nutrition.delete();
  } catch (error) {
    return next(error);
  }

  res.json({});
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
  addNutrition: addNutrition,
  deleteNutrition: deleteNutrition,
  getUpdateLogs: getUpdateLogs,
  getUpdateNutrition: getUpdateNutrition,
};
