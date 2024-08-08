const connectToMongoDB = require("./connexion_mongodb");
const { customers, vehicles } = require("./data_mongodb.json");

const updateData = async () => {
  let client;

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.MONGO_DATABASE);

    // Mettre à jour les données des clients
    if (customers?.length > 0) {
      for (const customer of customers) {
        const filter = { uid: customer.uid }; //Recherche tous les documents ou uid=customer.uid
        const update = {
          $set: customer, // spécifie comment modifier les documents
        };

        const result = await db
          .collection("Customer")
          .updateOne(filter, update); // mise à jour avec l'opérateur set des documents filtrés
        if (result.modifiedCount > 0) {
          console.log(`Customer with uid ${customer.uid} updated successfully`);
        } else {
          console.log(
            `No changes made for customer with uid ${customer.uid} (may not exist)`
          );
        }
      }
    }

    // Mettre à jour les données des véhicules
    if (vehicles?.length > 0) {
      for (const vehicle of vehicles) {
        const filter = { uid: vehicle.uid };
        const update = {
          $set: vehicle,
        };

        // Mettre à jour uniquement si le document existe
        const result = await db.collection("Vehicle").updateOne(filter, update);
        if (result.modifiedCount > 0) {
          console.log(`Vehicle with uid ${vehicle.uid} updated successfully`);
        } else {
          console.log(
            `No changes made for vehicle with uid ${vehicle.uid} (may not exist)`
          );
        }
      }
    }
  } catch (err) {
    console.error("Error updating data:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

updateData();
