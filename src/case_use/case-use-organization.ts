import { Repository } from "../entities/repository";
import { Organization } from "../entities/organization";
import { Tribe } from "../entities/tribe";
import { InterfaceRegistreTDO, OrganizationTDO } from "../helpers/type-interface";
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
        newOrganization.email=value.email;
        await newOrganization.save();
        return estadosRespuestas.OK(value);
    }
    catch (e) {
        return estadosRespuestas.Error(e);
    }
}
export const CreateOrganizationTodosCaseUse = async (value: InterfaceRegistreTDO) => {
    const estadosRespuestas = new FunctionValue();
    try {
        //Grabamos la Organizacion
        const newOrganization = new Organization();
        newOrganization.name = value.name;
        newOrganization.status = value.status;
        await newOrganization.save();

        //Grabamos la Tribu
        const newTribu = new Tribe();
        newTribu.id_organization = newOrganization;
        newTribu.name = value.name_tribu;
        newTribu.status = value.status_tribu;
        await newTribu.save();

        //Grabamos  repositorio
        const newRepository = new Repository();
        newRepository.id_tribe = newTribu;
        newRepository.name = value.name_repository;
        newRepository.state = value.state;
        newRepository.status = value.statusRepository;
        await newRepository.save();

        //Grabamos Metrics
        const newMetrics = new Metrics();
        newMetrics.id_repository = newRepository;
        newMetrics.coverage = value.coverage;
        newMetrics.bugs = value.bugs;
        newMetrics.vulnerabilities = value.vulnerabilities;
        newMetrics.code_smells = value.codeSmells;
        newMetrics.hotspot = value.hotspots;
        await newMetrics.save();

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

        const dataOrganization = await Organization.find();
        return estadosRespuestas.OK(dataOrganization);
    }
    catch (e) {
        return estadosRespuestas.Error(e);
    }
}