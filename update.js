const sql = require("mssql");
const poolPromise = require("./connexion");
const { contracts, billings } = require("./data");

const updateTables = async (contracts, billings) => {
  const pool = await poolPromise;
  try {
    const request = new sql.Request(pool);

    for (const contract of contracts) {
      await request.query(`
            UPDATE Contract
            SET
            vehicle_uid = '${contract.vehicle_uid}',
            customer_uid = '${contract.customer_uid}',
            sign_datetime = '${contract.sign_datetime}',
            loc_begin_datetime = '${contract.loc_begin_datetime}',
            loc_end_datetime = '${contract.loc_end_datetime}',
            returning_datetime = ${
              contract.returning_datetime
                ? `'${contract.returning_datetime}'`
                : "NULL"
            },
            price = ${contract.price}
            WHERE vehicle_uid = '${contract.vehicle_uid}'
            `);
      console.log(
        `Contract with ID ${contract.vehicle_uid} updated successfully`
      );
    }
    for (const billing of billings) {
      await request.query(`
            UPDATE Billing
            SET
              contract_id = '${billing.contract_id}',
              amount = '${billing.amount}'
            WHERE contract_id = '${billing.contract_id}'
          `);
      console.log(`Billing with ID ${billing.id} updated successfully`);
    }
  } catch (err) {
    console.error("Error updating contracts:", err);
  } finally {
    await pool.close();
  }
};

updateTables(contracts, billings);
