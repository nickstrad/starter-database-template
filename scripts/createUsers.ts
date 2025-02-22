import DatabaseHelper from "@/utils/databaseHelper";
import * as dotenv from "dotenv";
dotenv.config();

if (
  typeof process.env.DB_USER === "undefined" ||
  typeof process.env.DB_PASSWORD === "undefined" ||
  typeof process.env.DB_HOST === "undefined" ||
  typeof process.env.DB_PORT === "undefined" ||
  typeof process.env.DB_NAME === "undefined"
) {
  console.error(
    "Set 'DB_USER','DB_PASSWORD','DB_HOST','DB_PORT', and 'DB_NAME'"
  );
  process.exit(1);
}
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
};

const run = async (n = 1) => {
  const { createUser } = await DatabaseHelper(dbConfig);
  for (let i = 0; i < n; i++) {
    const name = `user${Date.now().toString()}-${i}`;
    const user = await createUser({
      username: name,
      email: `${name}@email.com`,
    });
    console.log(user);
  }
};

run()
  .then(() => {
    console.log("done");
  })
  .catch((err) => console.error(err))
  .finally(() => process.exit());
