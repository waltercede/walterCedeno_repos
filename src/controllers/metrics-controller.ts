import { Request, Response } from "express"
import { createFileCsvMetrics, getMetricsRepository } from "../case_use/case-use-metricas";
import { ResponseValue } from "../helpers/response-value";

//• Consulta para filtrar los repositorios por fecha, estado y porcentaje.
export const metricsAndRepository = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const { id } = req.params;
        const idtribu = parseInt(id);
        const dataRepository = await getMetricsRepository(idtribu);
        res.status(200).json({ "repositories": dataRepository.datos });
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}
export const generateCsvMetrics = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const { id } = req.params;
        const idtribu = parseInt(id);
        const dataRepository = await createFileCsvMetrics(idtribu);
        res.status(200).json(dataRepository);
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}