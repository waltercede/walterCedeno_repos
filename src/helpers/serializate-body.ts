import { OrganizationTDO } from "./type-interface";
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
const isCharacter = (string: string): boolean => typeof string == 'string';
const isNumber = (value: number): boolean => typeof value == 'number';
const isDate = (date: string): boolean => Boolean(Date.parse(date));

//funcion donde se valida y se arma el DTO de lo que venga en el body de la Organization
const onSerializeBodyOrganization = (object: any): OrganizationTDO => {
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

export default onSerializeBodyOrganization;