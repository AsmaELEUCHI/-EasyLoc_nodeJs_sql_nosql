// mongodb/connexion_mongodb.js
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Charger les variables d'environnement

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    console.log("MongoDB connected successfully");
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connectToMongoDB;
