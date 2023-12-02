const Workout = require("../models/workout.model");
const Log = require("../models/log.model");

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

module.exports = {
  getLogs: getLogs,
  addLog: addLog,
  deleteLog: deleteLog,
  getUpdateLogs: getUpdateLogs,
  updateLog: updateLog,
};
