export const functionReturnverificationState =  (State: number):string => {
    let estadoActual = '';
    switch (State) {
        case 604: {
            estadoActual = 'Verificado'
            break;
        }
        case 605: {
            estadoActual = 'En espera'
            break;
        }
        case 606: {
            estadoActual = 'Aprobado'
            break;
        }
        default: {
            estadoActual = 'No es Correcto'
            break;
        }
    }
    return estadoActual;
}

export const functionReturnStateRepository =  (value: string):string  => {
    let estadoActual = '';
    switch (value) {
        case 'E': {
            estadoActual = 'Habilidato'
            break;
        }
        case 'D': {
            estadoActual = 'Deshabilitado'
            break;
        }
        case 'A': {
            estadoActual = 'Archivado'
            break;
        }
        default: {
            estadoActual = 'No es Correcto'
            break;
        }
    }
    return estadoActual;
}