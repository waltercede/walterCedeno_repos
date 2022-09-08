import { Request, Response } from "express";
import { CreateOrganizationCaseUse, CreateOrganizationTodosCaseUse, deleteOrganizateCaseUse, ListOrganizateionCaseUse, updateOrganizateCaseUse } from "../case_use/case-use-organization";
import { ResponseValue } from "../helpers/response-value";
import { onSerializeBodyOrganization, onSerializeBodyOrganizationTodo } from "../helpers/serializate-body";
import { InterfaceRegistreTDO, OrganizationTDO } from "../helpers/type-interface";


export const CreateOrganization = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const organizationDto: OrganizationTDO = onSerializeBodyOrganization(req.body);
        
        const respuesta = await CreateOrganizationCaseUse(organizationDto);
        if (respuesta.status != 'ok') {
            return modeloRespuesta.BadRequest(res, respuesta.datos)
        }
        return modeloRespuesta.OK(res, respuesta)
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }
}
export const CreateOrganizationTodo = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const organizationDto: InterfaceRegistreTDO = onSerializeBodyOrganizationTodo(req.body);
        const respuesta = await CreateOrganizationTodosCaseUse(organizationDto);
        if (respuesta.status != 'ok') {
            return modeloRespuesta.BadRequest(res, respuesta.datos)
        }
        return modeloRespuesta.OK(res, respuesta)
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }
}

export const ListOrganization = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const data = await ListOrganizateionCaseUse();

        if (data.status != 'ok') {
            return modeloRespuesta.BadRequest(res, data);
        }
        return modeloRespuesta.OK(res, data)
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}
export const UpdateOrganization = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const { id } = req.params;
        const paresearNumero = parseInt(id);
        if (!id) {
            throw new Error("Ingrese un numero de id");
        }
        const organizationDto: OrganizationTDO = onSerializeBodyOrganization(req.body);
        const data = await updateOrganizateCaseUse(paresearNumero, organizationDto);
        if (data.status != 'ok') {
            return modeloRespuesta.BadRequest(res, data);
        }
        return modeloRespuesta.OK(res, data)
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}
export const DeleteOrganization = async (req: Request, res: Response) => {
    const modeloRespuesta = new ResponseValue();
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Ingrese un numero de id");

        }
        const data = await deleteOrganizateCaseUse(parseInt(id));
        if (data.status != 'ok') {
            return modeloRespuesta.BadRequest(res, data);
        }
        return modeloRespuesta.OK(res, data)
    } catch (error) {
        return modeloRespuesta.InternalError(res, error);
    }

}

