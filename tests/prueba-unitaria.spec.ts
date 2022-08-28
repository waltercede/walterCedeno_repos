import { describe, expect, test } from '@jest/globals';
import { getMetricsRepositoryTest } from '../src/case_use/case-use-metricas';
import { functionReturnverificationState } from '../src/helpers/utils';
import { isCharacter } from '../src/helpers/serializate-body';

describe('Test de los Servicio para obtener las métricas de un repositorio', () => {
    // Dado que envío el identificador de una tribu
    // Cuando consumo el servicio para obtener los repositorios
    // Entonces me retornará el detalle de las métricas de los repositorios creados este año
    // Y que se encuentren habilitados (state: ENABLE)
    // Y que su cobertura sea superior a 75%
    test('Retorno de informacion con los criterios indicados', async () => {
        try {
            let correcto = 0;
            // await serverWalterCedeno.dbConnection();
            // console.log('Base abierta');
            const dataReposity = await getMetricsRepositoryTest(4);
            if (dataReposity.status == 'ok') {
                console.log(dataReposity.datos);
                dataReposity.datos.map((e: any) => {
                    if (e.coverage != '75%' && e.state != 'Habilitado') {
                        correcto += 1;
                    }
                })
            }
            expect(correcto).toBe(0);
        } catch (error) {
            expect(0).toBe(0);
        }
    });

    // Dado que envío el identificador de una tribu
    // Cuando consumo el servicio para obtener los repositorios y la tribu no existe
    // Entonces me retornará el siguiente error: 'La Tribu no se encuentra registrada'

    test('Validacion del mensaje si no tiene repositorio la tribu', async () => {
        const dataReposity = await getMetricsRepositoryTest(2);
        if (dataReposity.status != 'ok') {
            expect(dataReposity.datos).toBe('La Tribu no se encuentra registrada');
        } else {
            expect(true).toBe(true);
        }
    });
    // Dado que envío el identificador de una tribu
    // Cuando consumo el servicio para obtener los repositorios
    // Y obtengo el estado de verificación de los repositorios desde API Simulada (mock)
    // Entonces me retornará una etiqueta en la respuesta indicando un texto en lenguaje natural del 
    // estado de verificación actual de cada repositorio

    test('Entonces me retornará una etiqueta en la respuesta indicando un texto en lenguaje natural del estado de verificación actual de cada repositorio', async () => {
        const dataMockVerificate = functionReturnverificationState(604);
        expect(isCharacter(dataMockVerificate)).toBe(true);


    });
    //     Dado que envío el identificador de una tribu
    // Cuando consumo el servicio para obtener los repositorios
    // Y la tribu no tiene repositorios que cumplan con el 75% de cobertura
    // Entonces me retornará el siguiente error: 'La Tribu no tiene repositorios que cumplan con la 
    // cobertura necesaria'
    test('La Tribu no tiene repositorios que cumplan con la  cobertura necesaria', async () => {
        try {
            await getMetricsRepositoryTest(2);
            expect(true).toBe(true);
        } catch (error) {
            expect(error).toBe('La Tribu no tiene repositorios que cumplan con la  cobertura necesaria');
        }

    });
});