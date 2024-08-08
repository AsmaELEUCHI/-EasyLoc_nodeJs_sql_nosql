const sql = require("mssql");
const poolPromise = require("./connexion");

// Lister tous les contrats associés à un customer_uid
const getContractsByCustomerUid = async (customer_uid) => {
  const pool = await poolPromise;
  try {
    const request = new sql.Request(pool);
    const result = await request.query(`
            SELECT *
            FROM Contract
            WHERE customer_uid = '${customer_uid}'
        `);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching contracts by customer UID:", err);
    throw err;
  } finally {
    await pool.close();
  }
};

// Lister les locations en cours associées à un customer_uid

const getCurrentRentalsByCustomerUid = async (customer_uid) => {
  try {
    const pool = await poolPromise;
    const request = new sql.Request(pool);
    const result = await request.query(`
        SELECT *
        FROM Contract
        WHERE customer_uid='${customer_uid}' AND GETDATE() BETWEEN loc_begin_datetime AND loc_end_datetime
        `);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching current rentals by customer UID:", err);
    throw err;
  }
};

// Lister toutes les locations en retard

const getLateRentals = async () => {
  try {
    const pool = await poolPromise;
    const request = new sql.Request(pool);
    const result = await request.query(`
            SELECT *
            FROM Contract 
            WHERE returning_datetime IS NOT NULL AND DATEADD (hour, 1, loc_end_datetime) < returning_datetime
            `);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching current rentals by customer UID:", err);
    throw err;
  }
};

const getPaymentsByContractId = async (contract_id) => {
  try {
    const pool = await poolPromise;
    const request = new sql.Request(pool);
    const result = await request.query(`
            SELECT * 
                FROM Billing 
                WHERE contract_id = ${contract_id}
                `);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching payments by contract ID:", err);
    throw err;
  }
};

// Vérifier qu'une location a été intégralement payée
const isContractFullyPaid = async (contract_id) => {
  try {
    const pool = await poolPromise;
    const request = new sql.Request(pool);
    const result = await request.query(`
        SELECT CASE 
          WHEN (SELECT amount FROM Billing WHERE contract_id = ${contract_id}) >= 
               (SELECT price FROM Contract WHERE id = ${contract_id})
          THEN 'Yes'
          ELSE 'No'
        END AS FullyPaid
      `);
    console.log(result.recordset);
    return result.recordset[0].FullyPaid === "Yes";
  } catch (err) {
    console.error("Error checking if contract is fully paid:", err);
    throw err;
  }
};
// Lister toutes les locations impayées totalement

const getUnpaidContracts = async () => {
  try {
    const pool = await poolPromise;
    const request = new sql.Request(pool);
    const result = await request.query(`
        SELECT c.*, b.amount
FROM Contract c
JOIN Billing b ON c.id = b.contract_id
WHERE b.amount < c.price;
    `);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error checking if contract is fully paid:", err);
    throw err;
  }
};
getUnpaidContracts();
