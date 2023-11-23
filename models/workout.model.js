const mongodb = require("mongodb");

const db = require("../data/database");

class Workout {
  constructor(name, _id) {
    this.name = name;
    if (_id) {
      this.id = _id.toString();
    }
  }

  async getAllWorkouts() {
    const workoutDocuments = await db
      .getDB()
      .collection("workouts")
      .find()
      .toArray();

    return workoutDocuments.map(function (workoutDocument) {
      return new Workout(workoutDocument.name, workoutDocument._id);
    });
  }

  async getWorkoutByID(id) {
    const workoutID = new mongodb.ObjectId(id);

    const workoutDocument = await db
      .getDB()
      .collection("workouts")
      .find({ _id: workoutID });

    if (workoutDocument) {
      return new Workout(workoutDocument.name, workoutDocument._id);
    } else {
      return null;
    }
  }

  async save() {
    if (this.id) {
      const workoutID = new mongodb.ObjectId(this.id);
      await db
        .getDB()
        .collection("workouts")
        .updateOne({ _id: workoutID }, { $set: { name: this.name } });
    } else {
      await db.getDB().collection("workouts").insertOne({ name: this.name });
    }
  }

  async delete() {
    const workoutID = new mongodb.ObjectId(this.id);
    await db.getDB().collection("workouts").deleteOne({ _id: workoutID });
  }
}

module.exports = Workout;
