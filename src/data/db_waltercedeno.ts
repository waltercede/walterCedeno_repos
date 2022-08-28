import "reflect-metadata"
import { DataSource } from "typeorm"
import { Organization } from "../entities/organization";
import { Tribe } from "../entities/tribe";
import { Metrics } from "../entities/metrics";
import { Repository } from "../entities/repository";


const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: "postgresql://walter_cedeno:KnBIfozLa5_wH4gzMW5y4A@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dskiing-warthog-4524",
  ssl: true,
  extra: {
    options: "--cluster=skiing-warthog-4524"
  },
  synchronize: true,
  logging: false,
  entities: [Organization, Tribe, Repository, Metrics],
})
export default AppDataSource;

