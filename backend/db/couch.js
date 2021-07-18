const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const nano = require("nano")
  ("http://"+db_username+":"+db_password+"@localhost:5984");

const db = nano.db.use("jonbox");

// async function createDB() {
//   try {
//     let response = await nano.db.create("jonbox")
//     console.log(response)
//   } catch (e) {
//     console.error(e)
//   }
// }

async function testing() {
  let test = await db.get("test");
  if (!test) {
    test = await db.insert({ happy: true });
  }
  return test;
}

// async function createLobby(code) {
//   return await db.insert({ code: code, lobby: true });
// }

// async function getLobby(code) {
//   return await db.get(code);
// }

// module.exports = {
//   createDB,
//   testing,
//   createLobby,
//   getLobby
// };
//testing();
  // let test = db.get("test");

module.exports = db;
