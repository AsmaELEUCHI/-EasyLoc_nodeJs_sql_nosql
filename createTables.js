const sql = require("mssql");
const poolPromise = require("./connexion");

const createTables = async () => {
  const pool = await poolPromise; // Obtenez une instance du pool
  const request = new sql.Request(pool); // Créez une demande liée au pool de connexions

  try {
    // Création de la table Contract
    await request.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Contract' AND xtype='U')
      CREATE TABLE Contract (
        id INT IDENTITY(1,1) PRIMARY KEY,
        vehicle_uid CHAR(255),
        customer_uid CHAR(255),
        sign_datetime DATETIME,
        loc_begin_datetime DATETIME,
        loc_end_datetime DATETIME,
        returning_datetime DATETIME,
        price MONEY
      )
    `);

    // Création de la table Billing
    await request.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Billing' AND xtype='U')
      CREATE TABLE Billing (
        id INT IDENTITY(1,1) PRIMARY KEY,
        contract_id INT,
        amount MONEY,
        FOREIGN KEY (contract_id) REFERENCES Contract(id)
      )
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    pool.close(); // Fermez le pool de connexions
  }
};

createTables();
