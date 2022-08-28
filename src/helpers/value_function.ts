export class FunctionValue {
    OK(datos?: any) {
        return { status: 'ok', datos: datos }
    }

    Error(message?: any) {
        let messgae = '';
        if (message instanceof Error) {
            messgae = message.message
        } else {
            messgae = 'Problemas con el servicio del servidor.!' + message
        }
        return { status: 'error', datos: messgae }
    }
}