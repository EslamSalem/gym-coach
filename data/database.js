const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDB () {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("gym-coach");
}

function getDB() {
  if (!database) {
    throw new Error("You must connect the databse first!");
  }
  return database;
}

module.exports = {
  connectToDB: connectToDB,
  getDB: getDB,
};