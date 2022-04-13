const mysql = require("mysql2/promise");
const config = require("../config/db.config.js");

// Create a connection to the database
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
// const pool = createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
// });
// // Open mysql connection
// pool.connect((err) => {
//   if (err) {
//     console.log("Error connecting to Db");
//     return;
//   }
//   console.log("Connection established");
// });

// module.exports = pool;
