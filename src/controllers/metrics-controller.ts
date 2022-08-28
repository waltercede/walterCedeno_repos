import { Request, Response } from "express"
import { serviceMock } from "../../server-mock/api-mock";
import { VerificateCode } from "../entities/verificate-code";
import { ResponseValue } from "../helpers/response-value";

//• Consulta para filtrar los repositorios por fecha, estado y porcentaje.
export const metricsAndRepository = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();

    try {
        let listaarRepository: Array<VerificateCode> = [];
        const { fecha, estado, porcentaje } = req.params;
        //• Consumo API Externa para validar códigos de verificación.
        const dataMock = await serviceMock();
        dataMock['repositories'].map((resp: VerificateCode) => listaarRepository.push(new VerificateCode(resp.id, resp.state)));


        // console.log(dataMock);
        res.status(200).json(listaarRepository)
        //• Mapear estructura de respuesta.

        //• Pruebas unitarias de cada criterio de aceptación.

    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}