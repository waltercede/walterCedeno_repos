import { InterfaceRegistreTDO, OrganizationTDO } from "./type-interface";
//valida si son caracteres
const parsetName = (name: any): string => {
    if (!isCharacter(name)) {
        throw new Error("Deber Ingresar solo letras");
    }
    return name;
}
//valida si es fecha lo que pasa el usuario
const parsetDate = (date: any): string => {
    if (!isCharacter(date) || !isDate(date)) {
        throw new Error("Deber Ingresar solo letras");
    }
    return date;
}
//valida si es numero lo que pasa el usuario
const parsetNumber = (value: any): number => {
    if (!isNumber(value)) {
        throw new Error("Deber Ingresar solo Numeros");
    }
    return value;
}
export const isCharacter = (string: string): boolean => typeof string == 'string';
const isNumber = (value: number): boolean => typeof value == 'number';
const isDate = (date: string): boolean => Boolean(Date.parse(date));

//funcion donde se valida y se arma el DTO de lo que venga en el body de la Organization
export const onSerializeBodyOrganization = (object: any): OrganizationTDO => {
    if (object.name == undefined || object.status == undefined) {
        throw new Error("Los campos name y status son obligatorios");
    }
    if (object.status < 0 || object.status > 1) {
        throw new Error("El status debe ser entre 0 y 1");
    }
    const newOrganization: OrganizationTDO = {
        name: parsetName(object.name),
        status: parsetNumber(object.status),
    }
    return newOrganization;
}
//funcion donde se valida y se arma el DTO de lo que venga en el body de la Organization
export const onSerializeBodyOrganizationTodo = (object: any): InterfaceRegistreTDO => {
    if (object.name == undefined || object.status == undefined) {
        throw new Error("Los campos name y status son obligatorios");
    }
    if (object.status < 0 || object.status > 1) {
        throw new Error("El status debe ser entre 0 y 1");
    }
    const newOrganization: InterfaceRegistreTDO = {
        name: parsetName(object.name),
        status: parsetNumber(object.status),
        name_tribu: parsetName(object.name_tribu),
        status_tribu: parsetNumber(object.status_tribu),
        coverage: parsetNumber(object.coverage),
        codeSmells: parsetNumber(object.codeSmells),
        bugs: parsetNumber(object.bugs),
        vulnerabilities: parsetNumber(object.vulnerabilities),
        hotspots: parsetNumber(object.hotspots),
        name_repository: parsetName(object.name_repository),
        state: parsetName(object.state),
        statusRepository: parsetName(object.statusRepository),
    }
    return newOrganization;
}

