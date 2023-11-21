const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const db = require("../data/database");

class User {
  constructor(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.phone = userData.phone;
    if (userData._id) {
      this.id = userData._id.toString();
    }
    if (userData.hasAccess) {
      this.hasAccess = userData.hasAccess;
    }
    if (userData.isAdmin) {
      this.isAdmin = userData.isAdmin;
    }
  }

  static async getAllUsers() {
    const userDocuments = await db
      .getDB()
      .collection("users")
      .find({ isAdmin: { $exists: false } })
      .toArray();

    return userDocuments.map(function (userDocument) {
      return new User(userDocument);
    });
  }

  static async getUserByID(id) {
    const userID = new mongodb.ObjectId(id);

    const userDocument = await db
      .getDB()
      .collection("users")
      .findOne({ _id: userID });

    if (userDocument) {
      return new User(userDocument);
    } else return null;
  }

  static async getUserByEmail(email) {
    const userDocument = await db
      .getDB()
      .collection("users")
      .findOne({ email: email });

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
