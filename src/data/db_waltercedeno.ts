import { DataSource } from "typeorm";
import { URL } from "url";

const dbUrl = new URL(process.env.DATABASE_URL || "");
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
});
export default AppDataSource;

import "reflect-metadata"
// import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: "cockroachdb",
//     url: process.env.DATABASE_URL, 
//     /*ssl: { rejectUnauthorized: false }, // For insecure connections only */
//     ssl: true,
//     extra: {
//         options: "--cluster=<routing-id>"
//     },
//     synchronize: true,
//     logging: false,
//     entities: ["src/entity/**/*.ts"],
//     migrations: ["src/migration/**/*.ts"],
//     subscribers: ["src/subscriber/**/*.ts"],
// })