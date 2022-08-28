import { Repository } from "../entities/repository";
import { Organization } from "../entities/organization";
import { Tribe } from "../entities/tribe";
import { OrganizationTDO } from "../helpers/type-interface";
import { FunctionValue } from "../helpers/value_function";
import { Metrics } from "../entities/metrics";
import { Console } from "console";

export const CreateOrganizationCaseUse = async (value: OrganizationTDO) => {
    const estadosRespuestas = new FunctionValue();
    try {
        //Grabamos la Organizacion
        const newOrganization = new Organization();
        newOrganization.name = value.name;
        newOrganization.status = value.status;
        await newOrganization.save();
        console.log('Guardo aki organizacion')
        //Grabamos la Tribu
        const newTribu = new Tribe();
        newTribu.id_organization = newOrganization;
        newTribu.name = "Centro Digital";
        newTribu.status = 1;
        await newTribu.save();
        console.log('Guardo aki Tribu')
        //Grabamos  repositorio
        const newRepository = new Repository();
        newRepository.id_tribe = newTribu;
        newRepository.name = "cd-common-utils";
        newRepository.state = 'E';
        newRepository.status = 'A';
        await newRepository.save();
        console.log('Guardo aki repositoryi')
        //Grabamos Metrics
        const newMetrics = new Metrics();
        newMetrics.id_repository = newRepository;
        newMetrics.coverage = 0.75;
        newMetrics.bugs = 0;
        newMetrics.vulnerabilities = 0;
        newMetrics.code_smells = 0;
        newMetrics.hotspot = 0;
        await newMetrics.save();
        console.log('Guardo aki Metric')
        return estadosRespuestas.OK(value);
    }
    catch (e) {
        return estadosRespuestas.Error(e);
    }
}

export const ListOrganizateionCaseUse = async () => {
    const estadosRespuestas = new FunctionValue();
    try {
        const dataOrganization = await Organization.find();
        return estadosRespuestas.OK(dataOrganization);
    }
    catch (e) {
        return estadosRespuestas.Error(e);
    }
}
export const updateOrganizateCaseUse = async (id: number, value: OrganizationTDO) => {
    const estadosRespuestas = new FunctionValue();
    try {
        const dataOrganizate = await Organization.findOneBy({ id_organization: id });
        if (dataOrganizate == null) {
            throw new Error("No existe registro con ese id");
        }
        await Organization.update({ id_organization: id }, { name: value.name, status: value.status });
        return estadosRespuestas.OK({ 'Message': 'Organización actualizada con exito.!!' });
    }
    catch (e) {
        return estadosRespuestas.Error(e);
    }
}

export const deleteOrganizateCaseUse = async (id: number) => {
    const estadosRespuestas = new FunctionValue();
    try {
        const dataOrganizate = await Organization.findOneBy({ id_organization: id });
        if (dataOrganizate == null) {
            throw new Error("No existe registro con ese id");
        }
        const countTribe = await Tribe.createQueryBuilder("tribe")
            .leftJoinAndSelect("tribe.id_organization", "organization")
            .andWhere("tribe.id_organization = :idOrganizate", { idOrganizate: dataOrganizate.id_organization })
            .select(["tribe.name", "tribe.status"])
            .getCount();

        if (countTribe >= 1) {
            await Organization.update({ id_organization: id }, { status: 0 });
        } else {
            Organization.delete({ id_organization: id });
        }
        return estadosRespuestas.OK({ 'Message': 'Registro eliminado con exito' });
    }
    catch (e) {
        return estadosRespuestas.Error(e);
    }
}