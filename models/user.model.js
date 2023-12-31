const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const db = require("../data/database");

const Log = require("../models/log.model");
const Nutrition = require("../models/nutrition.model");

class User {
  constructor(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.phone = userData.phone;
    this.image = userData.image;
    this.imagePath = `public/images/profile-pictures/${userData.image}`;
    this.imageURL = `/images/profile-pictures/${userData.image}`;

    if (userData._id) {
      this.id = userData._id.toString();
    }

    if (userData.expiryDate) {
      this.expiryDate = userData.expiryDate;
    }

    if (userData.hasAccess) {
      this.hasAccess = userData.hasAccess;
    }

    if (userData.isAdmin) {
      this.isAdmin = userData.isAdmin;
    }

    this.logs = [];
    if (userData.logRefs) {
      for (const ref of userData.logRefs) {
        if (ref) {
          this.logs.push(ref);
        }
      }
    }

    if (userData.nutritionRef) {
      this.nutrition = userData.nutritionRef;
    }
  }

  static async getAllUsers() {
    const userDocuments = await db
      .getDB()
      .collection("users")
      .find({ isAdmin: { $exists: false } })
      .toArray();

    return Promise.all(
      userDocuments.map(async function (userDocument) {
        if (userDocument.logRefs) {
          userDocument.logRefs = await Promise.all(
            userDocument.logRefs.map(async function (logRef) {
              const log = await Log.getLogByID(logRef);
              return log;
            })
          );
        }

        if (userDocument.nutritionRef) {
          const nutrition = await Nutrition.getNutritionByID(
            userDocument.nutritionRef
          );
          userDocument.nutritionRef = nutrition;
        }

        return new User(userDocument);
      })
    );
  }

  static async getUserByID(id) {
    const userID = new mongodb.ObjectId(id);

    const userDocument = await db
      .getDB()
      .collection("users")
      .findOne({ _id: userID });

    if (userDocument && userDocument.logRefs) {
      userDocument.logRefs = await Promise.all(
        userDocument.logRefs.map(async function (logRef) {
          const log = await Log.getLogByID(logRef);
          return log;
        })
      );
    }

    if (userDocument && userDocument.nutritionRef) {
      const nutrition = await Nutrition.getNutritionByID(
        userDocument.nutritionRef
      );
      userDocument.nutritionRef = nutrition;
    }

    if (userDocument) {
      return new User(userDocument);
    } else return null;
  }

  updateInfo() {
    const userID = new mongodb.ObjectId(this.id);

    return db
      .getDB()
      .collection("users")
      .updateOne(
        { _id: userID },
        { $set: { name: this.name, image: this.image } }
      );
  }

  updateLogs() {
    const userID = new mongodb.ObjectId(this.id);

    const logRefs = [];
    for (const log of this.logs) {
      logRefs.push(log.id);
    }

    return db
      .getDB()
      .collection("users")
      .updateOne({ _id: userID }, { $set: { logRefs: logRefs } });
  }

  updateNutrition() {
    const userID = new mongodb.ObjectId(this.id);

    let nutritionRef = null;
    if (this.nutrition) {
      nutritionRef = this.nutrition.id;
    }

    return db
      .getDB()
      .collection("users")
      .updateOne({ _id: userID }, { $set: { nutritionRef: nutritionRef } });
  }

  saveAccess() {
    const userID = new mongodb.ObjectId(this.id);
    return db
      .getDB()
      .collection("users")
      .updateOne(
        { _id: userID },
        { $set: { hasAccess: this.hasAccess, expiryDate: this.expiryDate } }
      );
  }

  static async getUserByEmail(email) {
    const userDocument = await db
      .getDB()
      .collection("users")
      .findOne(
        { email: email },
        { projection: { logRefs: 0, nutritionRef: 0 } }
      );

    if (userDocument) {
      return new User(userDocument);
    } else return null;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDB().collection("users").insertOne({
      name: this.name,
      email: this.email,
      password: hashedPassword,
      phone: this.phone,
      image: this.image,
    });
  }

  existsAlready() {
    return db.getDB().collection("users").findOne({ email: this.email });
  }

  passwordMatch(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }
}

module.exports = User;
