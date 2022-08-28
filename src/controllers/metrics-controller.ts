import { Request, Response } from "express"
import { serviceMock } from "../../server-mock/api-mock";
import { getMetricsRepository } from "../case_use/case-use-metricas";
import { VerificateCode } from "../entities/verificate-code";
import { ResponseValue } from "../helpers/response-value";
import {  OrganizationTDO, RespuestaRepositoryTDO } from "../helpers/type-interface";

//• Consulta para filtrar los repositorios por fecha, estado y porcentaje.
export const metricsAndRepository = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();

    try {
        
        const { id } = req.params;
        const idtribu = parseInt(id);
        const anioActual = new Date().getFullYear();
        //• Consumo API Externa para validar códigos de verificación.

        // Escenario 1: Obtener métricas de repositorios por tribu:
        // Dado que envío el identificador de una tribu
        // Cuando consumo el servicio para obtener los repositorios
        // Entonces me retornará el detalle de las métricas de los repositorios creados este año
        // Y que se encuentren habilitados (state: ENABLE)
        // Y que su cobertura sea superior a 75%

        const dataRepository = await getMetricsRepository(idtribu);

        // • Escenario 2: Tribu inexistente.
        // Dado que envío el identificador de una tribu
        // Cuando consumo el servicio para obtener los repositorios y la tribu no existe
        // Entonces me retornará el siguiente error: 'La Tribu no se encuentra registrada'
        // • Escenario 3: Información de verificación.
        // Dado que envío el identificador de una tribu
        // Cuando consumo el servicio para obtener los repositorios
        // Y obtengo el estado de verificación de los repositorios desde API Simulada (mock)
        // Entonces me retornará una etiqueta en la respuesta indicando un texto en lenguaje natural del 
        // estado de verificación actual de cada repositorio

        // • Escenario 4: Tribu no tiene repositorios que cumplan con la cobertura.
        // Dado que envío el identificador de una tribu
        // Cuando consumo el servicio para obtener los repositorios
        // Y la tribu no tiene repositorios que cumplan con el 75% de cobertura
        // Entonces me retornará el siguiente error: 'La Tribu no tiene repositorios que cumplan con la 
        // cobertura necesaria'


        // console.log(dataMock);
        res.status(200).json(dataRepository)
        //• Mapear estructura de respuesta.

        //• Pruebas unitarias de cada criterio de aceptación.

    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}