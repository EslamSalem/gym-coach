const mongodb = require("mongodb");

const db = require("../data/database");

const Workout = require("../models/workout.model");

class Log {
  constructor(name, exercises = [], _id) {
    this.name = name;
    this.exercises = exercises;
    if (_id) {
      this.id = _id.toString();
    }
  }

  static async getAllLogs() {
    const logDocuments = await db.getDB().collection("logs").find().toArray();

    return Promise.all(logDocuments.map(async function (logDocument) {
      let mappedExercises = [];

      if (logDocument.exercises) {
        mappedExercises = await Promise.all(logDocument.exercises.map(async function(exercise) {
          const workout = await Workout.getWorkoutByID(exercise.workoutID);

          const mappedExercise = {
            workoutID: exercise.workoutID,
            name: workout.name,
            sets: exercise.sets,
            reps: exercise.reps,
          };
          
          return mappedExercise;
        }));
      }

      return new Log(logDocument.name, mappedExercises, logDocument._id);
    }));
  }

  static async getLogByID(id) {
    const logID = new mongodb.ObjectId(id);

    const logDocument = await db
      .getDB()
      .collection("logs")
      .findOne({ _id: logID });

    let mappedExercises = [];
    if (logDocument.exercises) {
      mappedExercises = await Promise.all(logDocument.exercises.map(async function(exercise) {
        const workout = await Workout.getWorkoutByID(exercise.workoutID);
  
        const mappedExercise = {
          workoutID: exercise.workoutID,
          name: workout.name,
          sets: exercise.sets,
          reps: exercise.reps,
        };

        return mappedExercise;
      }));
    }

    if (logDocument) {
      return new Log(logDocument.name, mappedExercises, logDocument._id);
    } else {
      return null;
    }
  }

  save() {
    if (this.id) {
      const logID = new mongodb.ObjectId(this.id);
      return db
        .getDB()
        .collection("logs")
        .updateOne(
          { _id: logID },
          { $set: { name: this.name, exercises: this.exercises } }
        );
    } else {
      return db.getDB().collection("logs").insertOne({ name: this.name });
    }
  }

  delete() {
    const logID = new mongodb.ObjectId(this.id);
    return db.getDB().collection("logs").deleteOne({ _id: logID });
  }
}

module.exports = Log;