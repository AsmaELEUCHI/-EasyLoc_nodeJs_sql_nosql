const sql = require("mssql");
const poolPromise = require("./connexion");

const deleteBillingByContractId = async (contractId) => {
  if (!contractId) {
    console.log("No contractId provided for deleting billings.");
    return;
  }

  const pool = await poolPromise;
  try {
    const request = new sql.Request(pool);

    // Supprimer les enregistrements de Billing associés au contrat
    await request.query(`
      DELETE FROM Billing
      WHERE contract_id = ${contractId}
    `);
    console.log(`Billings with contract_id ${contractId} deleted successfully`);
  } catch (err) {
    console.error("Error deleting billings:", err);
  } finally {
    await pool.close();
  }
};

const deleteContractById = async (contractId) => {
  if (!contractId) {
    console.log("No contractId provided for deleting contract.");
    return;
  }

  const pool = await poolPromise;
  try {
    const request = new sql.Request(pool);

    // Supprimer le contrat
    await request.query(`
      DELETE FROM Contract
      WHERE id = ${contractId}
    `);
    console.log(`Contract with ID ${contractId} deleted successfully`);
  } catch (err) {
    console.error("Error deleting contract:", err);
  } finally {
    await pool.close();
  }
};

// Préparer la commande sans exécuter les suppressions
const contractIdToDelete = null;

console.log(
  "Prepared delete commands without executing them. To execute the deletions, call the functions deleteBillingByContractId(contractIdToDelete) and deleteContractById(contractIdToDelete) with a valid contract ID."
);
