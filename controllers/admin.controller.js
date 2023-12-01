const Workout = require("../models/workout.model");
const Nutrition = require("../models/nutrition.model");
const Log = require("../models/log.model");

function getUsers(req, res, next) {
  res.render("admin/manage-users");
}

async function getLogs(req, res, next) {
  let logs;
  try {
    logs = await Log.getAllLogs();
  } catch (error) {
    return next(error);
  }
  res.render("admin/manage-logs", {
    logs: JSON.stringify(logs),
  });
}

async function addLog(req, res, next) {
  const logName = req.body.name;
  let log = new Log(logName);

  try {
    const insertResult = await log.save();
    const logID = insertResult.insertedId.toString();
    log = await Log.getLogByID(logID);
  } catch (error) {
    return next(error);
  }

  res.json({
    addedLog: log,
  });
}

async function deleteLog(req, res, next) {
  const logID = req.params.id;

  let log;
  try {
    log = await Log.getLogByID(logID);
    await log.delete();
  } catch (error) {
    return next(error);
  }

  res.json({});
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

async function getUpdateLogs(req, res, next) {
  const logID = req.params.id;

  let log;
  let workouts;
  try {
    log = await Log.getLogByID(logID);
    workouts = await Workout.getAllWorkouts();
  } catch (error) {
    return next(error);
  }
  res.render("admin/update-logs", {
    log: JSON.stringify(log),
    workouts: JSON.stringify(workouts),
  });
}

async function updateLog(req, res, next) {
  const logID = req.params.id;

  let log;
  try {
    log = await Log.getLogByID(logID);
    log.name = req.body.name;
    log.exercises = req.body.exercises;
    await log.save();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

async function getUpdateNutrition(req, res, next) {
  const nutritionID = req.params.id;

  let nutrition;
  try {
    nutrition = await Nutrition.getNutritionByID(nutritionID);
  } catch (error) {
    return next(error);
  }
  res.render("admin/update-nutrition", {
    nutrition: JSON.stringify(nutrition),
  });
}

async function updateNutrition(req, res, next) {
  const nutritionID = req.params.id;

  let nutrition;
  try {
    nutrition = await Nutrition.getNutritionByID(nutritionID);
    nutrition.name = req.body.name;
    nutrition.meals = req.body.meals;
    await nutrition.save();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

module.exports = {
  getUsers: getUsers,
  getLogs: getLogs,
  addLog: addLog,
  deleteLog: deleteLog,
  getWorkouts: getWorkouts,
  addWorkout: addWorkout,
  updateWorkout: updateWorkout,
  deleteWorkout: deleteWorkout,
  getNutrition: getNutrition,
  addNutrition: addNutrition,
  deleteNutrition: deleteNutrition,
  getUpdateLogs: getUpdateLogs,
  updateLog: updateLog,
  getUpdateNutrition: getUpdateNutrition,
  updateNutrition: updateNutrition,
};
