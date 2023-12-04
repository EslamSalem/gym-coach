const express = require("express");

const adminUsersController = require("../controllers/admin.users.controller");
const adminLogsController = require("../controllers/admin.logs.controller");
const adminWorkoutsController = require("../controllers/admin.workouts.controller");
const adminNutritionController = require("../controllers/admin.nutrition.controller");

const router = express.Router();

/* USERS ROUTES */

//  /admin/users

router.get("/users", adminUsersController.getUsers);

//  /admin/user/userID/updateLogs

router.patch("/users/:id/updateLogs", adminUsersController.updateUserLogs);

//  /admin/user/userID/updateLogs

router.patch("/users/:id/updateNutrition", adminUsersController.updateUserNutrition);

//  /admin/users/userID/toggleAccess

router.patch("/users/:id/toggleAccess", adminUsersController.toggleAccess);

/* LOGS ROUTES */

//  /admin/logs

router.get("/logs", adminLogsController.getLogs);

//  /admin/logs

router.post("/logs", adminLogsController.addLog);

//  /admin/logs/logID/delete

router.delete("/logs/:id/delete", adminLogsController.deleteLog);

//  /admin/logs/logID/update

router.get("/logs/:id/update", adminLogsController.getUpdateLogs);

//  /admin/logs/logID/update

router.patch("/logs/:id/update", adminLogsController.updateLog);

/* WORKOUTS ROUTES */

//  /admin/logs/workouts

router.get("/logs/workouts", adminWorkoutsController.getWorkouts);

//  /admin/logs/workouts

router.post("/logs/workouts", adminWorkoutsController.addWorkout);

//  /admin/logs/workouts/workoutID/update

router.patch("/logs/workouts/:id/update", adminWorkoutsController.updateWorkout);

//  /admin/logs/workouts/workoutID/delete

router.delete("/logs/workouts/:id/delete", adminWorkoutsController.deleteWorkout);

/* NUTRITION ROUTES */

//  /admin/nutrition

router.get("/nutrition", adminNutritionController.getNutrition);

//  /admin/nutrition

router.post("/nutrition", adminNutritionController.addNutrition);

//  /admin/nutrition/nutritionID/delete

router.delete("/nutrition/:id/delete", adminNutritionController.deleteNutrition);

//  /admin/nutrition/nutritionID/update

router.get("/nutrition/:id/update", adminNutritionController.getUpdateNutrition);

//  /admin/nutrition/nutritionID/update

router.patch("/nutrition/:id/update", adminNutritionController.updateNutrition);

module.exports = router;