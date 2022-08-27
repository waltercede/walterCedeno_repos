import express, { Application } from "express";
import cors from "cors";
import AppDataSource from "../data/db_waltercedeno";
class ServerWalterCedeno {
  private app: Application;
  private port: String;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "9095";
    this.dbConnection();
    this.middlewares();
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
  // routes(){
  //   this.app.use(this.apipaths.usuarios,useRoutes)
  // }
}
export default ServerWalterCedeno;
