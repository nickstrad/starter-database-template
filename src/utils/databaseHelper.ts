import { Client } from "pg";
import { User } from "./types.ts";

export default async function ({
  user,
  password,
  host,
  port,
  database,
}: {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}) {
  const client = new Client({
    user,
    password,
    host,
    port,
    database,
  });

  await client.connect();

  async function createUser(user: User): Promise<User | undefined> {
    try {
      const values = [user.username, user.email];
      const res = await client.query(
        `
      INSERT INTO users (
        username,
        email
    ) VALUES 
    ($1, $2) RETURNING *
    `,
        values
      );

      const rows: User[] = res.rows;
      return rows[0];
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }

  async function getUsers() {
    try {
      const res = await client.query("select * from users;");
      const rows: User[] = res.rows;
      return rows;
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }
  return {
    createUser,
    getUsers,
  };
}
