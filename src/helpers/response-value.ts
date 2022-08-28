import { Response } from "express";

enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export class ResponseValue {
    OK(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "success",
            data: data
        })
    }
    BadRequest(res: Response, data?: any): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: data.datos,
        })
    }
    NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: data.datos,
        })
    }
    InternalError(res: Response, data?: any): Response {
        let messgae = '';
        if (data instanceof Error) {
            messgae = data.message
        } else {
            messgae = 'Problemas con el servicio del servidor.!'
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: messgae,
        })
    }
}