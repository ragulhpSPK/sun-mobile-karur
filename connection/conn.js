import * as mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

// export default async function dbconnect() {
//   try {
//     await mongoose.connect(MONGODB_URL);
//   } catch (err) {
//     console.log(err, "iygtkiuyt");
//   }
// }

const connection = {};

async function dbconnect() {
  if (connection.isConnected) {
    return connection;
  }

  const db = await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
  connection.isConnected = db.connections[0].readyState;
}

export default dbconnect;
