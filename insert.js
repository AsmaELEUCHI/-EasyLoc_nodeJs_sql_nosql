const sql = require("mssql");
const poolPromise = require("./connexion");
const { contracts, billings } = require("./data");

const insertData = async () => {
  const pool = await poolPromise;

  try {
    const request = new sql.Request(pool);
    for (const contract of contracts) {
      const result = await request.query(`
        SELECT 1 FROM Contract WHERE vehicle_uid='${contract.vehicle_uid}' 
      `);
      if (result.recordset.length === 0) {
        await request.query(`
                INSERT INTO Contract (vehicle_uid, customer_uid, sign_datetime, loc_begin_datetime, loc_end_datetime, returning_datetime, price)
                VALUES ('${contract.vehicle_uid}', '${
          contract.customer_uid
        }', '${contract.sign_datetime}', '${contract.loc_begin_datetime}', '${
          contract.loc_end_datetime
        }', ${
          contract.returning_datetime
            ? `'${contract.returning_datetime}'`
            : "NULL"
        }, ${contract.price})
                            `);
        console.log(`Contract with ID ${contract.id} inserted successfully`);
      } else {
        console.log(`Contract with ID ${contract.id} already exists`);
      }
    }

    for (const billing of billings) {
      const result = await request.query(`
            SELECT 1 FROM billing WHERE contract_id= ${billing.contract_id}
            `);
      if (result.recordset.length === 0) {
        await request.query(`
                INSERT INTO billing (contract_id, amount)
                VALUES (${billing.contract_id}, ${billing.amount})
                `);
        console.log(`Billing with ID ${billing.id} inserted successfully`);
      } else {
        console.log(`Billing with ID ${billing.id} already exists`);
      }
    }
  } catch (err) {
    console.error("Error inserting:", err);
  } finally {
    pool.close();
  }
};

insertData();
