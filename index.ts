import dotenv from "dotenv";
import ServerWalterCedeno from "./src/Middleware/server-walter-cedeno";
import "reflect-metadata";
dotenv.config();
const serverWalterCedeno = new ServerWalterCedeno();
//inicia el escuchando el servicio
serverWalterCedeno.listen();
