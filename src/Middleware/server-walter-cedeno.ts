import express, { Application } from "express";
import cors from "cors";
import AppDataSource from "../data/db_waltercedeno";
import organizationRouter from "../presenters/route-organizacion";


class ServerWalterCedeno {
  public app: Application;
  private port: String;
  private enpointPath = { organization: '/api/organization' }
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "9096";
    this.middlewares();
    this.dbConnection();
    this.routes();
  }
  routes() {
    this.app.use(this.enpointPath.organization, organizationRouter)
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  async dbConnection() {
    try {
      AppDataSource.initialize()
        .then(async () => console.log("Conectado con exito.!!"))
        .catch((error) => console.log(error));
    } catch (error) {
      //throw new Error(error || undefined);
    }
  }
  listen() {
    this.app.listen(this.port, () =>
      console.log(
        "Servidor iniciado puerto donde esta corriendo es " + this.port
      )
    );
  }

}
export default ServerWalterCedeno;
