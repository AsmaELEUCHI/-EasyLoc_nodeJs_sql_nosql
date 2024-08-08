const connectToMongoDB = require("./connexion_mongodb");
const { customers, vehicles } = require("./data_mongodb.json");

const createDoc = async () => {
  let client;

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.MONGO_DATABASE);

    // Vérifier et insérer les données des clients
    if (customers?.length > 0) {
      for (const customer of customers) {
        const existingCustomer = await db
          .collection("Customer")
          .findOne({ uid: customer.uid }); // chercher un document existant
        if (!existingCustomer) {
          await db.collection("Customer").insertOne(customer);
          console.log(
            `Customer with uid ${customer.uid} inserted successfully`
          );
        } else {
          console.log(`Customer with uid ${customer.uid} already exists`);
        }
      }
    }

    // Vérifier et insérer les données des véhicules
    if (vehicles?.length > 0) {
      for (const vehicle of vehicles) {
        const existingVehicle = await db
          .collection("Vehicle")
          .findOne({ uid: vehicle.uid });
        if (!existingVehicle) {
          await db.collection("Vehicle").insertOne(vehicle);
          console.log(`Vehicle with uid ${vehicle.uid} inserted successfully`);
        } else {
          console.log(`Vehicle with uid ${vehicle.uid} already exists`);
        }
      }
    }
  } catch (err) {
    console.error("Error importing data:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

createDoc();
module.exports = createDoc;
