const connectToMongoDB = require("./connexion_mongodb");

// Rechercher un client avec le nom et prénom spécifiés
const searchCustomerByName = async (firstName, lastName) => {
  let client;

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.MONGO_DATABASE);

    const customer = await db.collection("Customer").findOne({
      first_name: firstName,
      second_name: lastName,
    });

    if (customer) {
      console.log("Customer found:", customer);
    } else {
      console.log("No customer found with the given name and surname.");
    }
  } catch (err) {
    console.error("Error searching for customer:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// Exemple d'appel de la fonction
const first_name = "Asma";
const second_name = "Eleuchi";
searchCustomerByName(first_name, second_name);

// Rechercher un véhicule à partir de son numéro d’immatriculation
const searchVehicleByLicensePlate = async (licensePlate) => {
  let client;

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.MONGO_DATABASE);

    // Rechercher un véhicule avec le numéro d'immatriculation spécifié
    const vehicle = await db.collection("Vehicle").findOne({
      licence_plate: licensePlate,
    });

    if (vehicle) {
      console.log("Vehicle found:", vehicle);
    } else {
      console.log("No vehicle found with the given license plate.");
    }
  } catch (err) {
    console.error("Error searching for vehicle:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

const licence_plate = "ABC5642";
searchVehicleByLicensePlate(licence_plate);

// Compter les véhicules ayant plus (respectivement moins) d’un certain kilométrage

const countVehiclesByMileage = async (operator, mileage) => {
  let client;

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.MONGO_DATABASE);

    let filter;
    if (operator === "greater") {
      filter = { km: { $gt: mileage } };
    } else if (operator === "less") {
      filter = { km: { $lt: mileage } };
    } else {
      throw new Error("Invalid operator. Use 'greater' or 'less'.");
    }

    // Compter les véhicules correspondant au filtre
    const count = await db.collection("Vehicle").countDocuments(filter);

    console.log(
      `Number of vehicles with mileage ${operator} than ${mileage}: ${count}`
    );
  } catch (err) {
    console.error("Error counting vehicles by mileage:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// Exemple d'appel de la fonction
const operator = "greater";
const km = 10000;
countVehiclesByMileage(operator, km);
