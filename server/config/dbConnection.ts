import { createPool, createConnection } from "mysql2/promise";

interface Options {
  query: string;
  values?: any[];
}

const dbCredentials = useRuntimeConfig();

const options = {
  host: dbCredentials.mysqlHost,
  port: dbCredentials.mysqlPort,
  database: dbCredentials.mysqlDatabase,
  user: dbCredentials.mysqlUser,
  password: dbCredentials.mysqlPassword,
  timezone: "local",
};

export const executeQuery = async ({ query, values }: Options) => {
  const pool = await createPool(options);

  const [rows] = await pool.query(query, values);
  return rows;
};

export const createNewConnection = async () => {
  return createConnection(options);
};
