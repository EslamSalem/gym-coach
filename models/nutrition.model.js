const mongodb = require("mongodb");

const db = require("../data/database");

class Nutrition {
  constructor(name, meals = [], _id) {
    this.name = name;
    this.meals = meals;
    if (_id) {
      this.id = _id.toString();
    }
  }

  static async getAllNutrition() {
    const nutritionDocuments = await db
      .getDB()
      .collection("nutrition")
      .find()
      .toArray();

    return nutritionDocuments.map(function (nutritionDocument) {
      return new Nutrition(
        nutritionDocument.name,
        nutritionDocument.meals,
        nutritionDocument._id
      );
    });
  }

  static async getNutritionByID(id) {
    const nutritionID = new mongodb.ObjectId(id);

    const nutritionDocument = await db
      .getDB()
      .collection("nutrition")
      .findOne({ _id: nutritionID });

    if (nutritionDocument) {
      return new Nutrition(
        nutritionDocument.name,
        nutritionDocument.meals,
        nutritionDocument._id
      );
    } else {
      return null;
    }
  }

  save() {
    if (this.id) {
      const nutritionID = new mongodb.ObjectId(this.id);
      return db
        .getDB()
        .collection("nutrition")
        .updateOne(
          { _id: nutritionID },
          { $set: { name: this.name, meals: this.meals } }
        );
    } else {
      return db.getDB().collection("nutrition").insertOne({ name: this.name });
    }
  }

  delete() {
    const nutritionID = new mongodb.ObjectId(this.id);
    return db.getDB().collection("nutrition").deleteOne({ _id: nutritionID });
  }
}

module.exports = Nutrition;
