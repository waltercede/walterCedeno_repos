import { FunctionValue } from "../helpers/value_function";
import { Metrics } from "../entities/metrics";
import fs from 'fs'
import { RespuestaRepositoryTDO } from "../helpers/type-interface";
import { serviceMock } from "../../server-mock/api-mock";
import { VerificateCode } from "../entities/verificate-code";
import { functionReturnStateRepository, functionReturnverificationState } from "../helpers/utils";
import { join } from 'path';
import { stringify } from 'csv';
import AppDataSource from "../data/db_waltercedeno";

export const getMetricsRepository = async (idtribu: number) => {
    const estadosRespuestas = new FunctionValue();
    let listaarRepository: Array<VerificateCode> = [];
    let listaRespuesta: Array<RespuestaRepositoryTDO> = [];
    const anioActual = new Date().getFullYear();
    const consultarTribu = await Metrics.createQueryBuilder("metrics")
        .leftJoinAndSelect("metrics.id_repository", "repository")
        .leftJoinAndSelect("repository.id_tribe", "tribe")
        .where("repository.id_tribe = :idTribe", { idTribe: idtribu })
        .getCount();

    if (consultarTribu <= 0) {
        throw new Error("La Tribu no se encuentra registrada");
    }
    const validarProcentaje = await Metrics.createQueryBuilder("metrics")
        .leftJoinAndSelect("metrics.id_repository", "repository")
        .leftJoinAndSelect("repository.id_tribe", "tribe")
        .where("repository.id_tribe = :idTribe", { idTribe: idtribu })
        .andWhere("metrics.coverage = :coverage", { coverage: 75 / 100 })
        .getCount();

    if (validarProcentaje <= 0) {
        throw new Error("La Tribu no tiene repositorios que cumplan con la cobertura necesaria");
    }
    const countTribe = await Metrics.createQueryBuilder("metrics")
        .leftJoinAndSelect("metrics.id_repository", "repository")
        .leftJoinAndSelect("repository.id_tribe", "tribe")
        .leftJoinAndSelect("tribe.id_organization", "organization")
        .where("repository.id_tribe = :idTribe", { idTribe: idtribu })
        .andWhere("repository.state = :state", { state: 'E' })
        .andWhere("metrics.coverage = :coverage", { coverage: 75 / 100 })
        .getMany();
    const dataMock = await serviceMock();
    dataMock['repositories'].map((resp: VerificateCode) => listaarRepository.push(new VerificateCode(resp.id, resp.state)));

    countTribe.map((e: any) => {
        if (anioActual === new Date(e.id_repository.create_time).getFullYear()) {
            const converPorcentaje = e.coverage * 100;
            const objetoVerificate: VerificateCode = listaarRepository.filter(x => x.id == e.id_repository.id_repository)[0];
            console.log(objetoVerificate);
            const valueOrganization: RespuestaRepositoryTDO = {
                id: `${e.id_repository.id_repository}`,
                name: e.id_repository.name,
                tribe: e.id_repository.id_tribe.name,
                organization: e.id_repository.id_tribe.id_organization.name,
                coverage: `${converPorcentaje}%`,
                codeSmells: e.code_smells,
                bugs: e.bugs,
                vulnerabilities: e.vulnerabilities,
                hotspots: e.hotspot,
                verificationState: functionReturnverificationState(objetoVerificate.state),
                state: functionReturnStateRepository(e.id_repository.state)
            };
            listaRespuesta.push(valueOrganization);
        }

    });
    return estadosRespuestas.OK(listaRespuesta);


}

export const createFileCsvMetrics = async (idtribu: number) => {
    const estadosRespuestas = new FunctionValue();
    const valueRepository = await getMetricsRepository(idtribu);
    const dameFecha = dameFechaHoraFile();
    await generateCsv(`${dameFecha}_metrics.csv`, valueRepository.datos);
    return estadosRespuestas.OK({ 'Message': 'Archivo Generado con exito ' });
}

const generateCsv = async (fileName: string, data: any) => {
    stringify(data, {
        header: true,
        delimiter: ';'
    }, function (err, output) {
        fs.writeFileSync(join('files-csv', fileName), output, 'utf8');
    })
}
const dameFechaHoraFile = (): string => {
    const dameDia = new Date().getDate();
    const dameMes = new Date().getMonth() + 1;
    const dameAnio = new Date().getFullYear();
    const dameHora = new Date().getHours();
    const dameMinutos = new Date().getMinutes();
    return `${dameDia}_${dameMes}_${dameAnio}_${dameHora}_${dameMinutos}`;
}

export const getMetricsRepositoryTest = async (idtribu: number) => {
    const estadosRespuestas = new FunctionValue();
    try {
        await AppDataSource.initialize();

        const valueRepository = await getMetricsRepository(idtribu);
        await AppDataSource.destroy();
        return estadosRespuestas.OK(valueRepository);
    } catch (error) {
        return estadosRespuestas.Error(error);
    }

}


