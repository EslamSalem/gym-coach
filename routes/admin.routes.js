const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/users", adminController.getUsers);  //  /admin/users

router.get("/logs", adminController.getLogs);  //  /admin/logs

router.post("/logs", adminController.addLog);  //  /admin/logs

router.delete("/logs/:id", adminController.deleteLog);  //  /admin/logs/logID

router.get("/logs/workouts", adminController.getWorkouts);  //  /admin/logs/workouts

router.post("/logs/workouts", adminController.addWorkout);  //  /admin/logs/workouts

router.patch("/logs/workouts/:id", adminController.updateWorkout);   //  /admin/logs/workouts/workoutID

router.delete("/logs/workouts/:id", adminController.deleteWorkout);   //  /admin/logs/workouts/workoutID

router.get("/nutrition", adminController.getNutrition);  //  /admin/nutrition

router.post("/nutrition", adminController.addNutrition);  //  /admin/nutrition

router.delete("/nutrition/:id", adminController.deleteNutrition);  //  /admin/nutrition/nutritionID

router.get("/logs/update", adminController.getUpdateLogs);  //  /admin/logs/update

router.get("/nutrition/update", adminController.getUpdateNutrition);  //  /admin/nutrition/update

module.exports = router;