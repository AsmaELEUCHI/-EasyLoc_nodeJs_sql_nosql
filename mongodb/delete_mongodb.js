const connectToMongoDB = require("./connexion_mongodb");

// Fonction pour supprimer un document basé sur le nom de la collection et l'UID
const deleteData = async (collectionName, uid) => {
  let client;

  try {
    client = await connectToMongoDB();
    const db = client.db(process.env.MONGO_DATABASE);

    const filter = { uid };

    // Supprimer le document de la collection spécifiée
    const result = await db.collection(collectionName).deleteOne(filter);
    if (result.deletedCount > 0) {
      console.log(
        `Document with uid ${uid} deleted successfully from ${collectionName}`
      );
    } else {
      console.log(`No document found with uid ${uid} in ${collectionName}`);
    }
  } catch (err) {
    console.error("Error deleting data:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

// Appel direct de la fonction avec des valeurs spécifiques
const collectionName = "Vehicle";
const uid = "uuid-4";

deleteData(collectionName, uid);
